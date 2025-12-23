// JavaScript functionality for Django App

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Django App JavaScript loaded successfully!');

    // Form validation
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            const username = document.querySelector('input[name="username"]');
            const email = document.querySelector('input[name="email"]');
            const fullName = document.querySelector('input[name="full_name"]');

            let isValid = true;
            let errorMessage = '';

            // Validate username
            if (username && username.value.trim().length < 3) {
                errorMessage += 'Username must be at least 3 characters long.\n';
                isValid = false;
            }

            // Validate email
            if (email && !isValidEmail(email.value)) {
                errorMessage += 'Please enter a valid email address.\n';
                isValid = false;
            }

            // Validate full name
            if (fullName && fullName.value.trim().length < 2) {
                errorMessage += 'Full name must be at least 2 characters long.\n';
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
                alert(errorMessage);
                return false;
            }

            // Add loading state
            const submitBtn = registrationForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Registering...';
                submitBtn.disabled = true;
            }
        });

        // Real-time input validation
        const inputs = registrationForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#28a745';
                } else {
                    this.style.borderColor = '#ddd';
                }
            });
        });
    }

    // Toggle view for users list (table/cards)
    const toggleViewBtn = document.getElementById('toggleView');
    if (toggleViewBtn) {
        toggleViewBtn.addEventListener('click', function() {
            const table = document.querySelector('.users-table');
            const cards = document.querySelector('.users-cards');
            
            if (table && cards) {
                if (table.style.display === 'none') {
                    table.style.display = 'table';
                    cards.style.display = 'none';
                    this.textContent = 'Switch to Card View';
                } else {
                    table.style.display = 'none';
                    cards.style.display = 'grid';
                    this.textContent = 'Switch to Table View';
                }
            }
        });
    }

    // Add animation to user rows on hover
    const userRows = document.querySelectorAll('.user-row');
    userRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'transform 0.3s ease';
        });

        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Auto-hide messages after 5 seconds
    const messages = document.querySelectorAll('.alert');
    if (messages.length > 0) {
        setTimeout(function() {
            messages.forEach(message => {
                message.style.transition = 'opacity 0.5s ease';
                message.style.opacity = '0';
                setTimeout(() => message.remove(), 500);
            });
        }, 5000);
    }

    // Add search functionality for users table (if exists)
    const usersTable = document.querySelector('.users-table');
    if (usersTable) {
        // Create search input
        const searchDiv = document.createElement('div');
        searchDiv.className = 'search-container';
        searchDiv.style.marginBottom = '1rem';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'form-control';
        searchInput.placeholder = 'Search users...';
        searchInput.style.maxWidth = '400px';
        
        searchDiv.appendChild(searchInput);
        usersTable.parentNode.insertBefore(searchDiv, usersTable);

        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = usersTable.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Console welcome message
console.log('%c Welcome to Django App! ', 'background: #667eea; color: white; font-size: 20px; padding: 10px;');
console.log('%c Built with Django & JavaScript ', 'background: #764ba2; color: white; font-size: 12px; padding: 5px;');
