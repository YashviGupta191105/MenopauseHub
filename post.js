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

/*
post image*/
document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('imageInput').click(); // Opens the gallery
});

document.getElementById('imageInput').addEventListener('change', async function (event) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        // Send the image to the server
        const response = await fetch('http://your-server-url/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            displayImage(result.imageUrl);
        } else {
            console.error('Image upload failed');
        }
    }
});

function displayImage(imageUrl) {
    const postContent = document.getElementById('postContent');
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = "Uploaded Image";
    img.style.maxWidth = "100%";
    postContent.appendChild(img);
}

/*post and error handelling*/
document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('imageInput').click(); // Opens the gallery
});

document.getElementById('imageInput').addEventListener('change', async function (event) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Attempt to upload the image to the server
            const response = await fetch('http://your-server-url/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                displayImage(result.imageUrl);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            showErrorDialog();
        }
    }
});

// Function to display uploaded image in the feed
function displayImage(imageUrl) {
    const postContent = document.getElementById('postContent');
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = "Uploaded Image";
    img.style.maxWidth = "100%";
    postContent.appendChild(img);
}

// Show error dialog box for server issues
function showErrorDialog() {
    document.getElementById('errorDialog').style.display = 'block';
}

// Close the error dialog
function closeDialog() {
    document.getElementById('errorDialog').style.display = 'none';
}

// comment part

    document.querySelector('.button').addEventListener('click', function() {
    // Scroll smoothly to the `.feed` class element
    document.querySelector('.feed').scrollIntoView({behavior: 'smooth'});
});
// Scroll to feed when comment button is clicked
document.querySelector('.comment-button').addEventListener('click', function() {
    document.querySelector('.feed').scrollIntoView({ behavior: 'smooth' });
});

// Function to add comment
function addComment() {
    // Get the comment input
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();

    if (commentText) {
        // Create a new comment element
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = commentText;

        // Add the new comment to the comments container
        document.getElementById('commentsContainer').appendChild(commentElement);

        // Clear the input field
        commentInput.value = '';
    } else {
        alert("Please write something before posting!");
    }
}
// JavaScript to toggle post content
document.querySelectorAll('.post-content').forEach(postContent => {
    postContent.addEventListener('click', function() {
        if (postContent.classList.contains('collapsed')) {
            // Expand content
            postContent.textContent = postContent.getAttribute('data-full-content');
            postContent.classList.remove('collapsed');
        } else {
            // Collapse content
            const truncatedContent = postContent.getAttribute('data-full-content').slice(0, 100) + '...';
            postContent.textContent = truncatedContent;
            postContent.classList.add('collapsed');
        }
    });
});




/*
community explore*/
document.querySelectorAll(".join-button").forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "Join") {
            button.textContent = "Joined";
            button.style.backgroundColor = "#f6b7b7";
            button.style.color = "#fff";
        } else {
            button.textContent = "Join";
            button.style.backgroundColor = "#ddd";
            button.style.color = "#6e2424";
        }
    });
});


