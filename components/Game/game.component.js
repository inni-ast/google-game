import { GAME_STATES, getGameState } from "../../data.js";

import { createEl } from "../../utils/createEl.js";
import { GameGrid } from "../GameGrid/game-grid.component.js";
import { Lose } from "../Lose/lose.component.js";
import { StartPage } from "../StartPage/start-page.component.js";
import { Win } from "../Win/win.component.js";

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
