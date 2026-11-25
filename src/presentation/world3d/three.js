// Único punto de entrada de three.js en el juego (T003, plan 006).
// three.js solo se importa desde src/presentation/world3d/ (lo comprueba tests/architecture.test.js).
// La versión está fijada en el mapa de módulos de index.html (three@0.160.0).
export * as THREE from 'three';
export { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
