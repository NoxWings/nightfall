import BABYLON from "babylonjs";

import createSkybox from "./subviews/create_skybox";
import createOcean from "./subviews/create_ocean";

import ShootingStart from "../shooting_star";
import LowFog from "../low_fog";

const DEG_TO_RAD = Math.PI / 180;

export default class MainScene extends BABYLON.Scene {
    constructor(engine) {
        super(engine);
        this.clearColor = BABYLON.Color3.Black();

        this.staticMeshes = [];

        this._createCamera();
        this._createPostProcessing();
        this._createLight();
        // this._createFog();

        this._createStaticGeometry();
        this._createDinamicGeometry();

        this._createProbe();
        this._createOcean();
    }

    _createCamera () {
        this.mainCamera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, 0), this);
        this.mainCamera.fov = 60 * DEG_TO_RAD;
        this.mainCamera.rotation.x = -17 * DEG_TO_RAD;
        this.mainCamera.rotation.y = 145 * DEG_TO_RAD;
    }

    _createPostProcessing () {
        this.pipeline = new BABYLON.DefaultRenderingPipeline("default", true, this, [this.mainCamera]);

        this.pipeline.bloomEnabled = true;
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

    _createFog () {
        this._fog = new LowFog("Fog", this, 1000, 50, 0.05, 2);
        this._fog.position = new BABYLON.Vector3(0, 2, 0);
    }

    _createStaticGeometry () {
        this._skybox = createSkybox(this, "assets/cartoon", 10000);
        this.staticMeshes.push(this._skybox);
    }

    _createDinamicGeometry () {
        this._star = new ShootingStart(this);
        this._star.position = new BABYLON.Vector3(10, 3.5, -5);
    }

    _createProbe () {
        this.probe = new BABYLON.ReflectionProbe("probe", 512, this);
        this.probe.refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;

        this.staticMeshes.forEach(mesh => {
            this.probe.renderList.push(mesh);
        });

        this.probe.position = new BABYLON.Vector3(0, 2, 0);
    }

    _createOcean () {
        this._ocean = createOcean(this);
        this._ocean.position = new BABYLON.Vector3(0, -20, 0);
        this._ocean.rotation.y = -45 * DEG_TO_RAD;
        this.staticMeshes.forEach(mesh => {
            this._ocean.material.addToRenderList(mesh);
        });
    }
}
