import { playAgain, getWinner } from "../../data.js";
import { createEl } from "../../utils/createEl.js";

export function Win() {
  const winner = getWinner();

  const winWrapperEl = document.createElement("div");
  winWrapperEl.classList.add("wrapper");

  const winElement = document.createElement("div");
  winElement.classList.add("finish");

  const titleElement = createEl("h1", "You Win!", "finish__title");
  const subTitleElement = createEl(
    "h3",
    `${winner.player}`,
    "finish__subtitle"
  );
  const catchElement = createEl("p", `Catch: `, "finish__info");
  createEl("span", `${winner.points}`, "finish__result", catchElement);

  const missElement = createEl("p", `Time: `, "finish__info");
  createEl("span", `${winner.time}`, "finish__result", missElement);

  const playAgainBtn = document.createElement("button");

  playAgainBtn.classList.add("btn");
  playAgainBtn.append("Play again");
  playAgainBtn.addEventListener("click", () => {
    playAgain();
  });
  winElement.append(
    titleElement,
    subTitleElement,
    catchElement,
    missElement,
    playAgainBtn
  );
  winWrapperEl.append(winElement);
  return winWrapperEl;
}
