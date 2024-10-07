document.getElementById('demoForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        // Fetch CSRF token from Laravel
        const csrfResponse = await fetch('/csrf-token');
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

        const response = await fetch('/admin/mail', requestOptions);

        if (response.ok) {
            // Close the current popup (form)
            document.getElementById('popup').classList.add('hidden');

            // Show the success popup
            document.getElementById('successPopup').classList.remove('hidden');
        } else {
            const errorData = await response.json();
            console.error('Error sending email', errorData);
            alert('Error sending email: ' + (errorData.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error. Please try again.');
    }
});
