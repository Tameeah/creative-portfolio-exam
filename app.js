//DOM (HTML structure) is loaded before the JS is executed
document.addEventListener("DOMContentLoaded", function () {

    //This is the JS driven navigation for all othe pages in my website. 

    //Too see if we are currently inside the "Pages" folder
    const isInPagesFolder = window.location.pathname.includes('/Pages/');
    
    // ./ for index
    // ../ for pages folder
    const basePrefix = isInPagesFolder ? '../' : './';

    //the HTML for your nav bar using the correct relative paths
    const navigationHTML = `
        <nav class="nav-bar">
            <ul>
                <li><a href="${basePrefix}Pages/about.html">About Me</a></li>
                <li><a href="${basePrefix}Pages/experience.html">Experience</a></li>
                <li><a href="${basePrefix}Pages/artworks.html">Artworks</a></li>
                <li><a href="${basePrefix}Pages/introduction.html">Introduction</a></li>
            </ul>
        </nav>
    `;

    // 4. Find the placeholder and inject the HTML
    const placeholder = document.getElementById("nav-placeholder");
    if (placeholder) {
        placeholder.innerHTML = navigationHTML;
    } 

    //h1 is the Home link
    const logoTitle = document.querySelector(".logo-print");
    if(logoTitle) {
        logoTitle.style.cursor = "pointer";

        logoTitle.addEventListener("click", function() {
            window.location.href = basePrefix + "index.html";
        });
    }
});

//Artwroks Page: 

// This is the JS for the flip cards on the "Artworks page".   
const cards = document.querySelectorAll('.flip-card');

cards.forEach((card) => {
    card.addEventListener('click', function() {
        this.classList.toggle('is-flipped');
    });
});

//This is the filter/search function 
const searchInput = document.getElementById('art-search');
const categories = document.querySelectorAll('.media-category');

if (searchInput) {
    searchInput.addEventListener('input', function(event) {
        const searchTerm = event.target.value.toLowerCase().trim();

        categories.forEach((category) => {
            const categoryTitle = category.querySelector('h2').textContent.toLowerCase();

            if (categoryTitle.includes (searchTerm)) {
                category.style.display = "";
            } else{
                category.style.display = "none";
            }
        });
    });
}





//This is the JS for the pop-up for the "Experience Page". 

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


