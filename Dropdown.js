// Select the dropdown element and menu
const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Add event listeners for mouseenter and mouseleave to toggle visibility
dropdown.addEventListener('mouseenter', () => {
    dropdownMenu.style.visibility = 'visible';
    dropdownMenu.style.opacity = '1'; // Show the dropdown
});

dropdown.addEventListener('mouseleave', () => {
    dropdownMenu.style.visibility = 'hidden';
    dropdownMenu.style.opacity = '0'; // Hide the dropdown
});
