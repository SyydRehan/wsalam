document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Star Rating for Feedback Form
    const starsInput = document.querySelectorAll('.stars-input i');
    const ratingValue = document.getElementById('ratingValue');
    
    starsInput.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingValue.value = rating;
            
            starsInput.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('active');
                    s.classList.add('far');
                    s.classList.remove('fas');
                }
            });
        });
    });
    
    // Cart Functionality
    const cartCount = document.querySelector('.cart-count');
    const productButtons = document.querySelectorAll('.product-btn');
    const cartIcon = document.querySelector('.cart-icon');
    let cartItems = 0;
    
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItems++;
            cartCount.textContent = cartItems;
            showNotification('Item added to cart!');
        });
    });
    
    // Notification System
    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Feedback Form Submission
    const feedbackForm = document.getElementById('feedbackForm');
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const feedbackText = document.getElementById('feedbackText').value;
        const rating = ratingValue.value;
        
        if (!feedbackText || rating === '0') {
            showNotification('Please provide both feedback and rating!');
            return;
        }
        
        // In a real app, you would send this data to a server
        console.log('Feedback:', feedbackText);
        console.log('Rating:', rating);
        
        showNotification('Thank you for your feedback!');
        feedbackForm.reset();
        
        // Reset stars
        starsInput.forEach(star => {
            star.classList.remove('active');
            star.classList.add('far');
            star.classList.remove('fas');
        });
        ratingValue.value = '0';
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll Reveal Animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        reset: true
    });
    
    scrollReveal.reveal('.product-card', { interval: 200 });
    scrollReveal.reveal('.review-card', { interval: 200 });
    scrollReveal.reveal('.feedback-form', { delay: 300 });
});