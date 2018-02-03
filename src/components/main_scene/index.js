import BABYLON from "babylonjs";

import createSkybox from "./subviews/create_skybox";
import createGround from "./subviews/create_ground";

export default class MainScene extends BABYLON.Scene {
    constructor(engine) {
        super(engine);
        this.clearColor = BABYLON.Color3.Black();

        this.staticMeshes = [];

        this._createCamera();
        this._createLight();

        this._createStaticGeometry();
        this._createProbe();

        this._createFog();

    }

    _createCamera () {
        const beta = -Math.PI * 0.415;
        const alpha = Math.PI * 0.585;
        const target = BABYLON.Vector3.Up();
        const fov = Math.PI / 3;

        this.mainCamera = new BABYLON.ArcRotateCamera("camera", beta, alpha, 0.01, target, this);
        this.mainCamera.fov = fov;
    }

    _createLight () {
        this._light = new BABYLON.DirectionalLight("light",
            new BABYLON.Vector3(-0.1, -1, -0.4),
            this
        );
        this._light.intensity = 1;
        this._light.radius = 10;
    }

    _createStaticGeometry () {
        this._ground = createGround(this, 1000);
        this._skybox = createSkybox(this, "assets/grimmnight", 10000);
        this._skybox.position.y = 400;

        this.staticMeshes.push(this._ground);
        this.staticMeshes.push(this._skybox);
    }

    _createFog () {
        this.fogMode = BABYLON.Scene.FOGMODE_EXP2;
        this.fogColor = new BABYLON.Color3(0.03, 0.03, 0.04);
        this.fogDensity = 0.01;
    }

    _createProbe () {
        this.probe = new BABYLON.ReflectionProbe("probe", 512, this);
        this.probe.refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;

        this.staticMeshes.forEach(mesh => {
            this.probe.renderList.push(mesh);
        });

        this.probe.position = new BABYLON.Vector3(0, 2, 0);
    }
}
