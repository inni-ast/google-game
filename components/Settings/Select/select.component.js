import {
  getGridSizeSettings,
  setGridSize,
  getGameState,
  GAME_STATES,
  getPointsToWin,
  setPointsToWin,
  getPointsToLose,
  setPointsToLose,
  getPlayer2ControlMode,
  setPlayer2ControlMode,
} from "../../../data.js";

const SELECT_SETTINGS = {
  gridSize: {
    name: "grid",
    title: "Grid size",
    option: [4, 5, 6, 7, 8],
    getOption: () => {
      return String(getGridSizeSettings().x);
    },
    setOption: (value1) => {
      setGridSize(+value1);
    },
  },
  pointsToWin: {
    name: "pointsToWin",
    title: "Points to win",
    option: [5, 20, 50, 60, 80],
    getOption: () => {
      return String(getPointsToWin());
    },
    setOption: (value) => {
      setPointsToWin(+value);
    },
  },
  pointsToLose: {
    name: "pointsToLose",
    title: "Points to lose",
    option: [5, 10, 15, 20, 25],
    getOption: () => {
      return String(getPointsToLose());
    },
    setOption: (value) => {
      setPointsToLose(+value);
    },
  },
  player2ControlMode: {
    name: "player2ControlMode",
    title: "Player2 control mode",
    option: ["keyboard", "voice"],
    getOption: () => {
      return getPlayer2ControlMode();
    },
    setOption: (value) => {
      setPlayer2ControlMode(value);
    },
  },
};

export function Select(setting) {
  const select = SELECT_SETTINGS[setting];

  const containerEl = document.createElement("label");
  containerEl.classList.add("settings__item");
  containerEl.append(select.title);

  const selectEl = document.createElement("select");
  selectEl.name = select.name;

  for (let i = 0; i < select.option.length; i++) {
    const optionEl = document.createElement("option");

    if (setting === "gridSize") {
      optionEl.append(`${select.option[i]} x ${select.option[i]}`);
    } else if (setting === "player2ControlMode") {
      optionEl.append(`${select.option[i]}`);
    } else {
      optionEl.append(`${select.option[i]} pts`);
    }

    optionEl.value = select.option[i];

    if (select.getOption() === optionEl.value) {
      optionEl.setAttribute("selected", "true");
    }

    selectEl.addEventListener("change", () => {
      select.setOption(selectEl.value);
    });
    selectEl.append(optionEl);
  }

  if (getGameState() !== GAME_STATES.SETTINGS) {
    selectEl.disabled = true;
  }

  containerEl.append(selectEl);
  return containerEl;
}
