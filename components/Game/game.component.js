import {
  GAME_STATES,
  MOVING_DIRECTIONS,
  getGameState,
  movePlayer,
} from "../../data.js";
import { createEl } from "../../utils/createEl.js";
import { GameGrid } from "../GameGrid/game-grid.component.js";
import { Lose } from "../Lose/lose.component.js";
import { StartPage } from "../StartPage/start-page.component.js";
import { Win } from "../Win/win.component.js";

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowRight":
      movePlayer(1, MOVING_DIRECTIONS.RIGHT);
      break;

    case "ArrowLeft":
      movePlayer(1, MOVING_DIRECTIONS.LEFT);
      break;

    case "ArrowUp":
      movePlayer(1, MOVING_DIRECTIONS.UP);
      break;

    case "ArrowDown":
      movePlayer(1, MOVING_DIRECTIONS.DOWN);
      break;

    case "KeyD":
      movePlayer(2, MOVING_DIRECTIONS.RIGHT);
      break;

    case "KeyA":
      movePlayer(2, MOVING_DIRECTIONS.LEFT);
      break;

    case "KeyW":
      movePlayer(2, MOVING_DIRECTIONS.UP);
      break;

    case "KeyS":
      movePlayer(2, MOVING_DIRECTIONS.DOWN);
      break;
  }
});

export function Game() {
  const gameElement = createEl("div");
  const state = getGameState();

  switch (state) {
    case GAME_STATES.SETTINGS:
      gameElement.append(StartPage());
      break;
    case GAME_STATES.IN_PROGRESS:
      gameElement.append(GameGrid());
      break;
    case GAME_STATES.WIN:
      gameElement.append(Win());
      break;
    case GAME_STATES.LOSE:
      gameElement.append(Lose());
      break;
    default:
      throw new Error("Not supported state");
  }
  return gameElement;
}
