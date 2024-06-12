import { Game } from "./components/Game/game.component.js";
import { subscribe, EVENTS } from "./data.js";
import "./eventListeners.js";

export function rerender(e) {
  if (e.name === EVENTS.STATUS_CHANGED) {
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = "";

    const game = Game();
    rootElement.append(game);
  }
  // console.log(e.name);
}
//rerender - это функция подписчик / наблюдатель/обсервер
// а тот на кого мы подписались - субъект/наблюдаемый/subject/observable
// это весь модуль data.js
rerender({ name: EVENTS.STATUS_CHANGED });

subscribe(rerender);
