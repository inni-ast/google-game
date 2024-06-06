import {
  GAME_SETTINGS,
  GAME_STATES,
  getGameState,
  getPointsToWin,
  setPointsToWin,
} from "../../../data.js";

export function SelectPointsToWin() {
  const containerEl = document.createElement("label");
  containerEl.classList.add("settings__item");

  containerEl.append("Points to win");

  const selectEl = document.createElement("select");
  selectEl.name = "pointsToWin";

  for (let i = 0; i < GAME_SETTINGS.pointsToWin.length; i++) {
    const optionEl = document.createElement("option");

    optionEl.append(`${GAME_SETTINGS.pointsToWin[i]} pts`);
    optionEl.value = GAME_SETTINGS.pointsToWin[i];

    if (getPointsToWin() === +optionEl.value) {
      optionEl.setAttribute("selected", "true");
    }

    selectEl.append(optionEl);

    selectEl.addEventListener("change", () => {
      setPointsToWin(+selectEl.value);
    });
    if (getGameState() !== GAME_STATES.SETTINGS) {
      selectEl.disabled = true;
    }
  }
  containerEl.append(selectEl);
  return containerEl;
}
