import {
  GAME_STATES,
  MOVING_DIRECTIONS,
  getGameState,
  movePlayer,
} from "../../data.js";

import { createEl } from "../../utils/createEl.js";
import { GameGrid } from "../GameGrid/game-grid.component.js";
import { Lose } from "../Lose/lose.component.js";
import { StartPage } from "../StartPage/start-page.component.js";
import { Win } from "../Win/win.component.js";

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowRight":
      movePlayer(1, MOVING_DIRECTIONS.RIGHT);
      break;

    case "ArrowLeft":
      movePlayer(1, MOVING_DIRECTIONS.LEFT);
      break;

    case "ArrowUp":
      movePlayer(1, MOVING_DIRECTIONS.UP);
      break;

    case "ArrowDown":
      movePlayer(1, MOVING_DIRECTIONS.DOWN);
      break;

    case "KeyD":
      movePlayer(2, MOVING_DIRECTIONS.RIGHT);
      break;

    case "KeyA":
      movePlayer(2, MOVING_DIRECTIONS.LEFT);
      break;

    case "KeyW":
      movePlayer(2, MOVING_DIRECTIONS.UP);
      break;

    case "KeyS":
      movePlayer(2, MOVING_DIRECTIONS.DOWN);
      break;
  }
});

export function Game() {
  const gameElement = createEl("div");
  const state = getGameState();

  switch (state) {
    case GAME_STATES.SETTINGS:
      gameElement.append(StartPage());
      break;
    case GAME_STATES.IN_PROGRESS:
      gameElement.append(GameGrid());
      break;
    case GAME_STATES.WIN:
      gameElement.append(Win());
      break;
    case GAME_STATES.LOSE:
      gameElement.append(Lose());
      break;
    default:
      throw new Error("Not supported state");
  }
  return gameElement;
}

export function setPlayerVoiceControl() {
  // Проверяем поддержку API
  if ("speechRecognition" in window || "webkitSpeechRecognition" in window) {
    const recognition =
      new webkitSpeechRecognition() || new speechRecognition();

    recognition.lang = "en";
    recognition.continuous = true;

    console.log(recognition);
    recognition.onstart = () => console.log("Speech recognition started");

    recognition.onresult = function (event) {
      const word = event.results[event.results.length - 1][0].transcript;
      console.log(event.results);
      console.log(word.trim());
      switch (word) {
        case "up":
          movePlayer(2, MOVING_DIRECTIONS.UP);
          break;
        case "down":
          movePlayer(2, MOVING_DIRECTIONS.DOWN);
          break;
        case "right":
          movePlayer(2, MOVING_DIRECTIONS.RIGHT);
          break;
        case "left":
          movePlayer(2, MOVING_DIRECTIONS.LEFT);
          break;
      }
    };
    recognition.start();

    // Начинаем распознавание речи
  } else {
    console.log("Извините, ваш браузер не поддерживает голосовое управление.");
  }
}
