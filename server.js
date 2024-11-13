const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const app = express();

// MySQL connection configuration for users database
const dbUsers = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root', // Change this to your MySQL password
    database: 'users_db',
});

// MySQL connection configuration for products database
const dbProducts = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root', // Change this to your MySQL password
    database: 'ecommerce_db',
});

// Connect to the MySQL databases
dbUsers.connect((err) => {
    if (err) throw err;
    console.log('Connected to user database');
});

dbProducts.connect((err) => {
    if (err) {
        console.error('Error connecting to ecommerce_db:', err.message);
        throw err;
    }
    console.log('Connected to ecommerce database');
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize session middleware
app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set to true in production with HTTPS
    })
);

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve Home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});

// Route to fetch products from the database
app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
    dbProducts.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ message: 'Error retrieving products', error: err });
        } else {
            console.log('Products fetched:', results); // Debug log
            res.json(results);
        }
    });
});

// Route to handle form submission from Home.html
app.post('/signup', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into the MySQL database
        const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
        dbUsers.query(query, [first_name, last_name, email, hashedPassword], (error, results) => {
            if (error) {
                console.error('Error inserting user:', error); // Log error details
                if (error.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ success: false, message: 'Email already exists' });
                } else {
                    res.status(500).json({ success: false, message: 'Error saving user data', error: error.message });
                }
            } else {
                req.session.isRegistered = true;
                res.json({ success: true, message: 'User registered successfully' });
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error processing request' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
