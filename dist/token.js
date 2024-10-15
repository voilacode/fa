// Function to handle form submissions
async function handleFormSubmit(event, formId, url, popupId) {
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

        // Check if the response was OK
        if (response.ok) {
            // Hide the form's popup
            document.getElementById(popupId).classList.add('hidden');
            // Show the success popup
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