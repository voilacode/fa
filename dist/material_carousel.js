// material carousel
document.addEventListener('DOMContentLoaded', function () {
    function initCarousel(carouselId, prevBtnId, nextBtnId, slideNumberId) {
        const carousel = document.getElementById(carouselId);
        const inner = carousel.querySelector('.crsl-inner');
        const items = carousel.querySelectorAll('.crsl-item');
        const totalItems = items.length;
        const slideNumber = document.getElementById(slideNumberId);
        let currentIndex = 0; // Start with the first image

        function showSlide(index) {
            if (index < 0) {
                index = 0;
            } else if (index >= totalItems) {
                index = totalItems - 1;
            }

            currentIndex = index;
            inner.style.transform = `translateX(${-index * 100}%)`;
            slideNumber.innerHTML = `<span class="text-white slide-number" style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 50px;">${index + 1}</span> / <span class="total-number">${totalItems}</span>`;
        }

        function nextSlide() {
            if (currentIndex < totalItems - 1) {
                showSlide(currentIndex + 1);
            }
        }

        function prevSlide() {
            if (currentIndex > 0) {
                showSlide(currentIndex - 1);
            }
        }

        document.getElementById(prevBtnId).addEventListener('click', prevSlide);
        document.getElementById(nextBtnId).addEventListener('click', nextSlide);

        // Initialize with the first slide
        showSlide(currentIndex);
    }

    initCarousel('carousel1', 'pBtn1', 'nxtBtn1', 'slideNum1');
    initCarousel('carousel2', 'pBtn2', 'nxtBtn2', 'slideNum2');
    initCarousel('carousel', 'pBtn', 'nxtBtn', 'slideNum');
});