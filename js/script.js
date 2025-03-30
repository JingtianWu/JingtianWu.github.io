// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to sections when they come into view
    const observeElements = document.querySelectorAll('.card');
    
    // Only run if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If element is in view
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    // Unobserve after animation is done
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of element is visible
        
        // Observe each card element
        observeElements.forEach(element => {
            // Set initial state (will be animated by CSS)
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            observer.observe(element);
        });
    }
    
    // Set current year in footer
    const yearElement = document.querySelector('footer .container p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Jingtian Wu. All rights reserved.`;
    }
    
    // Create image placeholders
    const placeholderImages = document.querySelectorAll('.placeholder-img');
    placeholderImages.forEach(image => {
        if (image.tagName === 'IMG') {
            image.addEventListener('error', function() {
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" text-anchor="middle" fill="%239ca3af"%3EImage placeholder%3C/text%3E%3C/svg%3E';
            });
        }
    });
    
    // Handle active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});