// MOBILE NAVIGATION TOGGLE
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links li a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// NAVBAR ACTIVE LINK & SCROLL EFFECT 
const navbar = document.querySelector(".navbar");
const navLinkElements = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

// Update active link based on scroll position
function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll effect to navbar
function handleNavbarScroll() {
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveLink();
}

window.addEventListener('scroll', handleNavbarScroll);
updateActiveLink(); // Set initial active state

// TYPING TEXT EFFECT 
const typedText = document.querySelector(".typing");

const words = [
    "a Front-End Developer",
    "a Designer",
    "a Programmer",
    "a UI/UX Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let speed = 120;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (!isDeleting) {
        typedText.textContent = currentWord.slice(0, ++charIndex);
        if (charIndex === currentWord.length) {
            isDeleting = true;
            speed = 40; // pause before deleting
        }
    } else {
        typedText.textContent = currentWord.slice(0, --charIndex);
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // next word
            speed = 250;
        }
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ===== SCROLL ANIMATIONS WITH INTERSECTION OBSERVER =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation classes based on element type
            if (entry.target.classList.contains('about-container')) {
                entry.target.querySelector('.about-image').classList.add('fade-in-left');
                entry.target.querySelector('.about-content').classList.add('fade-in-right');
            } else if (entry.target.classList.contains('skills-grid')) {
                entry.target.querySelectorAll('.skill-card').forEach(card => {
                    card.classList.add('scale-in');
                });
            } else if (entry.target.classList.contains('project-list')) {
                entry.target.querySelectorAll('.project-card').forEach(card => {
                    card.classList.add('fade-in');
                });
            } else if (entry.target.classList.contains('contact-details')) {
                entry.target.querySelectorAll('.contact-item').forEach(item => {
                    item.classList.add('fade-in-up');
                });
            } else {
                // Default fade-in animation for other elements
                entry.target.classList.add('fade-in');
            }
            
            // Unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('.about-container').forEach(el => observer.observe(el));
document.querySelectorAll('.skills-grid').forEach(el => observer.observe(el));
document.querySelectorAll('.project-list').forEach(el => observer.observe(el));
document.querySelectorAll('.contact-details').forEach(el => observer.observe(el));

// CONTACT FORM VALIDATION & SUBMISSION 
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Add real-time validation to inputs
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });

    input.addEventListener('focus', () => {
        input.classList.remove('error');
        input.parentElement.querySelector('.error-message').classList.remove('show');
    });
});

function validateField(field) {
    const errorElement = field.parentElement.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';

    if (field === nameInput) {
        if (field.value.trim().length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
    } else if (field === emailInput) {
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (field === messageInput) {
        if (field.value.trim().length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
    }

    if (isValid) {
        field.classList.add('valid');
        field.classList.remove('error');
        errorElement.classList.remove('show');
    } else {
        field.classList.add('error');
        field.classList.remove('valid');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }

    return isValid;
}

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);

    if (isNameValid && isEmailValid && isMessageValid) {
        // Form is valid - show success message
        contactForm.classList.add('hide');
        successMessage.classList.add('show');

        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.classList.remove('hide');
            successMessage.classList.remove('show');
            nameInput.classList.remove('valid', 'error');
            emailInput.classList.remove('valid', 'error');
            messageInput.classList.remove('valid', 'error');
        }, 3000);
    }
});

// LIGHTBOX IMAGE MODAL
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClose = document.getElementById('lightboxClose');
const viewLiveBtns = document.querySelectorAll('.view-live-btn');

// Open lightbox when View Live button is clicked
viewLiveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const imageSrc = btn.getAttribute('data-image');
        const imageTitle = btn.getAttribute('data-title');
        
        lightboxImage.src = imageSrc;
        lightboxTitle.textContent = imageTitle;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

// Close lightbox when close button is clicked
lightboxClose.addEventListener('click', () => {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Allow scrolling
});

// Close lightbox when clicking outside the content
lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close lightbox when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// THEME TOGGLE (LIGHT/DARK MODE)
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load saved theme preference on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const isLightMode = document.body.classList.toggle('light-mode');
    
    if (isLightMode) {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.animation = 'spin 0.6s ease-in-out';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.style.animation = 'spin 0.6s ease-in-out';
    }
    
    // Remove animation class
    setTimeout(() => {
        themeToggle.style.animation = 'none';
    }, 600);
});

// Load theme on page load
loadTheme();
