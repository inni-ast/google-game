import { SelectGrid } from "./SelectGrid/select-grid.component.js";
import { selectIsSound } from "./SelectIsSound/selectIsSound.component.js";
import { SelectPointsToLose } from "./SelectPointsToLose/selectPointsToLose.component.js";
import { SelectPointsToWin } from "./SelectPointsToWin/selectPointsToWin.component.js";

export function Settings() {
  const element = document.createElement("div");
  element.classList.add("settings");

  const selectGridElement = SelectGrid();
  const selectPointsToWinElement = SelectPointsToWin();
  const selectPointsToLoseElement = SelectPointsToLose();
  const selectIsSoundElement = selectIsSound();

  element.append(
    selectGridElement,
    selectPointsToWinElement,
    selectPointsToLoseElement,
    selectIsSoundElement
  );

  return element;
}
