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

        // Optional: Restart preloader on button click for demo
        document.querySelector('.btn').addEventListener('click', function(e) {
            e.preventDefault();
            const preloader = document.getElementById('preloader');
            const progressBar = document.getElementById('progressBar');
            
            preloader.classList.remove('fade-out');
            progressBar.style.width = '0%';
            
            setTimeout(() => {
                simulateProgress();
            }, 500);
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

// ==================== COUNTER ANIMATION (about section) ====================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => fadeObserver.observe(element));

function animateCounter(counterElement, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counterElement.textContent = target;
            clearInterval(timer);
        } else {
            counterElement.textContent = Math.floor(current);
        }
    }, 30);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            setTimeout(() => animateCounter(counter, target), 300);
            counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
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

// ==================== FORM SUBMISSION ====================
const cards = document.querySelectorAll('.connect-card');
const title = document.querySelector('.detail-title');
const details = document.querySelector('.connect-details p');
const whatsappBtn = document.querySelector('.btn.whatsapp');
const callBtn = document.querySelector('.btn.call');

const content = {
    chat: {
        title: "Quick Chat",
        text: "Perfect for quick questions, pricing inquiries, or initial consultations. Our team is available for brief conversations to help you get started with your digital transformation journey.",
        whatsapp: "https://wa.me/1234567890?text=Hi%20Synorasol!%20I'd%20like%20to%20have%20a%20quick%20chat%20about%20your%20services.",
        call: "tel:+1234567890"
    },
    project: {
        title: "Project Discussion",
        text: "Discuss your vision, goals, and requirements directly with our experts. We'll help you map out the perfect strategy for success and bring your digital ideas to life with precision and creativity.",
        whatsapp: "https://wa.me/1234567890?text=Hi%20Synorasol!%20I%20have%20a%20project%20I'd%20like%20to%20discuss%20with%20your%20team.",
        call: "tel:+1234567891"
    },
    partner: {
        title: "Partnership Opportunity",
        text: "We love collaborations! Let's explore partnership opportunities to bring innovative ideas to life and expand our reach together. Join us in creating exceptional digital experiences.",
        whatsapp: "https://wa.me/1234567890?text=Hi%20Synorasol!%20I'm%20interested%20in%20exploring%20partnership%20opportunities%20with%20you.",
        call: "tel:+1234567892"
    },
    career: {
        title: "Career Opportunity",
        text: "Join our growing team of creative thinkers, designers, and developers at Synorasol. Discover new opportunities to build your career in an innovative and dynamic environment.",
        whatsapp: "https://wa.me/1234567890?text=Hi%20Synorasol!%20I'm%20interested%20in%20career%20opportunities%20at%20your%20company.",
        call: "tel:+1234567893"
    }
};

// Initialize with first card active
let currentActive = 'chat';

cards.forEach(card => {
    card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');

        // Remove active class from all cards
        cards.forEach(c => {
            c.classList.remove('active');
            c.style.transform = 'translateY(0)';
        });

        // Add active class to clicked card
        card.classList.add('active');
        card.style.transform = 'translateY(-8px)';

        // Update content with smooth transition
        updateContent(type);
        currentActive = type;
    });

    // Add hover effects
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('active')) {
            card.style.transform = 'translateY(-4px)';
        }
    });

    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('active')) {
            card.style.transform = 'translateY(0)';
        }
    });
});

function updateContent(type) {
    // Add fade out effect
    details.style.opacity = '0';
    title.style.opacity = '0';

    setTimeout(() => {
        title.textContent = content[type].title;
        details.textContent = content[type].text;
        whatsappBtn.href = content[type].whatsapp;
        callBtn.href = content[type].call;

        // Add fade in effect
        details.style.opacity = '1';
        title.style.opacity = '1';
    }, 300);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate cards on load
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ==================== INITIAL ANIMATIONS ====================
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

// ==================== SERVICES SECTION PARALLAX ====================
window.addEventListener('scroll', function () {
    const servicesSection = document.querySelector('.services');
    if (!servicesSection) return;

    const scrollY = window.scrollY;
    servicesSection.style.backgroundPositionY = `${scrollY * 0.4}px`;
});

// Optional: mousemove 3D depth effect
document.querySelector('.services')?.addEventListener('mousemove', e => {
    const cards = document.querySelectorAll('.service-card');
    const { innerWidth, innerHeight } = window;
    const xAxis = (innerWidth / 2 - e.pageX) / 80;
    const yAxis = (innerHeight / 2 - e.pageY) / 80;

    cards.forEach(card => {
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
});
document.querySelector('.services')?.addEventListener('mouseleave', () => {
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.transform = `rotateY(0) rotateX(0)`;
    });
});


///========================company cards interaction================
const companyCards = document.querySelectorAll('.company-card');

companyCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add subtle scale effect to all cards
        companyCards.forEach(c => {
            if (c !== card) {
                c.style.transform = 'scale(0.95)';
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        // Reset all cards
        companyCards.forEach(c => {
            c.style.transform = '';
        });
    });

    // Click effect
    card.addEventListener('click', () => {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(122, 90, 248, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';

        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number-large');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseInt(target.textContent);
            const duration = 2000;
            const step = finalValue / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= finalValue) {
                    target.textContent = finalValue + '+';
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(current) + '+';
                }
            }, 16);

            observer.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    observer.observe(stat);
});

// Marquee hover pause
const marqueeTrack = document.querySelector('.marquee-track');

marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
});

marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
});

// Initialize animations on load
window.addEventListener('load', () => {
    // Animate cards on load
    companyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Animate stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
    });
});

  // ==================== SCROLL TO TOP ====================
        const scrollTopBtn = document.getElementById('scrollTop');
        
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
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
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('.newsletter-input').value;
                alert(`Thank you for subscribing with: ${email}`);
                this.reset();
            });
        }