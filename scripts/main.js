// Main JavaScript for Hacker Portfolio

// Global variables
let heroScene, aboutScene, certificatesScene;
let isMobile = window.innerWidth <= 768;
let isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    hideLoadingScreen();
    initializeNavigation();
    initializeScrollAnimations();
    initializeProjectFilters();
    initializeContactForm();
    initializeModals();
    initializeStatsCounter();
    initializeCertificateCards();
    initializeServiceCards();
    
    // Initialize 3D scenes after a short delay to ensure everything is loaded
    setTimeout(() => {
        if (!isMobile) {
            initialize3DScenes();
        }
    }, 100);
}

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }
}

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.terminal-header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize scroll animations with GSAP
function initializeScrollAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements on scroll
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate stat cards
    gsap.utils.toArray('.stat-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 30, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, rotationY: 15 },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                duration: 1,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 30, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Initialize project filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    gsap.fromTo(card, 
                        { opacity: 0, scale: 0.8 },
                        { opacity: 1, scale: 1, duration: 0.5 }
                    );
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span><span class="btn-icon">⏳</span>';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showToast('Message sent successfully!', 'success');
                this.reset();
            } else {
                showToast('Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showToast('Network error. Please check your connection.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Initialize modals
function initializeModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Initialize stats counter animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };
    
    // Use Intersection Observer to trigger animation when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Initialize certificate cards
function initializeCertificateCards() {
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(180deg) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg) scale(1)';
        });
    });
}

// Initialize service cards
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                rotationY: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotationY: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize 3D scenes
function initialize3DScenes() {
    if (typeof THREE === 'undefined') return;
    
    // Initialize hero scene
    initHeroScene();
    
    // Initialize about scene
    initAboutScene();
    
    // Initialize certificates scene
    initCertificatesScene();
}

// Initialize hero 3D scene
function initHeroScene() {
    const container = document.getElementById('hero3D');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create cyber city geometry
    const cityGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
    const cityMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    
    const buildings = [];
    for (let i = 0; i < 50; i++) {
        const building = new THREE.Mesh(cityGeometry, cityMaterial);
        building.position.x = (Math.random() - 0.5) * 20;
        building.position.y = Math.random() * 5;
        building.position.z = (Math.random() - 0.5) * 20;
        building.scale.y = Math.random() * 2 + 0.5;
        buildings.push(building);
        scene.add(building);
    }
    
    // Create floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 50;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00ffff,
        size: 0.1,
        transparent: true,
        opacity: 0.8
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    camera.position.z = 15;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate buildings
        buildings.forEach((building, index) => {
            building.rotation.y += 0.001 * (index % 3 + 1);
            building.rotation.x += 0.0005 * (index % 2 + 1);
        });
        
        // Rotate particles
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    heroScene = { scene, camera, renderer, buildings, particles };
}

// Initialize about 3D scene
function initAboutScene() {
    const container = document.getElementById('timeline3D');
    if (!container) return;
    
    // Create floating cards effect
    const cards = container.querySelectorAll('.timeline-item');
    
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                rotationY: 5,
                boxShadow: '0 10px 30px rgba(0, 255, 65, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotationY: 0,
                boxShadow: '0 0 0 rgba(0, 255, 65, 0)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize certificates 3D scene
function initCertificatesScene() {
    const container = document.getElementById('certificates3D');
    if (!container) return;
    
    const certificates = container.querySelectorAll('.certificate-card');
    
    certificates.forEach((cert, index) => {
        // Add staggered animation
        gsap.fromTo(cert,
            { opacity: 0, y: 50, rotationY: 45 },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                duration: 0.8,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: cert,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Enhanced hover effects
        cert.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                rotationY: 180,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
        
        cert.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotationY: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    });
}

// Modal functions
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('projectModalBody');
    
    // Project data
    const projects = {
        'web-scanner': {
            title: 'Web Security Scanner',
            description: 'An automated web application security scanner built with Python that performs comprehensive vulnerability assessments.',
            tech: ['Python', 'Requests', 'BeautifulSoup', 'SQLite'],
            features: [
                'SQL Injection detection',
                'XSS vulnerability scanning',
                'Directory enumeration',
                'Custom payload generation',
                'Detailed reporting'
            ],
            github: '#',
            demo: '#'
        },
        'buffer-overflow': {
            title: 'Buffer Overflow Exploit',
            description: 'Educational buffer overflow exploit development demonstrating memory corruption vulnerabilities.',
            tech: ['C', 'Assembly', 'GDB', 'Python'],
            features: [
                'Stack-based buffer overflow',
                'ROP chain development',
                'Shellcode injection',
                'ASLR bypass techniques',
                'Educational documentation'
            ],
            github: '#',
            demo: '#'
        },
        'ctf-writeups': {
            title: 'CTF Writeups Collection',
            description: 'Comprehensive collection of Capture The Flag challenge solutions and methodologies.',
            tech: ['Python', 'Bash', 'Crypto', 'Forensics'],
            features: [
                'Web exploitation techniques',
                'Cryptography challenges',
                'Reverse engineering solutions',
                'Forensics analysis',
                'Binary exploitation'
            ],
            github: '#',
            demo: '#'
        },
        'bugbounty-tools': {
            title: 'Bug Bounty Tools Suite',
            description: 'Custom tools and scripts for efficient bug bounty hunting and reconnaissance.',
            tech: ['Python', 'Go', 'Bash', 'JavaScript'],
            features: [
                'Subdomain enumeration',
                'Vulnerability scanning',
                'Automated reporting',
                'API testing tools',
                'Reconnaissance automation'
            ],
            github: '#',
            demo: '#'
        },
        'security-automation': {
            title: 'Security Automation Pipeline',
            description: 'Automated security testing pipelines integrated with CI/CD workflows.',
            tech: ['Python', 'Docker', 'GitHub Actions', 'Jenkins'],
            features: [
                'SAST integration',
                'DAST automation',
                'Dependency scanning',
                'Security reporting',
                'CI/CD integration'
            ],
            github: '#',
            demo: '#'
        },
        'portfolio': {
            title: 'Portfolio Website',
            description: 'This very website showcasing modern web development with 3D elements and cyberpunk aesthetics.',
            tech: ['HTML', 'CSS', 'JavaScript', 'Three.js', 'GSAP'],
            features: [
                '3D WebGL scenes',
                'GSAP animations',
                'Responsive design',
                'Web3Form integration',
                'Accessibility features'
            ],
            github: '#',
            demo: '#'
        }
    };
    
    const project = projects[projectId];
    if (project) {
        modalBody.innerHTML = `
            <h3>${project.title}</h3>
            <p class="project-description">${project.description}</p>
            
            <div class="project-details">
                <h4>Technologies Used:</h4>
                <div class="tech-tags">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                
                <h4>Key Features:</h4>
                <ul class="feature-list">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                
                <div class="project-links">
                    <a href="${project.github}" class="btn btn-primary" target="_blank">
                        <span>View Source</span>
                        <span class="btn-icon">></span>
                    </a>
                    <a href="${project.demo}" class="btn btn-secondary" target="_blank">
                        <span>Live Demo</span>
                        <span class="btn-icon">></span>
                    </a>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openContactModal(serviceType) {
    const modal = document.getElementById('contactModal');
    const serviceTypeSpan = document.getElementById('serviceType');
    
    if (serviceTypeSpan) {
        serviceTypeSpan.textContent = serviceType;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeAllModals() {
    closeProjectModal();
    closeContactModal();
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');
    
    toastMessage.textContent = message;
    
    // Set icon based on type
    switch (type) {
        case 'success':
            toastIcon.textContent = '✓';
            toast.style.borderColor = 'var(--primary-green)';
            break;
        case 'error':
            toastIcon.textContent = '✗';
            toast.style.borderColor = '#ff4444';
            break;
        default:
            toastIcon.textContent = 'ℹ';
            toast.style.borderColor = 'var(--primary-cyan)';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    isMobile = window.innerWidth <= 768;
    isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    
    // Reinitialize 3D scenes if needed
    if (!isMobile && !heroScene) {
        initialize3DScenes();
    }
}, 250));

// Add matrix rain effect for mobile fallback
function initMatrixRain() {
    if (isMobile) {
        const heroSection = document.querySelector('.hero-section');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.1';
        
        heroSection.appendChild(canvas);
        
        function resizeCanvas() {
            canvas.width = heroSection.clientWidth;
            canvas.height = heroSection.clientHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const chars = '01';
        const charSize = 14;
        const columns = Math.floor(canvas.width / charSize);
        const drops = new Array(columns).fill(1);
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = `${charSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * charSize, drops[i] * charSize);
                
                if (drops[i] * charSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 50);
    }
}

// Initialize matrix rain for mobile
if (isMobile) {
    initMatrixRain();
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
