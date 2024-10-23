function toggleMobileMenu() {
  const mainMenu = document.getElementById('mainMenu');
  const menuIcon = document.getElementById('menuIcon');

  mainMenu.classList.toggle('hidden');

  // Toggle between icons
  if (mainMenu.classList.contains('hidden')) {
    menuIcon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />';
  } else {
    menuIcon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />';
  }
}

function closeOtherDropdowns(currentDropdownId) {
  const dropdowns = document.querySelectorAll('.dropdown-menu');
  dropdowns.forEach((dropdown) => {
    if (dropdown.id !== currentDropdownId) {
      dropdown.classList.add('hidden');
    }
  });
}

document.querySelectorAll('[id^="dropdownToggle"]').forEach((toggle) => {
  toggle.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent event from bubbling up
    const dropdownId = this.id.replace('Toggle', 'Menu'); // Replace 'Toggle' with 'Menu'
    const dropdownMenu = document.getElementById(dropdownId);
    closeOtherDropdowns(dropdownId);
    dropdownMenu.classList.toggle('hidden');
  });
});

// Close the dropdowns when clicking outside of them
document.addEventListener('click', function (event) {
  const dropdowns = document.querySelectorAll('.dropdown-menu');
  dropdowns.forEach((dropdown) => {
    if (!dropdown.classList.contains('hidden')) {
      const toggle = document.getElementById(
        dropdown.id.replace('menu', 'Toggle')
      );
      if (!toggle.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.add('hidden');
      }
    }
  });
});

// appear on hover
function showDropdown(id) {
  document.getElementById(id).classList.remove('hidden');
}

function hideDropdown(id) {
  document.getElementById(id).classList.add('hidden');
}

function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  if (dropdown.classList.contains('hidden')) {
    showDropdown(id);
  } else {
    hideDropdown(id);
  }
}

// modal
document.addEventListener('DOMContentLoaded', function () {
  // Open popup
  document.querySelectorAll('[data-popup]').forEach((button) => {
    button.addEventListener('click', function () {
      const popupId = button.getAttribute('data-popup');
      document.getElementById(popupId).classList.remove('hidden'); // Show popup
    });
  });

  // Close popup
  document.querySelectorAll('[data-popup-close]').forEach((button) => {
    button.addEventListener('click', function () {
      const popupId = button.getAttribute('data-popup-close');
      document.getElementById(popupId).classList.add('hidden');
    });
  });

  document.querySelectorAll('.popup-content').forEach((popupContent) => {
    popupContent.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });

  document.querySelectorAll('.fixed').forEach((popupBackground) => {
    popupBackground.addEventListener('click', function () {
      popupBackground.classList.add('hidden');
    });
  });
});

/**
 * Accordion script to handle multiple accordions
 * that have class name accordion
 */
let acc = document.getElementsByClassName('accordion');
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    let panel = this.nextElementSibling;

    // Close all other panels
    let allPanels = document.getElementsByClassName('panel');
    for (let j = 0; j < allPanels.length; j++) {
      if (allPanels[j] !== panel) {
        allPanels[j].style.display = 'none';
        // Remove "active" class from other buttons
        acc[j].classList.remove('active');
        // Reset the icon for other buttons
        resetIcon(acc[j]);
      }
    }

    if (panel.style.display === 'block') {
      panel.style.display = 'none';
      resetIcon(this);
    } else {
      panel.style.display = 'block';
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

// Scroll to top button logic
window.addEventListener('scroll', function () {
  var scrollToTopButton = document.getElementById('scrollToTop');
  // Check if user has scrolled more than 200px
  if (window.scrollY > 200) {
    console.log(window.scrollY);
    scrollToTopButton.classList.remove('opacity-0');
    scrollToTopButton.classList.add('visible'); // Add a class to make the button visible
    scrollToTopButton.classList.remove('hidden');
  } else {
    scrollToTopButton.classList.add('opacity-0');
    scrollToTopButton.classList.remove('visible'); // Hide the button
    scrollToTopButton.classList.add('hidden');
  }
});

document.getElementById('scrollToTop').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
