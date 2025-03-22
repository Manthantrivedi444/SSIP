// Create bubbles for background
function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles-container');
    const bubbleCount = 25; // Number of bubbles

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // Random bubble size between 30px and 150px
        const size = Math.random() * 120 + 30;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // Random horizontal position
        bubble.style.left = `${Math.random() * 100}%`;

        // Random animation duration between 8 and 20 seconds
        const duration = Math.random() * 12 + 8;
        bubble.style.animationDuration = `${duration}s`;

        // Random animation delay
        bubble.style.animationDelay = `${Math.random() * 5}s`;

        bubblesContainer.appendChild(bubble);
    }
}

// Validation for password match
function validatePassword() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const signupBtn = document.querySelector('.signup-btn');

    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords don't match");
        signupBtn.disabled = true;
        signupBtn.style.opacity = 0.7;
    } else {
        confirmPassword.setCustomValidity('');
        signupBtn.disabled = false;
        signupBtn.style.opacity = 1;
    }
}

// Form submission
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate form submission with animation
    const button = document.querySelector('.signup-btn');
    button.innerHTML = 'CREATING ACCOUNT...';

    setTimeout(() => {
        alert(`Account created successfully for ${fullname}!`);
        button.innerHTML = 'CREATE ACCOUNT';
        document.getElementById('signup-form').reset();
    }, 2000);
});

// Initialize the page
window.addEventListener('load', () => {
    createBubbles();

    // Add password validation
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    password.addEventListener('change', validatePassword);
    confirmPassword.addEventListener('keyup', validatePassword);

    // Add input animation (already handled by CSS, but could add more functionality)
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
});