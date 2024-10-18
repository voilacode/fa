// carousel
const carouselItems = document.querySelectorAll('.carousel-item');
let currentSlide = 0;
const fadeDuration = 1000; 
const slideInterval = 3000; 

function showSlide(slideIndex) {
  carouselItems.forEach((item, index) => {
    if (index === slideIndex) {
      item.classList.remove('hidden', 'opacity-0');
      item.classList.add('block', 'opacity-100');
    } else {
      item.classList.add('hidden', 'opacity-0');
      item.classList.remove('block', 'opacity-100');
    }
  });
}

function nextSlide() {
  carouselItems[currentSlide].classList.remove('opacity-100');
  carouselItems[currentSlide].classList.add('opacity-0');

  const nextSlideIndex = (currentSlide + 1) % carouselItems.length;

  setTimeout(() => {
    currentSlide = nextSlideIndex;
    showSlide(currentSlide);
  }, fadeDuration / 2); 
}

showSlide(currentSlide);

setInterval(nextSlide, slideInterval);

document.querySelectorAll('video').forEach((video) => {
    video.setAttribute('playsinline', 'true');
  });
  

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
});

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