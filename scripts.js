// Countdown Timer Logic
function startCountdown() {
    let timeLeft = 30 * 60; // 30 minutes in seconds

    const timerElement = document.getElementById('countdown');

    const interval = setInterval(() => {
        let hours = Math.floor(timeLeft / 3600);
        let minutes = Math.floor((timeLeft % 3600) / 60);
        let seconds = timeLeft % 60;

        timerElement.innerText =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(interval);
            timerElement.innerText = "PROMOÇÃO ENCERRADA";
        }

        timeLeft--;
    }, 1000);
}

// Smooth scrolling for anchor links is already handled by CSS scroll-behavior: smooth
// But we can add extra handling for older browsers if needed.

// Function to append current URL parameters to all external links
function appendUTMsToLinks() {
    const searchParams = window.location.search;
    if (!searchParams) return;

    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
        try {
            const url = new URL(link.href);
            // Only append if it's not a local anchor or same-page link
            url.search += (url.search ? '&' : '') + searchParams.substring(1);
            link.href = url.toString();
        } catch (e) {
            console.error('Error appending UTMs to link:', link.href, e);
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    appendUTMsToLinks();
});
