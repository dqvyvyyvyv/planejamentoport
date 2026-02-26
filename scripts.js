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
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.toString() === '') return;

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Skip internal anchors or links without protocol that aren't paths
        if (href.startsWith('#') || href.startsWith('javascript:')) return;

        try {
            const url = new URL(link.href, window.location.origin);

            // Merge current params into link params
            const linkParams = new URLSearchParams(url.search);
            currentParams.forEach((value, key) => {
                linkParams.set(key, value);
            });

            url.search = linkParams.toString();
            link.href = url.toString();
        } catch (e) {
            // Silently skip invalid URLs
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    appendUTMsToLinks();
});
