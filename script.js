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

// Simple mock reply logic (you can replace this with API later)

function getBotReply(userMessage) {
    const lowerMessage = userMessage.toLowerCase().trim();

    // Greeting variations
    if (containsAny(lowerMessage, [
        "hi", "hello", "hey", "good morning", "good evening", "good afternoon", "what's up", "yo", "hiya", "greetings"
    ])) {
        return "Hello there! 👋 Welcome to Dressify. How can I help you today?";
    }

    // How it works - detailed + casual
    if (containsAny(lowerMessage, [
        "how does this work", "how does it work", "how dressify works", "what is dressify", 
        "explain dressify", "how to use", "how can i use", "what is this site", "how to try clothes"
    ])) {
        return "Great question! 👗 Dressify works by letting you upload your photo, select any garment, and we’ll show you a preview of how it fits — all virtually! 📸";
    }

    // Fit & Preview
    if (containsAny(lowerMessage, [
        "fit", "fit preview", "preview", "try on", "fitting", "virtual try", "clothes fit", 
        "how to see fit", "how will it look on me", "try clothes"
    ])) {
        return "To see how it fits, upload your photo 📸, pick any garment you like, and Dressify will show you a virtual try-on preview instantly! ✨";
    }

    // Upload help
    if (containsAny(lowerMessage, [
        "upload", "upload photo", "upload image", "choose photo", "how to upload", 
        "how to add photo", "where to upload", "photo upload button"
    ])) {
        return "To upload your photo, go to the 'Preview' section and click on 'Upload Photo'. Simple and quick! 🚀";
    }

    // Product and garment details
    if (containsAny(lowerMessage, [
        "products", "clothes", "garments", "items", "what can i try", "what do you have", 
        "what are the options", "show clothes", "available clothes", "show me dresses"
    ])) {
        return "We have a fantastic collection — from trendy tops to stunning dresses, casual jeans to elegant jackets. Browse and try them all! 👗👖";
    }

    // Style or outfit recommendations
    if (containsAny(lowerMessage, [
        "recommend", "suggest", "help me choose", "style tips", "what should i wear", 
        "fashion advice", "help with outfit", "outfit ideas", "clothes for me"
    ])) {
        return "Happy to help! 😊 Tell me — are you looking for casual, party, or formal wear? I can suggest outfits for any occasion!";
    }

    // Price and cost queries
    if (containsAny(lowerMessage, [
        "price", "how much", "cost", "what’s the price", "is it expensive", "pricing", 
        "price list", "how much clothes", "price of dress"
    ])) {
        return "Every garment shows its price when you select it. Just browse the collection, and you’ll see the prices right there! 💰";
    }

    // Contact and support
    if (containsAny(lowerMessage, [
        "contact", "support", "customer service", "help center", "get help", 
        "contact dressify", "reach support", "help me"
    ])) {
        return "You can contact our friendly support team at support@dressify.com or through our Contact page. We’re here to help! 💬";
    }

    // Delivery, shipping, order tracking
    if (containsAny(lowerMessage, [
        "delivery", "shipping", "how long", "order status", "when will i get", 
        "order tracking", "track my order", "shipping time"
    ])) {
        return "We typically deliver within 3-5 business days. 📦 You can track your order anytime from your Dressify account!";
    }

    // Returns & refunds
    if (containsAny(lowerMessage, [
        "return", "refund", "exchange", "send back", "return policy", 
        "refund policy", "what if it doesn’t fit", "can i return"
    ])) {
        return "No stress! 😌 You can return or exchange any item within 14 days if something doesn’t fit. Check our Return Policy for all the details!";
    }

    // Payment methods
    if (containsAny(lowerMessage, [
        "payment", "pay", "how to pay", "payment methods", "can i pay online", 
        "credit card", "payment options", "what payments do you accept"
    ])) {
        return "We accept major payment methods including credit/debit cards, online banking, and digital wallets like PayPal. Secure & easy! 💳";
    }

    // Thank you messages
    if (containsAny(lowerMessage, [
        "thank", "thanks", "appreciate", "thank you", "thanks a lot", "cheers"
    ])) {
        return "You’re most welcome! 😃 Let me know if there’s anything else I can do for you.";
    }

    // bye messages
    if (containsAny(lowerMessage, [
        "bye", "goodbye", "see you", "see ya", "take care", "later", "talk to you later", "ciao", "farewell"
    ])) {
        return "Goodbye! 👋 It was nice chatting with you. Come back anytime if you need help with Dressify!";
    }

    // Polite no-understanding fallback
    return "Hmm... I didn’t quite catch that. 🤔 Can you rephrase? You can ask me about how Dressify works, how to upload your photo, prices, delivery, returns, or even get fashion tips!";
}

// Helper function to check if message contains any keyword
function containsAny(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
}
