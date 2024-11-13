let currentIndex = 0;
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.carousel-slide img');
const indicators = document.querySelectorAll('.indicator');
const slideInterval = 3000; // Slide every 3 seconds

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
}

function setSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Autoplay function
function startAutoplay() {
    setInterval(nextSlide, slideInterval);
}

// Initialize the carousel and start autoplay on DOM load
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
    startAutoplay();
});
