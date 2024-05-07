import { getGridSizeSettings, getGoogleCoords } from "../../data.js";
import { ResultPanel } from "../ResultPanel/result-panel.component.js";
import { Settings } from "../Settings/settings.component.js";
import { Google } from "./Google/google.component.js";

export function GameGrid(params) {
  const container = document.createElement("div");
  const settingsElement = Settings();

  const resultElement = ResultPanel();
  const gridElement = document.createElement("table");
  const gridSize = getGridSizeSettings();
  const googleCoords = getGoogleCoords();

  for (let y = 0; y < gridSize.y; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < gridSize.x; x++) {
      const cell = document.createElement("td");
      if (x === googleCoords.x && y === googleCoords.y) {
        cell.append(Google());
      }

      row.append(cell);
    }
    gridElement.append(row);
  }
  container.append(settingsElement, resultElement, gridElement);
  return container;
}
