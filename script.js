document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (!menuBtn || !nav) {
        console.log("Menu button ya navigation nahi mila.");
        return;
    }

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("show");

        const isOpen = nav.classList.contains("show");

        menuBtn.setAttribute("aria-expanded", isOpen);

    });

});




document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".hero-slide");

    // Agar slides nahi mile
    if (slides.length === 0) {
        console.log("Hero slides nahi mile.");
        return;
    }

    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    // First slide
    showSlide(currentSlide);

    // Automatic slider
    setInterval(function () {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }, 5000);

});






document.addEventListener("DOMContentLoaded", async function () {
    await loadComponent("site-header", "header.html");
    await loadComponent("site-footer", "footer.html");

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", function () {
            const isOpen = nav.classList.toggle("show");

            menuBtn.setAttribute("aria-expanded", String(isOpen));
            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        });

        const currentPage =
            window.location.pathname.split("/").pop().toLowerCase()
            || "index.html";

        nav.querySelectorAll("a").forEach(function (link) {
            const href = link.getAttribute("href") || "";
            if (href.startsWith("#")) return;

            const linkPage = href.split("#")[0].split("/").pop().toLowerCase();

            link.classList.toggle("active", linkPage === currentPage);
        });
    }
});

async function loadComponent(elementId, fileName) {
    const container = document.getElementById(elementId);
    if (!container) return;

    try {
        const response = await fetch("./" + fileName);

        if (!response.ok) {
            throw new Error(fileName + " load nahi hui: " + response.status);
        }

        container.innerHTML = await response.text();
    } catch (error) {
        console.error("Component loading error:", error);
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".text-slider");

    if (!slider) return;

    const paragraphs = slider.querySelectorAll("p",);
    let currentIndex = 0;

    // Har 0.5 second mein text change hoga
    setInterval(function () {
        paragraphs[currentIndex].classList.remove("active");

        currentIndex = (currentIndex + 1) % paragraphs.length;

        paragraphs[currentIndex].classList.add("active");
    }, 700);
});






document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("nav1 button");
    const sections = document.querySelectorAll(".tab-content");

    // Pehla button aur uska content active
    buttons.forEach(function (button, index) {
        if (index === 0) {
            button.classList.add("active");
        }

        button.addEventListener("click", function () {

            // Sabhi buttons se active class hatao
            buttons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            // Click kiye button ko active karo
            button.classList.add("active");

            // Sabhi content hide karo
            sections.forEach(function (section) {
                section.style.display = "none";
            });

            // Click kiye button ka content show karo
            const targetId = button.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.style.display = "block";
            }
        });
    });

    // Shuru mein sirf pehle section ko show karo
    sections.forEach(function (section, index) {
        section.style.display = index === 0 ? "block" : "none";
    });
});







document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".team-card");

    // Show all cards if IntersectionObserver is unavailable.
    if (!("IntersectionObserver" in window)) {
        cards.forEach(function (card) {
            card.classList.add("visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        function (entries, observerInstance) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    cards.forEach(function (card) {
        observer.observe(card);
    });
});





document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".achievement-card");

    // Show cards immediately if animation observation is unsupported.
    if (!("IntersectionObserver" in window)) {
        cards.forEach(function (card) {
            card.classList.add("visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        function (entries, observerInstance) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    cards.forEach(function (card) {
        observer.observe(card);
    });
});




// Project cards and image links are written directly in index.html.
// Replace each img src="PASTE_IMAGE_LINK_HERE" in index.html with your image URL.
const categoryFilters = document.getElementById("categoryFilters");
const projectGrid = document.getElementById("projectGrid");
const resultsMessage = document.getElementById("resultsMessage");
const mainTabs = document.querySelectorAll(".main-tab");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

let activeCategory = "Tall Structures";
let activeView = "type";

function renderProjects() {
  let visibleCount = 0;
  projectCards.forEach((card) => {
    const matchesCategory = card.dataset.category === activeCategory;
    const matchesView = activeView === "type" || card.dataset.type === "international";
    const showCard = matchesCategory && matchesView;
    card.hidden = !showCard;
    if (showCard) visibleCount++;
  });

  resultsMessage.textContent = `${visibleCount} project${visibleCount === 1 ? "" : "s"}`;
}

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-btn");
  if (!button) return;
  filterButtons.forEach((item) => item.classList.toggle("active", item === button));
  activeCategory = button.dataset.category;
  renderProjects();
});

mainTabs.forEach((button) => {
  button.addEventListener("click", () => {
    mainTabs.forEach((item) => item.classList.toggle("active", item === button));
    activeView = button.dataset.view;
    renderProjects();
  });
});

// If an image URL has not been added yet, show a neutral placeholder background.
document.querySelectorAll(".project-image").forEach((image) => {
  image.addEventListener("error", () => {
    image.style.visibility = "hidden";
    image.closest(".project-image-wrap").classList.add("image-placeholder");
  });
});

renderProjects();






    const markers = document.querySelectorAll(".country-marker");

    const popup = document.getElementById("countryPopup");
    const countryName = document.getElementById("countryName");
    const countryDescription = document.getElementById("countryDescription");
    const closePopup = document.getElementById("closePopup");

    const countryDetails = {
        "India": "Explore our engineering and construction presence in India.",
        "United States": "Discover our engineering and construction presence in the United States.",
        "United Kingdom": "Discover our engineering and construction presence in the United Kingdom.",
        "Germany": "Explore our engineering and construction presence in Germany.",
        "Canada": "Discover our engineering and construction presence in Canada.",
        "Japan": "Explore our engineering and construction presence in Japan."
    };

    // Open popup when a marker is clicked
    markers.forEach(marker => {

        function showCountry() {
            const country = marker.dataset.country;

            countryName.textContent = country;

            countryDescription.textContent =
                countryDetails[country] ||
                "Explore our engineering and construction presence.";

            popup.classList.add("show");
        }

        marker.addEventListener("click", showCountry);

        // Keyboard support
        marker.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                showCountry();
            }
        });

    });

    // Close popup
    closePopup.addEventListener("click", function () {
        popup.classList.remove("show");
    });

    // Close popup using Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            popup.classList.remove("show");
        }
    });