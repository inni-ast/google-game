import { start } from "../../data.js";
import { Settings } from "../Settings/settings.component.js";

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
    start();
  });
  container.append(headerElement, settingsEl, startBtn);
  return container;
}
