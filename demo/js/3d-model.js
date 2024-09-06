import * as THREE from '../vendor/three/three.module.min.js';
import { GLTFLoader } from '../vendor/three/GLTFLoader.js';

// Function to animate a model
const animateModel = (model, renderer, scene, camera, animationParameters) => {
  const animate = () => {
    requestAnimationFrame(animate);
    model.rotation.x += animationParameters.rotationSpeeds.x;
    model.rotation.y += animationParameters.rotationSpeeds.y;
    model.rotation.z += animationParameters.rotationSpeeds.z;
    renderer.render(scene, camera);
  };
  animate(); // Start the animation loop
};

// Function to initialize a 3D model
const initModel = (container, modelParams, animationParameters) => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    modelParams.fov,
    container.clientWidth / container.clientHeight,
    modelParams.near,
    modelParams.far
  );

  camera.position.set(
    modelParams.cameraPosition.x,
    modelParams.cameraPosition.y,
    modelParams.cameraPosition.z
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(
    modelParams.ambientLightColor,
    modelParams.ambientLightIntensity
  );
  scene.add(ambientLight);

  const loader = new GLTFLoader();
  loader.load(modelParams.path, (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Check if animationParameters are provided and valid
    if (animationParameters) {
      animateModel(model, renderer, scene, camera, animationParameters);
    }
  });

  // Resize event listener
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
};

// Find container element
const modelContainer = document.querySelector('.model__container');

// Model parameters
const modelParameters = {
  path: '3d/board-pink.glb',
  fov: 30,
  near: 0.1,
  far: 500,
  cameraPosition: { x: 0, y: 0, z: 26 },
  ambientLightColor: 0xffffff,
  ambientLightIntensity: 2,
};

// Animation parameters
const animationParameters = {
  rotationSpeeds: { x: 0.01, y: 0.02, z: 0.015 }, // Example animation parameters
};

// Initialize model with container element, model parameters, and animation parameters (if provided)
initModel(modelContainer, modelParameters, animationParameters);
