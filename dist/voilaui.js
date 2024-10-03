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

function closeOtherDropdowns(currentDropdownId) {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdown) => {
        if (dropdown.id !== currentDropdownId) {
            dropdown.classList.add('hidden');
        }
    });
}

document.getElementById('dropdownToggle').addEventListener('click', function () {
    var dropdownMenu = document.getElementById('dropdownMenu');
    closeOtherDropdowns('dropdownMenu');
    dropdownMenu.classList.toggle('hidden');
});

document.getElementById('dropdownToggle1').addEventListener('click', function () {
    var dropdownMenu1 = document.getElementById('dropdownMenu1');
    closeOtherDropdowns('dropdownMenu1');
    dropdownMenu1.classList.toggle('hidden');
});

document.getElementById('dropdownToggle2').addEventListener('click', function () {
    var dropdownMenu2 = document.getElementById('dropdownMenu2');
    closeOtherDropdowns('dropdownMenu2');
    dropdownMenu2.classList.toggle('hidden');
});

// Close the dropdowns when clicking outside of them
document.addEventListener('click', function (event) {
    var dropdownMenu = document.getElementById('dropdownMenu');
    var dropdownToggle = document.getElementById('dropdownToggle');

    if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
    }

    var dropdownMenu1 = document.getElementById('dropdownMenu1');
    var dropdownToggle1 = document.getElementById('dropdownToggle1');

    if (!dropdownToggle1.contains(event.target) && !dropdownMenu1.contains(event.target)) {
        dropdownMenu1.classList.add('hidden');
    }

    var dropdownMenu2 = document.getElementById('dropdownMenu2');
    var dropdownToggle2 = document.getElementById('dropdownToggle2');

    if (!dropdownToggle2.contains(event.target) && !dropdownMenu2.contains(event.target)) {
        dropdownMenu2.classList.add('hidden');
    }
});

// appear on hover
function showDropdown(id) {
    document.getElementById(id).classList.remove("hidden");
}

function hideDropdown(id) {
    document.getElementById(id).classList.add("hidden");
}
function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    if (dropdown.classList.contains("hidden")) {
        showDropdown(id);
    } else {
        hideDropdown(id);
    }
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


// quick tests
const openPopupQnButton1 = document.getElementById('openPopupQn1');
const openPopupQnButton2 = document.getElementById('openPopupQn2');
const openPopupQnButton3 = document.getElementById('openPopupQn3');
const openPopupQnButton4 = document.getElementById('openPopupQn4');
const openPopupQnButton5 = document.getElementById('openPopupQn5');
const openPopupQnButton6 = document.getElementById('openPopupQn6');
const openPopupQnButton7 = document.getElementById('openPopupQn7');
const openPopupQnButton8 = document.getElementById('openPopupQn8');
const openPopupQnButton9 = document.getElementById('openPopupQn9');
const openPopupQnButton10 = document.getElementById('openPopupQn10');
/*const openPopupQnButton11 = document.getElementById('openPopupQn11');
const openPopupQnButton12 = document.getElementById('openPopupQn12');*/
const closePopupQnButton = document.getElementById('closePopupQn');
const overlay = document.getElementById('overlay');
const popupQn = document.getElementById('popupQn');
const answersContainer = document.getElementById('answersContainer');
const questionsContainer = document.getElementById('questionsContainer');
let data; 

// Reset submit button to its initial state
const resetSubmitButton = () => {
    submitButton.removeEventListener('click', handleSubmission);
    submitButton.removeEventListener('click', handleRetest);
    submitButton.textContent = 'Submit';
    submitButton.disabled = false; // Ensure it's enabled
    submitButton.addEventListener('click', handleSubmission); // Reattach the original submission event
};

// Fetch and load quiz
const fetchAndLoadQuiz = async (quizUrl) => {
    overlay.classList.add('active1');
    popupQn.classList.add('active1');
1
    // Reset the submit button listeners before loading the new quiz
    resetSubmitButton();

    try {
        const response = await fetch(quizUrl);
        data = await response.json();

        answersContainer.innerHTML = '';
        questionsContainer.innerHTML = '';

        const fillupAnswers = new Set();
        data.questions.forEach(question => {
            const qdata = JSON.parse(question.qdata)[0];
            if (qdata.type === 'fillup') {
                fillupAnswers.add(qdata.answer);
            }
        });

        const uniqueAnswersArray = Array.from(fillupAnswers);
        uniqueAnswersArray.sort(() => Math.random() - 0.5);
        uniqueAnswersArray.forEach(answer => {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('p-2', 'font-bold', 'text-green-500', 'm-auto');
            answerDiv.textContent = answer;
            answersContainer.appendChild(answerDiv);
        });

        data.questions.forEach(question => {
            const qdata = JSON.parse(question.qdata)[0];
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('mb-4');

            if (qdata.type === 'mcq') {
                questionDiv.innerHTML = `<p class="font-bold">${qdata.question}</p>
                    <div>
                        <label><input type="radio" name="mcq${question.qno}" value="a"> ${qdata.a}</label><br>
                        <label><input type="radio" name="mcq${question.qno}" value="b"> ${qdata.b}</label><br>
                        <label><input type="radio" name="mcq${question.qno}" value="c"> ${qdata.c}</label><br>
                        <label><input type="radio" name="mcq${question.qno}" value="d"> ${qdata.d}</label><br>
                    </div>`;
            } else if (qdata.type === 'fillup') {
                const correctAnswer = qdata.answer ? qdata.answer.toLowerCase().trim() : '';
                questionDiv.innerHTML = `<p class="font-bold">${qdata.question.replace(/_+/g, () => {
                    return `<input type="text" class="inline-input border-b outline-none border-gray-500 w-100" data-correct-answer="${correctAnswer}" />`;
                })}</p>`;
            }

            questionsContainer.appendChild(questionDiv);
        });
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        alert('There was an error loading the quiz. Please try again later.');
    }
};

// Open popupQn listeners
openPopupQnButton1.addEventListener('click', () => {
    const quiz1Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2ac25b/pict5k2ac25b_questionbank.json';
    fetchAndLoadQuiz(quiz1Url);
});

openPopupQnButton2.addEventListener('click', () => {
    const quiz2Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k241314/pict5k241314_questionbank.json';
    fetchAndLoadQuiz(quiz2Url);
});

openPopupQnButton3.addEventListener('click', () => {
    const quiz3Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k281fd6/pict5k281fd6_questionbank.json';
    fetchAndLoadQuiz(quiz3Url);
});

openPopupQnButton4.addEventListener('click', () => {
const quiz4Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k218d5a/pict5k218d5a_questionbank.json';
fetchAndLoadQuiz(quiz4Url);
});

openPopupQnButton5.addEventListener('click', () => {
const quiz5Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2db2b9/pict5k2db2b9_questionbank.json';
fetchAndLoadQuiz(quiz5Url);
});


openPopupQnButton6.addEventListener('click', () => {
const quiz6Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2e4cd0/pict5k2e4cd0_questionbank.json';
fetchAndLoadQuiz(quiz6Url);
});

openPopupQnButton7.addEventListener('click', () => {
    const quiz7Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k292bd7/pict5k292bd7_questionbank.json';
    fetchAndLoadQuiz(quiz7Url);
});

openPopupQnButton8.addEventListener('click', () => {
const quiz8Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2f3372/pict5k2f3372_questionbank.json';
fetchAndLoadQuiz(quiz8Url);
});

openPopupQnButton9.addEventListener('click', () => {
    const quiz9Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2825ac/pict5k2825ac_questionbank.json';
    fetchAndLoadQuiz(quiz9Url);
});

openPopupQnButton10.addEventListener('click', () => {
    const quiz10Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k205b27/pict5k205b27_questionbank.json';
    fetchAndLoadQuiz(quiz10Url);
});


// Close popupQn when clicking outside (on the overlay)
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        closePopupQn();
    }
});

// Close popupQn functionality (reuse existing close logic)
closePopupQnButton.addEventListener('click', closePopupQn);

function closePopupQn() {
    overlay.classList.remove('active1');
    popupQn.classList.remove('active1');
    answersContainer.innerHTML = '';
    questionsContainer.innerHTML = '';

    submitButton.textContent = 'Submit';
    submitButton.classList.remove('bg-red-500');
    submitButton.classList.add('bg-green-500');

    // Reset styles and inputs (same as Retry Test functionality)
    const fillupInputs = document.querySelectorAll('.inline-input');
    const mcqInputs = document.querySelectorAll('input[type="radio"]');
    fillupInputs.forEach(input => {
        input.value = '';
        input.disabled = false; // Enable for next quiz
        if (input.nextElementSibling) input.nextElementSibling.remove(); // Remove tick/cross icons
    });

    mcqInputs.forEach(mcqInput => {
        mcqInput.checked = false;
        mcqInput.disabled = false; // Re-enable radio buttons
        mcqInput.parentElement.classList.remove('bg-green-100', 'bg-red-100');
    });

    document.getElementById('scoreDisplay').innerHTML = ''; // Clear score
    resetSubmitButton(); // Reset submit button to "Submit Quiz"
}


// Submit and Retest functionality
const submitButton = document.getElementById('submitQuiz');

submitButton.addEventListener('click', handleSubmission);

function handleSubmission() {
    const fillupInputs = document.querySelectorAll('.inline-input');
    const mcqInputs = document.querySelectorAll('input[type="radio"]:checked');
    let correctCount = 0;
    let totalCount = 0; // To count total questions attempted

    // Calculate score for fill-up questions
    fillupInputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-correct-answer');
        const userAnswer = input.value.toLowerCase().trim();
        const statusIcon = document.createElement('span');

        // Check if there's already an icon, and remove it
        if (input.nextElementSibling) {
            input.nextElementSibling.remove();
        }

        if (userAnswer === correctAnswer) {
            statusIcon.innerHTML = ' <span class="text-green-500">✔️</span>';
            correctCount++;
        } else {
            statusIcon.innerHTML = ' <span class="text-red-500">❌</span>';
        }

        // Disable the input after submission to prevent further edits
        input.disabled = true;

        // Insert the icon right after the input field, preserving surrounding content
        input.parentNode.insertBefore(statusIcon, input.nextSibling);
    });

    // Calculate score for MCQ questions
    mcqInputs.forEach(mcqInput => {
        const questionIndex = mcqInput.name.replace('mcq', '') - 1;
        const qdata = JSON.parse(data.questions[questionIndex].qdata)[0];
        
        const correctAnswer = qdata.answer.toLowerCase().trim(); // The correct answer text
        const statusIcon = document.createElement('span');

        if (mcqInput.checked) {
            const userAnswerText = mcqInput.value; // This retrieves the value directly
            console.log(`User Answer: ${userAnswerText}, Correct Answer: ${correctAnswer}`); // Debugging line

            // Validation
            if (userAnswerText === correctAnswer) {
                statusIcon.textContent = '✔️'; // Correct answer
                correctCount++;
            } else {
                statusIcon.textContent = '❌'; // Incorrect answer
            }
        }

        // Increment totalCount for every attempted question
        totalCount++;

        mcqInput.parentElement.appendChild(statusIcon);
    });

    // Display score
    const totalQuestions = fillupInputs.length + mcqInputs.length; // Total questions = fillups + mcqs
    const scorePercentage = (correctCount / totalQuestions) * 100;
    document.getElementById('scoreDisplay').innerHTML = `<p class="font-bold">Score: ${scorePercentage.toFixed(2)}%</p>`;

    // Change button to "Retry Test"
    submitButton.textContent = 'Retry Test';
    submitButton.classList.remove('bg-green-500');
    submitButton.classList.add('bg-red-500');

    // Switch to retest mode
    submitButton.removeEventListener('click', handleSubmission);
    submitButton.addEventListener('click', handleRetest);
}

function handleRetest() {
    const fillupInputs = document.querySelectorAll('.inline-input');
    const allRadioInputs = document.querySelectorAll('input[type="radio"]');

    fillupInputs.forEach(input => {
        input.value = '';
        input.disabled = false; // Enable fill-up input for retest
        if (input.nextSibling) input.parentNode.removeChild(input.nextSibling);
    });

    allRadioInputs.forEach(mcqInput => {
        mcqInput.checked = false;
        mcqInput.disabled = false; // Enable MCQ radio buttons for retest
        if (mcqInput.parentElement.querySelector('span')) {
            mcqInput.parentElement.querySelector('span').remove();
        }
    });

    document.getElementById('scoreDisplay').innerHTML = '';

    submitButton.textContent = 'Submit';
    submitButton.classList.remove('bg-red-500');
    submitButton.classList.add('bg-green-500');

    submitButton.removeEventListener('click', handleRetest);
    submitButton.addEventListener('click', handleSubmission);
}