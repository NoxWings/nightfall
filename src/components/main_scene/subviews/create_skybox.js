import BABYLON from "babylonjs";

export default function createSkyBox(scene, baseTexture, size) {
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size }, scene);

    const extensions = ["_front.png", "_up.png", "_right.png", "_back.png", "_down.png", "_left.png"];

    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;

    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(baseTexture, scene, extensions);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = BABYLON.Color3.Black();
    skyboxMaterial.specularColor = BABYLON.Color3.Black();

    skybox.material = skyboxMaterial;

    return skybox;
}
