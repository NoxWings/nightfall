import { Tools } from "babylonjs";


export default function createCameraMovement(camera, {
    yPosVariation = 5,
    yCicles = 0.3,
    rollVarition = 4,
    rollCicles = 0.4,
    yawVariation = 25,
    yawCicles = 0.01
} = {}) {
    const yPos = camera.position.y;
    const yRot = camera.rotation.y;
    const zRot = camera.rotation.z;

    const yPosRange = yPosVariation / 2;
    const yRotRange = Tools.ToRadians(yawVariation / 2);
    const zRotRange = Tools.ToRadians(rollVarition / 2);

    return () => {
        var now = performance.now();
        var angularVariation = Math.PI * now / 1000;

        camera.position.y = yPos + yPosRange * Math.sin(yCicles * angularVariation);
        camera.rotation.y = yRot + yRotRange * Math.sin(yawCicles * angularVariation);
        camera.rotation.z = zRot + zRotRange * Math.sin(rollCicles * angularVariation);
    };
}
