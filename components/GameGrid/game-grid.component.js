import { getGridSizeSettings, getGoogleCoords } from "../../data.js";
import { Google } from "./Google/google.component.js";

export function GameGrid(params) {
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
  return gridElement;
}
