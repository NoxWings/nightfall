import BABYLON from "babylonjs";

export default function create_gui (scene, ambientSound) {
    const getSoundText = () => `Sound: ${getPercentage(ambientSound.getVolume())}%`;

    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    const panel = new BABYLON.GUI.StackPanel();
    panel.width = "220px";
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture.addControl(panel);


    const header = new BABYLON.GUI.TextBlock();
    header.text = getSoundText();
    header.height = "30px";
    header.color = "white";
    panel.addControl(header);

    const slider = new BABYLON.GUI.Slider();
    slider.minimum = 0;
    slider.maximum = 1;
    slider.value = ambientSound.getVolume();
    slider.height = "20px";
    slider.width = "200px";

    slider.isThumbCircle = true;

    slider.onValueChangedObservable.add((value) => {
        ambientSound.setVolume(value);
        header.text = getSoundText();
    });
    panel.addControl(slider);
}

function getPercentage(num) {
    return (num*100).toString().split(".")[0];
}
