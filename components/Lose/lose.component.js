import { createEl } from "../../utils/createEl.js";
import { playAgain, getMissCount } from "../../data.js";

export function Lose() {
  const misses = getMissCount();

  const loseWrapperEl = document.createElement("div");
  loseWrapperEl.classList.add("wrapper");

  const loseElement = document.createElement("div");
  loseElement.classList.add("finish");

  const titleElement = createEl("h1", "Google Win!", "finish__title");
  const subTitleElement = createEl(
    "h3",
    "You'll be lucky next times",
    "finish__subtitle"
  );
  const catchElement = createEl("p", `Catch: `, "finish__info");
  createEl("span", `${misses}`, "finish__result", catchElement);

  const missElement = createEl("p", `Time: `, "finish__info");
  createEl("span", `2m 00s`, "finish__result", missElement);

  const playAgainBtn = document.createElement("button");
  playAgainBtn.classList.add("btn", "btn__play-again");
  playAgainBtn.append("Play again");
  playAgainBtn.addEventListener("click", () => {
    playAgain();
  });

  loseElement.append(
    titleElement,
    subTitleElement,
    catchElement,
    missElement,
    playAgainBtn
  );

  loseWrapperEl.append(loseElement);
  return loseWrapperEl;
}
