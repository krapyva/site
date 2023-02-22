

window.location.hash = "#menu1"

setTimeout(() => {
 init3DModel()
}, 1000)

function init3DModel() {
    const container = document.getElementById('c');


    const scene = new THREE.Scene();
    scene.background = new THREE.Color('lightgray')

    const camera = new THREE.PerspectiveCamera(45, 1, 0.5, 5000);
    camera.position.set(1800, 400, 300);


    const ambientLight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambientLight);

    directionLight = new THREE.DirectionalLight('white', 100)
    directionLight.position.set(0, 1, 0)
    scene.add(directionLight)

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer)



    const loader = new THREE.GLTFLoader();
    loader.load('scene.glb', function (gltf) {
        model = gltf.scene.children[0]
        model.scale.set(0.5, 0.5, 0.5)
        scene.add(gltf.scene);
        animate()
    }, undefined, function (error) {

        console.error(error);

    });

    var menuItems = document.getElementsByClassName('side-menu-item');
    for (let item of menuItems) {
        item.addEventListener('click', function (event) {
            for (let itemEvent of menuItems) {
                itemEvent.classList.remove('active')
            }
            item.classList.add('active')
        })
    }
    animate();


    function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

}