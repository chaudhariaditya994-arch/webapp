// Smooth scrolling and navbar functionality
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Mobile hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background on scroll - FIXED for transparent hero
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll progress bar
window.addEventListener('scroll', () => {
    const progress = document.querySelector('.progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progress.style.width = scrollPercent + '%';
});

// Active navbar link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in, .stat-card, .card, .section-title').forEach(el => {
    observer.observe(el);
});

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + '%';
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target + '%';
            }
        };
        
        if (window.pageYOffset > 500) {
            updateCounter();
        }
    });
}

// Run counters on scroll
window.addEventListener('scroll', animateCounters);

// Navbar shrink on scroll for mobile
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth <= 768 && window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.padding = '1rem 0';
    }
});

// Parallax effect for hero (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const speed = scrolled * -0.5;
    if (hero) {
        hero.style.transform = `translateY(${speed}px)`;
    }
});

// ===== AUTH MODALS =====
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginClose = document.getElementById('loginClose');
const signupClose = document.getElementById('signupClose');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Open modals
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
});

signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'block';
});

// Close modals
loginClose.addEventListener('click', () => loginModal.style.display = 'none');
signupClose.addEventListener('click', () => signupModal.style.display = 'none');

// Switch between modals
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    signupModal.style.display = 'block';
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'none';
    loginModal.style.display = 'block';
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === signupModal) signupModal.style.display = 'none';
});

// Form handling with localStorage demo
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Demo validation
    if (email && password) {
        localStorage.setItem('user', JSON.stringify({email, loggedIn: true}));
        alert('Login successful! (Demo)');
        loginModal.style.display = 'none';
        updateAuthUI(true, email);
    } else {
        alert('Please fill all fields');
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (name && email && password) {
        localStorage.setItem('user', JSON.stringify({name, email, loggedIn: true}));
        alert('Signup successful! (Demo)');
        signupModal.style.display = 'none';
        updateAuthUI(true, name);
    } else {
        alert('Please fill all fields');
    }
});

// Update navbar based on auth state
function updateAuthUI(loggedIn, name = '') {
    const authItems = document.querySelectorAll('.auth-item');
    if (loggedIn) {
        authItems.forEach(item => {
            item.innerHTML = `<a href="#" class="nav-link auth-link" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Welcome, ${name}! (Logout)</a>`;
        });
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('user');
            updateAuthUI(false);
            alert('Logged out');
        });
    } else {
        // Reset to default login/signup
        authItems[0].innerHTML = '<a href="#" class="nav-link auth-link" id="loginBtn"><i class="fas fa-sign-in-alt"></i> Login</a>';
        authItems[1].innerHTML = '<a href="#" class="nav-link auth-link" id="signupBtn"><i class="fas fa-user-plus"></i> Signup</a>';
        // Rebind event listeners
        document.getElementById('loginBtn').addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'block';
        });
        document.getElementById('signupBtn').addEventListener('click', (e) => {
            e.preventDefault();
            signupModal.style.display = 'block';
        });
    }
}

// Check auth state on load
const user = localStorage.getItem('user');
if (user) {
    const userData = JSON.parse(user);
    if (userData.loggedIn) {
        updateAuthUI(true, userData.name || userData.email);
    }
}
