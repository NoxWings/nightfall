import BABYLON from "babylonjs";

export default function createGround(scene, size) {
    const ground = BABYLON.Mesh.CreateGround("ground", size, size, 2, scene);

    const groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.05, 0.05, 0.1);
    groundMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    groundMaterial.specularPower = 20;

    ground.material = groundMaterial;

    return ground;
}
