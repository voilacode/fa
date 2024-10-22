
// recent stories carousel
document.addEventListener("DOMContentLoaded", function () {
    const carousel3 = document.getElementById('carousel3');
    const carouselInner3 = document.getElementById('carousel-inner3');
    const progressBar = document.getElementById('progress-bar');
    let index = 0;
    const duration = 4000; // 4 seconds

    function updateCarousel() {
        const slides = carouselInner3.children;

        const offset = -index * 100;
        carouselInner3.style.transform = `translateX(${offset}%)`;
    }

    function updateProgressBar() {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.transition = `width ${duration}ms linear`;
            progressBar.style.width = '10%';
        }, 50); // Short delay to allow the browser to apply the 'none' transition
    }

    setInterval(() => {
        index = (index < carouselInner3.children.length - 1) ? index + 1 : 0;
        updateCarousel();
        updateProgressBar();
    }, duration);

    updateCarousel();
    updateProgressBar();
});