document.addEventListener('DOMContentLoaded', function () {
    const formIds = ['request', 'talk', 'demoForm'];  // IDs of the forms

    formIds.forEach(formId => {
        const formElement = document.getElementById(formId);

        if (formElement) {
            formElement.addEventListener('submit', async function (event) {
                event.preventDefault();  // Prevent default form submission

                const formData = new FormData(formElement);

                try {
                    const response = await fetch(formElement.action, {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        console.log(`Form '${formId}' submitted successfully.`);

                        // Ensure the popup exists before trying to hide it
                        const popupElement = formElement.closest('.fixed');
                        if (popupElement) {
                            popupElement.classList.add('hidden');  // Hide popup
                        }

                        const successPopup = document.getElementById('successPopup');
                        if (successPopup) {
                            successPopup.classList.remove('hidden');  // Show success message
                        }
                    } else {
                        const errorData = await response.json();
                        console.error(`Error submitting form '${formId}':`, errorData);
                    }
                } catch (error) {
                    console.error(`Submission error for form '${formId}':`, error);
                }
            });
        }
    });
});