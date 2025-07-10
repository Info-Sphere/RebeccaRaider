// index.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded - index.js is running.");

    // --- Scroll-based Navbar Logic ---
    const navbarEl = document.querySelector(".navbar");
    const bottomContainerE1 = document.querySelector(".bottom-container");

    if (navbarEl && bottomContainerE1) {
        console.log("Navbar and bottom container found. Scroll logic initialized.");
        console.log("Navbar Offset Height:", navbarEl.offsetHeight);
        console.log("Bottom Container Offset Top:", bottomContainerE1.offsetTop);

        window.addEventListener("scroll", () => {
            if (window.scrollY > bottomContainerE1.offsetTop - navbarEl.offsetHeight - 50) {
                navbarEl.classList.add("active");
                // console.log("Navbar active class added."); // Uncomment for detailed debugging
            } else {
                navbarEl.classList.remove("active");
                // console.log("Navbar active class removed."); // Uncomment for detailed debugging
            }
        });
    } else {
        console.warn("One or more elements for scroll logic (navbar or bottom-container) not found. Please ensure 'bottom-container' div exists in HTML.");
    }


    // --- Dark Mode Toggle Logic ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    const bodyElement = document.body; // Reference to the body element for class manipulation

    if (!themeToggleBtn) {
        console.error("Theme toggle button with ID 'themeToggle' not found!");
    }
    if (!moonIcon) {
        console.warn("Moon icon with ID 'moonIcon' not found. Theme icons might not toggle visually.");
    }
    if (!sunIcon) {
        console.warn("Sun icon with ID 'sunIcon' not found. Theme icons might not toggle visually.");
    }

    // Function to set theme
    const setTheme = (theme) => {
        console.log("Attempting to set theme to:", theme);
        if (theme === 'dark') {
            bodyElement.classList.add('dark');
            if (sunIcon) sunIcon.classList.remove('hidden');
            if (moonIcon) moonIcon.classList.add('hidden');
        } else {
            bodyElement.classList.remove('dark');
            if (sunIcon) sunIcon.classList.add('hidden');
            if (moonIcon) moonIcon.classList.remove('hidden');
        }
        localStorage.setItem('theme', theme); // Save theme preference to local storage
        console.log("Current body classes after setting theme:", bodyElement.classList.value);
    };

    // Initialize theme on page load
    const savedTheme = localStorage.getItem('theme');
    console.log("Saved theme from localStorage on load:", savedTheme);
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('light'); // Default to light theme if no preference is saved
    }

    // Toggle theme on button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            console.log("Theme toggle button clicked!");
            const newTheme = bodyElement.classList.contains('dark') ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }


    // --- Mobile Menu Toggle Logic ---
    const menuToggle = document.getElementById('check');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!menuToggle) {
        console.error("Menu toggle checkbox with ID 'check' not found!");
    }
    // menuIcon and closeIcon warnings are already above within theme logic, but good to ensure they are checked here too if needed.

    if (menuToggle) {
        // Ensure menuIcon and closeIcon are correctly hidden/shown on initial load
        if (menuToggle.checked) {
            if (menuIcon) menuIcon.style.display = 'none';
            if (closeIcon) closeIcon.style.display = 'block';
        } else {
            if (menuIcon) menuIcon.style.display = 'block';
            if (closeIcon) closeIcon.style.display = 'none';
        }

        menuToggle.addEventListener('change', () => {
            console.log("Mobile menu toggle changed.");
            if (menuToggle.checked) {
                if (menuIcon) menuIcon.style.display = 'none';
                if (closeIcon) closeIcon.style.display = 'block';
                // When menu opens, ensure nav links animate in
                if (navbarEl) { // Use navbarEl which is already queried
                    navbarEl.querySelectorAll('a').forEach((link, index) => {
                        link.style.transitionDelay = `${0.05 * index}s`;
                        link.style.transform = 'translateY(0)';
                        link.style.opacity = '1';
                    });
                }
            } else {
                if (menuIcon) menuIcon.style.display = 'block';
                if (closeIcon) closeIcon.style.display = 'none';
                // When menu closes, reset nav link animation properties
                if (navbarEl) { // Use navbarEl
                    navbarEl.querySelectorAll('a').forEach((link) => {
                        link.style.transitionDelay = '0s'; // Reset delay
                        link.style.transform = 'translateY(-50px)';
                        link.style.opacity = '0';
                    });
                }
            }
        });
    }
});
