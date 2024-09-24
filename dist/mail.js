(function() {
    emailjs.init("gr-KT7vLAy75_Fg-U"); 
})();

document.getElementById('demoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Prepare the form data
    const serviceID = 'service_jhdskaw';
    const templateID = 'template_7b52h9l';

    const uniqueID = Date.now(); // Generate a unique ID using the current timestamp
    const formData = {
        username: document.querySelector('input[name="username"]').value,
        useremail: document.querySelector('input[name="useremail"]').value,
        phone: document.querySelector('input[name="userphone"]').value,
        location: document.querySelector('input[name="location"]:checked').value,
        courses: Array.from(document.querySelectorAll('input[name="courses"]:checked')).map(cb => cb.value).join(', '),
        uniqueID: uniqueID, // Add unique ID to form data
        title: 'Demo Session Request' // Define the title
    };

    // Send email via EmailJS
    emailjs.send(serviceID, templateID, formData)
        .then(function(response) {
            alert('Email sent successfully!');
        }, function(error) {
            alert('Failed to send email: ' + JSON.stringify(error));
        });
});
