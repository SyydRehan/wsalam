document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const strengthBars = document.querySelectorAll('.strength-bar');

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        let strength = 0;
        
        // Check password length
        if (password.length >= 8) strength++;
        
        // Check for uppercase letters
        if (/[A-Z]/.test(password)) strength++;
        
        // Check for numbers and special characters
        if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++;
        
        // Update strength bars
        strengthBars.forEach((bar, index) => {
            if (index < strength) {
                bar.style.background = getStrengthColor(strength);
            } else {
                bar.style.background = '#eee';
            }
        });
    });

    function getStrengthColor(strength) {
        const colors = ['#ff4d4d', '#ffa64d', '#33cc33'];
        return colors[strength - 1] || '#eee';
    }

    // Form validation
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Passwords do not match!');
            return;
        }
        
        // Validate terms checkbox
        if (!document.getElementById('terms').checked) {
            alert('You must agree to the terms and conditions!');
            return;
        }
        
        // Form is valid - in a real app, you would send data to server here
        alert('Account created successfully! Welcome to our community.');
        signupForm.reset();
        
        // Reset strength bars
        strengthBars.forEach(bar => {
            bar.style.background = '#eee';
        });
    });

    // Social login buttons
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('google') ? 'Google' : 
                           this.classList.contains('github') ? 'GitHub' : 'LinkedIn';
            alert(`Redirecting to ${platform} login...`);
        });
    });
});