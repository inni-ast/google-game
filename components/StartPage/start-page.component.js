import { start } from "../../data.js";
import { Settings } from "../Settings/settings.component.js";
import { setPlayerVoiceControl } from "../Game/game.component.js";

export function StartPage() {
  const container = document.createElement("main");
  container.classList.add("main");

  const headerElement = document.createElement("h1");
  headerElement.append("Catch the Google");

  const settingsEl = Settings();
  const startBtn = document.createElement("button");

  startBtn.append("Start");
  startBtn.classList.add("btn", "btn__start");
  startBtn.addEventListener("click", () => {
    //add voice control
    console.log("add voice control");
    setPlayerVoiceControl();
    start();
  });
  container.append(headerElement, settingsEl, startBtn);
  return container;
}
