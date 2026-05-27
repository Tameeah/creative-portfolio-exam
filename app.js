//DOM (HTML structure) is loaded before the JS is executed
document.addEventListener("DOMContentLoaded", function () {

    //Navigation:
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

        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-bar a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');

            if (currentPath.includes(linkPath.replace(/^\.\.\/|^\.\//, ''))) {
                link.classList.add('active');
            }
        });
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

//slider
const containers = document.querySelectorAll('.gallery-wrapper');

containers.forEach(container => {
    const track = container.querySelector('.gallery-track');
    const nextBtn = container.querySelector('.next-arrow');
    const prevBtn = container.querySelector('.prev-arrow');
    
    const scrollAmount = 330;

    if(nextBtn && prevBtn && track) {
        nextBtn.addEventListener('click', () => {
            track.scrollLeft += scrollAmount;
        });

        prevBtn.addEventListener('click', () => {
            track.scrollLeft -= scrollAmount;
        });
    }
});

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



//Experience Page:
//This is the JS for the pop-up for the "Experience Page". 

function openProject(year, overview, mediaType, assetData) {
    // the title and overview text
    document.getElementById('popupTitle').innerText = year;
    document.getElementById('popupOverview').innerText = overview;

    const mediaContainer = document.getElementById('popupMedia');

    mediaContainer.innerHTML = '';

    // the media layout based on the type: image or video
    if (mediaType === 'image') {

        const imageArray = assetData.split(',');

        imageArray.forEach((srcString) => {
            const imgElement = document.createElement('img');
            imgElement.src = srcString.trim();
            imgElement.alt = 'Project Image';
            imgElement.className = "responsive-media";
            mediaContainer.appendChild(imgElement);
        });
    } else if (mediaType === 'video') {

        const videoElement = document.createElement('video');
        videoElement.src =assetData;
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.loop = true;
        videoElement.playInLine = true;
        videoElement.className = "responsive-media video-style";

        mediaContainer.appendChild(videoElement);
    }


    // 3. Show the pop-up
    document.getElementById('projectPopup').style.display = 'block';
}

function closeProject() {
    // Hide the pop-up
    document.getElementById('projectPopup').style.display = 'none';
    document.getElementById('popupMedia').innerHTML = '';
}


