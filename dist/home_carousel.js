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