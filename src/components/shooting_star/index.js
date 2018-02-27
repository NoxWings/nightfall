import BABYLON from "babylonjs";

import createSideEmitter from "./subviews/create_side_emitter";

import rotate from "./actions/rotate";
import fall from "./actions/fall";

export default class ShootingStart extends BABYLON.Mesh {
    constructor(scene) {
        super();

        this._scene = scene;
        this._scene.addMesh(this);

        this._addBall();
        this._addTrail();
        this._addEmitters();
        this._addActions();
    }

    _addBall () {
        this.ball = new BABYLON.TransformNode("Star", this._scene);
        this.ball.parent = this;
        this.ball.scaling.y = 2;
    }

    _addTrail () {
        const trail = BABYLON.MeshBuilder.CreatePlane("plane", {
            height: 1400,
            width: 4,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, this._scene);
        trail.position.y = 350;

        trail.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
        trail.parent = this.ball;

        const m = new BABYLON.PBRMaterial("mat", this._scene);
        m.alpha = 0;
        m.alphaMode = BABYLON.Engine.ALPHA_ONEONE;
        m.disableLighting = true;
        m.emissiveTexture = new BABYLON.Texture("assets/trail.png", this._scene);
        m.emissiveColor = new BABYLON.Color3(3, 1.5, 0.6);

        trail.material = m;
    }

    _addEmitters () {
        const ps1 = createSideEmitter(this._scene);
        ps1.emitter = this.ball; // the starting object, the emitter
        ps1.minEmitBox = new BABYLON.Vector3(.1, 0, 0); // Starting all from
        ps1.maxEmitBox = new BABYLON.Vector3(.1, 0, 0); // To...
        ps1.direction1 = new BABYLON.Vector3(30, 50, 0);
        ps1.direction2 = new BABYLON.Vector3(40, 50, 0);
        ps1.start();

        const ps2 = createSideEmitter(this._scene);
        ps2.emitter = this.ball; // the starting object, the emitter
        ps2.minEmitBox = new BABYLON.Vector3(-.1, 0, 0); // Starting all from
        ps2.maxEmitBox = new BABYLON.Vector3(-.1, 0, 0); // To...
        ps2.direction1 = new BABYLON.Vector3(-40, 50, 0);
        ps2.direction2 = new BABYLON.Vector3(-40, 50, 0);
        ps2.start();
    }

    _addActions () {
        this.ball.animations.push(rotate());
        this.ball.animations.push(fall());

        this._scene.beginAnimation(this.ball, 0, 330, true);
    }
}
