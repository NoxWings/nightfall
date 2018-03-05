import BABYLON from "babylonjs";

import createSkybox from "./subviews/create_skybox";
import createOcean from "./subviews/create_ocean";
import createGUI from "./subviews/create_gui";
import createCameraMovement from "./actions/camera_movement";

import ShootingStart from "../shooting_star";
import LowFog from "../low_fog";

const DEG_TO_RAD = Math.PI / 180;
const TAU = Math.PI * 2;


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

        this._createAmbientSound();
        this._createGUI();
    }

    _createCamera () {
        this.mainCamera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, 0), this);
        this.mainCamera.fov = 60 * DEG_TO_RAD;
        this.mainCamera.rotation.x = -17 * DEG_TO_RAD;
        this.mainCamera.rotation.y = 145 * DEG_TO_RAD;

        this.registerBeforeRender(createCameraMovement(this.mainCamera));
    }

    _createPostProcessing () {
        this.pipeline = new BABYLON.DefaultRenderingPipeline("default", true, this, [this.mainCamera]);

        this.pipeline.bloomEnabled = true;
        this.pipeline.bloomWeight = 0.3;

        this.pipeline.imageProcessingEnabled = true;
        this.pipeline.imageProcessing.vignetteEnabled = true;
        this.pipeline.imageProcessing.vignetteWeight = 5;
        this.pipeline.imageProcessing.vignetteStretch = 1;
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
        const numStars = 12;
        const sectionAngle = TAU / numStars;

        for (var i = 0; i < numStars; i++) {
            const angle = i * sectionAngle + Math.random() * sectionAngle;
            const distance = 400 + Math.random() * 200;
            const delay = Math.random() * 10 * 1000;

            const position = new BABYLON.Vector3(Math.sin(angle), 0, Math.cos(angle));
            position.scaleInPlace(distance);

            setTimeout(() => {
                const star = new ShootingStart(this);
                star.position = position;
            }, delay);
        }
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

    _createAmbientSound () {
        this._ambientSound = new BABYLON.Sound("Waves", "assets/ocean_waves.mp3", this, null, { loop: true, autoplay: true });
        const volume = localStorage.getItem("volume") || 0.25;
        this._ambientSound.setVolume(volume);
    }

    _createGUI () {
        createGUI(this, this._ambientSound);
    }
}
