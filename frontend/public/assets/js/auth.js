// assets/js/auth.js
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.isAdmin = false;
        this.init();
    }

    init() {
        this.checkExistingSession();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const adminLoginForm = document.getElementById('adminLoginForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleUserLogin();
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleUserRegistration();
            });
        }

        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAdminLogin();
            });
        }
    }

    handleUserLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember')?.checked;

        // Simple validation
        if (!this.validateEmail(email)) {
            this.showError('Email tidak valid');
            return;
        }

        if (password.length < 8) {
            this.showError('Password minimal 8 karakter');
            return;
        }

        // Simulate API call
        this.showLoading();
        setTimeout(() => {
            const users = this.getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                this.loginUser(user, remember);
                this.redirectToDashboard();
            } else {
                this.showError('Email atau password salah');
            }
            this.hideLoading();
        }, 1500);
    }

    handleAdminLogin() {
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        const securityCode = document.getElementById('securityCode').value;

        // Admin credentials (in real app, this should be from secure server)
        const adminCredentials = {
            username: 'admin',
            password: 'admin123',
            securityCode: 'BL2024'
        };

        if (username === adminCredentials.username && 
            password === adminCredentials.password && 
            securityCode === adminCredentials.securityCode) {
            
            this.loginAdmin();
            this.redirectToAdminDashboard();
        } else {
            this.showError('Kredensial admin tidak valid');
        }
    }

    handleUserRegistration() {
        const formData = new FormData(document.getElementById('registerForm'));
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            createdAt: new Date().toISOString()
        };

        // Validate
        if (!this.validateEmail(userData.email)) {
            this.showError('Email tidak valid');
            return;
        }

        if (userData.password.length < 8) {
            this.showError('Password minimal 8 karakter');
            return;
        }

        const confirmPassword = formData.get('confirmPassword');
        if (userData.password !== confirmPassword) {
            this.showError('Password tidak cocok');
            return;
        }

        // Check if user exists
        const users = this.getUsers();
        if (users.find(u => u.email === userData.email)) {
            this.showError('Email sudah terdaftar');
            return;
        }

        // Save user
        users.push(userData);
        localStorage.setItem('betterlife_users', JSON.stringify(users));

        this.showSuccess('Registrasi berhasil! Silakan login.');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }

    loginUser(user, remember = false) {
        this.currentUser = user;
        this.isAdmin = false;

        if (remember) {
            localStorage.setItem('betterlife_user', JSON.stringify(user));
        } else {
            sessionStorage.setItem('betterlife_user', JSON.stringify(user));
        }

        this.showSuccess(`Selamat datang, ${user.name}!`);
    }

    loginAdmin() {
        this.currentUser = { name: 'Administrator', role: 'admin' };
        this.isAdmin = true;
        
        sessionStorage.setItem('betterlife_admin', 'true');
        sessionStorage.setItem('betterlife_user', JSON.stringify(this.currentUser));

        this.showSuccess('Login admin berhasil!');
    }

    logout() {
        this.currentUser = null;
        this.isAdmin = false;
        
        localStorage.removeItem('betterlife_user');
        sessionStorage.removeItem('betterlife_user');
        sessionStorage.removeItem('betterlife_admin');

        window.location.href = '../auth/login.html';
    }

    checkExistingSession() {
        // Check for user session
        const userSession = localStorage.getItem('betterlife_user') || sessionStorage.getItem('betterlife_user');
        const adminSession = sessionStorage.getItem('betterlife_admin');

        if (userSession) {
            this.currentUser = JSON.parse(userSession);
            this.isAdmin = adminSession === 'true';

            // Redirect if already logged in
            if (window.location.pathname.includes('auth/')) {
                if (this.isAdmin) {
                    this.redirectToAdminDashboard();
                } else {
                    this.redirectToDashboard();
                }
            }
        }
    }

    redirectToDashboard() {
        window.location.href = '../user/dashboard.html';
    }

    redirectToAdminDashboard() {
        window.location.href = '../admin/dashboard.html';
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getUsers() {
        return JSON.parse(localStorage.getItem('betterlife_users') || '[]');
    }

    showError(message) {
        alert(`❌ Error: ${message}`);
    }

    showSuccess(message) {
        alert(`✓ Sukses: ${message}`);
    }

    showLoading() {
        const buttons = document.querySelectorAll('button[type="submit"]');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        });
    }

    hideLoading() {
        const buttons = document.querySelectorAll('button[type="submit"]');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.innerHTML = btn.getAttribute('data-original-text') || 'Submit';
        });
    }
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
});