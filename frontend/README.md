# BetterLife Website - Implementation Guide

## Overview
BetterLife adalah platform kesehatan mental yang komprehensif dengan fitur CBT, meditasi, jurnal, dan assessment. Website ini telah ditingkatkan dengan UI/UX yang lebih baik dan sistem lengkap untuk mendukung fungsionalitas penuh.

## 📋 Struktur Proyek

```
betterlife-website/
├── index.html                          # Landing page utama
├── script.js                           # Main script
├── style.css                           # Legacy stylesheet
│
├── assets/
│   ├── css/
│   │   ├── main.css                   # Stylesheet utama (landing & auth pages)
│   │   ├── admin.css                  # Stylesheet admin dashboard
│   │   ├── components.css             # Component library (NEW)
│   │   └── responsive.css             # Responsive design system (NEW)
│   ├── images/                        # Folder gambar
│   ├── js/
│   │   ├── main.js                   # Main JavaScript
│   │   ├── auth.js                   # Authentication system
│   │   ├── admin.js                  # Admin functionality
│   │   ├── utils.js                  # Utility functions (NEW)
│   │   └── module-system.js          # Module progress tracking (NEW)
│   └── videos/                        # Folder video
│
├── auth/
│   ├── login.html                    # Login page
│   ├── register.html                 # Register page
│   └── admin-login.html              # Admin login page
│
├── admin/
│   ├── dashboard.html                # Admin dashboard
│   ├── user-management.html          # User management
│   ├── module-management.html        # Module management
│   ├── video-management.html         # Video management
│   ├── podcast-management.html       # Podcast management
│   └── admin.js                      # Admin JavaScript
│
├── user/
│   ├── dashboard.html                # User dashboard
│   ├── profile.html                  # User profile (NEW)
│   └── progress.html                 # User progress tracking (NEW)
│
├── cbt/
│   ├── cbt.html                      # CBT module list
│   ├── modul-1.html                  # CBT module 1
│   ├── modul-2.html                  # CBT module 2
│   └── cbt.js                        # CBT functionality
│
├── education/
│   ├── edukasi.html                  # Education hub
│   ├── video.html                    # Video list
│   ├── podcast.html                  # Podcast list
│   ├── artikel.html                  # Articles list
│   └── education.js                  # Education functionality
│
├── meditation/
│   ├── meditasi.html                 # Meditation list
│   ├── sesi-meditasi.html            # Meditation session
│   └── meditation.js                 # Meditation functionality
│
├── journal/
│   ├── jurnal.html                   # Journal list
│   ├── entri-jurnal.html             # Journal entry detail
│   └── journal.js                    # Journal functionality
│
├── assessment/
│   ├── kuesioner.html                # Assessment questionnaire
│   ├── hasil-kuesioner.html          # Assessment results
│   └── assessment.js                 # Assessment functionality
│
├── data/
│   ├── users.json                    # User data
│   ├── modules.json                  # Module data
│   ├── videos.json                   # Video data
│   ├── podcast.json                  # Podcast data
│   └── init-data.js                  # Data initialization (NEW)
│
└── IMPLEMENTATION_GUIDE.md           # This file
```

## 🎨 Sistem Desain CSS

### 1. **main.css** - Global Styles
Stylesheet utama untuk landing page, halaman autentikasi, dan komponen umum.

**Fitur Utama:**
- CSS Variables untuk theme consistency
- Navigation styling (height 72px)
- Button variants (.btn-primary, .btn-outline)
- Form styling dengan focus states
- Card/statistics grid styling
- Accessibility focus outlines (3px rgba)

**Warna Variables:**
```css
--primary: #168780          /* Turquoise utama */
--turquoise: #168780
--black: #000000
--white: #ffffff
--text: #3a3a3a
--dark-gray: #666666
--light-gray: #e0e0e0
--light-blue: #e8f5f4
```

### 2. **admin.css** - Admin Dashboard Styles
Stylesheet khusus untuk admin panel.

**Fitur Utama:**
- Admin header (height 72px)
- Sidebar navigation (width 240px)
- Admin layout with flexbox
- Stat cards dengan shadow effects
- Navigation item hover animations

### 3. **components.css** - Component Library (NEW - 550+ lines)
Reusable UI components untuk seluruh aplikasi.

**Komponen Tersedia:**
- **Modals** - Dialog dengan backdrop blur dan animasi slideUp
- **Badges** - Status badges (primary, success, warning, danger, info)
- **Cards** - Card components dengan hover effects
- **Progress Bars** - Progress bars dengan gradient fill
- **Alerts** - Alert system (success, error, warning, info)
- **Tabs** - Tab navigation dengan active states
- **Forms** - Form elements dengan error states
- **Loading Spinner** - CSS animation untuk loading
- **Empty State** - Empty state styling
- **Tooltips** - Tooltip components
- **Shadows** - Utility shadows (.shadow-sm, .shadow, .shadow-lg, .shadow-xl)

**Contoh Penggunaan Modal:**
```html
<div class="modal active" id="myModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Modal Title</h2>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            Modal content here
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline">Cancel</button>
            <button class="btn btn-primary">Confirm</button>
        </div>
    </div>
</div>
```

### 4. **responsive.css** - Responsive Design System (NEW - 700+ lines)
Comprehensive responsive design dengan 6+ breakpoints.

**Breakpoints:**
- **1200px+** - Desktop (container 1140px)
- **992-1199px** - Laptop (container 960px)
- **991px and below** - Tablet (nav hidden, sidebar horizontal, 2-col grid)
- **768-991px** - Mobile landscape (font 14px, nav 64px, 1-col features)
- **567px and below** - Mobile (font 13px, nav 56px, 1-col grids)
- **380px and below** - Very small (minimal UI)

**Fitur Aksesibilitas:**
- `@media (prefers-contrast: more)` - High contrast mode support
- `@media (prefers-reduced-motion: reduce)` - Reduced motion support
- Print media queries

## 🔧 JavaScript Systems

### 1. **utils.js** - Utility Functions (NEW - 240+ lines)
Library fungsi utility untuk validasi, storage, dan formatting.

**Fungsi Utama:**
```javascript
// Formatting
Utils.formatDate(date)                    // "Selasa, 27 November 2025"
Utils.formatTime(date)                    // "14:30"
Utils.timeAgo(date)                       // "2 jam yang lalu"
Utils.formatNumber(num)                   // "1.234.567"

// Validation
Utils.validateEmail(email)                // true/false
Utils.validatePasswordStrength(password)  // {strength, message}

// Object utilities
Utils.debounce(func, delay)              // Debounced function
Utils.throttle(func, limit)              // Throttled function
Utils.deepClone(obj)                     // Deep copy
Utils.merge(obj1, obj2)                  // Merge objects
Utils.generateId()                       // Random ID
Utils.getInitials(name)                  // "SA" from "Siti Aisyah"

// Storage (dengan namespace "betterlife_")
Utils.storage.set(key, value)            // localStorage
Utils.storage.get(key)
Utils.storage.remove(key)
Utils.storage.clear()

Utils.session.set(key, value)            // sessionStorage
Utils.session.get(key)
Utils.session.remove(key)
Utils.session.clear()
```

**Contoh Penggunaan:**
```javascript
// Format tanggal ke bahasa Indonesia
const date = Utils.formatDate(new Date());
console.log(date); // "Selasa, 27 November 2025"

// Validasi password
const result = Utils.validatePasswordStrength("MyPass123!");
console.log(result); // {strength: 'strong', message: 'Password kuat'}

// Simpan ke localStorage dengan namespace
Utils.storage.set('userData', {name: 'Siti'});
const userData = Utils.storage.get('userData');
```

### 2. **module-system.js** - Module Progress Tracking (NEW - 270+ lines)
Sistem untuk tracking progress user melalui modul CBT.

**Class: ModuleSystem**

**Methods:**
```javascript
const moduleSystem = new ModuleSystem();

// Start module untuk user
moduleSystem.startModule(moduleId)

// Complete lesson dalam module
moduleSystem.completeLesson(moduleId, lessonId)

// Get module progress
const progress = moduleSystem.getModuleProgress(moduleId)
// Returns: {progress: 75, status: 'in-progress', startDate, completedLessons: []}

// Get all modules
const modules = moduleSystem.getAllModules()

// Get statistics
const stats = moduleSystem.getProgressStats()
// Returns: {total, completed, inProgress, notStarted, totalHours, averageProgress}

// Export progress
const json = moduleSystem.exportProgress()
```

**Default Modules:**
1. Pengenalan CBT (Beginner) - 5 lessons
2. Pola Pikir Positif (Intermediate) - 6 lessons
3. Manajemen Emosi (Advanced) - 7 lessons

## 📄 File HTML Baru/Diperbarui

### 1. **user/profile.html** (NEW - 600+ lines)
Halaman profil user dengan tab-based interface.

**Fitur:**
- **Profile Tab**
  - Display profil user dengan avatar
  - Edit form untuk data pribadi
  - Stats: modules completed, days streak, progress %

- **Settings Tab**
  - Change password form
  - Login activity history
  - Logout dari devices lain

- **Preferences Tab**
  - Email notifications settings
  - Daily reminders
  - Achievement notifications
  - Newsletter subscription
  - Language & timezone selection

**Integrasi:**
- Menggunakan `Utils.formatDate()` untuk format tanggal
- Menggunakan `auth.js` untuk current user data
- Responsive design dari `responsive.css`

### 2. **user/progress.html** (NEW - 500+ lines)
Halaman tracking progress pembelajaran user.

**Fitur:**
- **Statistics Overview**
  - Total modules, completed, in-progress, hours
  - 4 stat cards dengan icons

- **Module List**
  - Filterable (All/Completed/InProgress/NotStarted)
  - Progress bars dengan percentage
  - Status badges

- **Activity Timeline**
  - Vertical timeline with icons
  - Timestamps dengan timeAgo formatting
  - Activity descriptions

**Integrasi:**
- Menggunakan `ModuleSystem.getProgressStats()` untuk data
- Menggunakan `Utils.timeAgo()` untuk timeline
- Responsive design dari `responsive.css`

### 3. **data/init-data.js** (NEW - ~200 lines)
Script untuk inisialisasi data default ke localStorage.

**Fitur:**
- Default users, modules, videos, podcasts, meditations
- Auto-init pada page load
- Reset functionality untuk demo
- Export/import data as JSON

**Penggunaan:**
```javascript
// Auto-runs on DOMContentLoaded
InitData.init()

// Manual reset
InitData.reset()

// Export data
InitData.export()

// Import dari file
const file = document.getElementById('fileInput').files[0];
InitData.import(file)
```

## 🎯 CSS Link Updates

Semua file HTML telah diperbarui untuk include stylesheets baru:

```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/components.css">
<link rel="stylesheet" href="../assets/css/responsive.css">
<!-- For admin pages, tambahkan: -->
<link rel="stylesheet" href="../assets/css/admin.css">
```

**Files Diperbarui:**
- ✅ index.html
- ✅ auth/login.html
- ✅ auth/register.html
- ✅ auth/admin-login.html
- ✅ user/dashboard.html
- ✅ user/profile.html
- ✅ user/progress.html
- ✅ cbt/cbt.html
- ✅ cbt/modul-1.html
- ✅ meditation/meditasi.html
- ✅ meditation/sesi-meditasi.html
- ✅ journal/jurnal.html
- ✅ journal/entri-jurnal.html
- ✅ education/edukasi.html
- ✅ education/video.html
- ✅ education/podcast.html
- ✅ education/artikel.html
- ✅ assessment/kuesioner.html
- ✅ assessment/hasil-kuesioner.html
- ✅ admin/dashboard.html
- ✅ admin/user-management.html
- ✅ admin/module-management.html
- ✅ admin/video-management.html
- ✅ admin/podcast-management.html

## 🚀 Quick Start

### 1. Initialize Data
```html
<!-- Add ini di bottom sebelum closing </body> -->
<script src="data/init-data.js"></script>
```

### 2. Load Required Scripts
```html
<script src="assets/js/utils.js"></script>
<script src="assets/js/module-system.js"></script>
<script src="assets/js/auth.js"></script>
<script src="assets/js/main.js"></script>
```

### 3. Test Demo Credentials
- **User:** email: siti@example.com, password: password123
- **Admin:** email: admin@example.com, password: admin123

## 📊 Features Implemented

### UI/UX Enhancements
- ✅ Improved navigation styling (72px height)
- ✅ Enhanced button variants with shadows
- ✅ Form styling dengan focus states
- ✅ Card components dengan hover effects
- ✅ Accessibility focus outlines
- ✅ Component library (modals, badges, alerts, tabs)
- ✅ Responsive design (6+ breakpoints)

### System Features
- ✅ Module progress tracking system
- ✅ Utility functions library
- ✅ User profile management
- ✅ Progress visualization dashboard
- ✅ Data initialization system
- ✅ Export/import functionality

### Admin Features
- ✅ User management dashboard
- ✅ Module management
- ✅ Video management
- ✅ Podcast management
- ✅ Statistics overview

## 🔒 Authentication

**LocalStorage Keys:**
```javascript
betterlife_users          // Array of users
betterlife_currentUser    // Current logged in user
betterlife_modules        // Modules data
betterlife_videos         // Videos data
betterlife_podcasts       // Podcasts data
betterlife_meditations    // Meditation data
betterlife_userProgress   // User progress tracking
```

## 📱 Responsive Breakpoints

| Device | Width | Features |
|--------|-------|----------|
| Desktop | 1200px+ | Full layout, 3-col grid |
| Laptop | 992-1199px | Container 960px |
| Tablet | 991px- | Nav hidden, 2-col grid, horizontal sidebar |
| Mobile L | 768-991px | Font 14px, 1-col features |
| Mobile | 567px- | Font 13px, nav 56px, 1-col |
| Mini | 380px- | Minimal UI, further font reduction |

## 🎨 Color Palette

```
Primary (Turquoise): #168780
Secondary: #20d4b8
Dark Text: #3a3a3a
Light Gray: #e0e0e0
Light Blue: #e8f5f4
White: #ffffff
```

## ⚙️ Configuration

### Admin Dashboard
- Sidebar width: 240px
- Header height: 72px
- Main content margin-left: 240px

### Component Spacing
- Padding: 16px, 20px, 24px, 28px
- Margin: Similar scale
- Border radius: 8px (default)

### Animation Timings
- Modal slideUp: 0.3s ease-out
- Button hover: 0.2s ease
- Loading spinner: 0.8s infinite

## 📚 Learning Resources

### CBT Modules
- Pengenalan CBT: 45 menit, 5 lessons
- Pola Pikir Positif: 60 menit, 6 lessons
- Manajemen Emosi: 75 menit, 7 lessons

### Meditation Sessions
- Beginner: 10 menit
- Intermediate: 15 menit
- Advanced: 20 menit

## 🐛 Troubleshooting

### CSS Not Loading
- Ensure all stylesheets are linked in correct order
- Check relative paths (../ for subdirectories)

### JavaScript Errors
- Ensure utils.js loaded before module-system.js
- Check browser console for specific errors
- Verify localStorage is enabled

### Data Not Persisting
- Check browser localStorage is enabled
- Verify InitData.js is loaded
- Check namespace keys start with "betterlife_"

## 📝 Notes

- All stylesheets use CSS variables for easy theming
- Component library can be extended with new components
- Module system can be connected to backend API
- Authentication currently uses localStorage (use backend for production)

## 🎓 Kontribusi & Development

1. Follow existing code patterns
2. Use CSS variables for colors
3. Add responsive styles to responsive.css
4. Document new utility functions in utils.js
5. Test across different breakpoints

---

**Last Updated:** November 2025
**Version:** 2.0 (UI/UX Enhanced)
**Status:** Ready for Testing
