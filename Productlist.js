fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
        console.log(products);  // Check if the product data is correct
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';  // Clear the list before adding new products

        products.forEach(product => {
            // Creating the product card
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productImage = document.createElement('div');
            productImage.classList.add('product-image');
            const img = document.createElement('img');
            img.src = './Products/' + product.image_url;  // Ensure the path is correct
            img.alt = product.name;
            productImage.appendChild(img);

            const badge = document.createElement('div');
            badge.classList.add('badge');
            badge.textContent = 'New';

            const productInfo = document.createElement('div');
            productInfo.classList.add('product-info');

            const productName = document.createElement('h3');
            productName.textContent = product.name;
            productInfo.appendChild(productName);

            const productPrice = document.createElement('p');
            productPrice.classList.add('price');
            productPrice.textContent = '$' + product.price;
            productInfo.appendChild(productPrice);

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;
            productInfo.appendChild(productDescription);

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('add-to-cart');
            addToCartButton.textContent = 'Add to Cart';
            productInfo.appendChild(addToCartButton);

            productCard.appendChild(productImage);
            productCard.appendChild(badge);
            productCard.appendChild(productInfo);

            productList.appendChild(productCard);
        });
    })
    .catch(error => {
        console.error('Error fetching product data:', error);
    });
