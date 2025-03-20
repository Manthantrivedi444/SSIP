// Create background bubbles
const backgroundBubbles = document.querySelector('.background-bubbles');
const bubbleCount = 15;

for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Random size between 30px and 120px
    const size = Math.random() * 90 + 30;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Random horizontal position
    bubble.style.left = `${Math.random() * 100}%`;

    // Random animation delay
    bubble.style.animationDelay = `${Math.random() * 15}s`;

    // Random animation duration between 15 and 30 seconds
    bubble.style.animationDuration = `${Math.random() * 15 + 15}s`;

    backgroundBubbles.appendChild(bubble);
}

// Form validation and submission
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Show button ripple effect
        const button = document.querySelector('.login-btn');
        button.classList.add('active');

        // Simulate login (replace with actual login logic)
        button.textContent = 'LOGGING IN...';

        setTimeout(() => {
            alert('Login successful!');
            // Reset form after successful login
            document.getElementById('login-form').reset();
            button.textContent = 'LOGIN';
            button.classList.remove('active');
        }, 2000);
    }
});

// Input focus effects
const inputs = document.querySelectorAll('.input-group input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focus');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focus');
        }
    });
});
