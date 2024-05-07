import {
  GAME_SETTINGS,
  getPointsToLose,
  setPointsToLose,
} from "../../../data.js";

export function SelectPointsToLose() {
  const { maxPointsToLose } = getPointsToLose();

  const containerEl = document.createElement("label");
  containerEl.classList.add("settings__item");

  containerEl.append("Points to lose");

  const selectEl = document.createElement("select");
  selectEl.name = "maxMisses";

  for (let i = 0; i < GAME_SETTINGS.pointsToLose.length; i++) {
    const optionEl = document.createElement("option");

    optionEl.append(GAME_SETTINGS.pointsToWin[i]);
    optionEl.value = GAME_SETTINGS.pointsToWin[i];
    if (maxPointsToLose === +optionEl.value) {
      optionEl.setAttribute("selected", "true");
    }
    selectEl.append(optionEl);
  }
  selectEl.addEventListener("change", () => {
    setPointsToLose(+selectEl.value);
  });

  containerEl.append(selectEl);
  return containerEl;
}
