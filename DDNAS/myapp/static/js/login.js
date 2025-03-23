document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from reloading the page
    
    let formData = {
        user_id: document.getElementById("user_id").value,
        employment: document.getElementById("employment").value,
        password: document.getElementById("password").value
    };
    
    if (formData.user_id === "" || formData.employment === "") {
        alert("Please enter the required details to login");
        return;
    }
    
    // Send data to Flask (auth.py)
    fetch("/auth/login", {  // Updated to match the form action
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.redirect || "/dashboard";
        } else {
            alert(data.message || "Login failed. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
    document.addEventListener('DOMContentLoaded', function() {
        // Handle signup button click (alternative to onclick in HTML)
        const signupBtn = document.querySelector('.signup-btn');
        if (signupBtn) {
            signupBtn.addEventListener('click', function() {
                window.location.href = '/auth/signup';
            });
        }
    
        // Handle login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const userId = document.getElementById('user_id').value;
                const password = document.getElementById('password').value;
    
                if (!userId || !password) {
                    alert('Please fill in all fields');
                    return;
                }
    
                // Submit the form
                this.submit();
            });
        }
    }); 
});