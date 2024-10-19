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
                questionDiv.innerHTML = `
                <div class="flex space-x-2">
                    <div class="font-bold">${index + 1}.</div>
                    <div>${qdata.question}</div>
                </div>
                    <div>
                        <label><input type="radio" name="mcq${question.qno}" value="a"> ${qdata.a}</label><br>
                        <label><input type="radio" name="mcq${question.qno}" value="b"> ${qdata.b}</label><br>
                        <label><input type="radio" name="mcq${question.qno}" value="c"> ${qdata.c}</label><br>
                        <label><input type="radio" name="mcq${question.qno}" value="d"> ${qdata.d}</label><br>
                    </div>`;
            } else if (qdata.type === 'fillup') {
                const correctAnswer = qdata.answer ? qdata.answer.toLowerCase().trim() : '';
                questionDiv.innerHTML = `<div class="flex space-x-2"><div class="font-bold">${index + 1}.</div><div> ${qdata.question.replace(/_+/g, () => {
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
    const quiz1Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw85b75/vcgtw85b75_questionbank.json';
    const quiz1Directions = 'Instructions\nIn this selection you must choose the word or phrase which best completes each sentence.';
    fetchAndLoadQuiz(quiz1Url, quiz1Directions);
});

openPopupQnButton2.addEventListener('click', () => {
    const quiz2Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwfd632/vcgtwfd632_questionbank.json';
    const quiz2Directions = 'Instructions\nRead the text below and choose ONE word that best fits the context. An example has been done for you.';
    fetchAndLoadQuiz(quiz2Url, quiz2Directions);
});

openPopupQnButton3.addEventListener('click', () => {
    const quiz3Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw70a65/vcgtw70a65_questionbank.json';
    const quiz3Directions = 'Time Management\nFor the 10 questions that follow, choose the right form of the word in bold. An example has been done for you.';
    fetchAndLoadQuiz(quiz3Url, quiz3Directions);
});

openPopupQnButton4.addEventListener('click', () => {
    const quiz4Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwa0fe5/vcgtwa0fe5_questionbank.json';
    const quiz4Directions = 'Instructions\nUsing the word after the colon, complete the second sentence so that it has a similar meaning to the first sentence.';
    fetchAndLoadQuiz(quiz4Url, quiz4Directions);
});

openPopupQnButton5.addEventListener('click', () => {
    const quiz5Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwcd98e/vcgtwcd98e_questionbank.json';
    const quiz5Directions = 'Excuse and Verbs\nUse the correct form of these verbs in the sentences below:';
    fetchAndLoadQuiz(quiz5Url, quiz5Directions);
});


// openPopupQnButton6.addEventListener('click', () => {
//     const quiz6Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwae527/vcgtwae527_questionbank.json';
//     const quiz6Directions = 'To or For?\nI am coming to you? OR I am coming for you?';
//     fetchAndLoadQuiz(quiz6Url, quiz6Directions);
// });

openPopupQnButton7.addEventListener('click', () => {
    const quiz7Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw3df52/vcgtw3df52_questionbank.json';
    const quiz7Directions = 'Instructions\nRewrite the sentences, using MAY, COULD, OUGHT TO or SHOULD (including the word not, where appropriate). The meaning should remain the same.';
    fetchAndLoadQuiz(quiz7Url, quiz7Directions);
});

openPopupQnButton8.addEventListener('click', () => {
    const quiz8Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw0c733/vcgtw0c733_questionbank.json';
    const quiz8Directions = 'Words formed with AL_ _, CA_ _, CH_ _\nI know that I am intelligent, because I know that I know nothing. -Socrates';
    fetchAndLoadQuiz(quiz8Url, quiz8Directions);
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