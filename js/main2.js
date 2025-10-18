// ==================== PRELOADER ANIMATION ====================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = Math.random() * 5 + 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        // Random color from gradient
        const colors = ['#00C2FF', '#8B5CF6', '#7F00FF'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;

        particlesContainer.appendChild(particle);
    }
}

// Simulate loading progress
function simulateProgress() {
    const progressBar = document.getElementById('progressBar');
    let width = 0;

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);

            // Wait a moment then fade out
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                preloader.classList.add('fade-out');
            }, 500);
        } else {
            width += Math.random() * 10;
            if (width > 100) width = 100;
            progressBar.style.width = width + '%';
        }
    }, 200);
}

// Initialize when page loads
window.addEventListener('load', () => {
    createParticles();
    simulateProgress();
});

// ==================== NAVIGATION SYSTEM ====================
const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');
const closeMenu = document.getElementById('closeMenu');
const menuTextCircle = document.getElementById('menuTextCircle');

// --- Generate Perfect Circular Text ---
(function createCircularText() {
    const text = " MENU • MENU • MENU • MENU • ";
    const radius = 60; // Perfect radius for 120px circle
    const angleStep = (2 * Math.PI) / text.length;

    for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.innerText = text[i];

        const angle = i * angleStep;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        span.style.transform = `translate(${x}px, ${y}px) rotate(${angle + Math.PI / 2}rad)`;
        menuTextCircle.appendChild(span);
    }
})();

// --- Toggle Menu ---
hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    menuTextCircle.classList.toggle('paused');

    if (isActive) {
        updateCircularText(" CLOSE • CLOSE • CLOSE • CLOSE • ");
    } else {
        updateCircularText(" MENU • MENU • MENU • MENU • ");
    }
});

// --- Close Menu from Overlay Button ---
closeMenu.addEventListener('click', () => {
    hamburger.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuTextCircle.classList.remove('paused');
    updateCircularText(" MENU • MENU • MENU • MENU • ");
});

// --- Update Circular Text Function ---
function updateCircularText(newText) {
    const spans = menuTextCircle.querySelectorAll('span');
    const radius = 60;
    const angleStep = (2 * Math.PI) / newText.length;

    spans.forEach((span, i) => {
        if (i < newText.length) {
            span.innerText = newText[i];

            const angle = i * angleStep;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            span.style.transform = `translate(${x}px, ${y}px) rotate(${angle + Math.PI / 2}rad)`;
        }
    });

    if (spans.length > newText.length) {
        for (let i = newText.length; i < spans.length; i++) {
            spans[i].remove();
        }
    }
}

// --- Hover Effects for Circular Text ---
hamburger.addEventListener('mouseenter', () => {
    menuTextCircle.style.animationDuration = '8s';
});
hamburger.addEventListener('mouseleave', () => {
    menuTextCircle.style.animationDuration = '15s';
});

// --- Close menu when clicking outside ---
menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        hamburger.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuTextCircle.classList.remove('paused');
        updateCircularText(" MENU • MENU • MENU • MENU • ");
    }
});

// ==================== SCROLL ANIMATION ====================
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

// ==================== SCROLL TO TOP ====================
const scrollTopBtn = document.getElementById('scrollTop');

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Also trigger scroll animations
    animateOnScroll();
});

// Scroll to top functionality
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('.newsletter-input').value;
        alert(`Thank you for subscribing with: ${email}`);
        this.reset();
    });
}

// Service card interactions
document.querySelectorAll('.servicepage-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize animations on load
document.addEventListener('DOMContentLoaded', function () {
    animateOnScroll();
});

// ==================== HERO SECTION ====================
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        hero.classList.add('parallax-active');
    } else {
        hero.classList.remove('parallax-active');
    }

    const layers = document.querySelectorAll('.layer');
    const subtitle = document.querySelector('.hero-subtitle');
    const button = document.querySelector('.hero-btn');

    layers.forEach((layer, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrollPosition * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });

    if (subtitle) subtitle.style.transform = `translateY(${-(scrollPosition * 0.08)}px)`;
    if (button) button.style.transform = `translateY(${-(scrollPosition * 0.05)}px)`;
});

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(particle);
    }
}

document.getElementById('scrollIndicator')?.addEventListener('click', function () {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
});

window.addEventListener('load', createParticles);