import {
  getGoogleCoords,
  getPlayer1Coords,
  getPlayer2Coords,
} from "../../../data.js";
import { Google } from "./Google/google.component.js";
import { Player } from "./Player/player.component.js";

export function Cell(x, y) {
  const googleCoords = getGoogleCoords();
  const player1Coords = getPlayer1Coords();
  const player2Coords = getPlayer2Coords();

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
  return cell;
}
