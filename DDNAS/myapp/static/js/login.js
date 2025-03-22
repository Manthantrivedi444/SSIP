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
});