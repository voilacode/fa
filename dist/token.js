document.addEventListener('DOMContentLoaded', function () {
    const formIds = ['request', 'talk', 'demoForm'];  // IDs of the forms

    formIds.forEach(formId => {
        const formElement = document.getElementById(formId);

        if (formElement) {
            formElement.addEventListener('submit', async function (event) {
                event.preventDefault();  // Prevent default form submission

                try {
                    // Fetch CSRF token from Laravel (this part seems to work as you mentioned)
                    const csrfResponse = await fetch('/csrf-token', {
                        method: 'GET',
                        headers: { 'Accept': 'application/json' }
                    });

                    if (!csrfResponse.ok) {
                        throw new Error('Failed to fetch CSRF token');
                    }

                    const csrfData = await csrfResponse.json();
                    const csrfToken = csrfData.csrfToken;

                    // Append CSRF token to form data
                    const formData = new FormData(formElement);
                    formData.append('_token', csrfToken);

                    // Submit form via fetch API
                    const response = await fetch(formElement.action, {
                        method: 'POST',
                        headers: { 'Accept': 'application/json' },
                        body: formData
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log(`Form '${formId}' submitted successfully.`, result);

                        formElement.reset();  // Clear form after successful submission

                        // If there are any specific success popups, handle them here
                        alert('Form submitted successfully!');

                    } else {
                        const errorData = await response.json();
                        console.error(`Error submitting form '${formId}':`, errorData);
                        alert('Error submitting the form. Please try again.');
                    }
                } catch (error) {
                    console.error(`Submission error for form '${formId}':`, error);
                    alert('An unexpected error occurred. Please try again later.');
                }
            });
        }
    });
});