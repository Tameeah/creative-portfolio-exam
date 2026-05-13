const cards = document.querySelectorAll('.flip-card');

cards.forEach((card) => {
    card.addEventListener('click', function() {
        this.classList.toggle('is-flipped');
    });
});

