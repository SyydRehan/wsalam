// Login Form Functionality
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real application, you would send this to your server
        console.log('Login attempt with:', { email, password, rememberMe });
        
        // Simulate successful login
        alert('Login successful! Redirecting to dashboard...');
        
        // In a real app, you would redirect to the dashboard
        // window.location.href = 'dashboard.html';
    });
}

// Forgot Password Modal
const forgotPasswordLinks = document.querySelectorAll('.forgot-password');

forgotPasswordLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Password reset link will be sent to your email if it exists in our system.');
    });
});