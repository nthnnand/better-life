// assets/js/utils.js
// Utility functions untuk BetterLife

const Utils = {
    /**
     * Format tanggal ke format lokal Indonesia
     * @param {Date|string} date
     * @returns {string}
     */
    formatDate(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Format waktu ke format jam:menit:detik
     * @param {number} seconds
     * @returns {string}
     */
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m ${secs}s`;
    },

    /**
     * Validasi email
     * @param {string} email
     * @returns {boolean}
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validasi password strength
     * @param {string} password
     * @returns {object} { strength: 'weak|medium|strong', message: string }
     */
    validatePasswordStrength(password) {
        if (password.length < 8) {
            return { strength: 'weak', message: 'Password minimal 8 karakter' };
        }
        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            return { strength: 'medium', message: 'Tambahkan huruf besar dan angka untuk password lebih kuat' };
        }
        return { strength: 'strong', message: 'Password kuat' };
    },

    /**
     * Debounce function
     * @param {function} func
     * @param {number} delay
     * @returns {function}
     */
    debounce(func, delay = 300) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Throttle function
     * @param {function} func
     * @param {number} limit
     * @returns {function}
     */
    throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Deep clone object
     * @param {object} obj
     * @returns {object}
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Merge objects
     * @param {object} target
     * @param {object} source
     * @returns {object}
     */
    merge(target, source) {
        return { ...target, ...source };
    },

    /**
     * Generate unique ID
     * @returns {string}
     */
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Get initials dari nama
     * @param {string} name
     * @returns {string}
     */
    getInitials(name) {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .slice(0, 2);
    },

    /**
     * Format angka dengan pemisah ribuan
     * @param {number} num
     * @returns {string}
     */
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    /**
     * Hitung durasi waktu yang lalu
     * @param {Date|string} date
     * @returns {string}
     */
    timeAgo(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }

        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;

        if (interval > 1) return Math.floor(interval) + ' tahun lalu';
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' bulan lalu';
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' hari lalu';
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' jam lalu';
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' menit lalu';

        return Math.floor(seconds) + ' detik lalu';
    },

    /**
     * Local storage dengan namespace
     */
    storage: {
        set(key, value) {
            localStorage.setItem(`betterlife_${key}`, JSON.stringify(value));
        },
        get(key, defaultValue = null) {
            const data = localStorage.getItem(`betterlife_${key}`);
            return data ? JSON.parse(data) : defaultValue;
        },
        remove(key) {
            localStorage.removeItem(`betterlife_${key}`);
        },
        clear() {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('betterlife_')) {
                    localStorage.removeItem(key);
                }
            });
        }
    },

    /**
     * Session storage dengan namespace
     */
    session: {
        set(key, value) {
            sessionStorage.setItem(`betterlife_${key}`, JSON.stringify(value));
        },
        get(key, defaultValue = null) {
            const data = sessionStorage.getItem(`betterlife_${key}`);
            return data ? JSON.parse(data) : defaultValue;
        },
        remove(key) {
            sessionStorage.removeItem(`betterlife_${key}`);
        },
        clear() {
            Object.keys(sessionStorage).forEach(key => {
                if (key.startsWith('betterlife_')) {
                    sessionStorage.removeItem(key);
                }
            });
        }
    }
};

// Export untuk Node.js (opsional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
