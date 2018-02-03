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
        this.ball = BABYLON.Mesh.CreateSphere("Meteorite", 32, 1, this._scene);
        this.ball.parent = this;
        this.ball.scaling.y = 2;

        var m = new BABYLON.StandardMaterial("Mat", this._scene);
        m.disableLighting = true;
        m.emissiveColor = BABYLON.Color3.White();
        m.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        m.emissiveFresnelParameters.bias = 0.3;
        m.emissiveFresnelParameters.power = 4;
        m.emissiveFresnelParameters.leftColor = new BABYLON.Color3(0, 0.4, 1);
        m.emissiveFresnelParameters.rightColor = new BABYLON.Color3(.4, .8, 1);

        this.ball.material = m;
    }

    _addEmitters () {
        var ps1 = createSideEmitter(this._scene);
        ps1.emitter = this.ball; // the starting object, the emitter
        ps1.minEmitBox = new BABYLON.Vector3(0.4, 0, 0); // Starting all from
        ps1.maxEmitBox = new BABYLON.Vector3(0.4, 0, 0); // To...
        ps1.direction1 = new BABYLON.Vector3(5, 15, 0);
        ps1.direction2 = new BABYLON.Vector3(6, 15, 0);
        ps1.start();

        var ps2 = createSideEmitter(this._scene);
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
