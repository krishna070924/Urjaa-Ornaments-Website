const dropdown = document.querySelector('.dropdown-menu');
const arrow = document.querySelector('.arrow');
const dropdownToggle = document.querySelector('.dropdown-toggle');

// Function to update the arrow position
function updateArrowPosition(target) {
    const rect = target.getBoundingClientRect(); // Get the hovered item’s bounding box
    const dropdownRect = dropdown.getBoundingClientRect(); // Get the dropdown’s bounding box

    // Calculate the left position of the arrow to be centered above the hovered item
    const arrowLeft = rect.left + rect.width / 2 - dropdownRect.left - 10; // -10 for half the width of the arrow (20px total)

    arrow.style.left = `${arrowLeft}px`;
}

// Attach hover event listeners to the dropdown toggle
dropdownToggle.addEventListener('mouseenter', function () {
    dropdown.classList.add('show'); // Show dropdown
    updateArrowPosition(dropdownToggle); // Update arrow position
});

// Attach hover event listeners to the dropdown menu items
const navbarItems = document.querySelectorAll('.navbar-menu > li > a');

navbarItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        dropdown.classList.add('show'); // Show dropdown on hover
        updateArrowPosition(item); // Update arrow position to the hovered item
    });
});

// Hide the dropdown when not hovering over the dropdown toggle or menu
dropdownToggle.addEventListener('mouseleave', function () {
    dropdown.classList.remove('show'); // Hide dropdown
});

navbarItems.forEach(item => {
    item.addEventListener('mouseleave', function () {
        dropdown.classList.remove('show'); // Hide dropdown
    });
});

// Show the arrow when hovering over the dropdown items
dropdown.addEventListener('mouseenter', function () {
    arrow.style.display = 'block'; // Show the arrow when hovering over dropdown
});

// Hide the arrow when leaving the dropdown
dropdown.addEventListener('mouseleave', function () {
    dropdown.classList.remove('show'); // Hide dropdown
    arrow.style.display = 'none'; // Hide the arrow when leaving dropdown
});
