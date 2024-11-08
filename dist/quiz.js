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
const fetchAndLoadQuiz = async (quizUrl, directions, showAnswers, useCustomAnswers = false) => {
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

        // Only show answers if showAnswers is true
        if (showAnswers) {
            if (useCustomAnswers) {
                // Use custom answers for popup10
                const customAnswers = ['agree', 'find out', 'know', 'look', 'teach', 'think'];
                customAnswers.forEach(answer => {
                    const answerDiv = document.createElement('div');
                    answerDiv.classList.add('p-2', 'text-green-500', 'm-auto');
                    answerDiv.textContent = answer;
                    answersContainer.appendChild(answerDiv);
                });
            } else {
                // Default behavior for other popups
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
                    answerDiv.classList.add('p-2', 'text-green-500', 'm-auto');
                    answerDiv.textContent = answer;
                    answersContainer.appendChild(answerDiv);
                });
            }
        }

        // Collect correct answers and total question count
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

                // Collect correct answer for MCQ
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
                questionDiv.innerHTML = `<div class="flex space-x-2"><div class="font-bold">${index + 1}.</div><div> ${qdata.question.replace(/_+/g, () => {
                    return `<input type="text" class="border-b border-gray-500 outline-none inline-input w-100" data-correct-answer="${correctAnswer}" />`;
                })}</div></div>`;
            }

            questionsContainer.appendChild(questionDiv);
        });

        // Pass correct answers and total count to handleSubmission
        document.getElementById('submitQuiz').addEventListener('click', () => {
            handleSubmission(correctAnswers, totalQuestions);
        });

    } catch (error) {
        console.error('Error fetching quiz data:', error);
        alert('There was an error loading the quiz. Please try again later.');
    }
};

// Open popupQn listeners
openPopupQnButton1.addEventListener('click', () => {
    const quiz1Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2ac25b/pict5k2ac25b_questionbank.json';
    const quiz1Directions = 'Choose the Right Word\n Fill in the blanks with the following words';
    fetchAndLoadQuiz(quiz1Url, quiz1Directions, true);
});

openPopupQnButton2.addEventListener('click', () => {
    const quiz2Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k241314/pict5k241314_questionbank.json';
    const quiz2Directions = 'Section I\nRead each sentence carefully and decide which of the following categories it falls under.';
    fetchAndLoadQuiz(quiz2Url, quiz2Directions, true);
});

openPopupQnButton3.addEventListener('click', () => {
    const quiz3Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k281fd6/pict5k281fd6_questionbank.json';
    const quiz3Directions = 'Spot The Error\nIn each of the sentences, one verb is wrong. Identify the incorrect verb and write in the correct one in the space provided.';
    
    // Fetch and load the quiz
    fetchAndLoadQuiz(quiz3Url, quiz3Directions, false);

    const exampleContainer = document.getElementById('exampleContainer');
    exampleContainer.classList.add('bg-gray-50', 'border', 'border-gray-400', 'rounded', 'p-4', 'm-4', 'mx-6');
    exampleContainer.innerHTML = `
        <h3 class="font-semibold text-gray-600">Example</h3>
        <p class="leading-loose text-sm">
            Can you make me one reason why you shouldn't be punished? 
            <span class="p-2 pb-1 mx-2 text-start pe-8 border-b border-black bg-white">Give</span>
        </p>
    `;
});

openPopupQnButton4.addEventListener('click', () => {
    const quiz4Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k218d5a/pict5k218d5a_questionbank.json';
    const quiz4Directions = 'Choose the Right Word\nSelect the right answer choice.';
    fetchAndLoadQuiz(quiz4Url, quiz4Directions, false);
});

openPopupQnButton5.addEventListener('click', () => {
    const quiz5Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2db2b9/pict5k2db2b9_questionbank.json';
    const quiz5Directions = 'Word Forms\nUse the right form of the word in the brackets.';
    fetchAndLoadQuiz(quiz5Url, quiz5Directions, false);
});

openPopupQnButton6.addEventListener('click', () => {
    const quiz6Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2e4cd0/pict5k2e4cd0_questionbank.json';
    const quiz6Directions = 'Singular or Plural?\nChoose the right answer.';
    fetchAndLoadQuiz(quiz6Url, quiz6Directions, false);
});

openPopupQnButton7.addEventListener('click', () => {
    const quiz7Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k292bd7/pict5k292bd7_questionbank.json';
    const quiz7Directions = 'Tricky Tenses\nWhile most choices may seem correct, there is only ONE correct choice. Look at the context and pick the right answer!';
    fetchAndLoadQuiz(quiz7Url, quiz7Directions, false);
});

openPopupQnButton8.addEventListener('click', () => {
    const quiz8Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2f3372/pict5k2f3372_questionbank.json';
    const quiz8Directions = 'But what?\nFill in the blanks with BUT, AND, OR, or OR NOT.';
    fetchAndLoadQuiz(quiz8Url, quiz8Directions, false);
});

openPopupQnButton9.addEventListener('click', () => {
    const quiz9Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2825ac/pict5k2825ac_questionbank.json';
    const quiz9Directions = 'Where are you?\nChoose the right answer.';
    fetchAndLoadQuiz(quiz9Url, quiz9Directions, false);
});

openPopupQnButton10.addEventListener('click', () => {
    const quiz10Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k205b27/pict5k205b27_questionbank.json';
    const quiz10Directions = 'Add the Right Preposition\nUse the right preposition with the following verbs. An example has been done for you. It adds the preposition in this matter: Look+After';

    // Pass an additional parameter to indicate this is for popup10
    fetchAndLoadQuiz(quiz10Url, quiz10Directions, true, true);
    
    // Set up the example content
    const exampleContainer = document.getElementById('exampleContainer');
    exampleContainer.classList.add('bg-gray-50', 'border', 'border-gray-400', 'rounded', 'p-4', 'm-4', 'mx-6');
    exampleContainer.innerHTML = `
        <h3 class="font-semibold text-gray-600">Example</h3>
        <p class="leading-loose text-sm">
            Our parents not only <span class="p-2 pb-1 mx-2 text-start pe-8 border-b border-black bg-white"> look after </span> us but also love us unconditionally.
        </p>
    `;
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