let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function changeSlide(index) {
    slides[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");

    currentIndex = index;

    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
}


function autoChangeSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    changeSlide(nextIndex);
}

let slideInterval = setInterval(autoChangeSlide, 6000);

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        changeSlide(index);
        clearInterval(slideInterval); 
        slideInterval = setInterval(autoChangeSlide, 4000);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Pop-up window functions
    function openPopup() {
        document.getElementById("popup").classList.add("active");
    }

    function closePopup() {
        document.getElementById("popup").classList.remove("active");
    }

    document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute("href"));
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll fade-in effect
    const sections = document.querySelectorAll(".about-section, .features, .hero");

    function revealOnScroll() {
        const screenPosition = window.innerHeight / 1.2;
        sections.forEach(section => {
            if (section.getBoundingClientRect().top < screenPosition) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Initial check on page load
});


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
    const menuItems = document.querySelectorAll(".nav-links a"); // Select all menu links

    if (mobileMenu && navLinks) {
        // Toggle menu on hamburger click
        mobileMenu.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        // Close menu when a link is clicked
        menuItems.forEach(item => {
            item.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
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
        const launchDate = new Date("March 17, 2025 00:00:00").getTime(); 
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

    document.addEventListener("DOMContentLoaded", function () {
        const aboutSection = document.querySelector(".about-section");
    
        window.addEventListener("scroll", function () {
            const sectionPosition = aboutSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
    
            if (sectionPosition < screenPosition) {
                aboutSection.classList.add("visible");
            }
        });
    });
    

    // Call the function every second
    setInterval(updateCountdown, 1000);
    updateCountdown();
});

function toggleFeature(card) {
    card.classList.toggle("active");
}


//chat bot
// Open/Close the chatbot window
function toggleChat() {
    const chatWindow = document.getElementById('chatbot-window');
    
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        resetChat();
        chatWindow.style.display = 'flex';
        document.getElementById('chatbot-input').focus(); // Focus input when opened
    } else {
        chatWindow.style.display = 'none';
    }
}

// Reset chat messages every time chatbot opens
function resetChat() {
    const chatBody = document.getElementById('chatbot-body');
    chatBody.innerHTML = '<div class="bot-message">Hi there! How can I assist you today? 😊</div>';
    document.getElementById('chatbot-input').value = '';
}

// Send message when clicking button or pressing Enter
function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (message === "") return;

    const chatBody = document.getElementById('chatbot-body');

    // Add user message to chat
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.innerText = `You: ${message}`;
    chatBody.appendChild(userMessage);

    input.value = ''; // Clear input after sending

    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll down

    // Simulate bot response
    setTimeout(() => {
        const botReply = getBotReply(message);
        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.innerText = `Bot: ${botReply}`;
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

// Add support for Enter key to send message
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chatbot-input');
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendChatMessage();
        }
    });
});

function getBotReply(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("hi") || lowerMessage.includes("hello")) {
        return "Hello! How can I assist you with Dressify?";
    } else if (lowerMessage.includes("fit") || lowerMessage.includes("preview")) {
        return "You can upload your photo and preview garments in Dressify!";
    } else if (lowerMessage.includes("how") && lowerMessage.includes("work")) {
        return "It works by matching your uploaded image with the selected garment for a virtual try-on.";
    } else if (lowerMessage.includes("thank")) {
        return "You're most welcome! 😊";
    } else {
        return "I'm here to help! Ask me anything about Dressify.";
    }
}
