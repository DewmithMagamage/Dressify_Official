document.addEventListener("DOMContentLoaded", function () {
    // Pop-up window functions
    function openPopup() {
        document.getElementById("popup").classList.add("active");
    }

    function closePopup() {
        document.getElementById("popup").classList.remove("active");
    }

    // Ensure pop-up buttons are working
    const openPopupBtn = document.getElementById("open-popup");
    const closePopupBtn = document.getElementById("close-popup");

    if (openPopupBtn) {
        openPopupBtn.addEventListener("click", openPopup);
    }
    if (closePopupBtn) {
        closePopupBtn.addEventListener("click", closePopup);
    }

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true
    });

    // Mobile Menu Toggle (Only run if elements exist)
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Close popup container (If element exists)
    const popupContainer = document.getElementById("popup-container");
    if (closePopupBtn && popupContainer) {
        closePopupBtn.addEventListener("click", function () {
            popupContainer.style.display = "none";
        });
    }

    // Countdown Timer
    function updateCountdown() {
        const launchDate = new Date("March 1, 2025 00:00:00").getTime(); // Fixed date format
        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance <= 0) {
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, "0");
        document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
    }

    // Call the function every second
    setInterval(updateCountdown, 1000);
    updateCountdown();
});
