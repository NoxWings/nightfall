import BABYLON from "babylonjs";

import createSkybox from "./subviews/create_skybox";
import createGround from "./subviews/create_ground";

import ShootingStart from "../shooting_star";
import LowFog from "../low_fog";

export default class MainScene extends BABYLON.Scene {
    constructor(engine) {
        super(engine);
        this.clearColor = BABYLON.Color3.Black();

        this.staticMeshes = [];

        this._createCamera();
        this._createPostProcessing();
        this._createLight();

        this._createStaticGeometry();
        this._createProbe();

        this._createFog();
        this._createDinamicGeometry();
    }

    _createCamera () {
        const degToRad = Math.PI / 180;

        this.mainCamera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 3.5, 0), this);
        this.mainCamera.fov = 60 * degToRad;
        this.mainCamera.rotation.x = -10 * degToRad;
    }

    _createPostProcessing () {
        this.pipeline = new BABYLON.DefaultRenderingPipeline("default", true, this, [this.mainCamera]);

        this.pipeline.bloomEnabled = false;
        this.pipeline.bloomWeight = 0.3;

        this.pipeline.imageProcessingEnabled = true;
        this.pipeline.imageProcessing.vignetteEnabled = true;
        this.pipeline.imageProcessing.exposure = 1.5;
        this.pipeline.imageProcessing.contrast = 1.2;
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

    _createProbe () {
        this.probe = new BABYLON.ReflectionProbe("probe", 512, this);
        this.probe.refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;

        this.staticMeshes.forEach(mesh => {
            this.probe.renderList.push(mesh);
        });

        this.probe.position = new BABYLON.Vector3(0, 2, 0);
    }

    _createFog () {
        this.fog = new LowFog("Fog", this, 500, 50, 0.1, 2);
        this.fog.position = new BABYLON.Vector3(0, 2, 0);
    }

    _createDinamicGeometry () {
        this.star = new ShootingStart(this);
        this.star.position = new BABYLON.Vector3(-2, 3.5, 10);
    }
}
