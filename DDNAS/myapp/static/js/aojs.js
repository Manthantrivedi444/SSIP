document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    themeToggle.addEventListener('click', function () {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeIcon.textContent = '☀';
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeIcon.textContent = '🌙';
        }
    });

    // Floating label animation for text inputs
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"]');

    textInputs.forEach(input => {
        // Add a class to the date input's parent to handle it differently
        if (input.type === 'date') {
            input.parentElement.classList.add('date-input-group');
        }

        input.addEventListener('focus', function () {
            // Find the floating label (it's now the second span, after the placeholder label)
            const floatingLabel = Array.from(this.parentElement.children).find(el =>
                el.classList.contains('floating-label'));

            if (floatingLabel) {
                floatingLabel.classList.add('float-animation');
            }
        });

        input.addEventListener('blur', function () {
            // Find the floating label
            const floatingLabel = Array.from(this.parentElement.children).find(el =>
                el.classList.contains('floating-label'));

            if (floatingLabel) {
                floatingLabel.classList.remove('float-animation');
            }
        });
    });

    // Form submission
    const form = document.getElementById('userInfoForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get all form values
        const formData = {
            name: document.getElementById('name').value,
            dob: document.getElementById('dob').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            district: document.getElementById('district').value,
            department: document.getElementById('department').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value
        };

        // Log form data (in a real application, you would send this to a server)
        console.log('Form Data:', formData);

        // Show success message with animation
        form.style.display = 'none';
        successMessage.style.display = 'block';

        // Optional: Reset form after successful submission
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    });

    // Age validation
    const ageInput = document.getElementById('age');
    ageInput.addEventListener('input', function () {
        if (this.value < 1) {
            this.value = 1;
        } else if (this.value > 120) {
            this.value = 120;
        }
    });

    // Auto-calculate age from DOB (optional enhancement)
    const dobInput = document.getElementById('dob');
    dobInput.addEventListener('change', function () {
        const birthDate = new Date(this.value);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }

        if (calculatedAge >= 1 && calculatedAge <= 120) {
            ageInput.value = calculatedAge;
        }
    });
});