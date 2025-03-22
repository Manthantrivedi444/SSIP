// Theme functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    themeToggle.innerHTML = '☀️'; // Default to light mode icon
    
    // Insert the theme toggle in the navigation menu
    const navMenu = document.querySelector('.nav-menu');
    navMenu.appendChild(themeToggle);
    
    // Initialize theme from localStorage or system preference
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateToggleIcon(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateToggleIcon('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            updateToggleIcon('light');
        }
    }
    
    // Update toggle button icon based on current theme
    function updateToggleIcon(theme) {
        themeToggle.innerHTML = theme === 'dark' ? '🌙' : '☀️';
    }
    
    // Toggle between light and dark themes
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });
    
    // Initialize theme on page load
    initTheme();
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                updateToggleIcon(newTheme);
            }
        });
    }
    
    // Original dashboard tab functionality
    const tabs = document.querySelectorAll('.dashboard-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            fetchDutyData(this.textContent);
        });
    });
    
    function fetchDutyData(tabName) {
        const dutyList = document.querySelector('.duty-list');
        dutyList.innerHTML = '';
        
        let duties = [];
        
        switch(tabName.trim()) {
            case 'Live Orders':
                duties = [
                    {
                        title: 'Cyclone Warning Response Team',
                        assignee: 'Rajesh Patel',
                        due: 'Today, 5:00 PM',
                        status: 'assigned'
                    },
                    {
                        title: 'Flood Relief Coordination',
                        assignee: 'Priya Sharma',
                        due: 'Tomorrow, 9:00 AM',
                        status: 'pending'
                    },
                    {
                        title: 'Medical Emergency Response',
                        assignee: 'Dr. Mehta',
                        due: 'Mar 18, 2025, 6:00 AM',
                        status: 'completed'
                    }
                ];
                break;
            case 'Upcoming Duties':
                duties = [
                    {
                        title: 'Earthquake Preparedness Team',
                        assignee: 'Amit Singh',
                        due: 'Mar 20, 2025, 10:00 AM',
                        status: 'assigned'
                    },
                    {
                        title: 'Fire Safety Inspection',
                        assignee: 'Suresh Kumar',
                        due: 'Mar 22, 2025, 2:00 PM',
                        status: 'pending'
                    }
                ];
                break;
            case 'Completed':
                duties = [
                    {
                        title: 'Water Supply Logistics',
                        assignee: 'Neha Desai',
                        due: 'Mar 15, 2025, 11:00 AM',
                        status: 'completed'
                    },
                    {
                        title: 'Shelter Management',
                        assignee: 'Vikas Patel',
                        due: 'Mar 14, 2025, 9:00 AM',
                        status: 'completed'
                    },
                    {
                        title: 'Public Communication',
                        assignee: 'Anjali Mehta',
                        due: 'Mar 13, 2025, 4:00 PM',
                        status: 'completed'
                    }
                ];
                break;
        }
        
        duties.forEach(duty => {
            const dutyItem = document.createElement('div');
            dutyItem.className = 'duty-item';
            
            dutyItem.innerHTML = `
                <div class="duty-details">
                    <div class="duty-title">${duty.title}</div>
                    <div class="duty-meta">Assigned to: ${duty.assignee} | Due: ${duty.due}</div>
                </div>
                <span class="duty-status status-${duty.status}">${duty.status.charAt(0).toUpperCase() + duty.status.slice(1)}</span>
            `;
            
            dutyList.appendChild(dutyItem);
        });
    }
    
    // Sticky Header functionality
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.zIndex = '1000';
            document.body.style.paddingTop = header.offsetHeight + 'px';
            header.style.transition = 'all 0.3s ease';
        } else {
            header.style.position = 'relative';
            document.body.style.paddingTop = '0';
        }
    });
    
    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function addAnimationOnScroll() {
        featureCards.forEach(card => {
            if (isInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.3s ease, box-shadow 0.3s ease';
    });
    
    window.addEventListener('scroll', addAnimationOnScroll);
    addAnimationOnScroll();
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.display = 'none';
    mobileMenuToggle.style.fontSize = '1.5rem';
    mobileMenuToggle.style.cursor = 'pointer';
    mobileMenuToggle.style.color = 'var(--header-text)';
    
    const navbar = document.querySelector('.navbar');
    
    navbar.insertBefore(mobileMenuToggle, navMenu);
    
    function checkMobileMenu() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            navMenu.style.display = 'none';
            navMenu.style.flexDirection = 'column';
            navMenu.style.width = '100%';
        } else {
            mobileMenuToggle.style.display = 'none';
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
        }
    }
    
    mobileMenuToggle.addEventListener('click', function() {
        if (navMenu.style.display === 'none' || navMenu.style.display === '') {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
        }
    });
    
    window.addEventListener('resize', checkMobileMenu);
    checkMobileMenu();
});