// Background video management
const backgroundVideo = document.getElementById('background-video');
const coinContainer = document.querySelector('.coin-container');

// Function to change background video with smooth transition
function changeBackgroundVideo(videoSrc) {
    // Create a fade out effect
    backgroundVideo.style.opacity = '0';
    
    setTimeout(() => {
        backgroundVideo.src = videoSrc;
        backgroundVideo.load();
        
        // Fade back in
        setTimeout(() => {
            backgroundVideo.style.opacity = '1';
        }, 200);
    }, 600);
}

// Event listeners for coin hover
coinContainer.addEventListener('mouseenter', function() {
    changeBackgroundVideo('hell.mp4');
});

coinContainer.addEventListener('mouseleave', function() {
    changeBackgroundVideo('heaven.mp4');
});

// Ensure video plays on load
document.addEventListener('DOMContentLoaded', function() {
    backgroundVideo.play().catch(function(error) {
        console.log('Video autoplay failed:', error);
    });
});

// Handle video loading errors
backgroundVideo.addEventListener('error', function() {
    console.log('Error loading video');
});

// Add smooth transition class when videos are ready
backgroundVideo.addEventListener('loadeddata', function() {
    backgroundVideo.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
});

// Contract Address Copy Function
function copyToClipboard() {
    const contractAddress = document.getElementById('contractAddress').textContent;
    
    navigator.clipboard.writeText(contractAddress).then(() => {
        // Visual feedback
        const button = document.querySelector('.copy-btn');
        const originalText = button.textContent;
        
        // Change button text and style
        button.textContent = 'Copied!';
        button.style.background = 'rgba(76, 175, 80, 0.8)';
        button.style.borderColor = 'rgba(76, 175, 80, 0.9)';
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.borderColor = '';
        }, 2000);
        
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy contract address. Please try again.');
    });
}
