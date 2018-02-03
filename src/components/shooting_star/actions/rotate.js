import BABYLON from "babylonjs";

export default function () {
    const animation = new BABYLON.Animation(
        "rotate",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
    );

    animation.setKeys([{
        frame: 0,
        value: 0
    }, {
        frame: 30,
        value: 3 * Math.PI
    }]);

    return animation;
}
