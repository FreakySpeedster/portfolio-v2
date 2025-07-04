// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeSmoothScrolling();
});

function initializeAnimations() {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        })
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .to('.hero-buttons', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.3');

    // About section animations
    gsap.set('.about-title, .about-content, .about-image', {
        opacity: 0,
        y: 50
    });

    ScrollTrigger.create({
        trigger: '#about',
        start: 'top 80%',
        onEnter: () => {
            gsap.timeline()
                .to('.about-title', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                })
                .to('.about-content', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                }, '-=0.4')
                .to('.about-image', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                }, '-=0.6');
        }
    });

    // Projects section animations
    gsap.set('.projects-title, .project-card', {
        opacity: 0,
        y: 50
    });

    ScrollTrigger.create({
        trigger: '#projects',
        start: 'top 80%',
        onEnter: () => {
            gsap.timeline()
                .to('.projects-title', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                })
                .to('.project-card', {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    stagger: 0.2
                }, '-=0.4');
        }
    });

    // Contact section animations
    gsap.set('.contact-title, .contact-content', {
        opacity: 0,
        y: 50
    });

    ScrollTrigger.create({
        trigger: '#contact',
        start: 'top 80%',
        onEnter: () => {
            gsap.timeline()
                .to('.contact-title', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                })
                .to('.contact-content', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                }, '-=0.4');
        }
    });

    // Hover animations for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-primary');
                    link.classList.add('text-gray-700');
                });

                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.remove('text-gray-700');
                    activeLink.classList.add('text-primary');
                }
            }
        });
    });

    // Mobile menu functionality (if needed)
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Add mobile menu functionality here
            console.log('Mobile menu clicked');
        });
    }
}

function initializeSmoothScrolling() {
    // Additional smooth scrolling enhancements
    const buttons = document.querySelectorAll('a[href^="#"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function to add entrance animations to elements
function addEntranceAnimation(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        gsap.set(element, {
            opacity: 0,
            y: options.y || 50
        });

        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    duration: options.duration || 0.8,
                    ease: options.ease || 'power2.out',
                    delay: options.delay || 0
                });
            }
        });
    });
}

// Initialize additional animations for any new content
function initializeCustomAnimations() {
    // Add any custom animations here
    // Example: addEntranceAnimation('.custom-element', { duration: 1, delay: 0.2 });
}
