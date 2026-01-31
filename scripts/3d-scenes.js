// 3D Scenes JavaScript for Hacker Portfolio
// CLEAN + MOBILE SAFE VERSION

// =====================
// GLOBAL FLAGS
// =====================
const isMobile3D = window.innerWidth <= 768;

// =====================
// GLOBAL STORAGE
// =====================
let scenes = {};
let renderers = {};
let cameras = {};
let animationIds = {};

// =====================
// INITIALIZER
// =====================
function initialize3DScenes() {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }

    if (isMobile3D) {
        console.log('3D disabled on mobile for performance');
        return;
    }

    initHeroScene();
    animate();
}

// =====================
// HERO SCENE
// =====================
function initHeroScene() {
    const container = document.getElementById('hero3D');
    if (!container) return;

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
        powerPreference: 'high-performance'
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    scenes.hero = scene;
    cameras.hero = camera;
    renderers.hero = renderer;

    createCyberCity(scene);
    createMatrixRain(scene);
    createNeonGrid(scene);

    camera.position.set(0, 6, 18);
    camera.lookAt(0, 0, 0);

    addHeroInteraction(container, camera, scene);

    window.addEventListener('resize', () => resizeScene('hero', container));
}

// =====================
// CYBER CITY
// =====================
function createCyberCity(scene) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });

    const buildings = [];

    const COUNT = isMobile3D ? 10 : 25;

    for (let i = 0; i < COUNT; i++) {
        const b = new THREE.Mesh(geometry, material);

        b.position.set(
            (Math.random() - 0.5) * 30,
            Math.random() * 8,
            (Math.random() - 0.5) * 30
        );

        b.scale.y = Math.random() * 6 + 2;

        buildings.push(b);
        scene.add(b);
    }

    scene.userData.buildings = buildings;
}

// =====================
// MATRIX PARTICLES
// =====================
function createMatrixRain(scene) {
    const COUNT = isMobile3D ? 200 : 1200;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 50;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x00ffff,
        size: 0.08,
        transparent: true,
        opacity: 0.7
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    scene.userData.particles = particles;
}

// =====================
// NEON GRID
// =====================
function createNeonGrid(scene) {
    const grid = new THREE.GridHelper(30, 30, 0x00ff41, 0x00ff41);
    grid.material.opacity = 0.15;
    grid.material.transparent = true;
    grid.position.y = -4;
    scene.add(grid);

    scene.userData.grid = grid;
}

// =====================
// INTERACTION
// =====================
function addHeroInteraction(container, camera, scene) {
    let targetX = 0;
    let targetY = 0;

    container.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / container.clientWidth - 0.5) * 0.2;
        targetY = (e.clientY / container.clientHeight - 0.5) * 0.2;
    });

    scene.userData.interaction = { targetX, targetY };
}

// =====================
// ANIMATION LOOP
// =====================
function animate() {
    animationIds.hero = requestAnimationFrame(animate);

    const scene = scenes.hero;
    const camera = cameras.hero;
    const renderer = renderers.hero;

    if (!scene || !camera || !renderer) return;

    const t = Date.now() * 0.001;

    // Buildings
    if (scene.userData.buildings) {
        scene.userData.buildings.forEach((b, i) => {
            b.rotation.y += 0.001 * (i % 3 + 1);
            b.position.y += Math.sin(t + i) * 0.002;
        });
    }

    // Particles
    if (scene.userData.particles) {
        scene.userData.particles.rotation.y += 0.0005;
    }

    // Grid
    if (scene.userData.grid) {
        scene.userData.grid.rotation.y += 0.0003;
    }

    // Mouse interaction
    if (scene.userData.interaction) {
        camera.rotation.y += (scene.userData.interaction.targetX - camera.rotation.y) * 0.05;
        camera.rotation.x += (-scene.userData.interaction.targetY - camera.rotation.x) * 0.05;
    }

    renderer.render(scene, camera);
}

// =====================
// RESIZE
// =====================
function resizeScene(name, container) {
    const camera = cameras[name];
    const renderer = renderers[name];
    if (!camera || !renderer) return;

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// =====================
// CLEANUP
// =====================
function cleanup3DScenes() {
    Object.values(animationIds).forEach(id => cancelAnimationFrame(id));

    Object.values(renderers).forEach(r => {
        if (r && r.domElement) r.domElement.remove();
        r?.dispose();
    });

    scenes = {};
    cameras = {};
    renderers = {};
    animationIds = {};
}

// =====================
// EXPORTS
// =====================
window.initialize3DScenes = initialize3DScenes;
window.cleanup3DScenes = cleanup3DScenes;
