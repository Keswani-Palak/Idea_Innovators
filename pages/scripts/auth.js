// Basic navigation handlers for login page buttons

// Redirect to dashboard after successful login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent form submission for demo
        // perform validation or authentication here if needed
        window.location.href = 'dashboard.html';
    });
}

// Social login buttons (mock behavior)
const googleBtn = document.getElementById('googleLogin');
if (googleBtn) {
    googleBtn.addEventListener('click', () => {
        // ideally trigger OAuth flow; for now, just redirect
        window.location.href = 'dashboard.html';
    });
}

const discordBtn = document.getElementById('discordLogin');
if (discordBtn) {
    discordBtn.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
}