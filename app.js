const cards = document.querySelectorAll('.flip-card');

cards.forEach((card) => {
    card.addEventListener('click', function() {
        this.classList.toggle('is-flipped');
    });
});

function openProject(year, overview, images) {
    // 1. Set the Title and Text
    document.getElementById('popupTitle').innerText = year;
    document.getElementById('popupOverview').innerText = overview;

    // 2. Set the Images
    document.getElementById('pImg1').src = images[0];
    document.getElementById('pImg2').src = images[1];
    document.getElementById('pImg3').src = images[2];

    // 3. Show the pop-up
    document.getElementById('projectPopup').style.display = 'block';
}

function closeProject() {
    // Hide the pop-up
    document.getElementById('projectPopup').style.display = 'none';
}


