import { validatePlayerNumberOrThrow } from "../../../../data.js";

export function Player(playerNum) {
  validatePlayerNumberOrThrow(playerNum);

  const element = document.createElement("span");
  const imgEl = document.createElement("img");

  imgEl.classList.add("google-img");
  imgEl.src = `./assets/images/player${playerNum}.svg`;

  element.append(imgEl);

  return element;
}
