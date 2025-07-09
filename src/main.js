// Import GSAP (these will be loaded from CDN as they're in the HTML)
// In development, Vite will handle hot reloading

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeSmoothScrolling();
    initializeSplitTextAnimation();
});

// Hot Module Replacement (HMR) support
if (import.meta.hot) {
    import.meta.hot.accept();
}

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

    // Magic star rotation animation
    const magicStar = document.querySelector('.magic-star');
    if (magicStar) {
        // Set transform origin to center for smooth rotation
        gsap.set(magicStar, { transformOrigin: '50% 50%' });
        // Infinite rotation tween (only rotates, does not overwrite translation)
        let rotateTween = gsap.to(magicStar, {
            rotate: 360,
            duration: 8,
            ease: 'linear',
            repeat: -1,
        });

        // Speed up on hover
        magicStar.addEventListener('mouseenter', () => {
            rotateTween.timeScale(3);
        });
        magicStar.addEventListener('mouseleave', () => {
            rotateTween.timeScale(1);
        });

        // Speed up on scroll, slow down after scroll stops
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            rotateTween.timeScale(2);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                rotateTween.timeScale(1);
            }, 300);
        });
    }

}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const desktopMenuBtn = document.getElementById('desktop-menu-btn');
    const desktopNavDropdown = document.getElementById('desktop-nav-dropdown');

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

    // Mobile menu functionality
    if (mobileMenuBtn && mobileNavOverlay) {
        let isOpen = false;
        const openMenu = () => {
            mobileNavOverlay.style.display = 'flex';
            gsap.fromTo(mobileNavOverlay, { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: 'power2.out' });
            isOpen = true;
        };
        const closeMenu = () => {
            gsap.to(mobileNavOverlay, { scaleY: 0, duration: 0.4, ease: 'power2.in', onComplete: () => {
                mobileNavOverlay.style.display = 'none';
            }});
            isOpen = false;
        };
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!isOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        });
        // Close menu when clicking outside or on a link
        mobileNavOverlay.addEventListener('click', function(e) {
            if (e.target === mobileNavOverlay || e.target.tagName === 'A') {
                closeMenu();
            }
        });
        // Optional: close on escape key
        document.addEventListener('keydown', function(e) {
            if (isOpen && e.key === 'Escape') {
                closeMenu();
            }
        });
    }

    // Desktop dropdown menu functionality
    if (desktopMenuBtn && desktopNavDropdown) {
        let isDropdownOpen = false;
        const openDropdown = () => {
            gsap.set(desktopNavDropdown, { scaleY: 0, opacity: 0, transformOrigin: 'top' });
            desktopNavDropdown.style.display = 'flex';
            gsap.to(desktopNavDropdown, {
                scaleY: 1,
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
            });
            isDropdownOpen = true;
        };
        const closeDropdown = () => {
            gsap.to(desktopNavDropdown, {
                scaleY: 0,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    desktopNavDropdown.style.display = 'none';
                }
            });
            isDropdownOpen = false;
        };
        desktopMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!isDropdownOpen) {
                openDropdown();
            } else {
                closeDropdown();
            }
        });
        // Close dropdown when clicking outside or on a link
        document.addEventListener('click', function(e) {
            if (
                isDropdownOpen &&
                !desktopNavDropdown.contains(e.target) &&
                !desktopMenuBtn.contains(e.target)
            ) {
                closeDropdown();
            }
        });
        desktopNavDropdown.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                closeDropdown();
            }
        });
        // Optional: close on escape key
        document.addEventListener('keydown', function(e) {
            if (isDropdownOpen && e.key === 'Escape') {
                closeDropdown();
            }
        });

        // Add GSAP hover effect to dropdown links (like .my-name chars)
        const dropdownLinks = desktopNavDropdown.querySelectorAll('a');
        dropdownLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.01,
                    duration: 0.2,
                    ease: 'power1.out',
                    
                });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power1.out',
                    filter: 'blur(0px)'
                });
            });
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

function initializeSplitTextAnimation() {
    const myNameElement = document.querySelector('.my-name');
    
    if (myNameElement) {
        const text = myNameElement.textContent;
        myNameElement.textContent = ''; // Clear the original text
        
        // Create mask and char spans for each character
        const chars = text.split('').map(char => {
            const mask = document.createElement('span');
            mask.className = 'char-mask';
            
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
            span.className = 'char';
            mask.appendChild(span);
            myNameElement.appendChild(mask);
            return span;
        });
        
        // Set initial state - hide all characters below with opacity 0
        gsap.set(chars, {
            opacity: 0,
            y: '100%'
        });
        
        // Create the animation timeline
        const splitTimeline = gsap.timeline({
            delay: 0.5 // Delay before animation starts
        });
        
        // Animate characters in with stagger, sliding up (snappy start, slow end)
        splitTimeline.to(chars, {
            opacity: 1,
            y: '0%',
            duration: 0.7, // Slightly longer for visible slow down
            ease: "power4.out", // Fast start, slow end
            stagger: 0.03
        });
        
        // Optional: Add hover effect to individual characters
        chars.forEach(char => {
            char.addEventListener('mouseenter', () => {
                gsap.to(char, {
                    scale: 1.1,
                    duration: 0.2,
                    ease: "power1.out",
                    filter: 'blur(50px)'
                });
            });
            
            char.addEventListener('mouseleave', () => {
                gsap.to(char, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power1.out",
                    filter: 'blur(0px)'
                });
            });

            char.addEventListener('onclick', () => {
                gsap.to(char, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power1.out",
                    filter: 'blur(0px)'
                });
            });
        });
    }
}
