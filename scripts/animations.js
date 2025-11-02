// Animations JavaScript for Hacker Portfolio

// Initialize GSAP animations
function initializeAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, skipping animations');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all animations
    initHeroAnimations();
    initScrollAnimations();
    initHoverAnimations();
    initLoadingAnimations();
    initGlitchEffects();
    initScanlineEffect();
}

// Hero section animations
function initHeroAnimations() {
    // Typewriter effect for hero title
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        
        gsap.to(typewriterElement, {
            duration: 0.1,
            repeat: text.length - 1,
            onRepeat: function() {
                typewriterElement.textContent += text[this.repeatCount()];
            },
            delay: 1
        });
    }
    
    // Hero buttons entrance animation
    gsap.fromTo('.hero-buttons .btn', 
        { 
            opacity: 0, 
            y: 30, 
            scale: 0.8 
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 2,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }
    );
    
    // Hero subtitle animation
    gsap.fromTo('.hero-subtitle', 
        { 
            opacity: 0, 
            y: 20 
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1.5,
            ease: 'power2.out'
        }
    );
    
    // Floating animation for hero elements
    gsap.to('.hero-text', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, 
            { 
                opacity: 0, 
                y: 50,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Terminal prompt animation
    gsap.utils.toArray('.terminal-prompt').forEach(prompt => {
        gsap.fromTo(prompt, 
            { 
                opacity: 0, 
                x: -30 
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: prompt,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Skills tags animation
    gsap.utils.toArray('.skill-tag').forEach((tag, index) => {
        gsap.fromTo(tag, 
            { 
                opacity: 0, 
                scale: 0,
                rotation: 180
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.5,
                delay: index * 0.05,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: tag,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Project cards staggered animation
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                y: 50,
                rotationY: 15
            },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Service cards animation
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                y: 30,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Certificate cards animation
    gsap.utils.toArray('.certificate-card').forEach((card, index) => {
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                y: 50,
                rotationY: 45,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Contact form animation
    gsap.fromTo('.contact-form', 
        { 
            opacity: 0, 
            x: 50,
            scale: 0.95
        },
        {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Hover animations
function initHoverAnimations() {
    // Button hover effects
    gsap.utils.toArray('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                boxShadow: '0 0 0 rgba(0, 255, 65, 0)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Card hover effects
    gsap.utils.toArray('.stat-card, .service-card, .project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(0, 255, 65, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                scale: 1,
                boxShadow: '0 0 0 rgba(0, 255, 65, 0)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Skill tag hover effects
    gsap.utils.toArray('.skill-tag, .tech-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                rotation: 5,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        tag.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotation: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
    
    // Navigation link hover effects
    gsap.utils.toArray('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                color: '#00ff41',
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                color: '#e0e0e0',
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    // Loading screen animation
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        gsap.to(loadingText, {
            opacity: 0.5,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }
    
    // Cursor blink animation
    const cursorBlink = document.querySelector('.cursor-blink');
    if (cursorBlink) {
        gsap.to(cursorBlink, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }
}

// Glitch effects
function initGlitchEffects() {
    // Random glitch effect on hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                gsap.to(heroTitle, {
                    x: Math.random() * 4 - 2,
                    duration: 0.1,
                    repeat: 2,
                    yoyo: true,
                    onComplete: () => {
                        gsap.to(heroTitle, { x: 0, duration: 0.1 });
                    }
                });
            }
        }, 3000);
    }
    
    // Glitch effect on terminal prompts
    gsap.utils.toArray('.terminal-prompt').forEach(prompt => {
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance
                const originalText = prompt.textContent;
                const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
                let glitchText = '';
                
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() < 0.3) {
                        glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                        glitchText += originalText[i];
                    }
                }
                
                prompt.textContent = glitchText;
                
                setTimeout(() => {
                    prompt.textContent = originalText;
                }, 100);
            }
        }, 5000);
    });
}

// Scanline effect
function initScanlineEffect() {
    // Create scanline overlay
    const scanline = document.createElement('div');
    scanline.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00ff41, transparent);
        opacity: 0.3;
        z-index: 1000;
        pointer-events: none;
    `;
    document.body.appendChild(scanline);
    
    // Animate scanline
    gsap.to(scanline, {
        y: window.innerHeight,
        duration: 3,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 2
    });
    
    // Random scanline appearances
    setInterval(() => {
        gsap.fromTo(scanline, 
            { y: 0, opacity: 0 },
            { 
                y: window.innerHeight, 
                opacity: 0.3,
                duration: 2,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.set(scanline, { opacity: 0 });
                }
            }
        );
    }, 8000);
}

// Parallax scrolling effect
function initParallaxEffect() {
    // Hero section parallax
    gsap.utils.toArray('.hero-3d-container').forEach(container => {
        gsap.to(container, {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Background elements parallax
    gsap.utils.toArray('.stat-card').forEach((card, index) => {
        gsap.to(card, {
            yPercent: -20 * (index + 1),
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// Text reveal animations
function initTextRevealAnimations() {
    // Split text into characters for animation
    gsap.utils.toArray('.section-title').forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.display = 'inline-block';
            title.appendChild(span);
        }
        
        const chars = title.querySelectorAll('span');
        gsap.fromTo(chars, 
            { 
                opacity: 0, 
                y: 50,
                rotationX: 90
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.5,
                delay: 0.5,
                stagger: 0.05,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Counter animations
function initCounterAnimations() {
    gsap.utils.toArray('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        gsap.fromTo(counter, 
            { textContent: 0 },
            {
                textContent: target,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Modal animations
function initModalAnimations() {
    // Modal entrance animation
    gsap.utils.toArray('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    gsap.fromTo(modal.querySelector('.modal-content'), 
        { 
            scale: 0.8, 
            opacity: 0,
            rotationY: 45
        },
        {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.5,
            ease: 'back.out(1.7)'
        }
    );
}

function closeModal(modal) {
    gsap.to(modal.querySelector('.modal-content'), {
        scale: 0.8,
        opacity: 0,
        rotationY: -45,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Toast notification animations
function initToastAnimations() {
    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');
        
        toastMessage.textContent = message;
        
        // Set icon and color based on type
        switch (type) {
            case 'success':
                toastIcon.textContent = '✓';
                toast.style.borderColor = '#00ff41';
                break;
            case 'error':
                toastIcon.textContent = '✗';
                toast.style.borderColor = '#ff4444';
                break;
            default:
                toastIcon.textContent = 'ℹ';
                toast.style.borderColor = '#00ffff';
        }
        
        gsap.fromTo(toast, 
            { 
                x: 400, 
                opacity: 0,
                scale: 0.8
            },
            {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    setTimeout(() => {
                        gsap.to(toast, {
                            x: 400,
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.3,
                            ease: 'power2.in'
                        });
                    }, 3000);
                }
            }
        );
    }
    
    // Make showToast globally available
    window.showToast = showToast;
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for GSAP to load
    if (typeof gsap !== 'undefined') {
        initializeAnimations();
    } else {
        // Retry after a short delay
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                initializeAnimations();
            }
        }, 100);
    }
});

// Export functions
window.initializeAnimations = initializeAnimations;
window.openModal = openModal;
window.closeModal = closeModal;
