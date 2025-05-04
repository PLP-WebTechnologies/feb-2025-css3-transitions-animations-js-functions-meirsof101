// Theme management with localStorage
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const animationTriggerBtn = document.getElementById('animation-trigger');
    const notification = document.getElementById('notification');
    const animatedElements = document.querySelectorAll('.animated-element');
    
    // Load saved theme preference from localStorage
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
    
    // Save theme preference to localStorage
    function saveThemePreference(theme) {
        localStorage.setItem('theme', theme);
        showNotification();
    }
    
    // Toggle between light and dark theme
    function toggleTheme() {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            saveThemePreference('light');
        } else {
            document.body.classList.add('dark-theme');
            saveThemePreference('dark');
        }
        // Add button press animation
        themeToggleBtn.classList.add('pulse');
        setTimeout(() => {
            themeToggleBtn.classList.remove('pulse');
        }, 1000);
    }
    
    // Show notification animation
    function showNotification() {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Trigger custom animations on elements
    function triggerCustomAnimation() {
        // Create a staggered animation effect
        animatedElements.forEach((element, index) => {
            // Remove any existing animation classes
            element.classList.remove('pulse', 'spin');
            
            // Force reflow to restart animations
            void element.offsetWidth;
            
            // Add different animations with staggered timing
            setTimeout(() => {
                if (index % 2 === 0) {
                    element.classList.add('pulse');
                } else {
                    element.classList.add('spin');
                }
            }, index * 200);
        });
        
        // Save user interaction to localStorage
        const interactions = JSON.parse(localStorage.getItem('animations_triggered') || '0');
        localStorage.setItem('animations_triggered', JSON.stringify(interactions + 1));
        
        // Show count in notification
        notification.innerHTML = `<p>Animation triggered ${interactions + 1} times!</p>`;
        showNotification();
    }
    
    // Initialize the app
    function init() {
        // Load theme preference
        loadThemePreference();
        
        // Set up event listeners
        themeToggleBtn.addEventListener('click', toggleTheme);
        animationTriggerBtn.addEventListener('click', triggerCustomAnimation);
        
        // Add hover effects for animated elements
        animatedElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
            });
        });
    }
    
    // Start the app
    init();
});