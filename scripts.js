document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Dynamic Navbar Styling on Scroll ---
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Hide/show navbar on scroll down/up
        if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Change navbar background on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(16, 18, 19, 0.9)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'rgba(20, 22, 24, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });

    // --- Fade-in Animation on Scroll ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once it's visible
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Fun Console Message for Recruiters ---
    console.log(
        '%c👋 Hello there, fellow developer!', 
        'color: #4a9eff; font-size: 1.5em; font-weight: bold; background-color: #1a1a1a; padding: 5px;'
    );
    console.log(
        '%cThanks for checking out my code. Let\'s build something great together. Get in touch!',
        'color: #ffffff; font-size: 1em;'
    );
    console.log(
        '%c📧 rstanley8@student.gsu.edu',
        'color: #6eb4ff; font-size: 1em;'
    );
});