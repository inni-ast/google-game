import { getGridSizeSettings } from "../../data.js";
import { ResultPanel } from "../ResultPanel/result-panel.component.js";
import { Settings } from "../Settings/settings.component.js";
import { Cell } from "./Cell/cell.component.js";

export function GameGrid() {
  const container = document.createElement("main");
  container.classList.add("main", "game");

  const settingsEl = Settings();
  const resultPanelEl = ResultPanel();

  const gridElement = document.createElement("table");
  gridElement.classList.add("game-table");

  const gridSize = getGridSizeSettings();

  for (let y = 0; y < gridSize.y; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < gridSize.x; x++) {
      const cell = Cell(x, y);
      row.append(cell);
    }
    gridElement.append(row);
  }
  container.append(settingsEl, resultPanelEl, gridElement);
  return container;
}
