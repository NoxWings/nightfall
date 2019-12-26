import BABYLON from "babylonjs";

export default function () {
    const animation = new BABYLON.Animation(
        "fall",
        "position.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    animation.setKeys([{
        frame: 0,
        value: 850
    }, {
        frame: 300,
        value: -20
    }, {
        frame: 330,
        value: -1500
    }]);

    return animation;
}
