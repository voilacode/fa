document.getElementById('demoForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        // Fetch CSRF token from Laravel
        const csrfResponse = await fetch('/csrf-token', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const csrfData = await csrfResponse.json();
        const csrfToken = csrfData.csrfToken;

        const formData = new FormData(this);

        const requestOptions = {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            },
            body: formData
        };

        const response = await fetch('https://your-laravel-app.com/admin/mail', requestOptions);

        if (response.ok) {
            // Close the current form popup
            document.getElementById('popup').classList.add('hidden');

            // Show the success popup
            document.getElementById('successPopup').classList.remove('hidden');
        } else {
            // Check for possible API errors
            const errorData = await response.json();
            console.error('Error sending email', errorData);
            // Display error message (optional) or log for debugging
        }
    } catch (error) {
        // Handle network or CORS issues
        console.error('Network or CORS error:', error);
        // Show a user-friendly error message (or log for debugging)
    }
});
