// Check if the user has already registered in this session
if (sessionStorage.getItem("popupShown") === "true") {
  // If true, don't show the popup
  console.log("Popup already shown in this session.");
} else {
  // If not, start the timer to show the popup after 10 seconds
  window.addEventListener("load", function() {
      console.log("Page loaded, starting timer...");
      setTimeout(showPopup, 10000); // Show popup after 10 seconds
  });
}

// Function to show popup
function showPopup() {
  // Check if popup has been shown
  if (sessionStorage.getItem("popupShown") !== "true") {
      console.log("Showing popup...");
      document.querySelector(".overlay").style.display = "flex";
  }
}

// Close popup function
document.querySelector(".close-btn").addEventListener("click", function() {
  console.log("Close button clicked");
  document.querySelector(".overlay").style.display = "none";
});

// Assuming your form has an id of 'signup-form'
document.getElementById('signup-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const firstName = document.querySelector('input[name="first_name"]').value;
  const lastName = document.querySelector('input[name="last_name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  // Prepare data for the POST request
  const data = { first_name: firstName, last_name: lastName, email: email, password: password };

  try {
      // Send the form data to the server
      const response = await fetch('/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
          // If registration is successful, mark the session as registered
          sessionStorage.setItem("popupShown", "true"); // Set session storage so popup won't show again
          // Redirect to the homepage
          window.location.href = '/'; // Redirect to Home.html
      } else {
          alert(result.message); // Show the error message if registration fails
      }
  } catch (error) {
      alert('Error during signup. Please try again later.');
  }
});
