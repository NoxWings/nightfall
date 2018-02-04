import BABYLON from "babylonjs";

export default function (scene) {
    var waterMesh = BABYLON.Mesh.CreateGround("Ocean", 2048, 2048, 32, scene, false);
    var water = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(512, 512));
    water.backFaceCulling = true;
    water.bumpTexture = new BABYLON.Texture("assets/waterbump.png", scene);
    water.windForce = 3;
    water.waveSpeed = 30;
    water.waveHeight = 1;
    water.bumpHeight = 0.2;
    water.windDirection = new BABYLON.Vector2(1, 1);
    water.waterColor = new BABYLON.Color3(0, 0, 221 / 255);
    water.colorBlendFactor = 0.002;
    waterMesh.material = water;
    return waterMesh;
}
