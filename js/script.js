// Enhanced client-side auth for the login page (accessible, validated, demo-friendly)
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Clear all inputs on page load for fresh state
    if (usernameInput) usernameInput.value = '';
    if (passwordInput) passwordInput.value = '';
    
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const formError = document.getElementById('formError');
    const formSuccess = document.getElementById('formSuccess');
    const errorText = document.getElementById('errorText');
    const successText = document.getElementById('successText');
    const loginBtn = document.getElementById('loginBtn');
    const btnLoader = document.getElementById('btnLoader');
    const togglePassword = document.getElementById('togglePassword');
    const googleBtn = document.getElementById('googleLogin');
    const discordBtn = document.getElementById('discordLogin');

    function clearMessages() {
        usernameError.textContent = '';
        passwordError.textContent = '';
        errorText.textContent = '';
        successText.textContent = '';
        formError.classList.add('hidden');
        formSuccess.classList.add('hidden');
        if (usernameError.classList.contains('show')) usernameError.classList.remove('show');
        if (passwordError.classList.contains('show')) passwordError.classList.remove('show');
    }

    function validate() {
        let ok = true;
        clearMessages();

        if (!usernameInput.value.trim()) {
            usernameError.textContent = 'Please enter your username or email.';
            usernameError.classList.add('show');
            ok = false;
        }

        if (!passwordInput.value) {
            passwordError.textContent = 'Please enter your password.';
            passwordError.classList.add('show');
            ok = false;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters.';
            passwordError.classList.add('show');
            ok = false;
        }

        return ok;
    }

    async function fakeAuth(username, password) {
        // Simulate server latency
        await new Promise((r) => setTimeout(r, 800));

        // Demo credentials: username: demo / password: password
        if (username === 'demo' && password === 'password') {
            return { ok: true };
        }

        return { ok: false, message: 'Invalid credentials. For demo use username "demo" and password "password".' };
    }

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const isText = passwordInput.type === 'text';
            passwordInput.type = isText ? 'password' : 'text';
            togglePassword.setAttribute('aria-pressed', String(!isText));
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!validate()) return;

            loginBtn.disabled = true;
            if (btnLoader) btnLoader.classList.remove('hidden');

            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            try {
                const res = await fakeAuth(username, password);
                if (res.ok) {
                    successText.textContent = 'Login successful — redirecting...';
                    formSuccess.classList.remove('hidden');
                    // clear inputs before redirect
                    if (usernameInput) usernameInput.value = '';
                    if (passwordInput) passwordInput.value = '';
                    setTimeout(() => (window.location.href = 'dashboard.html'), 900);
                } else {
                    throw new Error(res.message || 'Login failed');
                }
            } catch (err) {
                errorText.textContent = err.message || 'Login failed. Please try again.';
                formError.classList.remove('hidden');
                // clear inputs on failed login for next attempt
                if (usernameInput) usernameInput.value = '';
                if (passwordInput) passwordInput.value = '';
            } finally {
                loginBtn.disabled = false;
                if (btnLoader) btnLoader.classList.add('hidden');
            }
        });
    }

    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            googleBtn.disabled = true;
            await new Promise((r) => setTimeout(r, 600));
            window.location.href = 'dashboard.html';
        });
    }

    if (discordBtn) {
        discordBtn.addEventListener('click', async () => {
            discordBtn.disabled = true;
            await new Promise((r) => setTimeout(r, 600));
            window.location.href = 'dashboard.html';
        });
    }
});