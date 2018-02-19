import BABYLON from "babylonjs";

import createSideEmitter from "./subviews/create_side_emitter";

import rotate from "./actions/rotate";

export default class ShootingStart extends BABYLON.Mesh {
    constructor(scene) {
        super();

        this._scene = scene;
        this._scene.addMesh(this);

        this._addBall();
        this._addEmitters();
        this._addActions();
    }

    _addBall () {
        this.ball = BABYLON.Mesh.CreateSphere("Star", 32, 1, this._scene);
        this.ball.parent = this;
        this.ball.scaling.y = 2;

        const m = new BABYLON.StandardMaterial("StarMat", this._scene);
        m.disableLighting = true;
        m.emissiveColor = new BABYLON.Color3(1.5, 1, 0.9);
        m.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        m.emissiveFresnelParameters.bias = 0.05;
        m.emissiveFresnelParameters.power = 4;
        m.emissiveFresnelParameters.leftColor = new BABYLON.Color3(1, 0.4, 0.2);
        m.emissiveFresnelParameters.rightColor = new BABYLON.Color3(1, 0.7, 0.5);

        this.ball.material = m;
    }

    _addEmitters () {
        const ps1 = createSideEmitter(this._scene);
        ps1.emitter = this.ball; // the starting object, the emitter
        ps1.minEmitBox = new BABYLON.Vector3(0.4, 0, 0); // Starting all from
        ps1.maxEmitBox = new BABYLON.Vector3(0.4, 0, 0); // To...
        ps1.direction1 = new BABYLON.Vector3(5, 15, 0);
        ps1.direction2 = new BABYLON.Vector3(6, 15, 0);
        ps1.start();

        const ps2 = createSideEmitter(this._scene);
        ps2.emitter = this.ball; // the starting object, the emitter
        ps2.minEmitBox = new BABYLON.Vector3(-0.4, 0, 0); // Starting all from
        ps2.maxEmitBox = new BABYLON.Vector3(-0.4, 0, 0); // To...
        ps2.direction1 = new BABYLON.Vector3(-5, 15, 0);
        ps2.direction2 = new BABYLON.Vector3(-6, 15, 0);
        ps2.start();
    }

    _addActions () {
        this.ball.animations.push(rotate());

        this._scene.beginAnimation(this.ball, 0, 100, true);
    }
}
