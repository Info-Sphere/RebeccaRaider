document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded - relatosCortos.js is running.");

    // --- Theme Toggle Logic (Replicated from index.js) ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const moonIcon = document.getElementById('moonIcon'); // Now represents the moon (dark mode) icon
    const sunIcon = document.getElementById('sunIcon');   // Now represents the sun (light mode) icon
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
            // In dark mode, show the sun icon (to switch to light) and hide the moon icon
            if (sunIcon) sunIcon.classList.remove('hidden');
            if (moonIcon) moonIcon.classList.add('hidden');
        } else {
            bodyElement.classList.remove('dark');
            // In light mode, show the moon icon (to switch to dark) and hide the sun icon
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
            // Determine new theme based on current body class
            const newTheme = bodyElement.classList.contains('dark') ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // --- Mobile Menu Toggle Logic (Replicated from index.js) ---
    const menuToggle = document.getElementById('check');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const navbarEl = document.querySelector(".navbar"); // Get navbar for animations

    if (!menuToggle) {
        console.error("Menu toggle checkbox with ID 'check' not found!");
    }
    if (!menuIcon) {
        console.warn("Menu icon with ID 'menu-icon' not found. Mobile menu might not toggle visually.");
    }
    if (!closeIcon) {
        console.warn("Close icon with ID 'close-icon' not found. Mobile menu might not toggle visually.");
    }
    if (!navbarEl) {
        console.error("Navbar element with class 'navbar' not found. Mobile menu animations may not work.");
    }

    if (menuToggle) {
        // Ensure menuIcon and closeIcon are correctly hidden/shown on initial load
        // This relies on CSS to initially hide close-icon and show menu-icon
        menuToggle.addEventListener('change', () => {
            console.log("Mobile menu toggle changed.");
            if (menuToggle.checked) {
                // When menu opens
                if (menuIcon) menuIcon.style.display = 'none';
                if (closeIcon) closeIcon.style.display = 'block';
                // Add class to navbar to trigger CSS animations for links
                if (navbarEl) {
                    navbarEl.classList.add('menu-open');
                }
            } else {
                // When menu closes
                if (menuIcon) menuIcon.style.display = 'block';
                if (closeIcon) closeIcon.style.display = 'none';
                // Remove class from navbar to reset CSS animations for links
                if (navbarEl) {
                    navbarEl.classList.remove('menu-open');
                }
            }
        });
    }

    // --- Visited Links Logic (Original from relatosCortos.js, with minor enhancements) ---
    const links = document.querySelectorAll(".interactive-list li a");

    // Restore clicked links from sessionStorage
    // sessionStorage is used here to ensure state resets when the browser tab/session is closed.
    const clickedLinks = JSON.parse(sessionStorage.getItem("clickedLinks") || "[]");

    clickedLinks.forEach(href => {
        const link = document.querySelector(`.interactive-list li a[href="${href}"]`);
        if (link) {
            link.parentElement.classList.add("clicked");
        }
    });

    // Add click event to links
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Stop immediate navigation to allow animation

            const parentLi = link.closest("li");
            parentLi.classList.add("clicked"); // Add 'clicked' class to the parent <li>

            // Store clicked link's href in sessionStorage
            const href = link.getAttribute("href");
            let saved = JSON.parse(sessionStorage.getItem("clickedLinks") || "[]");

            if (!saved.includes(href)) {
                saved.push(href);
                sessionStorage.setItem("clickedLinks", JSON.stringify(saved));
                console.log(`Link clicked and saved: ${href}`);
            }

            // Delay navigation to allow CSS transition to complete
            // The delay (400ms) should match the transition duration of the .clicked state in CSS
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
});
