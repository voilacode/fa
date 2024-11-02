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
const closeQuizButton = document.getElementById('closeQuizButton');
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
        directionsHeading2.classList.add('text-lg', 'font-medium');
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
            answerDiv.classList.add('p-2', 'text-green-500', 'm-auto');
            answerDiv.textContent = answer;
            answersContainer.appendChild(answerDiv);
        });
    
        const totalQuestions = data.questions.length; // Total number of questions
    
        data.questions.forEach((question, index) => {
            const qdata = JSON.parse(question.qdata)[0];
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('mb-4');
        
            if (qdata.type === 'mcq') {
                let mcqHtml = `
                    <div class="flex space-x-2 items-start font-medium">
                        <div>${index + 1}.</div>
                        <div>${qdata.question}</div>
                    </div>
                    <div>`;
                
                // Generate a unique name for each question
                const questionName = `mcq${index}`; // Using index to ensure uniqueness
        
                // Render each option with the unique name attribute
                if (qdata.a) mcqHtml += `<label><input type="radio" name="${questionName}" value="a"> ${qdata.a}</label><br>`;
                if (qdata.b) mcqHtml += `<label><input type="radio" name="${questionName}" value="b"> ${qdata.b}</label><br>`;
                if (qdata.c) mcqHtml += `<label><input type="radio" name="${questionName}" value="c"> ${qdata.c}</label><br>`;
                if (qdata.d) mcqHtml += `<label><input type="radio" name="${questionName}" value="d"> ${qdata.d}</label><br>`;
        
                mcqHtml += `</div>`;
                questionDiv.innerHTML = mcqHtml;
        
            } else if (qdata.type === 'fillup') {
                const correctAnswer = qdata.answer ? qdata.answer.toLowerCase().trim() : '';
                questionDiv.innerHTML = `<div class="flex space-x-2">
                    <div class="font-bold">${index + 1}.</div>
                    <div>${qdata.question.replace(/_+/g, () => {
                        return `<input type="text" class="border-b border-gray-500 outline-none inline-input w-100" data-correct-answer="${correctAnswer}" />`;
                    })}</div>
                </div>`;
            }
        
            questionsContainer.appendChild(questionDiv);
        });
        
        // Submit button listener for score calculation
        document.getElementById('submitQuiz').addEventListener('click', () => {
            correctCount = 0; // Reset correct count before calculation
        
            data.questions.forEach((question, index) => {
                const qdata = JSON.parse(question.qdata)[0];
                const questionDiv = questionsContainer.children[index]; // Find the question container div
        
                if (qdata.type === 'mcq') {
                    const selectedOption = document.querySelector(`input[name="mcq${index}"]:checked`);
                    const correctOption = qdata.answer;
                    const statusIcon = document.createElement('span'); // Create an icon element for feedback
        
                    // Remove any existing icon from previous submissions
                    const existingIcon = questionDiv.querySelector('.status-icon');
                    if (existingIcon) {
                        existingIcon.remove();
                    }
        
                    if (selectedOption) {
                        if (selectedOption.value === correctOption) {
                            correctCount++;
                            statusIcon.innerHTML = ' <span class="text-green-500">✔️</span>';
                        } else {
                            statusIcon.innerHTML = ' <span class="text-red-500">❌</span>';
                        }
                    } else {
                        // Mark as incorrect if no option was selected
                        statusIcon.innerHTML = ' <span class="text-red-500">❌</span>';
                    }
        
                    // Disable all options for the question after submission
                    const options = questionDiv.querySelectorAll(`input[name="mcq${index}"]`);
                    options.forEach(option => option.disabled = true);
        
                    // Insert the status icon after the question content
                    statusIcon.classList.add('status-icon');
                    questionDiv.querySelector('.flex.space-x-2.items-start').appendChild(statusIcon);
                } else if (qdata.type === 'fillup') {
                    const fillupInputs = questionDiv.querySelectorAll('input[type="text"]');
                    fillupInputs.forEach(input => {
                        const correctAnswer = input.getAttribute('data-correct-answer');
                        const userAnswer = input.value.toLowerCase().trim();
                        const statusIcon = document.createElement('span');
        
                        if (input.nextElementSibling) {
                            input.nextElementSibling.remove();
                        }
        
                        if (userAnswer === correctAnswer) {
                            statusIcon.innerHTML = ' <span class="text-green-500">✔️</span>';
                            correctCount++;
                        } else {
                            statusIcon.innerHTML = ' <span class="text-red-500">❌</span>';
                        }
        
                        input.disabled = true;
                        input.parentNode.insertBefore(statusIcon, input.nextSibling);
                    });
                }
            });
        
            // Calculate and display the score
            const score = totalQuestions > 0 ? ((correctCount / totalQuestions) * 100).toFixed(2) : '0.00';
            document.getElementById('scoreDisplay').textContent = `Score: ${score}%`;
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
    fetchAndLoadQuiz(quiz1Url, quiz1Directions);
});

openPopupQnButton2.addEventListener('click', () => {
    const quiz2Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k241314/pict5k241314_questionbank.json';
    const quiz2Directions = 'Section I\nRead each sentence carefully and decide which of the following categories it falls under.';
    fetchAndLoadQuiz(quiz2Url, quiz2Directions);
});

openPopupQnButton3.addEventListener('click', () => {
    const quiz3Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k281fd6/pict5k281fd6_questionbank.json';
    const quiz3Directions = 'Spot The Error\nIn each of the sentences, one verb is wrong. Identify the incorrect verb and write in the correct one in the space provided.';
    fetchAndLoadQuiz(quiz3Url, quiz3Directions);
});

openPopupQnButton4.addEventListener('click', () => {
    const quiz4Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k218d5a/pict5k218d5a_questionbank.json';
    const quiz4Directions = 'Choose the Right Word\nSelect the right answer choice.';
    fetchAndLoadQuiz(quiz4Url, quiz4Directions);
});

openPopupQnButton5.addEventListener('click', () => {
    const quiz5Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2db2b9/pict5k2db2b9_questionbank.json';
    const quiz5Directions = 'Word Forms\nUse the right form of the word in the brackets.';
    fetchAndLoadQuiz(quiz5Url, quiz5Directions);
});


openPopupQnButton6.addEventListener('click', () => {
    const quiz6Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2e4cd0/pict5k2e4cd0_questionbank.json';
    const quiz6Directions = 'Singular or Plural?\nChoose the right answer.';
    fetchAndLoadQuiz(quiz6Url, quiz6Directions);
});

openPopupQnButton7.addEventListener('click', () => {
    const quiz7Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k292bd7/pict5k292bd7_questionbank.json';
    const quiz7Directions = 'Tricky Tenses\nWhile most choices may seem correct, there is only ONE correct choice. Look at the context and pick the right answer!';
    fetchAndLoadQuiz(quiz7Url, quiz7Directions);
});

openPopupQnButton8.addEventListener('click', () => {
    const quiz8Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2f3372/pict5k2f3372_questionbank.json';
    const quiz8Directions = 'But what?\nFill in the blanks with BUT, AND, OR, or OR NOT.';
    fetchAndLoadQuiz(quiz8Url, quiz8Directions);
});

openPopupQnButton9.addEventListener('click', () => {
    const quiz9Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2825ac/pict5k2825ac_questionbank.json';
    const quiz9Directions = 'Where are you?\nChoose the right answer.';
    fetchAndLoadQuiz(quiz9Url, quiz9Directions);
});

openPopupQnButton10.addEventListener('click', () => {
    const quiz10Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k205b27/pict5k205b27_questionbank.json';
    const quiz10Directions = 'Add the Right Preposition\nUse the right preposition with the following verbs. An example has been done for you. It adds the preposition in this matter: Look+After';
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
closeQuizButton.addEventListener('click', closePopupQn);

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