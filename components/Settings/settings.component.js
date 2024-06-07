import { selectIsSound } from "./SelectIsSound/selectIsSound.component.js";
import { Select } from "./Select/select.component.js";

export function Settings() {
  const element = document.createElement("div");
  element.classList.add("settings");

  const selectGridElement = Select("gridSize");
  const selectPointsToWinElement = Select("pointsToWin");

  const selectPointsToLoseElement = Select("pointsToLose");
  const selectPlayer2ControlMode = Select("player2ControlMode");

  const selectIsSoundElement = selectIsSound();

  element.append(
    selectGridElement,
    selectPointsToWinElement,
    selectPointsToLoseElement,
    selectPlayer2ControlMode,
    selectIsSoundElement
  );

  return element;
}
