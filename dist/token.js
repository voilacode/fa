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

        if (response.ok) {
            const responseData = await response.json();
            console.log('Success response data:', responseData); // Log the response data

            document.getElementById(popupId).classList.add('hidden');
            document.getElementById('successPopup').classList.remove('hidden');

        } else {
            const errorData = await response.json();
            console.error('Error in response:', errorData);
            document.getElementById(popupId).classList.add('hidden');
            document.getElementById('successPopup').classList.remove('hidden');
        }

    } catch (error) {
        console.error('Caught network error:', error);
        document.getElementById(popupId).classList.add('hidden');
        document.getElementById('errorPopup').classList.remove('hidden');
    }
}

async function handleForm(event, formId, url) {
    event.preventDefault();  // Prevent default form submission

    try {
        // Initialize CSRF cookie for mobile devices
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

        // Collect form data
        const formData = new FormData(document.getElementById(formId));

        // Set up the request options
        const requestOptions = {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            },
            body: formData
        };

        // Submit the form using fetch
        const response = await fetch(url, requestOptions);

        // Check if response is OK
        if (response.ok) {
            const responseData = await response.json();
            console.log('Success:', responseData);

            // Show the success popup without hiding the form
            document.getElementById('successPopup').classList.remove('hidden');
            document.getElementById('successPopup').innerText = 'Email sent successfully! We will get in touch soon.';

        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);

            // Show the error popup
            document.getElementById('errorPopup').classList.remove('hidden');
            document.getElementById('errorPopup').innerText = 'There was an error submitting your request. Please try again later.';
        }

    } catch (error) {
        console.error('Caught error:', error);

        // Show the error popup in case of failure
        document.getElementById('errorPopup').classList.remove('hidden');
        document.getElementById('errorPopup').innerText = 'An unexpected error occurred. Please try again later.';
    }
}

// Attach event listener to the form
document.getElementById('studyabroad').addEventListener('submit', function (event) {
    handleForm(event, 'studyabroad', '/mail/studyabroad');
});

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

document.getElementById('studyabroad').addEventListener('submit', function (event) {
    handleForm(event, 'studyabroad', '/mail/studyabroad');
});