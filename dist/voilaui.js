// Toggle the mobile menu
function toggleMobileMenu() {
    const mainMenu = document.getElementById('mainMenu');
    const menuIcon = document.getElementById('menuIcon');

    mainMenu.classList.toggle('hidden');

    // Toggle between icons
    if (mainMenu.classList.contains('hidden')) {
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />';
    } else {
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />';
    }
}

// Close other dropdowns except the current one
function closeOtherDropdowns(currentDropdownId) {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdown) => {
        if (dropdown.id !== currentDropdownId) {
            dropdown.classList.add('hidden');
        }
    });
}

// Toggle the dropdown and handle the show/hide behavior
function toggleDropdown(dropdownId) {
    const dropdownMenu = document.getElementById(dropdownId);
    const isHidden = dropdownMenu.classList.contains('hidden');
    
    closeOtherDropdowns(dropdownId);

    if (isHidden) {
        dropdownMenu.classList.remove('hidden');
    } else {
        dropdownMenu.classList.add('hidden');
    }
}

// Event listeners for dropdown toggles
document.getElementById('dropdownToggle').addEventListener('click', function (event) {
    event.stopPropagation();
    toggleDropdown('dropdownMenu');
});

document.getElementById('dropdownToggle1').addEventListener('click', function (event) {
    event.stopPropagation();
    toggleDropdown('dropdownMenu1');
});

document.getElementById('dropdownToggle2').addEventListener('click', function (event) {
    event.stopPropagation();
    toggleDropdown('dropdownMenu2');
});

// Close the dropdowns when clicking outside of them
document.addEventListener('click', function (event) {
    const dropdowns = ['dropdownMenu', 'dropdownMenu1', 'dropdownMenu2'];

    dropdowns.forEach((dropdownId) => {
        const dropdownMenu = document.getElementById(dropdownId);
        const dropdownToggle = document.getElementById(`dropdownToggle${dropdownId === 'dropdownMenu' ? '' : dropdownId.slice(-1)}`);
        
        if (dropdownToggle && dropdownMenu && !dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });
});

// Appear on hover
function showDropdown(id) {
    document.getElementById(id).classList.remove("hidden");
}

function hideDropdown(id) {
    document.getElementById(id).classList.add("hidden");
}



// modal
document.addEventListener('click', function (event) {
    const target = event.target;

    // Open popup when trigger button is clicked
    if (target.hasAttribute('data-popup')) {
        const popupId = target.getAttribute('data-popup');
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.remove('hidden');
        }
    }

    // Close popup when close button is clicked
    if (target.hasAttribute('data-popup-close')) {
        const popupId = target.getAttribute('data-popup-close');
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add('hidden');
        }
    }

});

/** 
 * Accordion script to handle multiple accordions 
 * that have class name accordion 
*/
let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;

        // Close all other panels
        let allPanels = document.getElementsByClassName("panel");
        for (let j = 0; j < allPanels.length; j++) {
            if (allPanels[j] !== panel) {
                allPanels[j].style.display = "none";
                // Remove "active" class from other buttons
                acc[j].classList.remove("active");
                // Reset the icon for other buttons
                resetIcon(acc[j]);
            }
        }

        if (panel.style.display === "block") {
            panel.style.display = "none";
            resetIcon(this);
        } else {
            panel.style.display = "block";
            toggleIcon(this);
        }

    });
}

function resetIcon(element) {
    let icon = element.querySelector('.icon');
    if (icon) {
        icon.innerHTML = '+';
    }
}

function toggleIcon(element) {
    let icon = element.querySelector('.icon');
    if (icon) {
        icon.innerHTML = '-';
    }
}

// scroll to top
window.addEventListener('scroll', function () {
    var scrollToTopButton = document.getElementById('scrollToTop');
    if (window.scrollY > 200) {
        scrollToTopButton.classList.remove('opacity-0');
    } else {
        scrollToTopButton.classList.add('opacity-0');
    }
});

document.getElementById('scrollToTop').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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
  