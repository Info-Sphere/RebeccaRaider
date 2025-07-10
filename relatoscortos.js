
document.querySelectorAll('.interactive-list li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();  // Prevent immediate opening of the link
        
        const listItem = this.closest('li'); // Find the list item
        listItem.classList.add('clicked');  // Add the 'clicked' class to trigger CSS transition
        
        // Wait for the transition to finish (300ms delay)
        setTimeout(() => {
            window.open(this.href, '_blank');  // Open the link in a new tab
        }, 300);  // 300ms delay (same as the transition duration)
    });
});
