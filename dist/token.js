async function handleFormSubmit(event, formId, url, popupId) {
    event.preventDefault();

    try {
        // Initialize CSRF cookie on mobile devices
        await fetch('/sanctum/csrf-cookie');

        // Fetch CSRF token
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

        const formData = new FormData(document.getElementById(formId));

        const requestOptions = {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            },
            body: formData
        };

        const response = await fetch(url, requestOptions);
        
        // Log the full response for debugging
        const responseText = await response.text();  // Get response as text first
        console.log('Raw response text:', responseText); // Log the raw response

        if (response.ok) {
            const responseData = JSON.parse(responseText);  // Now parse the JSON

            console.log('Success response data:', responseData);
            document.getElementById(popupId).classList.add('hidden');
            document.getElementById('successPopup').classList.remove('hidden');
        } else {
            // Check if response is HTML
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                console.warn('Received HTML instead of JSON. Response:', responseText);
                document.getElementById(popupId).classList.add('hidden');
                document.getElementById('successPopup').classList.remove('hidden');
            } else {
                const errorData = JSON.parse(responseText);  // Try to parse as JSON
                console.error('Error in response:', errorData);
                document.getElementById(popupId).classList.add('hidden');
                document.getElementById('errorPopup').classList.remove('hidden');
            }
        }

    } catch (error) {
        console.error('Caught network error:', error);
        document.getElementById(popupId).classList.add('hidden');
        document.getElementById('errorPopup').classList.remove('hidden');
    }
}

// Event listeners for each form
document.getElementById('demoForm').addEventListener('submit', function (event) {
    handleFormSubmit(event, 'demoForm', '/mail/demo', 'popup');
});

document.getElementById('talk').addEventListener('submit', function (event) {
    handleFormSubmit(event, 'talk', '/mail/talk', 'talkForm');
});

document.getElementById('request').addEventListener('submit', function (event) {
    handleFormSubmit(event, 'request', '/mail/request', 'requestForm');
});