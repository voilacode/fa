async function handleFormSubmit(event, formId, url, popupId) {
    event.preventDefault();

    try {
        // Initialize CSRF cookie on mobile devices and all platforms
        await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' });

        // Fetch CSRF token
        const csrfResponse = await fetch('/csrf-token', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!csrfResponse.ok) {
            throw new Error('Failed to fetch CSRF token');
        }

        const csrfData = await csrfResponse.json();
        const csrfToken = csrfData.csrfToken;

        const formData = new FormData(document.getElementById(formId));

        const requestOptions = {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            },
            body: formData,
            credentials: 'same-origin' // Ensure cookies are sent properly
        };

        const response = await fetch(url, requestOptions);

        if (response.ok) {
            document.getElementById(popupId).classList.add('hidden');
            document.getElementById('successPopup').classList.remove('hidden');
        } else {
            const errorData = await response.json();
            console.error('Error in response:', errorData);
            document.getElementById(popupId).classList.add('hidden');
            document.getElementById('errorPopup').classList.remove('hidden');
        }

    } catch (error) {
        console.error('Caught network error:', error);
        document.getElementById(popupId).classList.add('hidden');
        document.getElementById('errorPopup').classList.remove('hidden');
    }
}
