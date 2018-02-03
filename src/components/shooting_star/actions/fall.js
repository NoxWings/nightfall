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
        fame: 0,
        value: 150
    }, {
        frame: 150,
        value: -1
    }, {
        frame: 200,
        value: -150
    }]);

    return animation;
}
