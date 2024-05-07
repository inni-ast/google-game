import { getIsSound, setIsSound } from "../../../data.js";

export function selectIsSound() {
  const containerEl = document.createElement("div");
  containerEl.classList.add("settings__item");

  const isSound = getIsSound();

  const labelSoundOnEl = document.createElement("label");
  labelSoundOnEl.for = "sound-on";

  const inputOnEl = document.createElement("input");
  inputOnEl.classList.add("hidden");
  inputOnEl.type = "radio";
  inputOnEl.id = "sound-on";

  const labelSoundOffEl = document.createElement("label");
  labelSoundOffEl.for = "sound-off";

  const inputOffEl = document.createElement("input");
  inputOffEl.type = "radio";
  inputOffEl.name = "sound";
  inputOffEl.classList.add("hidden");
  inputOffEl.name = "sound-off";
  inputOnEl.value = true;

  inputOffEl.type = "radio";
  inputOffEl.name = "sound";
  inputOffEl.value = false;

  const imgSoundEl = document.createElement("img");

  imgSoundEl.addEventListener("click", () => {
    isSound ? setIsSound(false) : setIsSound(true);
  });

  if (isSound) {
    containerEl.append("Sound on");
    inputOnEl.setAttribute("checked", "true");
    imgSoundEl.src = "./assets/icons/sound-on.svg";
  }
  if (isSound === false) {
    containerEl.append("Sound off");
    inputOffEl.setAttribute("checked", "true");
    imgSoundEl.src = "./assets/icons/sound-off.svg";
  }

  containerEl.append(inputOnEl, inputOffEl, imgSoundEl);
  return containerEl;
}
