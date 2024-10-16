// token.js
async function handleFormSubmit(event, formId, url, popupId) {
    event.preventDefault();

    try {
        // Initialize CSRF cookie on mobile devices
        await fetch('/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'same-origin'
        });

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

        // Fetch the form data
        const formData = new FormData(document.getElementById(formId));

        // Add CSRF token to the form data
        formData.append('_token', csrfToken);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData,
            credentials: 'same-origin'
        };

        const response = await fetch(url, requestOptions);

        if (response.ok) {
            // Handle success response
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

// Event listeners for each form
document.getElementById('demoForm').addEventListener('submit', function (event) {
    handleFormSubmit(event, 'demoForm', '/admin/mail/demo', 'popup');
});

document.getElementById('talk').addEventListener('submit', function (event) {
    handleFormSubmit(event, 'talk', '/admin/mail/talk', 'talkForm');
});

document.getElementById('request').addEventListener('submit', function (event) {
    handleFormSubmit(event, 'request', '/admin/mail/request', 'requestForm');
});

// Handle popups - success and error popups handling
document.getElementById('closeSuccessPopup').addEventListener('click', function () {
    document.getElementById('successPopup').classList.add('hidden');
});

document.getElementById('closeErrorPopup').addEventListener('click', function () {
    document.getElementById('errorPopup').classList.add('hidden');
});