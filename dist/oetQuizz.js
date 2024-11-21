const exampleContainer = document.getElementById('exampleContainer');

// Open popupQn listeners
openPopupQnButton1.addEventListener('click', () => {
    const quiz1Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwe52a9/vcgtwe52a9_questionbank.json';
    const quiz1Directions = 'DYKTW?\nDo You Know These Words?';
    fetchAndLoadQuiz(quiz1Url, quiz1Directions, false);
    exampleContainer.style.display = 'none';

});

openPopupQnButton2.addEventListener('click', () => {
    const quiz2Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwcf0da/vcgtwcf0da_questionbank.json';
    const quiz2Directions = '👩‍⚕️ 👩‍🏫 👩‍🚀\nDo you know what are they called?';
    fetchAndLoadQuiz(quiz2Url, quiz2Directions, false);
    exampleContainer.style.display = 'none';

});

openPopupQnButton3.addEventListener('click', () => {
    const quiz3Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw5ecc3/vcgtw5ecc3_questionbank.json';
    const quiz3Directions = 'Name These Professions';
    fetchAndLoadQuiz(quiz3Url, quiz3Directions, false);
    exampleContainer.style.display = 'none';

});

openPopupQnButton4.addEventListener('click', () => {
    const quiz4Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwc1fc2/vcgtwc1fc2_questionbank.json';
    const quiz4Directions = '💪 Know Your Anatomy\nChoose the correct answer.';
    fetchAndLoadQuiz(quiz4Url, quiz4Directions, false);
    exampleContainer.style.display = 'none';

});

openPopupQnButton5.addEventListener('click', () => {
    const quiz5Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw2f995/vcgtw2f995_questionbank.json';
    const quiz5Directions = '🚬 The Other Drugs\nUse the right form of the word.';
    const customAnswers = ['Amphetamines', 'craving', 'withdrawal', 'abstinence', 'relapse']; 
    fetchAndLoadQuiz(quiz5Url, quiz5Directions, true, true, customAnswers);

    exampleContainer.style.display = 'none';
});

openPopupQnButton6.addEventListener('click', () => {
    const quiz6Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw441f1/vcgtw441f1_questionbank.json';
    const quiz6Directions = 'How Perfect is the Present?\nFill in the blanks so that the sentences are in the correct `Present Perfect` form.';
    fetchAndLoadQuiz(quiz6Url, quiz6Directions, false);
    exampleContainer.style.display = 'none';
});

openPopupQnButton7.addEventListener('click', () => {
    const quiz7Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwba5e4/vcgtwba5e4_questionbank.json';
    const quiz7Directions = 'Section I\nUse the right form of these phrasal verbs.';
    const customAnswers = ['Flare-Up', 'Passout', 'Come to', 'Break out in', 'Come round', 'rule out']; 

    fetchAndLoadQuiz(quiz7Url, quiz7Directions, true, true, customAnswers);
    exampleContainer.style.display = 'none';
});

openPopupQnButton8.addEventListener('click', () => {
    const quiz8Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwaa012/vcgtwaa012_questionbank.json';
    const quiz8Directions = 'Section I\nChange the word from its Noun form to Verb form.';
    const explanatorySentences1 = [
        "Experts only made a translation of previous studies.",
        "The board members put forth a proposal for another plan.",
        " Shoppers should make a comparison between competing products.",
        "He did not get a chance to give an explanation.",
        "Local villagers conducted an investigation into the matter."
    ];

    exampleContainer.style.display = 'block'; // Show the container
    exampleContainer.classList.add('bg-gray-50', 'border', 'border-gray-400', 'rounded', 'p-4', 'm-4', 'mx-6');
    exampleContainer.innerHTML = `
        <h3 class="font-semibold text-gray-600">Example</h3>
        <p class="leading-loose text-sm">
            Q. Students could not arrive at a <span class="text-teal-custom underline">conclusion</span> on anything.
            <div class="text-sm">A. Students could not <span class="text-teal-custom">conclude</span> anything.</div>
        </p>
    `;
    fetchAndLoadQuiz(quiz8Url, quiz8Directions, false, false, [], true, explanatorySentences1);

});

// openPopupQnButton9.addEventListener('click', () => {
//     const quiz9Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtwaa201/vcgtwaa201_questionbank.json';
//     const quiz9Directions = 'Section I\nCorrect the verbs and/or helping verbs without changing the tense.';
//     fetchAndLoadQuiz(quiz9Url, quiz9Directions, false);
//      exampleContainer.style.display = 'none';

// });

openPopupQnButton10.addEventListener('click', () => {
    const quiz10Url = 'https://live-ai.s3.ap-south-1.amazonaws.com/test/vc/vcgtw16d5c/vcgtw16d5c_questionbank.json';
    const quiz10Directions = 'Section I\nChoose the correct phrasal verb.';
    fetchAndLoadQuiz(quiz10Url, quiz10Directions, false);
    exampleContainer.style.display = 'none';
});