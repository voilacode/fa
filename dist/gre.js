const exampleContainer = document.getElementById('exampleContainer');

// Open popupQn listeners
openPopupQnButton1.addEventListener('click', () => {    
    resetExampleContainer();
    const quiz1Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwdd029/vcgtwdd029_questionbank.json';
    const quiz1Directions = 'Section I\nUse the Right Verbs';
    
    // Set the attribute isExplanatory to true for this specific popup
    fetchAndLoadQuiz(quiz1Url, quiz1Directions, false);

    exampleContainer.style.display = 'none'; 
});

openPopupQnButton2.addEventListener('click', () => {
    const quiz2Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw75d57/vcgtw75d57_questionbank.json';
    const quiz2Directions = 'Section I\nFill in the blanks in the sentences below using the correct form of the words in the box.';
    const customAnswers = ['Benefit', 'Confident', 'Develop', 'Different', 'Health', 'Nature', 'Significant', 'Responsible']; 
    fetchAndLoadQuiz(quiz2Url, quiz2Directions, true, true, customAnswers);

    exampleContainer.style.display = 'none';
});

openPopupQnButton3.addEventListener('click', () => {
    const quiz3Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw1bd73/vcgtw1bd73_questionbank.json';
    const quiz3Directions = 'Section I \n Choose the right word';
    fetchAndLoadQuiz(quiz3Url, quiz3Directions, false);

    exampleContainer.style.display = 'none'; 
});

openPopupQnButton4.addEventListener('click', () => {
    const quiz4Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw73a50/vcgtw73a50_questionbank.json';
    const quiz4Directions = "Section I\nFill in the blanks with a suitable Verb.";
    fetchAndLoadQuiz(quiz4Url, quiz4Directions, true);

    exampleContainer.style.display = 'none';
});

openPopupQnButton5.addEventListener('click', () => {    
    const quiz5Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw15beb/vcgtw15beb_questionbank.json';
    const quiz5Directions = 'Section I\nFill in the blanks with the suitable noun.';
    const customAnswers = ['skills', 'job', 'work', 'workplace', 'employer', 'unemployment', 'money', 'salary']; 
    fetchAndLoadQuiz(quiz5Url, quiz5Directions, true, true, customAnswers);
    
    exampleContainer.style.display = 'none';
});

openPopupQnButton6.addEventListener('click', () => {
    const quiz6Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwae527/vcgtwae527_questionbank.json';
    const quiz6Directions = 'Section I?\nComplete the sentences below with the correct form of one of the verbs in the box.';
    const customAnswers = ['demonstrate', 'display', 'illustrate', 'show', 'tell']; 
    fetchAndLoadQuiz(quiz6Url, quiz6Directions, true, true, customAnswers);
    exampleContainer.style.display = 'none';
});

openPopupQnButton7.addEventListener('click', () => {
    const quiz7Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwf8a6f/vcgtwf8a6f_questionbank.json';
    const quiz7Directions = 'Section I!\nSubject Verb agreement';
    fetchAndLoadQuiz(quiz7Url, quiz7Directions, false);
    exampleContainer.style.display = 'none';
});

openPopupQnButton8.addEventListener('click', () => {
    const quiz8Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwaa012/vcgtwaa012_questionbank.json';
    const quiz8Directions = 'How is your form?\nFill both blanks with the correct form of the word given. An example has been done for you.';
    
    // Define sentences to pass dynamically for Popup 2
    const explanatorySentences2 = [
        "Experts only made a translation of previous studies.",
        "The board members put forth a proposal for another plan.",
        "Shoppers should make a comparison between competing products.",
        "He did not get a chance to give an explanation.",
        "Local villagers conducted an investigation into the matter."
    ];

    // Pass explanatory sentences for Popup 2
    fetchAndLoadQuiz(quiz8Url, quiz8Directions, false, false, [], true, explanatorySentences2);

    exampleContainer.style.display = 'none';
});

openPopupQnButton9.addEventListener('click', () => {
    const quiz9Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwf8a6f/vcgtwf8a6f_questionbank.json';
    const quiz9Directions = 'Section I!\nSubject Verb agreement';
    fetchAndLoadQuiz(quiz9Url, quiz9Directions, false);
    exampleContainer.style.display = 'none';
});

openPopupQnButton10.addEventListener('click', () => {
    const quiz10Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw16d5c/vcgtw16d5c_questionbank.json';
    const quiz10Directions = 'Section I\nChoose the correct phrasal verb';
    fetchAndLoadQuiz(quiz10Url, quiz10Directions, false);
    
    exampleContainer.style.display = 'none'; 
});