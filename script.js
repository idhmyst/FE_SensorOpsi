const toggleThemeButton = document.getElementById('toggle-theme');
const body = document.body;

toggleThemeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save the theme preference in local storage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Load the saved theme preference on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
});