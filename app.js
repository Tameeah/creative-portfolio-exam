//DOM (HTML structure) is loaded before the JS is executed
document.addEventListener("DOMContentLoaded", function () {

    //function for the smooth fade transistion
    document.body.classList.add("loaded");

    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])');

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            const destination = this.href;

            if (destination && destination.includes("mailto")) {
                e.preventDefault();

                document.body.classList.remove("is-exiting");

                setTimeout(() => {
                    window.location.href = destination;
                }, 1200);
            }
        });
    })

    //Navigation:
    //This is the JS driven navigation for all othe pages in my website. 

    //To see if we are currently inside the "Pages" folder
    const isInPagesFolder = window.location.pathname.includes('/Pages/');
    
    // ./ for index
    // ../ for pages folder
    const basePrefix = isInPagesFolder ? '../' : './';

    //the HTML for your nav bar using the correct relative paths
    const navigationHTML = `
        <nav class="nav-bar">
            <button class="menu-toggle" aria-label="Open Menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>

            <div class="nav-menu-wrapper"> 
                <button class="menu-close" aria-label="Close Menu">&times;</button>

                <ul>
                    <li><a href="${basePrefix}Pages/about.html">About Me</a></li>
                    <li><a href="${basePrefix}Pages/experience.html">Experience</a></li>
                    <li><a href="${basePrefix}Pages/artworks.html">Artworks</a></li>
                    <li><a href="${basePrefix}Pages/introduction.html">Introduction</a></li>
                </ul>
            </div>
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

        const menuToggle = placeholder.querySelector('.menu-toggle');
        const menuClose = placeholder.querySelector('.menu-close');
        const navMenuWrapper = placeholder.querySelector('.nav-menu-wrapper');

        if (menuToggle && menuClose && navMenuWrapper) {
            // Open Side Nav
            menuToggle.addEventListener('click', () => {
                navMenuWrapper.classList.add('is-open');
            });

            // Close Side Nav
            menuClose.addEventListener('click', () => {
                navMenuWrapper.classList.remove('is-open');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenuWrapper.classList.remove('is-open');
                });
            });
        }
    } 

    //h1 is the Home link
    const logoTitle = document.querySelector(".logo-print");
    if(logoTitle) {
        logoTitle.style.cursor = "pointer";

        logoTitle.addEventListener("click", function() {
            window.location.href = basePrefix + "index.html";
        });
    }

    //lightbox function for the homepage/ index page:
    const cardGrid = document.querySelector(".card-grid");

    if (cardGrid) {
        const artworkCards = Array.from(document.querySelectorAll(".artwork-card"));
        const overlay = document.getElementById("lightboxOverlay");
        const mediaContainer = document.getElementById("lightboxMediaContainer");
        const closeBtn = document.querySelector(".lightbox-close");
        const prevBtn = document.querySelector(".lightbox-prev");
        const nextBtn = document.querySelector(".lightbox-next");

        let currentIndex = 0;

        function showMedia(index) {
            mediaContainer.innerHTML = "";
            const activeCard = artworkCards[index];
            const originalMedia = activeCard.querySelector("img, video");

            if (!originalMedia) return;

            if (originalMedia.tagName.toLowerCase() === "video") {
                const videoClone = document.createElement("video");
                const originalSource = originalMedia.querySelector("source");

                videoClone.src = originalSource ? originalSource.src : originalMedia.src;
                videoClone.autoplay = true;
                videoClone.controls = true;
                videoClone.loop = true;
                videoClone.muted = false;
                mediaContainer.appendChild(videoClone);
            } else {
                const imgClone = document.createElement("img");
                imgClone.src = originalMedia.src;
                imgClone.alt = "Expanded Portfolio Visual View";
                mediaContainer.appendChild(imgClone);
            }
        }

        //navigation for the lightbox overlay
        function openLightbox(index) {
            currentIndex = index;
            showMedia(currentIndex);
            overlay.style.display = "flex";
            document.body.style.overflow = "hidden";
        }

        function closeLightbox() {
            overlay.style.display = "none";
            mediaContainer.innerHTML = "";
            document.body.style.overflow = "";
        }

        function navigateNext() {
            currentIndex = (currentIndex + 1) % artworkCards.length;
            showMedia(currentIndex);
        }

        function navigatePrev() {
            currentIndex = (currentIndex - 1 + artworkCards.length) % artworkCards.length;
            showMedia(currentIndex);
        }

        //event listeners for the lightbox functionality
        artworkCards.forEach((card, index) => {
            card.addEventListener("click", function () {
                openLightbox(index);
            });
        });

        closeBtn.addEventListener("click", closeLightbox);
        nextBtn.addEventListener("click", navigateNext);
        prevBtn.addEventListener("click", navigatePrev);

        overlay.addEventListener("click", function (e) {
            if (e.target === overlay || e.target === mediaContainer) {
                closeLightbox();
            }
        });

        //keyboard navigation for the lightbox
        document.addEventListener("keydown", function (e) {
            if (overlay.style.display === "flex") {
                if (e.key === "ArrowRight") navigateNext();
                if (e.key === "ArrowLeft") navigatePrev();
                if (e.key === "Escape") closeLightbox();
            }
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

    if (nextBtn && prevBtn && track) {

        const getScrollAmount = () => {
            const firstCard = track.querySelector('.flip-card');
            if (firstCard) {
                const cardWidth = firstCard.getBoundingClientRect().width;
                const computedGap = parseFloat(window.getComputedStyle(track).gap) || 0;
                return cardWidth + computedGap;
            }
            return 330;
        };

        nextBtn.addEventListener('click', () => {
            track.scrollLeft += getScrollAmount();
        });

        prevBtn.addEventListener('click', () => {
            track.scrollLeft -= getScrollAmount();
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
            const categoryTitle = category.querySelector('h3').textContent.toLowerCase();

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


