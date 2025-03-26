// Initial Employee Data (Simulating Database Fetch)
const initialEmployees = [
    {
        id: 1,
        name: "John Doe",
        dob: "1990-05-15",
        address: "123 Rescue Lane, New York",
        email: "john.doe@disastermanagement.org",
        contactNumber: "+1-555-123-4567",
        district: "Manhattan",
        department: "Rescue",
        gender: "Male",
        age: 33,
        profilePhoto: "/api/placeholder/200/200" // Replace with actual photo path
    },
    {
        id: 2,
        name: "Sarah Johnson",
        dob: "1988-09-22",
        address: "456 Medical Street, Chicago",
        email: "sarah.johnson@disastermanagement.org",
        contactNumber: "+1-555-987-6543",
        district: "Cook County",
        department: "Medical",
        gender: "Female",
        age: 35,
        profilePhoto: "/api/placeholder/200/200" // Replace with actual photo path
    },
    {
        id: 3,
        name: "Michael Chen",
        dob: "1992-03-10",
        address: "789 Logistics Road, San Francisco",
        email: "michael.chen@disastermanagement.org",
        contactNumber: "+1-555-246-8135",
        district: "Bay Area",
        department: "Logistics",
        gender: "Male",
        age: 31,
        profilePhoto: "/api/placeholder/200/200" // Replace with actual photo path
    }
];

// DOM Elements
const employeeTableBody = document.getElementById('employee-table-body');
const addEmployeeBtn = document.getElementById('add-employee-btn');
const addEmployeeModal = document.getElementById('add-employee-modal');
const employeeDetailsModal = document.getElementById('employee-details-modal');
const addEmployeeForm = document.getElementById('add-employee-form');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const closeModalBtns = document.querySelectorAll('.close-modal');

// Theme Toggle
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});

// Render Employees
function renderEmployees(employees) {
    employeeTableBody.innerHTML = ''; // Clear existing rows

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.classList.add('animate-slide');
        row.innerHTML = `
            <td>
                <img src="${employee.profilePhoto}" 
                     alt="${employee.name}" 
                     class="profile-thumbnail">
            </td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.contactNumber}</td>
            <td>
                <button class="btn remove-employee" data-id="${employee.id}">Fire</button>
            </td>
        `;

        // Click to view employee details
        row.addEventListener('click', (e) => {
            if (!e.target.closest('.remove-employee')) {
                showEmployeeDetails(employee);
            }
        });

        // Remove employee button
        const removeBtn = row.querySelector('.remove-employee');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeEmployee(employee.id);
        });

        employeeTableBody.appendChild(row);
    });
}

// Show Employee Details Modal
function showEmployeeDetails(employee) {
    const detailsContent = document.getElementById('employee-details-content');
    detailsContent.innerHTML = `
        <div class="employee-details">
            <img src="${employee.profilePhoto}" 
                 alt="${employee.name}" 
                 class="large-profile-photo">
            <h2>${employee.name}</h2>
            <div class="details-grid">
                <p><strong>Date of Birth:</strong> ${employee.dob}</p>
                <p><strong>Age:</strong> ${employee.age}</p>
                <p><strong>Gender:</strong> ${employee.gender}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
                <p><strong>District:</strong> ${employee.district}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Contact Number:</strong> ${employee.contactNumber}</p>
                <p><strong>Address:</strong> ${employee.address}</p>
            </div>
        </div>
    `;
    employeeDetailsModal.style.display = 'block';
}

// Add Employee
function addEmployee(event) {
    event.preventDefault();
    const formData = new FormData(addEmployeeForm);
    
    // In a real application, this would be sent to a backend
    const newEmployee = {
        id: Date.now(), // Temporary unique ID
        name: formData.get('name'),
        dob: formData.get('dob'),
        address: formData.get('address'),
        email: formData.get('email'),
        contactNumber: formData.get('contact'),
        district: formData.get('district'),
        department: formData.get('department'),
        gender: formData.get('gender'),
        age: calculateAge(formData.get('dob')),
        profilePhoto: formData.get('profile-photo') 
            ? URL.createObjectURL(formData.get('profile-photo')) 
            : "/api/placeholder/200/200"
    };

    initialEmployees.push(newEmployee);
    renderEmployees(initialEmployees);
    addEmployeeModal.style.display = 'none';
    addEmployeeForm.reset();
}

// Remove Employee
function removeEmployee(id) {
    const index = initialEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        initialEmployees.splice(index, 1);
        renderEmployees(initialEmployees);
    }
}

// Calculate Age
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Modal Controls
addEmployeeBtn.addEventListener('click', () => {
    addEmployeeModal.style.display = 'block';
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        addEmployeeModal.style.display = 'none';
        employeeDetailsModal.style.display = 'none';
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === addEmployeeModal) {
        addEmployeeModal.style.display = 'none';
    }
    if (e.target === employeeDetailsModal) {
        employeeDetailsModal.style.display = 'none';
    }
});

// Form Submission
addEmployeeForm.addEventListener('submit', addEmployee);

// Initial Render
renderEmployees(initialEmployees);
