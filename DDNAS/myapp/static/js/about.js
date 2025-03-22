document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const toggle = document.querySelector('.toggler');
    const thic = toggle.querySelector('i');
    const elem = document.documentElement;
    const date = new Date();
    const year = date.getFullYear();
    const ps = document.getElementById("footer");
    toggle.addEventListener('click',function(){
        elem.classList.toggle('dark-mode');
        if(elem.classList.contains('dark-mode')){
            thic.classList.remove('fa-moon');
            thic.classList.add('fa-sun');
        }else{
            thic.classList.remove('fa-sun');
            thic.classList.add('fa-moon');
        }
    });
    ps.innerHTML=`&copy ${year} DMA. All rights reserved.`;
    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInside = navLinks.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInside && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});