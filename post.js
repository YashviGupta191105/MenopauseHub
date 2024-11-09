// Function to handle posting messages
function postMessage() {
    // Get the message box and posted messages div elements
    const messageBox = document.getElementById("messageBox");
    const postedMessages = document.getElementById("postedMessages");

    // Check if the message is not empty
    if (messageBox.value.trim() !== "") {
        // Create a new div to hold the posted message
        const newMessage = document.createElement("div");
        newMessage.className = "posted-message";
        newMessage.textContent = messageBox.value;

        // Append the new message to the posted messages div
        postedMessages.appendChild(newMessage);

        // Clear the message box after posting
        messageBox.value = "";
    } else {
        // Alert if the message is empty
        alert("Please enter a message!");
    }
}