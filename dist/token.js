// Function to handle form submissions
async function handleFormSubmission(event, formId) {
    event.preventDefault();

    try {
        // Fetch CSRF token from Laravel
        const csrfResponse = await fetch('/csrf-token', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!csrfResponse.ok) {
            throw new Error('Failed to fetch CSRF token');
        }

        const csrfData = await csrfResponse.json();
        const csrfToken = csrfData.csrfToken;

        const form = document.getElementById(formId);
        const formData = new FormData(form);

        // Append the CSRF token to the form data
        formData.append('_token', csrfToken);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        };

        const response = await fetch(form.action, requestOptions);

        if (response.ok) {
            // Hide current popup and show success popup
            document.getElementById(formId).closest('.fixed').classList.add('hidden');
            document.getElementById('successPopup').classList.remove('hidden');
        } else {
            const errorData = await response.json();
            console.error('Form submission error:', errorData);
        }
    } catch (error) {
        console.error('Error during form submission:', error);
    }
}

// Attach form submission events
document.addEventListener('DOMContentLoaded', function () {
    const forms = ['talk', 'request', 'demoForm'];

    forms.forEach(formId => {
        document.getElementById(formId).addEventListener('submit', function (event) {
            handleFormSubmission(event, formId);
        });
    });
});