// video.js

// Array of video URLs (YouTube embedded links)
const videos = [
    "https://www.youtube.com/embed/tH0ol0TPvcM",
    "https://www.youtube.com/embed/IsM9D3gKUQ0",
    "https://www.youtube.com/embed/lMWOrDH694c",
    "https://www.youtube.com/embed/6j5ss-lNppE",
    "https://www.youtube.com/embed/1NEBL7deSHk"
];

// Keep track of the current video index
let currentVideo = 0;

// Get the iframe element and the navigation buttons
const videoFrame = document.getElementById('video-frame');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Function to update the video being displayed
function updateVideo() {
    // Set the iframe source to the current video
    videoFrame.src = videos[currentVideo];

    // Disable/Enable buttons based on the current video index
    prevBtn.disabled = currentVideo === 0;
    nextBtn.disabled = currentVideo === videos.length - 1;
}

// Function to go to the next video
function nextVideo() {
    if (currentVideo < videos.length - 1) {
        currentVideo++;
        updateVideo();
    }
}

// Function to go to the previous video
function prevVideo() {
    if (currentVideo > 0) {
        currentVideo--;
        updateVideo();
    }
}

// Event listeners for the navigation buttons
prevBtn.addEventListener('click', prevVideo);
nextBtn.addEventListener('click', nextVideo);

// Initialize the first video
updateVideo();


