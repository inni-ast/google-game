import {
  subscribe,
  getGoogleCoords,
  getPlayer1Coords,
  getPlayer2Coords,
  EVENTS,
} from "../../../data.js";
import { Google } from "./Google/google.component.js";
import { Player } from "./Player/player.component.js";

const CELL_STATUS = {
  EMPTY: 1,
  GOOGLE: 2,
  PLAYER1: 3,
  PLAYER2: 4,
};

export function Cell(x, y) {
  const state = {
    prevStatus: CELL_STATUS.EMPTY,
  };
  subscribe((e) => {
    switch (e.name) {
      case EVENTS.GOOGLE_JUMPED:
        switch (state.prevStatus) {
          case CELL_STATUS.GOOGLE:
            //cell.innerHTML = "";
            render();
            break;
          case CELL_STATUS.EMPTY:
            if (x === getGoogleCoords().x && y === getGoogleCoords().y) {
              render();
            }
            break;
          case CELL_STATUS.PLAYER1:
          case CELL_STATUS.PLAYER2:
            break;
        }
        break;
      case EVENTS.PLAYER1_MOVED:
        switch (state.prevStatus) {
          case CELL_STATUS.PLAYER1:
            //cell.innerHTML = "";
            render();
            break;
          case CELL_STATUS.GOOGLE:
          case CELL_STATUS.EMPTY:
            if (x === getPlayer1Coords().x && y === getPlayer1Coords().y) {
              render();
            }
            break;
          case CELL_STATUS.PLAYER2:
            break;
        }

      case EVENTS.PLAYER2_MOVED:
        switch (state.prevStatus) {
          case CELL_STATUS.PLAYER2:
            //cell.innerHTML = "";
            render();
            break;
          case CELL_STATUS.GOOGLE:
          case CELL_STATUS.EMPTY:
            if (x === getPlayer2Coords().x && y === getPlayer2Coords().y) {
              render();
            }
            break;
          case CELL_STATUS.PLAYER1:
            break;
        }
    }
  });

  function render() {
    console.log(x, y);

    cell.innerHTML = "";
    if (x === getGoogleCoords().x && y === getGoogleCoords().y) {
      cell.append(Google());
      state.prevStatus = CELL_STATUS.GOOGLE;
    } else if (x === getPlayer1Coords().x && y === getPlayer1Coords().y) {
      cell.append(Player(1));
      state.prevStatus = CELL_STATUS.PLAYER1;
    } else if (x === getPlayer2Coords().x && y === getPlayer2Coords().y) {
      cell.append(Player(2));
      state.prevStatus = CELL_STATUS.PLAYER2;
    } else {
      state.prevStatus = CELL_STATUS.EMPTY;
    }
  }

  const cell = document.createElement("td");

  render();
  return cell;
}
