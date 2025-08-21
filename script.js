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

// Audio element
const hoverSound = document.getElementById('hoverSound');

// Force audio to work - multiple approaches
function forcePlayAudio() {
    // Set audio properties
    hoverSound.volume = 0.7;
    hoverSound.muted = false;
    hoverSound.autoplay = true;
    hoverSound.loop = false;
    
    // Multiple play attempts
    const playPromise = hoverSound.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Audio playing successfully');
        }).catch(error => {
            console.log('First play attempt failed:', error);
            // Try alternative methods
            setTimeout(() => {
                hoverSound.play().catch(e => {
                    console.log('Second attempt failed:', e);
                    // Force load and play
                    hoverSound.load();
                    hoverSound.play().catch(e2 => {
                        console.log('Third attempt failed:', e2);
                    });
                });
            }, 100);
        });
    }
}

// Enable audio on any user interaction
function enableAudioOnInteraction() {
    hoverSound.muted = false;
    hoverSound.volume = 0.7;
    // Try to play a silent audio to unlock
    hoverSound.play().then(() => {
        hoverSound.pause();
        hoverSound.currentTime = 0;
    }).catch(() => {
        // Ignore errors for unlock attempt
    });
}

// Add multiple interaction listeners to unlock audio
document.addEventListener('click', enableAudioOnInteraction);
document.addEventListener('touchstart', enableAudioOnInteraction);
document.addEventListener('mousedown', enableAudioOnInteraction);
document.addEventListener('keydown', enableAudioOnInteraction);

// Event listeners for coin hover
coinContainer.addEventListener('mouseenter', function() {
    changeBackgroundVideo('hell.mp4');
    // Force play dramatic music
    hoverSound.currentTime = 0;
    forcePlayAudio();
});

coinContainer.addEventListener('mouseleave', function() {
    changeBackgroundVideo('heaven.mp4');
    // Stop and reset music
    hoverSound.pause();
    hoverSound.currentTime = 0;
});

// Touch events for mobile devices
coinContainer.addEventListener('touchstart', function() {
    changeBackgroundVideo('hell.mp4');
    hoverSound.currentTime = 0;
    forcePlayAudio();
});

coinContainer.addEventListener('touchend', function() {
    changeBackgroundVideo('heaven.mp4');
    hoverSound.pause();
    hoverSound.currentTime = 0;
});

// Additional hover events for better coverage
coinContainer.addEventListener('mouseover', function() {
    if (hoverSound.paused) {
        hoverSound.currentTime = 0;
        forcePlayAudio();
    }
});

// Ensure audio is ready
document.addEventListener('DOMContentLoaded', function() {
    hoverSound.load();
    // Try to unlock audio immediately
    enableAudioOnInteraction();
    
    // Additional aggressive unlock attempts
    setTimeout(() => {
        enableAudioOnInteraction();
    }, 1000);
    
    setTimeout(() => {
        enableAudioOnInteraction();
    }, 3000);
});

// Force audio unlock on any possible interaction
window.addEventListener('focus', enableAudioOnInteraction);
window.addEventListener('blur', enableAudioOnInteraction);
window.addEventListener('scroll', enableAudioOnInteraction);
window.addEventListener('resize', enableAudioOnInteraction);

// Try to play audio on page visibility change
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        enableAudioOnInteraction();
    }
});

// Additional fallback - try to play on any mouse movement
let mouseMoveCount = 0;
document.addEventListener('mousemove', function() {
    mouseMoveCount++;
    if (mouseMoveCount === 1 || mouseMoveCount === 5 || mouseMoveCount === 10) {
        enableAudioOnInteraction();
    }
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
