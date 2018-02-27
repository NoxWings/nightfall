import BABYLON from "babylonjs";

export default function createSideEmitter(scene) {
    const particleSystem = new BABYLON.ParticleSystem("particles", 2500, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("assets/flare.png", scene);

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(3.0, 2.4, 2.1, 1.0);
    particleSystem.color2 = new BABYLON.Color4(3.0, 1.5, 0.6, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0.2, 0.1, 0, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 3;
    particleSystem.maxSize = 3;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.03;
    particleSystem.maxLifeTime = 0.1;

    // Emission rate
    particleSystem.emitRate = 1000;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 9.8, 0);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 3;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.003;

    return particleSystem;
}
