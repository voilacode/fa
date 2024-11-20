const exampleContainer = document.getElementById('exampleContainer');

// Open popupQn listeners
openPopupQnButton1.addEventListener('click', () => {
    const quiz1Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2ac25b/pict5k2ac25b_questionbank.json';
    const quiz1Directions = 'Choose the Right Word\n Fill in the blanks with the following words';
    
    exampleContainer.style.display = 'none';
    fetchAndLoadQuiz(quiz1Url, quiz1Directions, true);
});

openPopupQnButton2.addEventListener('click', () => {
    const quiz2Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k241314/pict5k241314_questionbank.json';
    const quiz2Directions = 'Section I\nRead each sentence carefully and decide which of the following categories it falls under.';
    
    exampleContainer.style.display = 'none';
    fetchAndLoadQuiz(quiz2Url, quiz2Directions, true);
});

openPopupQnButton3.addEventListener('click', () => {
    resetExampleContainer(); 

    const quiz3Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k281fd6/pict5k281fd6_questionbank.json';
    const quiz3Directions = 'Spot The Error\nIn each of the sentences, one verb is wrong. Identify the incorrect verb and write in the correct one in the space provided.';

    // Fetch and load the quiz
    fetchAndLoadQuiz(quiz3Url, quiz3Directions, false);

    
    exampleContainer.style.display = 'block'; // Show the container
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
    
    exampleContainer.style.display = 'none';
    fetchAndLoadQuiz(quiz4Url, quiz4Directions, false);
});

openPopupQnButton5.addEventListener('click', () => {
    const quiz5Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2db2b9/pict5k2db2b9_questionbank.json';
    const quiz5Directions = 'Word Forms\nUse the right form of the word in the brackets.';
    
    exampleContainer.style.display = 'none';
    fetchAndLoadQuiz(quiz5Url, quiz5Directions, false);
});

openPopupQnButton6.addEventListener('click', () => {
    const quiz6Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2e4cd0/pict5k2e4cd0_questionbank.json';
    const quiz6Directions = 'Singular or Plural?\nChoose the right answer.';
    
    exampleContainer.style.display = 'none';
    fetchAndLoadQuiz(quiz6Url, quiz6Directions, false);
});

openPopupQnButton7.addEventListener('click', () => {
    const quiz7Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k292bd7/pict5k292bd7_questionbank.json';
    const quiz7Directions = 'Tricky Tenses\nWhile most choices may seem correct, there is only ONE correct choice. Look at the context and pick the right answer!';
    
    exampleContainer.style.display = 'none';
    fetchAndLoadQuiz(quiz7Url, quiz7Directions, false);
});

openPopupQnButton8.addEventListener('click', () => {
    const quiz8Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2f3372/pict5k2f3372_questionbank.json';
    const quiz8Directions = 'But what?\nFill in the blanks with BUT, AND, OR, or OR NOT.';
    
    exampleContainer.style.display = 'none';
    fetchAndLoadQuiz(quiz8Url, quiz8Directions, false);
});

openPopupQnButton9.addEventListener('click', () => {
    const quiz9Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k2825ac/pict5k2825ac_questionbank.json';
    const quiz9Directions = 'Where are you?\nChoose the right answer.';
    
    exampleContainer.style.display = 'none';
    fetchAndLoadQuiz(quiz9Url, quiz9Directions, false);
});

openPopupQnButton10.addEventListener('click', () => {
    resetExampleContainer(); // Clear previous content

    const quiz10Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/pi/pict5k205b27/pict5k205b27_questionbank.json';
    const quiz10Directions = 'Add the Right Preposition\nUse the right preposition with the following verbs. An example has been done for you.';
    const customAnswers = ['agree', 'find out', 'know', 'look', 'teach', 'think']; // Index page options
    fetchAndLoadQuiz(quiz10Url, quiz10Directions, true, true, customAnswers);

    
    exampleContainer.style.display = 'block'; // Show the container
    exampleContainer.classList.add('bg-gray-50', 'border', 'border-gray-400', 'rounded', 'p-4', 'm-4', 'mx-6');
    exampleContainer.innerHTML = `
        <h3 class="font-semibold text-gray-600">Example</h3>
        <p class="leading-loose text-sm">
            Our parents not only <span class="p-2 pb-1 mx-2 text-start pe-8 border-b border-black bg-white"> look after </span> us but also love us unconditionally.
        </p>
    `;
});
