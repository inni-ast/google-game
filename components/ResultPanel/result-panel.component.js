import { getCathCount, getMissCount } from "../../data.js";
import { Google } from "../GameGrid/Google/google.component.js";
import { Player } from "../GameGrid/Player/player.component.js";
import { createEl } from "./../../utils/createEl.js";

export function ResultPanel() {
  const element = document.createElement("div");
  element.classList.add("results");

  const catchPlayer1El = createEl("div", "", "results__catch", element);

  createEl("div", "Player 1 ", "results__title", catchPlayer1El);

  const player1ImgEl = Player(1);
  catchPlayer1El.append(player1ImgEl);

  createEl(
    "span",
    `   ${getCathCount().player1}`,
    "results_info",
    catchPlayer1El
  );

  const catchPlayer2El = createEl("div", "", "results__catch", element);
  createEl("div", "Player 2 ", "results__title", catchPlayer2El);
  const player2ImgEl = Player(2);
  catchPlayer2El.append(player2ImgEl);
  createEl(
    "span",
    `   ${getCathCount().player2}`,
    "results_info",
    catchPlayer2El
  );

  const missEl = createEl("div", "", "results__miss", element);
  createEl("span", "Google ", "results__title", missEl);
  const googleEl = Google();
  missEl.append(googleEl);

  createEl("span", `   ${+getMissCount()}`, "results_info", missEl);

  const timeEl = createEl("div", "", "results__time", element);
  createEl("span", "Time: ", "results__title", timeEl);
  createEl("span", `  0:00`, "results_info", timeEl);

  return element;
}
//Control is performed using the arrows on the keyboard
