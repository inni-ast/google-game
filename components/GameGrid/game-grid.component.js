import {
  getGridSizeSettings,
  getGoogleCoords,
  getPlayer1Coords,
  getPlayer2Coords,
} from "../../data.js";
import { ResultPanel } from "../ResultPanel/result-panel.component.js";
import { Settings } from "../Settings/settings.component.js";
import { Google } from "./Google/google.component.js";
import { Player } from "./Player/player.component.js";

export function GameGrid() {
  const container = document.createElement("main");
  container.classList.add("main", "game");

  const settingsEl = Settings();
  const resultPanelEl = ResultPanel();
  const gridElement = document.createElement("table");
  gridElement.classList.add("game-table");

  const gridSize = getGridSizeSettings();
  const googleCoords = getGoogleCoords();
  const player1Coords = getPlayer1Coords();
  const player2Coords = getPlayer2Coords();

  for (let y = 0; y < gridSize.y; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < gridSize.x; x++) {
      const cell = document.createElement("td");

      if (x === googleCoords.x && y === googleCoords.y) {
        cell.append(Google());
      }
      if (x === player1Coords.x && y === player1Coords.y) {
        cell.append(Player(1));
      }
      if (x === player2Coords.x && y === player2Coords.y) {
        cell.append(Player(2));
      }
      row.append(cell);
    }
    gridElement.append(row);
  }
  container.append(settingsEl, resultPanelEl, gridElement);
  return container;
}
