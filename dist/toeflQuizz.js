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
// Function to fetch and load the quiz
const fetchAndLoadQuiz = async (quizUrl, directions) => {
    overlay.classList.add('active1');
    popupQn.classList.add('active1');

    // Reset the submit button listeners before loading the new quiz
    resetSubmitButton();

    try {
        const response = await fetch(quizUrl);
        data = await response.json();

        directionsContainer.innerHTML = '';
        answersContainer.innerHTML = '';
        questionsContainer.innerHTML = '';

        // Split the directions into two parts (heading1 and heading2)
        const [heading1, heading2] = directions.split('\n');

        // Add custom directions to the container with two headings
        const directionsHeading1 = document.createElement('h2');
        directionsHeading1.textContent = heading1;
        directionsHeading1.classList.add('text-xl', 'font-bold', 'mb-2');
        directionsContainer.appendChild(directionsHeading1);

        const directionsHeading2 = document.createElement('h3');
        directionsHeading2.textContent = heading2;
        directionsHeading2.classList.add('text-lg', 'font-semibold');
        directionsContainer.appendChild(directionsHeading2);

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

        data.questions.forEach((question, index) => {
            const qdata = JSON.parse(question.qdata)[0];
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('mb-4');
        
            if (qdata.type === 'mcq') {
                const options = [];
                if (qdata.a) options.push({ label: qdata.a, value: 'a' });
                if (qdata.b) options.push({ label: qdata.b, value: 'b' });
                if (qdata.c) options.push({ label: qdata.c, value: 'c' });
                if (qdata.d) options.push({ label: qdata.d, value: 'd' });
        
                // Create the question content with number and text in a single line
                const questionContent = document.createElement('div');
                questionContent.classList.add('flex', 'items-center', 'space-x-2');
                questionContent.innerHTML = `<div class="font-bold">${index + 1}.</div><div>${qdata.question}</div>`;
                questionDiv.appendChild(questionContent);
        
                // Create the options container to place options on a new line
                const optionsContainer = document.createElement('div');
                optionsContainer.classList.add('ml-6', 'mt-2'); // Adds some left margin and top margin for spacing
        
                options.forEach(option => {
                    const label = document.createElement('label');
                    label.classList.add('block', 'text-left', 'space-x-2'); // Each option on a new line
                    label.innerHTML = `<input type="radio" name="mcq${question.qno}" value="${option.value}" class="mr-2"> ${option.label}`;
                    optionsContainer.appendChild(label);
                });
        
                questionDiv.appendChild(optionsContainer);
            } else if (qdata.type === 'fillup') {
                const correctAnswer = qdata.answer ? qdata.answer.toLowerCase().trim() : '';
                questionDiv.innerHTML = `<div class="flex space-x-2"><div class="font-bold">${index + 1}.</div><div class="font-semibold"> ${qdata.question.replace(/_+/g, () => {
                    return `<input type="text" class="border-b border-gray-500 outline-none inline-input w-100" data-correct-answer="${correctAnswer}" />`;
                })}</div></div>`;
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
    const quiz1Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwdd029/vcgtwdd029_questionbank.json';
    const quiz1Directions = 'Section I\nUse the right Verbs';
    fetchAndLoadQuiz(quiz1Url, quiz1Directions);
});

openPopupQnButton2.addEventListener('click', () => {
    const quiz2Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw75d57/vcgtw75d57_questionbank.json';
    const quiz2Directions = 'Section I\nFill in the blanks in the sentences below using the correct form of the words in the box.';
    fetchAndLoadQuiz(quiz2Url, quiz2Directions);
});


openPopupQnButton3.addEventListener('click', () => {
    const quiz3Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw1bd73/vcgtw1bd73_questionbank.json';
    const quiz3Directions = 'Section I\nChoose the right word';
    fetchAndLoadQuiz(quiz3Url, quiz3Directions);
});

openPopupQnButton4.addEventListener('click', () => {
    const quiz4Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw73a50/vcgtw73a50_questionbank.json';
    const quiz4Directions = 'Section I\nFill in the blanks with a suitable Verb.';
    fetchAndLoadQuiz(quiz4Url, quiz4Directions);
});

openPopupQnButton5.addEventListener('click', () => {
    const quiz5Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw15beb/vcgtw15beb_questionbank.json';
    const quiz5Directions = 'Section I\nFill in the blanks with a suitable noun.';
    fetchAndLoadQuiz(quiz5Url, quiz5Directions);
});


openPopupQnButton6.addEventListener('click', () => {
    const quiz6Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwae527/vcgtwae527_questionbank.json';
    const quiz6Directions = 'Section I\nComplete the sentences below with the correct form of one of the verbs in the box.';
    fetchAndLoadQuiz(quiz6Url, quiz6Directions);
});

openPopupQnButton7.addEventListener('click', () => {
    const quiz7Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwf8a6f/vcgtwf8a6f_questionbank.json';
    const quiz7Directions = 'Section I\nSubject Verb agreement';
    fetchAndLoadQuiz(quiz7Url, quiz7Directions);
});

openPopupQnButton8.addEventListener('click', () => {
    const quiz8Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwd8737/vcgtwd8737_questionbank.json';
    const quiz8Directions = 'Section I\nChange the word from its Noun form to Verb form.';
    fetchAndLoadQuiz(quiz8Url, quiz8Directions);
});

// openPopupQnButton9.addEventListener('click', () => {
//     const quiz9Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwaa201/vcgtwaa201_questionbank.json';
//     const quiz9Directions = 'Section I\nCorrect the verbs and/or helping verbs without changing the tense.';
//     fetchAndLoadQuiz(quiz9Url, quiz9Directions);
// });

openPopupQnButton10.addEventListener('click', () => {
    const quiz10Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwe075b/vcgtwe075b_questionbank.json';
    const quiz10Directions = 'Section I\nChoose the correct phrasal verb.';
    fetchAndLoadQuiz(quiz10Url, quiz10Directions);
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









// Reference the close button
const closeQuizButton = document.getElementById('closeQuizButton');

// Attach event listener for the close button
closeQuizButton.addEventListener('click', closePopupQn);
