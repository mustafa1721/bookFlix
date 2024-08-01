document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const closeMenu = document.getElementById('closeMenu');
    const addBookButton = document.getElementById('addBookButton');
    const bookForm = document.getElementById('bookForm');   

    // Function to toggle the menu
    function toggleMenu() {
        navMenu.classList.toggle('active');
    }

    // Open/close menu on toggle button click
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu on close button click
    closeMenu.addEventListener('click', function () {
        navMenu.classList.remove('active');
    });
    addBookButton.addEventListener('click', function () {
        bookForm.style.display = bookForm.style.display === 'none' ? 'block' : 'none';
    });

    // Close menu if clicked outside of it
    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

