//state machine

export const GAME_STATES = {
  SETTINGS: "settings",
  IN_PROGRESS: "in_progress",
  WIN: "win",
  LOSE: "lose",
};
export const GAME_SETTINGS = {
  pointsToLose: [5, 10, 15, 20, 25],
  pointsToWin: [20, 4, 5, 60, 80],
  gridSize: [4, 5, 6, 7, 8],
};

const _data = {
  gameState: GAME_STATES.SETTINGS,
  settings: {
    gridSize: {
      x: 4,
      y: 4,
    },
    pointsToWin: 5,
    pointsToLose: 5,
    isSound: true,
  },
  catch: 0,
  miss: 0,
  time: new Date(),
  heroes: {
    google: {
      x: 2,
      y: 0,
    },
    player1: {},
    player2: {},
  },
};
let observer = () => {};
let jumpIntervalId;

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}
function runGoogleJumpInt(params) {
  jumpIntervalId = setInterval(() => {
    changeGoogleCoords();
    _data.miss++;
    if (_data.miss === _data.settings.pointsToLose) {
      stopGoogleJumpInt();
      _data.gameState = GAME_STATES.LOSE;
    }
    observer();
  }, 1500);
}
function stopGoogleJumpInt(params) {
  clearInterval(jumpIntervalId);
}
//setter/mutation/command
export function addEventListener(subscriber) {
  observer = subscriber;
}
export function setGridSize(x, y) {
  if (x < 1) throw new Error("Incorrect X grid size");
  if (y < 1) throw new Error("Incorrect Y grid size");
  _data.settings.gridSize.x = x;
  _data.settings.gridSize.y = y;
}
export function setPointsToWin(points) {
  _data.settings.pointsToWin = points;
}
export function setPointsToLose(points) {
  _data.settings.pointsToLose = points;
}
export function setIsSound(isSound) {
  _data.settings.isSound = isSound;
  observer();
}

export function start() {
  _data.miss = 0;
  _data.catch = 0;
  _data.gameState = GAME_STATES.IN_PROGRESS;
  runGoogleJumpInt();
  observer();
}
export function playAgain() {
  _data.miss = 0;
  _data.catch = 0;
  _data.gameState = GAME_STATES.SETTINGS;
  observer();
}

export function catchGoogle(params) {
  stopGoogleJumpInt();
  if (_data.catch === _data.settings.pointsToWin) {
    _data.gameState = GAME_STATES.WIN;
    return;
  }
  _data.catch++;

  if (_data.catch === _data.settings.pointsToWin) {
    _data.gameState = GAME_STATES.WIN;
  } else {
    changeGoogleCoords();
    runGoogleJumpInt();
  }

  observer();
}
function changeGoogleCoords() {
  _data.heroes.google.x = getRandomInt(_data.settings.gridSize.x - 1);
  _data.heroes.google.y = getRandomInt(_data.settings.gridSize.y - 1);
  observer();
}

//getter/selector/query/adapter
/**
 *
 * @returns кол-во баллов, заработанны пользователем
 */
export function getCathCount() {
  return _data.catch;
}
export function getMissCount() {
  return _data.miss;
}
export function getGoogleCoords() {
  return { ..._data.heroes.google };
}
export function getGridSizeSettings() {
  return { ..._data.settings.gridSize };
}
export function getGameState() {
  return _data.gameState;
}

export function getPointsToWin() {
  return _data.settings.pointsToWin;
}
export function getPointsToLose() {
  return _data.settings.pointsToLose;
}
export function getIsSound() {
  return _data.settings.isSound;
}
