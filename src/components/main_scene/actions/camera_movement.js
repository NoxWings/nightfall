import { Tools } from "babylonjs";


export default function createCameraMovement(camera, {
    yVariation = 5,
    yCicles = 0.3,
    rollVarition = 4,
    rollCicles = 0.4
} = {}) {
    const yPos = camera.position.y;
    const zRot = camera.rotation.z;

    return () => {
        var now = performance.now();

        camera.position.y = yPos + yVariation/2 * Math.sin(yCicles * Math.PI * now / 1000);
        camera.rotation.z = zRot + Tools.ToRadians(rollVarition/2) * Math.sin(rollCicles * Math.PI * now / 1000);
    };
}
