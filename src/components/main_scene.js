import BABYLON from "babylonjs";

export default class MainScene extends BABYLON.Scene {
    constructor(engine) {
        super(engine);

        this.staticMeshes = [];

        this._createCamera();
        this._createLight();
        this._createGround();

        this._createProbe();
    }

    _createCamera () {
        this.mainCamera = new BABYLON.ArcRotateCamera("camera",
            Math.PI / 3, Math.PI / 3, 1.5,
            new BABYLON.Vector3(0, 1.5, 0),
            this
        );
    }

    _createLight () {
        this._light = new BABYLON.DirectionalLight("light",
            new BABYLON.Vector3(-0.1, -1, -0.4),
            this
        );
        this._light.intensity = 1;
        this._light.radius = 10;
    }

    _createGround () {
        this._ground = BABYLON.Mesh.CreateGround("ground", 10, 10, 2, this);
        this.staticMeshes.push(this._ground);
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
