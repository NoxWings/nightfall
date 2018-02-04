import BABYLON from "babylonjs";

export default class LowFog extends BABYLON.Mesh {
    constructor(name, scene, density=500, side=50, strength=1, movementSpeed=1) {
        super(name, scene);

        this.particleSystem = this._createPS(density, side, strength, movementSpeed);
        this.particleSystem.start();
    }

    _createPS (density, side, strength, movementSpeed) {
        const fogPS = new BABYLON.ParticleSystem("particles", density, this.getScene());
        fogPS.particleTexture = new BABYLON.Texture("assets/smoke.png", this.getScene());
        fogPS.emitter = this;

        fogPS.minEmitBox = new BABYLON.Vector3(-side, 0, -side);
        fogPS.maxEmitBox = new BABYLON.Vector3(side, 0, side);

        fogPS.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, strength * 0.05);
        fogPS.color2 = new BABYLON.Color4(.95, .95, .95, strength * 0.1);
        fogPS.colorDead = new BABYLON.Color4(0.9, 0.9, 0.9, strength * 0.1);

        fogPS.minSize = 4.0;
        fogPS.maxSize = 5.0;

        fogPS.minLifeTime = 360;
        fogPS.maxLifeTime = 500;

        fogPS.emitRate = 500000;

        fogPS.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

        fogPS.gravity = new BABYLON.Vector3(0, 0, 0);

        fogPS.minAngularSpeed = -2;
        fogPS.maxAngularSpeed = 2;

        fogPS.direction1 = new BABYLON.Vector3(-movementSpeed, 0, -movementSpeed);
        fogPS.direction2 = new BABYLON.Vector3(movementSpeed, 0, movementSpeed);

        fogPS.minEmitPower = .5;
        fogPS.maxEmitPower = 1;

        fogPS.updateSpeed = 0.005;
        return fogPS;
    }
}
