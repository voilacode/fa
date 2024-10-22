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

// count block
function animateNumber(id, finalValue, duration) {
  let startTime = null;
  const element = document.getElementById(id);
  const startValue = parseInt(element.textContent);
  
  function updateNumber(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const percentage = Math.min(progress / duration, 1);
    const currentValue = Math.floor(startValue + (finalValue - startValue) * percentage);
    element.textContent = currentValue.toLocaleString();
    
    if (percentage < 1) {
      requestAnimationFrame(updateNumber);
    }
  }
  
  requestAnimationFrame(updateNumber);
}

function startAnimationOnScroll() {
  const numbersSection = document.getElementById('numbers-section');
  const sectionTop = numbersSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  const triggerOffset = 100; // Adjust this value if needed to trigger the animation earlier or later

  if (sectionTop - triggerOffset <= windowHeight) {
    animateNumber('successStories', 62000, 2000);
    animateNumber('yearsOfService', 23, 2000);
    animateNumber('scholarships', 785, 2000);
    animateNumber('uniAdmits', 300000, 2000);
    window.removeEventListener('scroll', startAnimationOnScroll); // Remove the event listener once triggered
  }
}

window.addEventListener('scroll', startAnimationOnScroll);