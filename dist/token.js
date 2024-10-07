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

        if (!csrfResponse.ok) {
            throw new Error('Failed to fetch CSRF token');
        }

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

        // Check if the response was OK
        if (response.ok) {
            const responseData = await response.json();

            document.getElementById('popup').classList.add('hidden');

            document.getElementById('successPopup').classList.remove('hidden');

        } else {
            const errorData = await response.json();
            console.error('Error in response:', errorData);
        }

    } catch (error) {
        console.error('Caught network error:', error);
        document.getElementById('popup').classList.add('hidden');
        document.getElementById('errorPopup').classList.remove('hidden');
    }
});
