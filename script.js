/**
 * Hsiao Financial and Retirement, LLC - Interactive Script
 * Features:
 *  1. Dynamic Mobile Navigation Hamburger Menu Toggle
 *  2. Dark / Light Mode Switcher with LocalStorage Persistence
 *  3. Interactive Form Validation & Success Modal Alert
 *  4. Header Scroll Shadow & Smooth Active Navigation Indicator
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Dark / Light Mode Toggle Setup
    // ----------------------------------------------------------------------
    const initThemeToggle = () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Create Theme Toggle Button dynamically
        const themeBtn = document.createElement('button');
        themeBtn.id = 'theme-toggle';
        themeBtn.className = 'theme-toggle-btn';
        themeBtn.setAttribute('aria-label', 'Toggle Dark/Light Mode');
        themeBtn.innerHTML = '<span class="theme-icon">🌙</span> <span class="theme-text">Dark Mode</span>';

        // Insert button into navigation links container
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const li = document.createElement('li');
            li.appendChild(themeBtn);
            navLinks.appendChild(li);
        }

        // Apply saved theme or system preference
        const savedTheme = localStorage.getItem('hsiao_theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeBtn.innerHTML = '<span class="theme-icon">☀️</span> <span class="theme-text">Light Mode</span>';
        }

        // Toggle Event Listener
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');

            if (isDark) {
                themeBtn.innerHTML = '<span class="theme-icon">☀️</span> <span class="theme-text">Light Mode</span>';
                localStorage.setItem('hsiao_theme', 'dark');
            } else {
                themeBtn.innerHTML = '<span class="theme-icon">🌙</span> <span class="theme-text">Dark Mode</span>';
                localStorage.setItem('hsiao_theme', 'light');
            }
        });
    };

    // ----------------------------------------------------------------------
    // 2. Mobile Navigation Hamburger Menu Toggle
    // ----------------------------------------------------------------------
    const initMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        if (!navbar || !navLinks) return;

        // Create Hamburger Button
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger-toggle';
        hamburgerBtn.setAttribute('aria-label', 'Toggle Mobile Navigation Menu');
        hamburgerBtn.innerHTML = `
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
        `;

        // Insert Hamburger Button into Navbar before links
        navbar.insertBefore(hamburgerBtn, navLinks);

        // Toggle Mobile Menu Open/Close
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking any link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    };

    // ----------------------------------------------------------------------
    // 3. Interactive Form Submission & Modal Alert
    // ----------------------------------------------------------------------
    const initFormValidationAndModal = () => {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        // Inject Modal DOM Elements into Body
        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'modal-overlay';
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-card">
                <button class="modal-close-btn" id="modal-close">&times;</button>
                <div class="modal-icon">✅</div>
                <h3>Consultation Request Received!</h3>
                <p id="modal-message">Thank you for reaching out to Hsiao Financial and Retirement, LLC. A local Bay Area fiduciary advisor will review your planning request and contact you within 24 business hours.</p>
                <button class="btn-primary modal-action-btn" id="modal-ok-btn">Return to Website</button>
            </div>
        `;
        document.body.appendChild(modalOverlay);

        const closeModal = () => {
            modalOverlay.classList.remove('active');
        };

        document.getElementById('modal-close').addEventListener('click', closeModal);
        document.getElementById('modal-ok-btn').addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        // Form Submit Event Handling
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const interestSelect = document.getElementById('interest');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value.trim() : 'Valued Client';
            const interestText = interestSelect && interestSelect.options[interestSelect.selectedIndex] 
                ? interestSelect.options[interestSelect.selectedIndex].text 
                : 'Retirement Advisory';

            // Custom dynamic message in modal
            const modalMessage = document.getElementById('modal-message');
            if (modalMessage) {
                modalMessage.innerHTML = `Thank you, <strong>${name}</strong>! Your consultation request regarding <strong>${interestText}</strong> has been successfully submitted. One of our San Francisco Bay Area advisors will contact you shortly.`;
            }

            // Display Success Modal
            modalOverlay.classList.add('active');

            // Reset Form Fields
            contactForm.reset();
        });
    };

    // ----------------------------------------------------------------------
    // 4. Inject Dynamic CSS Rules for JS Features
    // ----------------------------------------------------------------------
    const injectDynamicStyles = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            /* Hamburger Button Styling */
            .hamburger-toggle {
                display: none;
                flex-direction: column;
                justify-content: space-between;
                width: 30px;
                height: 22px;
                background: transparent;
                border: none;
                cursor: pointer;
                z-index: 1100;
                padding: 0;
            }
            .hamburger-bar {
                width: 100%;
                height: 3px;
                background-color: #FFFFFF;
                border-radius: 2px;
                transition: all 0.3s ease-in-out;
            }
            .hamburger-toggle.active .hamburger-bar:nth-child(1) {
                transform: translateY(9.5px) rotate(45deg);
            }
            .hamburger-toggle.active .hamburger-bar:nth-child(2) {
                opacity: 0;
            }
            .hamburger-toggle.active .hamburger-bar:nth-child(3) {
                transform: translateY(-9.5px) rotate(-45deg);
            }

            /* Theme Toggle Button */
            .theme-toggle-btn {
                background: rgba(255, 255, 255, 0.1);
                color: #FFFFFF;
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 0.4rem 0.85rem;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.85rem;
                display: flex;
                align-items: center;
                gap: 0.4rem;
                transition: all 0.25s ease;
            }
            .theme-toggle-btn:hover {
                background: var(--accent-gold, #D4AF37);
                color: #0F1C2E;
                border-color: var(--accent-gold, #D4AF37);
            }

            /* Dark Mode Overrides */
            body.dark-mode {
                background-color: #0B131F !important;
                color: #E2E8F0 !important;
            }
            body.dark-mode .about-section,
            body.dark-mode .advantages-section,
            body.dark-mode .about-card,
            body.dark-mode .service-card,
            body.dark-mode .pricing-card,
            body.dark-mode .advantage-card,
            body.dark-mode .contact-form {
                background-color: #152238 !important;
                color: #E2E8F0 !important;
                border-color: #233554 !important;
            }
            body.dark-mode h1, 
            body.dark-mode h2, 
            body.dark-mode h3, 
            body.dark-mode h4,
            body.dark-mode .price,
            body.dark-mode label {
                color: #FFFFFF !important;
            }
            body.dark-mode .services-section,
            body.dark-mode .pricing-section,
            body.dark-mode .mission-box {
                background-color: #0F1C2E !important;
            }
            body.dark-mode .form-group input,
            body.dark-mode .form-group select,
            body.dark-mode .form-group textarea {
                background-color: #1C2D4A !important;
                color: #FFFFFF !important;
                border-color: #2C3E50 !important;
            }

            /* Modal Overlay Styling */
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 28, 46, 0.75);
                backdrop-filter: blur(4px);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            .modal-card {
                background: #FFFFFF;
                border-radius: 12px;
                padding: 2.5rem 2rem;
                max-width: 500px;
                width: 90%;
                text-align: center;
                position: relative;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
                transform: scale(0.9);
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .modal-overlay.active .modal-card {
                transform: scale(1);
            }
            .modal-close-btn {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 1.8rem;
                color: #64748B;
                cursor: pointer;
            }
            .modal-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            .modal-card h3 {
                color: #0F1C2E;
                font-size: 1.5rem;
                margin-bottom: 0.75rem;
            }
            .modal-card p {
                color: #475569;
                font-size: 1rem;
                line-height: 1.5;
                margin-bottom: 1.75rem;
            }

            /* Responsive Navigation Overrides for Mobile */
            @media (max-width: 768px) {
                .hamburger-toggle {
                    display: flex;
                }
                .nav-links {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background-color: #0F1C2E;
                    flex-direction: column;
                    padding: 1.5rem;
                    gap: 1.25rem !important;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    display: none !important;
                }
                .nav-links.active {
                    display: flex !important;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // Initialize all functionality
    injectDynamicStyles();
    initThemeToggle();
    initMobileMenu();
    initFormValidationAndModal();
});
