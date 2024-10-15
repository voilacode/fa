document.addEventListener('DOMContentLoaded', function () {
    const formIds = ['request', 'talk', 'demoForm'];  

    formIds.forEach(formId => {
        const formElement = document.getElementById(formId);

        if (formElement) {
            formElement.addEventListener('submit', async function (event) {
                event.preventDefault();

                try {
                    // Fetch CSRF token from Laravel
                    const csrfResponse = await fetch('/csrf-token', {
                        method: 'GET',
                        headers: { 'Accept': 'application/json' }
                    });

                    if (!csrfResponse.ok) {
                        throw new Error('Failed to fetch CSRF token');
                    }

                    const csrfData = await csrfResponse.json();
                    const csrfToken = csrfData.csrfToken;

                    const formData = new FormData(formElement);
                    formData.append('_token', csrfToken);

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Accept': 'application/json' },
                        body: formData
                    };

                    const response = await fetch(formElement.action, requestOptions);

                    if (response.ok) {
                        formElement.closest('.fixed').classList.add('hidden');  // Hide popup
                        document.getElementById('successPopup').classList.remove('hidden');  // Show success message
                    } else {
                        const errorData = await response.json();
                        console.error('Form submission error:', errorData);
                    }
                } catch (error) {
                    console.error('Error during form submission:', error);
                }
            });
        }
    });
});