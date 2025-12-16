document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("adminLoginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("adminUsername").value.trim();
        const password = document.getElementById("adminPassword").value.trim();
        const securityCode = document.getElementById("securityCode").value.trim();

        const ADMIN_USERNAME = "admin";
        const ADMIN_PASSWORD = "admin123";
        const ADMIN_SECURITY = "BL2024";

        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD &&
            securityCode === ADMIN_SECURITY
        ) {
            alert("Login admin berhasil!");

            localStorage.setItem("adminToken", "ADMIN-LOGGED-IN");

            window.location.href = "../admin/dashboard.html";
        } else {
            alert("Username, password, atau security code salah!");
        }
    });

});
