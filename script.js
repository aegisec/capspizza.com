// Add this at the beginning of your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Create a placeholder for the header
    const headerPlaceholder = document.createElement('div');
    headerPlaceholder.id = 'header-placeholder';
    document.body.insertBefore(headerPlaceholder, document.body.firstChild);

    // Wait a brief moment to ensure Tailwind is initialized
    setTimeout(() => {
        fetch('/components/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.outerHTML = data;
                initializeMobileMenu();
            });
    }, 100);

    // Load other components
    loadComponent('visit-us-section', '/components/visit-us.html');
});

// Wrap existing mobile menu code in a function
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission handler
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });

        // Navbar background opacity on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('bg-white');
                header.classList.remove('bg-white/90', 'backdrop-blur-sm');
            } else {
                header.classList.add('bg-white/90', 'backdrop-blur-sm');
                header.classList.remove('bg-white');
            }
        });
    }
}

// Add this function to your script.js
function loadComponent(elementId, componentPath) {
    const placeholder = document.getElementById(elementId);
    if (placeholder) {
        fetch(componentPath)
            .then(response => response.text())
            .then(data => {
                placeholder.outerHTML = data;
            });
    }
}
