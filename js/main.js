function showModel(modelPath) {
    console.log("Loading model from:", modelPath);
    
    // Setup basic Three.js scene
    const viewer = document.getElementById('unitViewer3d');
    viewer.innerHTML = '<p>Loading 3D model...</p>';
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9f9f9);
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, viewer.clientWidth / viewer.clientHeight, 0.1, 1000);
    camera.position.set(5, 3, 5);
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);
    viewer.innerHTML = '';
    viewer.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    
    // Load GLB model
    const loader = new THREE.GLTFLoader();
    loader.load(
        modelPath,
        function(gltf) {
            scene.add(gltf.scene);
            
            // Setup orbit controls
            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            animate();
        },
        undefined,
        function(error) {
            console.error("Error loading model:", error);
            
            // Fallback: Show simple cube if model fails to load
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            camera.position.z = 5;
            
            function animate() {
                requestAnimationFrame(animate);
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
            animate();
            
            viewer.innerHTML += '<p style="color:red;">Model tidak ditemukan, menampilkan objek sederhana</p>';
        }
    );
    
    // Show modal
    const modal = document.getElementById('unitModal');
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('unitModal').style.display = 'none';
}