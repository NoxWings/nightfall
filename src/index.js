import BABYLON from "babylonjs";
import MainScene from "./components/main_scene";

export default function app () {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    let scene = new MainScene(engine);
    scene.mainCamera.attachControl(canvas, false);

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
}

window.onLoad = app();
