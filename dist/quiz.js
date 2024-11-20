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
const closePopupQnButtons = document.querySelectorAll('#closePopupQn');
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
const fetchAndLoadQuiz = async (quizUrl, directions, showAnswers, useCustomAnswers = false, customAnswers = [], isExplanatory = false, explanatorySentences = []) => {
    overlay.classList.add('active1');
    popupQn.classList.add('active1');

    resetSubmitButton();

    try {
        const response = await fetch(quizUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        directionsContainer.innerHTML = '';
        answersContainer.innerHTML = '';
        questionsContainer.innerHTML = '';

        const [heading1, heading2] = directions.split('\n');

        const directionsHeading1 = document.createElement('h2');
        directionsHeading1.textContent = heading1;
        directionsHeading1.classList.add('text-xl', 'font-bold', 'mb-2');
        directionsContainer.appendChild(directionsHeading1);

        const directionsHeading2 = document.createElement('h3');
        directionsHeading2.textContent = heading2;
        directionsHeading2.classList.add('text-lg', 'font-medium');
        directionsContainer.appendChild(directionsHeading2);

        if (showAnswers) {
            if (useCustomAnswers) {
                customAnswers.forEach(answer => {
                    const answerDiv = document.createElement('div');
                    answerDiv.classList.add('px-2', 'text-teal-custom');
                    answerDiv.textContent = answer;
                    answersContainer.appendChild(answerDiv);
                });
            } else {
                const fillupAnswers = new Set();
                data.questions.forEach(question => {
                    const qdata = JSON.parse(question.qdata)[0];
                    if (qdata.type === 'fillup') {
                        fillupAnswers.add(qdata.answer);
                    }
                });
                const uniqueAnswersArray = Array.from(fillupAnswers).sort(() => Math.random() - 0.5);
                uniqueAnswersArray.forEach(answer => {
                    const answerDiv = document.createElement('div');
                    answerDiv.classList.add('px-2', 'text-teal-custom');
                    answerDiv.textContent = answer;
                    answersContainer.appendChild(answerDiv);
                });
            }
        }

        const correctAnswers = [];
        const totalQuestions = data.questions.length;

        data.questions.forEach((question, index) => {
            const qdata = JSON.parse(question.qdata)[0];
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('mb-4', 'mcq-question');

            if (qdata.type === 'mcq') {
                questionDiv.dataset.correctAnswer = qdata.answer.toLowerCase().trim();
                questionDiv.innerHTML = `
                <div class="flex space-x-2">
                    <div class="font-bold">${index + 1}.</div>
                    <div>${qdata.question}</div>
                </div>`;
                correctAnswers.push(qdata.answer.toLowerCase().trim());

                const options = ['a', 'b', 'c', 'd'];
                options.forEach(option => {
                    if (qdata[option]) {
                        questionDiv.innerHTML += `
                            <label><input type="radio" name="mcq${index}" value="${option}"> ${qdata[option]}</label><br>`;
                    }
                });
            } else if (qdata.type === 'fillup') {
                const correctAnswer = qdata.answer ? qdata.answer.toLowerCase().trim() : '';

                if (isExplanatory) {
                    const explanatorySentence = explanatorySentences[index] || '';
                    questionDiv.innerHTML = `
                        <div class="flex space-x-2">
                            <div class="font-bold">${index + 1}.</div>
                            <div class="text-teal-700 font-semibold">${explanatorySentence}</div>
                        </div>
                        <div class="flex space-x-2">
                            <div class="font-bold"></div>
                            <div>${qdata.question.replace(/_+/g, () => {
                                return `<input type="text" class="border-b border-gray-500 outline-none inline-input w-100" data-correct-answer="${correctAnswer}" />`;
                            })}</div>
                        </div>`;
                } else {
                    questionDiv.innerHTML = `
                        <div class="flex space-x-2">
                            <div class="font-bold">${index + 1}.</div>
                            <div>${qdata.question.replace(/_+/g, () => {
                                return `<input type="text" class="border-b border-gray-500 outline-none inline-input w-100" data-correct-answer="${correctAnswer}" />`;
                            })}</div>
                        </div>`;
                }
            }

            questionsContainer.appendChild(questionDiv);
        });

        document.getElementById('submitQuiz').addEventListener('click', () => {
            handleSubmission(correctAnswers, totalQuestions);
        });

    } catch (error) {
        console.error('Error fetching quiz data:', error);
        alert('There was an error loading the quiz. Please try again later.');
    }
};


const resetExampleContainer = () => {
    const exampleContainer = document.getElementById('exampleContainer');
    exampleContainer.className = ''; // Remove all classes
    exampleContainer.innerHTML = ''; // Clear the content
    exampleContainer.style.display = 'none'; // Hide the container
};

document.querySelectorAll('.popup-button').forEach(button => {
    button.addEventListener('click', () => {
        if (button !== openPopupQnButton3 && button !== openPopupQnButton10) {
            resetExampleContainer(); 
        }
    });
});

// Close popupQn when clicking outside (on the overlay)
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        closePopupQn();
    }
});

closePopupQnButtons.forEach(button => {
    button.addEventListener('click', closePopupQn);
});

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

function handleSubmission(correctAnswers, totalQuestions) {
    let correctCount = 0;

    // Evaluate MCQ questions
    correctCount += handleMCQ(correctAnswers);

    // Evaluate Fillup questions
    correctCount += handleFillup();

    // Display score
    const scorePercentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

    document.getElementById('scoreDisplay').innerHTML = `<p class="font-bold">Score: ${scorePercentage.toFixed(2)}%</p>`;

    submitButton.textContent = 'Retry Test';
    submitButton.classList.remove('bg-green-500');
    submitButton.classList.add('bg-red-500');

    submitButton.removeEventListener('click', handleSubmission);
    submitButton.addEventListener('click', handleRetest);
}

// Method to handle MCQ questions
function handleMCQ(correctAnswers) {
    const mcqQuestions = document.querySelectorAll('.mcq-question');
    let correctCount = 0;

    mcqQuestions.forEach((mcqQuestion, index) => {
        const correctAnswer = correctAnswers[index];
        const selectedOption = mcqQuestion.querySelector('input[type="radio"]:checked');
        const statusIcon = document.createElement('span');

        // Remove existing status icon if present
        if (mcqQuestion.querySelector('.status-icon')) {
            mcqQuestion.querySelector('.status-icon').remove();
        }

        if (selectedOption) {
            const userAnswerText = selectedOption.value.toLowerCase().trim();

            if (userAnswerText === correctAnswer) {
                statusIcon.innerHTML = ' <span class="status-icon text-green-500">✔️</span>';
                correctCount++;
            } else {
                statusIcon.innerHTML = ' <span class="status-icon text-red-500">❌</span>';
            }

            selectedOption.parentElement.appendChild(statusIcon);
        } else {
            console.log(`No option selected for MCQ question index ${index}`);
        }
    });

    return correctCount;
}

// Method to handle Fillup questions
function handleFillup() {
    const fillupInputs = document.querySelectorAll('input[data-correct-answer]');
    let correctCount = 0;

    fillupInputs.forEach((inputElement, index) => {
        const correctAnswer = inputElement.dataset.correctAnswer.toLowerCase().trim();
        const userAnswer = inputElement.value.toLowerCase().trim();
        const statusIcon = document.createElement('span');

        // Remove existing status icon if present
        const parentElement = inputElement.parentElement;
        const existingIcon = parentElement.querySelector('.status-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        // Compare user answer with the correct answer
        if (userAnswer === correctAnswer) {
            statusIcon.innerHTML = '<span class="status-icon text-green-500">✔️</span>';
            correctCount++;
        } else {
            statusIcon.innerHTML = '<span class="status-icon text-red-500">❌</span>';
        }

        // Append the status icon next to the input field
        parentElement.appendChild(statusIcon);
    });

    return correctCount;
}

function handleRetest() {
    const fillupInputs = document.querySelectorAll('.inline-input');
    fillupInputs.forEach(input => {
        input.value = ''; 
        input.disabled = false; 

        // Remove the status icon if present
        const statusIcon = input.parentElement.querySelector('.status-icon');
        if (statusIcon) {
            statusIcon.remove();
        }
    });

    const allRadioInputs = document.querySelectorAll('input[type="radio"]');
    allRadioInputs.forEach(mcqInput => {
        mcqInput.checked = false; 
        mcqInput.disabled = false;

        // Remove the status icon if present
        const statusIcon = mcqInput.parentElement.querySelector('.status-icon');
        if (statusIcon) {
            statusIcon.remove();
        }
    });

    // Clear the score display
    document.getElementById('scoreDisplay').innerHTML = '';

    // Reset the submit button text and styles
    submitButton.textContent = 'Submit';
    submitButton.classList.remove('bg-red-500');
    submitButton.classList.add('bg-green-500');

    // Re-add the click event listener to handle submission
    submitButton.removeEventListener('click', handleRetest);
    submitButton.addEventListener('click', () => handleSubmission(correctAnswers, totalQuestions));
}