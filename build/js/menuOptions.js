const disableAdminLink = () => {
    const adminLink = document.querySelector('nav a[href="#admin"]');
    if (adminLink) {
        adminLink.remove();
    }
};
const isAdmin = (roles) => {
    return roles.includes("admin");
};

const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
};

const updateNavigationLinks = () => {
    const navigationLinks = document.querySelectorAll("nav a");
    const mobileNavigationLinks = document.querySelectorAll("#mobile-menu a");

    // Check if user is logged in
    if (isLoggedIn()) {
        navigationLinks.forEach((link) => {
            link.classList.remove("hidden");
        });
        mobileNavigationLinks.forEach((link) => {
            link.classList.remove("hidden");
        });
        const roles = localStorage.getItem("roles");
        if (roles) {
            if (isAdmin(roles)) {
                // Show Admin link
                document.querySelector('nav a[href="#admin"]').classList.remove("hidden");
            } else {
                // Hide Admin link
                document.querySelector('nav a[href="#admin"]').classList.add("hidden");
            }
        }
    } else {
        // Hide all navigation links except Home, Contact, Login, Sign up
        navigationLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href !== "#home" && href !== "#contact" && href !== "#login" && href !== "#signup") {
                link.classList.add("hidden");
            }
        });
        mobileNavigationLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href !== "#home" && href !== "#contact" && href !== "#login" && href !== "#signup") {
                link.classList.add("hidden");
            }
        });
    }
};
document.addEventListener("DOMContentLoaded", updateNavigationLinks);
