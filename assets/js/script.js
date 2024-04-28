console.log("THREE JS RUNNING")
import * as THREE from "./build/three.module.js";
import { GLTFLoader } from "./jsm/loaders/GLTFLoader.js"


const canvas = document.querySelector("#canvas");
let camera, scene, renderer, controls;
let model1, model2, model3;
const scaleValue = (value, minInput, maxInput, minOutput, maxOutput) => {
    return minOutput + (maxOutput - minOutput) * ((value - minInput) / (maxInput - minInput));
}

const onWindowResize = () => {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

};

const loadModelGLTF = (modelURL) => {
    const loader = new GLTFLoader();
    let objectGroup = new THREE.Group();

    return new Promise((resolve, reject) => {
        loader.load(
            `../assets/models/${modelURL}/scene.gltf`,
            function (gltf) {
                const container = new THREE.Group();
                container.add(gltf.scene);
                objectGroup = container;
                resolve(objectGroup);
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.log('An error happened', error);
            }
        );
    })
};

const init = async () => {
    //window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onWindowResize);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);


    scene = new THREE.Scene();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 0, 100);
    directionalLight.lookAt(0, 0, 0);
    scene.add(directionalLight);

    const ambientlight = new THREE.AmbientLight(0xffffff, 3);
    ambientlight.position.set(0, 0, 0);
    scene.add(ambientlight);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);


    //LOAD 3D MODELS


    await loadModelGLTF("asics_shoe").then((resolve) => {
        console.log(resolve);
        model1 = resolve;
        return loadModelGLTF("asics_shoe");
    }).then((resolve) => {
        model2 = resolve;
    });

    model1.scale.set(30,30,30);
    model1.position.set(0,0,0);
    model1.rotation.set(0,0,0);
    scene.add(model1);

   

};

const render = () => {
    renderer.render(scene, camera);

};

const animate = () => {
    requestAnimationFrame(animate);

    if(model1) {
        model1.rotation.y += 0.01;
    }

    render();
};

init();
animate();