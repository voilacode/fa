const exampleContainer = document.getElementById('exampleContainer');

// Open popupQn listeners
openPopupQnButton1.addEventListener('click', () => {
    resetExampleContainer();
    const quiz1Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw8bf07/vcgtw8bf07_questionbank.json';
    const quiz1Directions = 'How active are you?\nConvert these sentences into the right Passive form. An example has been done for you.';
    
    // Define sentences to pass dynamically for Popup 1
    const explanatorySentences1 = [
        "Our trainers check each writing task for quality.",
        "We do not allow children under 16 to work.",
        "They will repair your car this afternoon.",
        "First Academy has sold over 10,000 copies of their material this year.",
        "The employer pays the employees more for working weekends."
    ];

    // Pass explanatory sentences for Popup 1
    fetchAndLoadQuiz(quiz1Url, quiz1Directions, false, false, [], true, explanatorySentences1);

    exampleContainer.style.display = 'block'; // Show the container
    exampleContainer.classList.add('bg-gray-50', 'border', 'border-gray-400', 'rounded', 'p-4', 'm-4', 'mx-6');
    exampleContainer.innerHTML = `
        <h3 class="font-semibold text-gray-600">Example</h3>
        <p class="leading-loose text-sm">
        <div class="my-2 text-teal-700">Burning plastic gives off toxic fumes.</div>
            Toxic fumes 
            <span class="p-2 pb-1 mx-2 text-start pe-8 border-b border-black bg-white">are given off</span>
            by burning plastic.
        </p>
    `;
});


openPopupQnButton2.addEventListener('click', () => {
    const quiz2Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwa0560/vcgtwa0560_questionbank.json';
    const quiz2Directions = 'Can you change?\nUse the right form of the verb in the blanks provided';
    const customAnswers = ['bring', 'borrow', 'complete', 'copy', 'reserve', 'store']; // IELTS options
    fetchAndLoadQuiz(quiz2Url, quiz2Directions, true, true, customAnswers);

    exampleContainer.style.display = 'none';
});

openPopupQnButton3.addEventListener('click', () => {
    const quiz3Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwbed2e/vcgtwbed2e_questionbank.json';
    const quiz3Directions = 'What is your position on this?\nUse the correct preposition in the sentences below.\nWhat are examples of prepositions?A preposition is a word or group of words used before a noun, pronoun, or noun phrase to show direction, time, place, location, spatial relationships, or to introduce an object. Some examples of prepositions are words like "in," "at," "on," "of," and "to."';
    fetchAndLoadQuiz(quiz3Url, quiz3Directions, false);

    exampleContainer.style.display = 'block'; // Show the container
    exampleContainer.classList.add('bg-teal-50', 'border', 'border-teal-400', 'rounded', 'p-4', 'm-4');
    exampleContainer.innerHTML = `
        <h3 class="font-semibold text-teal-600">What are examples of prepositions?</h3>
        <p class="leading-loose text-sm">
        <div class="my-2 text-teal-700">A preposition is a word or group of words used before a noun, pronoun, or noun phrase to show direction, time, place, location, spatial relationships, or to introduce an object. Some examples of prepositions are words like "in," "at," "on," "of," and "to."</div>
        </p>
    `;
});

openPopupQnButton4.addEventListener('click', () => {
    const quiz4Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw49c1c/vcgtw49c1c_questionbank.json';
    const quiz4Directions = "...ing or not ?\nA li'l something to do with tenses! 😉";
    fetchAndLoadQuiz(quiz4Url, quiz4Directions, false);

    exampleContainer.style.display = 'none';
});

openPopupQnButton5.addEventListener('click', () => {
    const quiz5Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwa40ac/vcgtwa40ac_questionbank.json';
    const quiz5Directions = 'To ♾ and Beyond!\nUse the right form of the words in the brackets.';
    fetchAndLoadQuiz(quiz5Url, quiz5Directions, false);
    exampleContainer.style.display = 'none';

});

openPopupQnButton6.addEventListener('click', () => {
    const quiz6Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwb7912/vcgtwb7912_questionbank.json';
    const quiz6Directions = 'To or For?\nI am coming to you? OR I am coming for you?';
    fetchAndLoadQuiz(quiz6Url, quiz6Directions, false);
    exampleContainer.style.display = 'none';
});

openPopupQnButton7.addEventListener('click', () => {
    const quiz7Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw1b2c8/vcgtw1b2c8_questionbank.json';
    const quiz7Directions = 'Do-Be-Do-Be-Do!\nDo you know the right `be`, `do` and `have` forms?';
    fetchAndLoadQuiz(quiz7Url, quiz7Directions, false);
    exampleContainer.style.display = 'none';
});

openPopupQnButton8.addEventListener('click', () => {
    const quiz8Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw59221/vcgtw59221_questionbank.json';
    const quiz8Directions = 'How is your form?\nFill both blanks with the correct form of the word given.  An example has been done for you.';

    const explanatorySentences1 = [
        "Irritate",
        "Tire",
        "Interest",
        "Bore",
        "Thrill"
    ];

    // Pass explanatory sentences for Popup 1
    fetchAndLoadQuiz(quiz8Url, quiz8Directions, false, false, [], true, explanatorySentences1);
    
    exampleContainer.style.display = 'block'; // Show the container
    exampleContainer.classList.add('bg-teal-50', 'border', 'border-teal-400', 'rounded', 'p-4', 'm-4');
    exampleContainer.innerHTML = `
        <h3 class="font-semibold text-teal-600">Happy</h3>
        <p class="leading-loose text-sm">
        <div class="my-2 text-gray-700"> <span class="font-bold text-black">0.</span> He was very <span class="text-teal-700 underline"> happy.</span> His <span class="text-teal-700 underline">happiness </span> knew no bounds.</div>
        </p>
    `;
});

openPopupQnButton9.addEventListener('click', () => {
    const quiz9Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwaa201/vcgtwaa201_questionbank.json';
    const quiz9Directions = 'Section I\nCorrect the verbs and/or helping verbs without changing the tense.';
    fetchAndLoadQuiz(quiz9Url, quiz9Directions, false);
    exampleContainer.style.display = 'none';
});

openPopupQnButton10.addEventListener('click', () => {
    const quiz10Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw662d4/vcgtw662d4_questionbank.json';
    const quiz10Directions = 'Section I\nChange the word that could change the tone of the sentence';
    fetchAndLoadQuiz(quiz10Url, quiz10Directions, false);
    
    exampleContainer.style.display = 'block'; 
    exampleContainer.classList.add('bg-gray-50', 'border', 'border-gray-400', 'rounded', 'p-4', 'm-4', 'mx-6');
    exampleContainer.innerHTML = `
        <p class="leading-loose text-sm text-gray-700">
            Ex: Some People think it is <span class="text-teal-700 underline">ok</span> to hit Children: acceptable/all right
        </p>
    `;
});