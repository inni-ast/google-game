import { Game } from "./components/Game/game.component.js";
import { addEventListener } from "./data.js";
import "./eventListeners.js";

export function rerender() {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = "";

  const game = Game();
  rootElement.append(game);
}
//rerender - это функция подписчик / наблюдатель/обсервер
// а тот на кого мы подписались - субъект/наблюдаемый/subject/observable
// это весь модуль data.js
rerender();

addEventListener(rerender);
