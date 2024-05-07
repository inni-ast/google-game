import { GameGrid } from "./components/GameGrid/game-grid.component.js";
import { Lose } from "./components/Lose/lose.component.js";
import { ResultPanel } from "./components/ResultPanel/result-panel.component.js";
import { Settings } from "./components/Settings/settings.component.js";
import { StartPage } from "./components/StartPage/start-page.component.js";
import { Win } from "./components/Win/win.component.js";
import { GAME_STATES, addEventListener, getGameState } from "./data.js";

export function rerender() {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = "";

  const state = getGameState();

  switch (state) {
    case GAME_STATES.SETTINGS:
      rootElement.append(StartPage());
      break;
    case GAME_STATES.IN_PROGRESS:
      rootElement.append(GameGrid(), ResultPanel());
      break;
    case GAME_STATES.WIN:
      rootElement.append(Win());
      break;
    case GAME_STATES.LOSE:
      rootElement.append(Lose());
      break;

    default:
      rootElement.append(StartPage());
      break;
  }
}
//rerender - это функция подписчик / наблюдатель/обсервер
// а тот на кого мы подписались - субъект/наблюдаемый/subject/observable
// это весь модуль data.js
rerender();
//start();
addEventListener(rerender);
