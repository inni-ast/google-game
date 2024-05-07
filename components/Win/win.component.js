import { playAgain, getCathCount, getMissCount } from "../../data.js";
import { createEl } from "../../utils/createEl.js";

export function Win() {
  const catches = getCathCount();
  const misses = getMissCount();

  const winElement = document.createElement("div");
  winElement.classList.add("finish__item");

  const titleElement = createEl("h1", "You Win!", "finish__title");
  const subTitleElement = createEl("h3", "Congratulations", "finish__subtitle");
  const catchElement = createEl("p", `Catch: `, "finish__info");
  createEl("span", `${catches}`, "finish__result", catchElement);

  const missElement = createEl("p", `Miss: `, "finish__info");
  createEl("span", `${misses}`, "finish__result", missElement);

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
  return winElement;
}
