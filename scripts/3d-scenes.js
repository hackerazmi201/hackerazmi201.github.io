// 3D Scenes JavaScript for Hacker Portfolio

// Global 3D scene variables
const isMobile = window.innerWidth <= 768;

let scenes = {};
let renderers = {};
let cameras = {};
let animationIds = {};

// Initialize all 3D scenes
function initialize3DScenes() {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, skipping 3D scenes');
        return;
    }
    
    initHeroScene();
    initAboutScene();
    initCertificatesScene();
    initServicesScene();
    
    // Start animation loop
    animate();
}

// Hero Scene - Cyber City
function initHeroScene() {
    const container = document.getElementById('hero3D');
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75, 
        container.clientWidth / container.clientHeight, 
        0.1, 
        1000
    );
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Store references
    scenes.hero = scene;
    cameras.hero = camera;
    renderers.hero = renderer;
    
    // Create cyber city buildings
    createCyberCity(scene);
    
    // Create floating terminal fragments
    createTerminalFragments(scene);
    
    // Create matrix rain particles
    createMatrixRain(scene);
    
    // Create neon grid
    createNeonGrid(scene);
    
    // Set camera position
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);
    
    // Add mouse/touch interaction
    addHeroInteraction(container, camera, scene);
    
    // Handle resize
    window.addEventListener('resize', () => resizeScene('hero', container));
}

// Create cyber city buildings
function createCyberCity(scene) {
    const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
    const buildingMaterial = new THREE.MeshLambertMaterial({
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    
    const buildings = [];
    
    // Create random buildings
    for (let i = 0; i < 30; i++) {
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        
        // Random position
        building.position.x = (Math.random() - 0.5) * 40;
        building.position.z = (Math.random() - 0.5) * 40;
        building.position.y = Math.random() * 10;
        
        // Random scale
        building.scale.x = Math.random() * 2 + 0.5;
        building.scale.y = Math.random() * 8 + 2;
        building.scale.z = Math.random() * 2 + 0.5;
        
        // Random rotation
        building.rotation.y = Math.random() * Math.PI * 2;
        
        buildings.push(building);
        scene.add(building);
    }
    
    // Store for animation
    scenes.hero.userData.buildings = buildings;
}

// Create floating terminal fragments
function createTerminalFragments(scene) {
    const fragmentGeometry = new THREE.PlaneGeometry(2, 1);
    const fragmentMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    
    const fragments = [];
    
    for (let i = 0; i < 15; i++) {
        const fragment = new THREE.Mesh(fragmentGeometry, fragmentMaterial);
        
        fragment.position.x = (Math.random() - 0.5) * 30;
        fragment.position.y = Math.random() * 15;
        fragment.position.z = (Math.random() - 0.5) * 30;
        
        fragment.rotation.x = Math.random() * Math.PI;
        fragment.rotation.y = Math.random() * Math.PI;
        fragment.rotation.z = Math.random() * Math.PI;
        
        fragments.push(fragment);
        scene.add(fragment);
    }
    
    scenes.hero.userData.fragments = fragments;
}

// Create matrix rain effect
function createMatrixRain(scene) {
    const particleCount = isMobile ? 300 : 2000;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Position
        positions[i3] = (Math.random() - 0.5) * 50;
        positions[i3 + 1] = Math.random() * 50;
        positions[i3 + 2] = (Math.random() - 0.5) * 50;
        
        // Color (green/cyan)
        const color = Math.random() > 0.5 ? 0x00ff41 : 0x00ffff;
        colors[i3] = (color >> 16) / 255;
        colors[i3 + 1] = ((color >> 8) & 255) / 255;
        colors[i3 + 2] = (color & 255) / 255;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    scenes.hero.userData.particles = particles;
}

// Create neon grid
function createNeonGrid(scene) {
    const gridSize = 20;
    const gridDivisions = 20;
    const gridGeometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
    
    const gridMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -5;
    scene.add(grid);
    
    scenes.hero.userData.grid = grid;
}

// Add hero scene interaction
function addHeroInteraction(container, camera, scene) {
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    
    // Mouse movement
    container.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / container.clientWidth) * 2 - 1;
        mouseY = -(event.clientY / container.clientHeight) * 2 + 1;
        
        targetRotationY = mouseX * 0.1;
        targetRotationX = mouseY * 0.1;
    });
    
    // Touch movement
    container.addEventListener('touchmove', (event) => {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            mouseX = (touch.clientX / container.clientWidth) * 2 - 1;
            mouseY = -(touch.clientY / container.clientHeight) * 2 + 1;
            
            targetRotationY = mouseX * 0.1;
            targetRotationX = mouseY * 0.1;
        }
    }, { passive: true });
    
    // Store interaction data
    scene.userData.interaction = {
        mouseX,
        mouseY,
        targetRotationX,
        targetRotationY
    };
}

// About Scene - Floating Cards
function initAboutScene() {
    const container = document.getElementById('timeline3D');
    if (!container) return;
    
    // Create floating cards effect using CSS transforms
    const timelineItems = container.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Add 3D transform origin
        item.style.transformOrigin = 'center center';
        item.style.transformStyle = 'preserve-3d';
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                rotationY: 5,
                rotationX: 2,
                z: 20,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotationY: 0,
                rotationX: 0,
                z: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Add scroll-based animation
        gsap.fromTo(item, 
            { 
                opacity: 0, 
                y: 50, 
                rotationY: 45,
                z: -50
            },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                z: 0,
                duration: 0.8,
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

// Certificates Scene - 3D Shelf
function initCertificatesScene() {
    const container = document.getElementById('certificates3D');
    if (!container) return;
    
    const certificates = container.querySelectorAll('.certificate-card');
    
    certificates.forEach((cert, index) => {
        // Set up 3D transforms
        cert.style.transformStyle = 'preserve-3d';
        cert.style.transformOrigin = 'center center';
        
        // Staggered entrance animation
        gsap.fromTo(cert,
            { 
                opacity: 0, 
                y: 100, 
                rotationY: 90,
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
                rotationX: 5,
                z: 30,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
        
        cert.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotationY: 0,
                rotationX: 0,
                z: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    });
}

// Services Scene - Interactive Cards
function initServicesScene() {
    const container = document.querySelector('.services-grid');
    if (!container) return;
    
    const serviceCards = container.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Set up 3D transforms
        card.style.transformStyle = 'preserve-3d';
        card.style.transformOrigin = 'center center';
        
        // Entrance animation
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 50, 
                rotationY: 15,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
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
        
        // Interactive hover effects
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                rotationY: 5,
                rotationX: 2,
                z: 20,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotationY: 0,
                rotationX: 0,
                z: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Animation loop
function animate() {
    // Hero scene animation
    if (scenes.hero && renderers.hero) {
        animateHeroScene();
    }
    
    // Continue animation loop
    animationIds.main = requestAnimationFrame(animate);
}

// Animate hero scene
function animateHeroScene() {
    const scene = scenes.hero;
    const camera = cameras.hero;
    const renderer = renderers.hero;
    
    if (!scene || !camera || !renderer) return;
    
    const time = Date.now() * 0.001;
    
    // Animate buildings
    if (scene.userData.buildings) {
        scene.userData.buildings.forEach((building, index) => {
            building.rotation.y += 0.001 * (index % 3 + 1);
            building.rotation.x += 0.0005 * (index % 2 + 1);
            
            // Subtle floating motion
            building.position.y += Math.sin(time + index) * 0.001;
        });
    }
    
    // Animate fragments
    if (scene.userData.fragments) {
        scene.userData.fragments.forEach((fragment, index) => {
            fragment.rotation.x += 0.002 * (index % 2 + 1);
            fragment.rotation.y += 0.001 * (index % 3 + 1);
            fragment.rotation.z += 0.0015 * (index % 4 + 1);
            
            // Floating motion
            fragment.position.y += Math.sin(time * 0.5 + index) * 0.002;
        });
    }
    
    // Animate particles
    if (scene.userData.particles) {
        scene.userData.particles.rotation.y += 0.001;
        scene.userData.particles.rotation.x += 0.0005;
        
        // Update particle positions for matrix rain effect
        const positions = scene.userData.particles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= 0.1; // Move down
            if (positions[i] < 0) {
                positions[i] = 50; // Reset to top
            }
        }
        scene.userData.particles.geometry.attributes.position.needsUpdate = true;
    }
    
    // Animate grid
    if (scene.userData.grid) {
        scene.userData.grid.rotation.z += 0.0005;
    }
    
    // Apply mouse interaction
    if (scene.userData.interaction) {
        const { targetRotationX, targetRotationY } = scene.userData.interaction;
        camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.05;
        camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.05;
    }
    
    // Render
    renderer.render(scene, camera);
}

// Resize scene
function resizeScene(sceneName, container) {
    const camera = cameras[sceneName];
    const renderer = renderers[sceneName];
    
    if (!camera || !renderer || !container) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Cleanup function
function cleanup3DScenes() {
    // Cancel animation loops
    Object.values(animationIds).forEach(id => {
        if (id) cancelAnimationFrame(id);
    });
    
    // Dispose of Three.js objects
    Object.values(scenes).forEach(scene => {
        if (scene) {
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
        }
    });
    
    // Dispose of renderers
    Object.values(renderers).forEach(renderer => {
        if (renderer) {
            renderer.dispose();
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        }
    });
    
    // Clear references
    scenes = {};
    renderers = {};
    cameras = {};
    animationIds = {};
}

// Performance optimization for mobile
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reduce particle count
        if (scenes.hero && scenes.hero.userData.particles) {
            const particles = scenes.hero.userData.particles;
            particles.material.size = 0.05;
            particles.material.opacity = 0.5;
        }
        
        // Reduce building count
        if (scenes.hero && scenes.hero.userData.buildings) {
            scenes.hero.userData.buildings.forEach((building, index) => {
                if (index > 15) {
                    building.visible = false;
                }
            });
        }
    }
}

// Initialize mobile optimizations
if (window.innerWidth <= 768) {
    setTimeout(optimizeForMobile, 1000);
}

// Export functions
window.initialize3DScenes = initialize3DScenes;
window.cleanup3DScenes = cleanup3DScenes;
window.optimizeForMobile = optimizeForMobile;

