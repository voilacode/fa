document.getElementById('demoForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Fetch CSRF token from Laravel
    const csrfResponse = await fetch('/csrf-token');
    const csrfData = await csrfResponse.json();
    const csrfToken = csrfData.csrfToken;

    const formData = new FormData(this);

    // Set up request options
    const requestOptions = {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': csrfToken, 
            'Accept': 'application/json'
        },
        body: formData
    };

    // Send the request to Laravel
    const response = await fetch('/mail/send', requestOptions);

    if (response.ok) {
        console.log('Email sent successfully');
    } else {
        console.error('Error sending email');
    }
});
