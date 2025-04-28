document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Toggle ---
    const hamburger = document.getElementById('hamburger-button');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Optional: Change hamburger icon to 'X' when menu is open
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // --- Close Mobile Menu When a Link is Clicked ---
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                // Reset hamburger icon
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Smooth Scrolling for Anchor Links (Fallback & Offset Handling) ---
    // Note: CSS scroll-behavior: smooth handles basic cases, but JS offers more control
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]'); // Select all sections with an ID

    function navHighlighter() {
        let scrollY = window.pageYOffset; // Get current vertical position

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Adjust offset slightly to trigger highlighting a bit earlier/later if needed
            const sectionTop = current.offsetTop - (document.querySelector('.navbar').offsetHeight + 50); // Subtract navbar height + extra offset
            const sectionId = current.getAttribute('id');

            /*
            If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
            - To consider flows: > is greater than, < is less than
            */
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', navHighlighter);
    // Initial call to highlight link on page load
    navHighlighter();


    // --- Update Footer Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Add subtle animations on scroll ---
    // Example using Intersection Observer API for fade-in effect
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of item needs to be visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            } else {
                 // Optional: Reset animation if element scrolls out of view
                 // entry.target.style.opacity = 0;
                 // entry.target.style.transform = 'translateY(20px)';
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll('.section h2, .about-container > div, .skill-item, .timeline-item, .project-card, .achievements-list li, .contact-info a');

    elementsToAnimate.forEach(el => {
        // Initial state for animation
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(el);
    });


}); // End DOMContentLoaded