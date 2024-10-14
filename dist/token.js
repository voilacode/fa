// Function to handle form submissions
async function handleFormSubmission(event, formId, detailFields) {
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
}

// Event listener for demoForm
document.getElementById('demoForm').addEventListener('submit', function (event) {
    const detailFields = ['location', 'courses', 'username', 'userphone', 'useremail'];
    handleFormSubmission(event, 'demoForm', detailFields);
});

// Event listener for talkForm
document.getElementById('talkForm').addEventListener('submit', function (event) {
    const detailFields = ['username', 'userphone', 'useremail', 'message'];
    handleFormSubmission(event, 'talkForm', detailFields);
});

// Event listener for requestForm (assuming requestForm exists)
document.getElementById('requestForm').addEventListener('submit', function (event) {
    const detailFields = ['username', 'userphone', 'useremail', 'message'];
    handleFormSubmission(event, 'requestForm', detailFields);
});
