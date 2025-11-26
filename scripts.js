/* ============================================
   WebMint Solutions - Main JavaScript
   Version: 1.0.0
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initThemeToggle();
    initNavbar();
    initSmoothScroll();
    initAOS();
    initHeroAnimations();
    initLottieAnimation();
    initHeroCanvas();
    initContactForm();
    initCatalogueTracking();
    initBackToTop();
    initCurrentYear();
    initGSAPAnimations();
});

/* ============================================
   Preloader
   ============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            // Remove preloader from DOM after animation
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    });
}

/* ============================================
   Theme Toggle (Dark/Light Mode)
   ============================================ */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('webmint-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('webmint-theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Re-initialize canvas with new theme colors
        if (window.heroScene) {
            updateCanvasColors(newTheme);
        }
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

/* ============================================
   Navbar Scroll Effect
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('mainNavbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
}

/* ============================================
   Smooth Scroll for Anchor Links
   ============================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('mainNavbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   AOS (Animate On Scroll) Initialization
   ============================================ */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 0,
            disable: function() {
                // Disable on mobile if needed
                return window.innerWidth < 768;
            }
        });
    }
}

/* ============================================
   Hero Section Animations (GSAP)
   ============================================ */
function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Create timeline for hero entrance animation
    const heroTl = gsap.timeline({
        defaults: {
            ease: 'power3.out',
            duration: 1
        }
    });
    
    // Animate hero elements
    heroTl
        .fromTo('.hero-badge', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.3
        )
        .fromTo('.hero-title', 
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1 },
            0.5
        )
        .fromTo('.hero-subtitle', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.7
        )
        .fromTo('.hero-buttons', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.9
        )
        .fromTo('.hero-tagline', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            1.1
        )
        .fromTo('.hero-visual', 
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1 },
            0.5
        );
}

/* ============================================
   GSAP ScrollTrigger Animations
   ============================================ */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate stat cards
    gsap.utils.toArray('.stat-card').forEach(function(card, index) {
        gsap.fromTo(card, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Animate service cards with stagger
    gsap.utils.toArray('.service-card').forEach(function(card, index) {
        gsap.fromTo(card, 
            { opacity: 0, y: 50, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.05,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Animate pricing cards
    gsap.utils.toArray('.pricing-card').forEach(function(card, index) {
        gsap.fromTo(card, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Animate process steps
    gsap.utils.toArray('.process-step').forEach(function(step, index) {
        gsap.fromTo(step, 
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Animate why cards
    gsap.utils.toArray('.why-card').forEach(function(card, index) {
        gsap.fromTo(card, 
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Parallax effect for highlight band
    gsap.to('.highlight-content', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.highlight-band',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
}

/* ============================================
   Lottie Animation
   ============================================ */
function initLottieAnimation() {
    const lottieContainer = document.getElementById('lottieAnimation');
    
    if (lottieContainer) {
        // Create Lottie player element
        const lottiePlayer = document.createElement('lottie-player');
        lottiePlayer.setAttribute('src', 'assets/heroanime.json');
        lottiePlayer.setAttribute('background', 'transparent');
        lottiePlayer.setAttribute('speed', '1');
        lottiePlayer.setAttribute('loop', '');
        lottiePlayer.setAttribute('autoplay', '');
        lottiePlayer.style.width = '100%';
        lottiePlayer.style.height = '400px';
        
        // Fallback: Use a different Lottie animation from LottieFiles CDN
        lottiePlayer.setAttribute('src', 'assets/heroanime.json');
        
        lottieContainer.appendChild(lottiePlayer);
        
        // Handle loading errors - try alternative animation
        lottiePlayer.addEventListener('error', function() {
            console.log('Lottie animation failed to load, trying alternative...');
            lottiePlayer.setAttribute('src', 'assets/heroanime.json');
        });
    }
}

/* ============================================
   Three.js Hero Canvas (Animated Background)
   ============================================ */
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    
    if (!canvas || typeof THREE === 'undefined') {
        console.log('Three.js not available or canvas not found');
        return;
    }
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Store for theme updates
    window.heroScene = { scene, particles: null };
    
    // Get current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Material color based on theme
    const getParticleColor = function(theme) {
        return theme === 'dark' ? 0x1868FF : 0x1868FF;
    };
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.025,
        color: getParticleColor(currentTheme),
        transparent: true,
        opacity: currentTheme === 'dark' ? 0.7 : 0.5,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    window.heroScene.particles = particlesMesh;
    window.heroScene.material = particlesMaterial;
    
    // Create floating shapes
    const shapes = [];
    
    // Add subtle floating spheres
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.SphereGeometry(0.1 + Math.random() * 0.1, 16, 16);
        const material = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0x1868FF : 0x118866,
            transparent: true,
            opacity: currentTheme === 'dark' ? 0.15 : 0.25
        });
        const sphere = new THREE.Mesh(geometry, material);
        
        sphere.position.x = (Math.random() - 0.5) * 8;
        sphere.position.y = (Math.random() - 0.5) * 6;
        sphere.position.z = (Math.random() - 0.5) * 4;
        
        sphere.userData = {
            originalY: sphere.position.y,
            speed: 0.5 + Math.random() * 0.5,
            amplitude: 0.2 + Math.random() * 0.3
        };
        
        scene.add(sphere);
        shapes.push(sphere);
    }
    
    window.heroScene.shapes = shapes;
    
    camera.position.z = 5;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(event) {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        // Rotate particles
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.03;
        
        // Mouse follow effect
        particlesMesh.rotation.y += mouseX * 0.01;
        particlesMesh.rotation.x += mouseY * 0.01;
        
        // Animate floating shapes
        shapes.forEach(function(shape) {
            shape.position.y = shape.userData.originalY + 
                Math.sin(elapsedTime * shape.userData.speed) * shape.userData.amplitude;
            shape.rotation.x = elapsedTime * 0.2;
            shape.rotation.y = elapsedTime * 0.3;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Update canvas colors when theme changes
function updateCanvasColors(theme) {
  if (window.heroScene && window.heroScene.material) {
        // Update particle opacity
        window.heroScene.material.opacity = theme === 'dark' ? 0.7 : 0.5;
        
        // Update floating shapes opacity
        if (window.heroScene.shapes) {
            window.heroScene.shapes.forEach(function(shape) {
                shape.material.opacity = theme === 'dark' ? 0.15 : 0.25;
            });
        }
    }
}

/* ============================================
   Contact Form Handling
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Send email to CUSTOMER (Thank You)
        emailjs.sendForm(
            'service_3qv7u4b',           // Your Gmail Service ID
            'template_ehqpvfk', // Template 1 ID (Thank You)
            form
        ).then(function() {
            console.log('Customer email sent!');
            
            // Send email to WEBMINT (Notification)
            return emailjs.sendForm(
                'service_3qv7u4b',           // Same Service ID
                'template_iqqlx6r',    // Template 2 ID (Notification)
                form
            );
            
        }).then(function() {
            console.log('Admin notification sent!');
            
            // Both emails sent successfully
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(formSuccess, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6 }
                );
            }
            
            form.reset();
            
            setTimeout(function() {
                form.style.display = 'block';
                formSuccess.style.display = 'none';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 10000);
            
        }).catch(function(error) {
            console.error('Error:', error);
            alert('Sorry, there was an error submitting your form. Please try again or contact us via WhatsApp.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

function validateForm(data) {
    let isValid = true;
    const form = document.getElementById('contactForm');
    
    // Check required fields
    const requiredFields = ['name', 'email', 'phone', 'projectType'];
    
    requiredFields.forEach(function(field) {
        const input = form.querySelector('[name="' + field + '"]');
        if (!data[field] || data[field].trim() === '') {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    // Validate email format
    const emailInput = form.querySelector('[name="email"]');
    if (data.email && !isValidEmail(data.email)) {
        emailInput.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate phone format
    const phoneInput = form.querySelector('[name="phone"]');
    if (data.phone && !isValidPhone(data.phone)) {
        phoneInput.classList.add('is-invalid');
        isValid = false;
    }
    
    return isValid;
}

function validateField(input) {
    const value = input.value.trim();
    const name = input.getAttribute('name');
    
    if (input.hasAttribute('required') && !value) {
        input.classList.add('is-invalid');
        return false;
    }
    
    if (name === 'email' && value && !isValidEmail(value)) {
        input.classList.add('is-invalid');
        return false;
    }
    
    if (name === 'phone' && value && !isValidPhone(value)) {
        input.classList.add('is-invalid');
        return false;
    }
    
    input.classList.remove('is-invalid');
    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s/g, ''));
}

/* ============================================
   Back to Top Button
   ============================================ */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   Current Year for Footer
   ============================================ */
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/* ============================================
   Additional Utility Functions
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add animation class when element comes into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(function(element) {
        if (isInViewport(element)) {
            element.classList.add('animated');
        }
    });
}

function initCatalogueTracking() {
    const catalogueButtons = document.querySelectorAll('.btn-catalogue');
    
    catalogueButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            console.log('Catalogue downloaded');
            
            // Optional: Show download confirmation
            showDownloadToast();
            
            // Optional: Track with analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'Catalogue',
                    'event_label': 'WebMint Catalogue PDF'
                });
            }
        });
    });
}

function showDownloadToast() {
    const toast = document.createElement('div');
    toast.className = 'download-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle"></i>
            <span>Catalogue download started!</span>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Initialize scroll animations
window.addEventListener('scroll', throttle(animateOnScroll, 100));

// Handle form input styling
document.querySelectorAll('.form-control').forEach(function(input) {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add invalid state styling
const style = document.createElement('style');
style.textContent = `
    .form-control.is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
    }
    
    .form-control.is-invalid:focus {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2) !important;
    }
`;
document.head.appendChild(style);

/* ============================================
   Performance Optimizations
   ============================================ */

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(function(img) {
        imageObserver.observe(img);
    });
}

// Console welcome message
console.log('%c WebMint Solutions ', 'background: #1868FF; color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Digital Product Studio ', 'color: #118866; font-size: 14px; padding: 5px 0;');
console.log('%c Code · Clarity · Conversion ', 'color: #666; font-size: 12px;');