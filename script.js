
document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS DE LA GALERÍA
    const gallery = document.getElementById("loqalliGallery");
    const openGallery = document.getElementById("openLoqalliGallery");
    const closeGallery = document.getElementById("closeLoqalliGallery");

    const slides = document.querySelectorAll(".gallery-slide");
    const prevButton = document.getElementById("galleryPrev");
    const nextButton = document.getElementById("galleryNext");

    const counter = document.getElementById("galleryCounter");
    const dotsContainer = document.getElementById("galleryDots");

    // VERIFY THAT ALL ELEMENTS EXIST
    if (
        !gallery || !openGallery || !closeGallery ||
        !prevButton || !nextButton || !counter ||
        !dotsContainer || slides.length === 0
    ) {
        console.error("Loqalli gallery: Some HTML elements are missing.");
        return;
    }

    let currentSlide = 0;

    // CREATE NAVIGATION DOTS
    slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.type = "button";
        dot.classList.add("gallery-dot");
        dot.setAttribute("aria-label", `Go to photo ${index + 1}`);

        dot.addEventListener("click", () => {
            showSlide(index);
        });

        dotsContainer.appendChild(dot);

    });

    const dots = dotsContainer.querySelectorAll(".gallery-dot");

    // CHANGE PHOTO
    function showSlide(index) {

        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });

        counter.textContent =
            `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    }

    // NEXT PHOTO
    nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

    // PREVIOUS PHOTO
    prevButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    // OPEN GALLERY
    function openGalleryWindow() {

        gallery.classList.add("active");
        gallery.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        showSlide(0);
        closeGallery.focus();
    }

    openGallery.addEventListener("click", openGalleryWindow);

    // CLOSE GALLERY
    function closeGalleryWindow() {

        gallery.classList.remove("active");
        gallery.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        openGallery.focus();
    }

    closeGallery.addEventListener("click", closeGalleryWindow);

    // CLOSE WHEN CLICKING OUTSIDE
    gallery.addEventListener("click", (event) => {

        if (event.target === gallery) {
            closeGalleryWindow();
        }

    });

    // KEYBOARD CONTROLS
    document.addEventListener("keydown", (event) => {

        if (!gallery.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeGalleryWindow();
        }

        if (event.key === "ArrowRight") {
            showSlide(currentSlide + 1);
        }

        if (event.key === "ArrowLeft") {
            showSlide(currentSlide - 1);
        }

    });

    // INITIALIZE
    showSlide(0);

    console.log("Loqalli gallery successfully initialized!");

});



// TOOLS & TECHNOLOGIES CAROUSEL
document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".tools-slide");
    const prevButton = document.getElementById("toolsPrev");
    const nextButton = document.getElementById("toolsNext");
    const dots = document.querySelectorAll(".tools-dot");
    const counter = document.getElementById("toolsCounter");

    if (!slides.length || !prevButton || !nextButton || !counter) {
        return;
    }

    let currentSlide = 0;

    function showToolsSlide(index) {

        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });

        counter.textContent =
            `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    }

    nextButton.addEventListener("click", () => {
        showToolsSlide(currentSlide + 1);
    });

    prevButton.addEventListener("click", () => {
        showToolsSlide(currentSlide - 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showToolsSlide(index);
        });
    });

    showToolsSlide(0);

});

// SCROLL REVEAL ANIMATIONS
document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

});


/* SKILLS CAROUSEL */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".skills-carousel-track");
    const cards = document.querySelectorAll(".skill-card");
    const dots = document.querySelectorAll(".skill-dot");
    const prev = document.querySelector(".skills-prev");
    const next = document.querySelector(".skills-next");
    const carousel = document.querySelector(".skills-carousel");

    if (!track || !cards.length || !dots.length || !prev || !next) return;

    let currentIndex = 0;
    let autoPlay;

    function showSkill(index) {
        currentIndex = (index + cards.length) % cards.length;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        cards.forEach((card, i) => {
            card.classList.toggle("active", i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlay = setInterval(() => {
            showSkill(currentIndex + 1);
        }, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlay);
    }

    next.addEventListener("click", () => {
        showSkill(currentIndex + 1);
        startAutoPlay();
    });

    prev.addEventListener("click", () => {
        showSkill(currentIndex - 1);
        startAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSkill(index);
            startAutoPlay();
        });
    });

    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);

    showSkill(0);
    startAutoPlay();

});
