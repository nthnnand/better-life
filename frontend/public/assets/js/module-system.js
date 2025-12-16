// assets/js/module-system.js
// Sistem manajemen modul CBT dengan tracking progress

class ModuleSystem {
    constructor() {
        this.modules = [];
        this.userProgress = {};
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadModules();
        this.loadCurrentUser();
        this.loadUserProgress();
    }

    /**
     * Load semua modul dari localStorage
     */
    loadModules() {
        const defaultModules = [
            {
                id: 'module-1',
                name: 'Pengenalan CBT',
                description: 'Memahami dasar-dasar Cognitive Behavioral Therapy',
                level: 'beginner',
                duration: 45,
                lessons: 5,
                category: 'cbt',
                objectives: [
                    'Memahami apa itu CBT',
                    'Mengenal komponen utama CBT',
                    'Menerapkan konsep dasar CBT'
                ],
                image: 'https://images.unsplash.com/photo-1516979187457-635ffe35ff15?w=400',
                createdAt: new Date().toISOString()
            },
            {
                id: 'module-2',
                name: 'Pola Pikir Positif',
                description: 'Mengubah pola pikir negatif menjadi rasional',
                level: 'intermediate',
                duration: 60,
                lessons: 6,
                category: 'cbt',
                objectives: [
                    'Mengidentifikasi pikiran negatif',
                    'Menantang pikiran irasional',
                    'Mengganti dengan pikiran positif'
                ],
                image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
                createdAt: new Date().toISOString()
            },
            {
                id: 'module-3',
                name: 'Manajemen Emosi',
                description: 'Teknik mengelola emosi dengan efektif',
                level: 'advanced',
                duration: 75,
                lessons: 7,
                category: 'cbt',
                objectives: [
                    'Memahami emosi dan reaksi',
                    'Teknik regulasi emosi',
                    'Praktik kesadaran emosi'
                ],
                image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
                createdAt: new Date().toISOString()
            }
        ];

        const stored = Utils.storage.get('modules', null);
        this.modules = stored || defaultModules;
        Utils.storage.set('modules', this.modules);
    }

    /**
     * Load current user
     */
    loadCurrentUser() {
        const userSession = Utils.storage.get('user') || Utils.session.get('user');
        this.currentUser = userSession;
    }

    /**
     * Load user progress
     */
    loadUserProgress() {
        if (!this.currentUser) return;

        this.userProgress = Utils.storage.get(`user_progress_${this.currentUser.id}`, {});
    }

    /**
     * Mulai modul
     * @param {string} moduleId
     */
    startModule(moduleId) {
        if (!this.currentUser) {
            console.error('User belum login');
            return;
        }

        const module = this.modules.find(m => m.id === moduleId);
        if (!module) {
            console.error('Modul tidak ditemukan');
            return;
        }

        if (!this.userProgress[moduleId]) {
            this.userProgress[moduleId] = {
                moduleId,
                startDate: new Date().toISOString(),
                completedLessons: [],
                progress: 0,
                status: 'in-progress'
            };
        }

        this.saveProgress();
        return this.userProgress[moduleId];
    }

    /**
     * Complete lesson
     * @param {string} moduleId
     * @param {string} lessonId
     */
    completeLesson(moduleId, lessonId) {
        if (!this.currentUser || !this.userProgress[moduleId]) {
            return;
        }

        const progress = this.userProgress[moduleId];
        if (!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
        }

        const module = this.modules.find(m => m.id === moduleId);
        if (module) {
            progress.progress = Math.floor((progress.completedLessons.length / module.lessons) * 100);
            
            if (progress.progress === 100) {
                progress.status = 'completed';
                progress.completedDate = new Date().toISOString();
            }
        }

        this.saveProgress();
        return progress;
    }

    /**
     * Get modul progress
     * @param {string} moduleId
     */
    getModuleProgress(moduleId) {
        return this.userProgress[moduleId] || null;
    }

    /**
     * Get all user progress
     */
    getUserProgress() {
        return this.userProgress;
    }

    /**
     * Get overview statistik
     */
    getProgressStats() {
        const total = this.modules.length;
        const completed = Object.values(this.userProgress)
            .filter(p => p.status === 'completed').length;
        const inProgress = Object.values(this.userProgress)
            .filter(p => p.status === 'in-progress').length;
        const notStarted = total - completed - inProgress;

        const totalHours = Object.values(this.userProgress)
            .reduce((sum, p) => sum + (this.modules.find(m => m.id === p.moduleId)?.duration || 0), 0);

        return {
            total,
            completed,
            inProgress,
            notStarted,
            totalHours: Math.round(totalHours / 60),
            totalMinutes: totalHours,
            averageProgress: Math.round(
                Object.values(this.userProgress).reduce((sum, p) => sum + p.progress, 0) /
                (Object.keys(this.userProgress).length || 1)
            )
        };
    }

    /**
     * Get modul by id
     * @param {string} moduleId
     */
    getModule(moduleId) {
        return this.modules.find(m => m.id === moduleId);
    }

    /**
     * Get semua modul
     */
    getAllModules() {
        return this.modules.map(module => ({
            ...module,
            progress: this.userProgress[module.id]?.progress || 0,
            status: this.userProgress[module.id]?.status || 'not-started'
        }));
    }

    /**
     * Get modul by level
     * @param {string} level
     */
    getModulesByLevel(level) {
        return this.modules.filter(m => m.level === level);
    }

    /**
     * Reset modul progress
     * @param {string} moduleId
     */
    resetModuleProgress(moduleId) {
        if (this.userProgress[moduleId]) {
            delete this.userProgress[moduleId];
            this.saveProgress();
        }
    }

    /**
     * Save progress to storage
     */
    saveProgress() {
        if (this.currentUser) {
            Utils.storage.set(`user_progress_${this.currentUser.id}`, this.userProgress);
        }
    }

    /**
     * Export progress sebagai JSON
     */
    exportProgress() {
        return {
            user: this.currentUser,
            progress: this.userProgress,
            stats: this.getProgressStats(),
            exportDate: new Date().toISOString()
        };
    }
}

// Initialize module system globally
const moduleSystem = new ModuleSystem();
