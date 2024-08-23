const carousel = document.getElementById('carousel');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
const totalSlides = 7;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update buttons
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('bg-orange-500', index === currentSlide);
        indicator.classList.toggle('bg-gray-200', index !== currentSlide);
    });
}

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateCarousel();
    }
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

updateCarousel();
