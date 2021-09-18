import BABYLON from "babylonjs";

export default function createSkyBox(scene, baseTexture, size) {
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size }, scene);

    const extensions = ["_front.jpg", "_up.jpg", "_right.jpg", "_back.jpg", "_down.jpg", "_left.jpg"];

    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;

    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(baseTexture, scene, extensions);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = BABYLON.Color3.Black();
    skyboxMaterial.specularColor = BABYLON.Color3.Black();
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.fogEnabled = false;

    skybox.material = skyboxMaterial;

    return skybox;
}
