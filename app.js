// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.flip-card');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle the 'is-flipped' class on click
            this.classList.toggle('is-flipped');
        });
    });
});