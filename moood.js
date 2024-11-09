// Event listener for mood button clicks
document.querySelectorAll('.mood-button').forEach(button => {
    button.addEventListener('click', async (event) => {
        const mood = event.target.getAttribute('data-mood');

        try {
            // Send mood data to the server
            const response = await fetch('http://localhost:3000/submit-mood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mood: mood })
            });

            if (response.ok) {
                // Show the dialog box on success
                showDialog();
            } else {
                alert("Error submitting your response. Please try again.");
            }
        } catch (error) {
            alert("Server connection issue. Please try again later.");
        }
    });
});

// Function to show the dialog box
function showDialog() {
    document.getElementById('responseDialog').style.display = 'block';
}

// Function to close the dialog box
function closeDialog() {
    document.getElementById('responseDialog').style.display = 'none';
}
