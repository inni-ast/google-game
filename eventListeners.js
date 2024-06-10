import {
  addEventListenerForPlayer2,
  MOVING_DIRECTIONS,
  getPlayer2ControlMode,
  movePlayer,
} from "./data.js";

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
  }
});

// keyboard mode

function setKeyboardMode(code) {
  switch (code) {
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
}

function keyUpEventListener(event) {
  setKeyboardMode(event.code);
}
function removeEventList() {
  document.removeEventListener("keyup", keyUpEventListener);
}

export function choosePlayer2ControlMode() {
  const mode = getPlayer2ControlMode();
  removeEventList();

  if (mode === "keyboard") {
    document.addEventListener("keyup", keyUpEventListener);
  }
  if (mode === "voice") {
    // Проверяем поддержку API
    if ("speechRecognition" in window || "webkitSpeechRecognition" in window) {
      const recognition =
        new webkitSpeechRecognition() || new speechRecognition();

      recognition.lang = "en";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => console.log("Speech recognition started");

      recognition.onresult = function (event) {
        // console.log(event);
        // const word = event.results[event.results.length - 1][0].transcript;
        // switch (word) {
        //   case "up":
        //     movePlayer(2, MOVING_DIRECTIONS.UP);
        //     break;
        //   case "down":
        //     movePlayer(2, MOVING_DIRECTIONS.DOWN);
        //     break;
        //   case "right":
        //     movePlayer(2, MOVING_DIRECTIONS.RIGHT);
        //     break;
        //   case "left":
        //     movePlayer(2, MOVING_DIRECTIONS.LEFT);
        //     break;
        // }

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const transcript = event.results[i][0].transcript.split(" ");
            for (let index = 0; index < transcript.length; index++) {
              const element = transcript[index];
              handlerCommand(element);
            }
          }
        }
        function handlerCommand(word) {
          console.log("command " + word);
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
        }
      };
      recognition.start();
    } else {
      console.log("Sorry, your browser does not support voice control");
    }
  }
}

addEventListenerForPlayer2(choosePlayer2ControlMode);
