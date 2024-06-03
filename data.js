//state machine

export const GAME_STATES = {
  SETTINGS: "settings",
  IN_PROGRESS: "in_progress",
  WIN: "win",
  LOSE: "lose",
};
export const GAME_SETTINGS = {
  pointsToLose: [5, 10, 15, 20, 25],
  pointsToWin: [5, 20, 50, 60, 80],
  gridSize: [4, 5, 6, 7, 8],
};
export const MOVING_DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  RIGHT: "right",
  LEFT: "left",
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
    googleJumpInterval: 4000,
  },
  catch: {
    player1: 0,
    player2: 0,
  },
  miss: 0,
  winner: {
    player: "",
    points: 0,
    time: 0,
  },
  time: new Date(),
  heroes: {
    google: {
      x: 0,
      y: 0,
    },
    player1: {
      x: 2,
      y: 3,
    },
    player2: {
      x: 3,
      y: 3,
    },
  },
};
let observer = () => {};
let jumpIntervalId;

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}
function _runGoogleJumpInt() {
  jumpIntervalId = setInterval(() => {
    _changeGoogleCoords();
    _data.miss++;
    if (_data.miss === _data.settings.pointsToLose) {
      _stopGoogleJumpInt();
      _data.winner = {
        player: `Google`,
        points: _data.miss,
        time: "2m 00s",
      };
      _data.gameState = GAME_STATES.LOSE;
    }
    observer();
  }, _data.settings.googleJumpInterval);
}
function _stopGoogleJumpInt(params) {
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
  if (_data.gameState !== GAME_STATES.SETTINGS) {
    throw new Error(`Game cannot be started from ${_data.gameState}`);
  }
  _data.miss = 0;
  _data.catch = { player1: 0, player2: 0 };
  _data.gameState = GAME_STATES.IN_PROGRESS;
  _runGoogleJumpInt();
  observer();
}
export function playAgain() {
  _data.miss = 0;
  _data.catch = { player1: 0, player2: 0 };
  _data.gameState = GAME_STATES.SETTINGS;
  _data.winner = null;
  (_data.heroes = {
    google: {
      x: 0,
      y: 0,
    },
    player1: {
      x: 2,
      y: 3,
    },
    player2: {
      x: 3,
      y: 3,
    },
  }),
    observer();
}

function _catchGoogle(playerNumber) {
  _stopGoogleJumpInt();

  _data.catch[`player${playerNumber}`]++;

  if (_data.catch[`player${playerNumber}`] === _data.settings.pointsToWin) {
    _data.winner = {
      player: `Player${playerNumber}`,
      points: _data.catch[`player${playerNumber}`],
      time: "2m 00s",
    };
    _data.gameState = GAME_STATES.WIN;
  } else {
    _changeGoogleCoords();
    _runGoogleJumpInt();
  }

  observer();
}
function _changeGoogleCoords() {
  let newX;
  let newY;

  do {
    newX = getRandomInt(_data.settings.gridSize.x - 1);
    newY = getRandomInt(_data.settings.gridSize.y - 1);
  } while (
    (_data.heroes.google.x === newX && _data.heroes.google.y === newY) ||
    (_data.heroes.player1.x === newX && _data.heroes.player1.y === newY) ||
    (_data.heroes.player2.x === newX && _data.heroes.player2.y === newY)
  );

  _data.heroes.google.x = newX;
  _data.heroes.google.y = newY;

  observer();
}

//getter/selector/query/adapter
/**
 *
 * @returns кол-во баллов, заработанных пользователем
 */

//TO DO
export function movePlayer(playerNum, direction) {
  if (_data.gameState !== GAME_STATES.IN_PROGRESS) {
    return;
  }
  validatePlayerNumberOrThrow(playerNum);

  const newCoords = { ..._data.heroes[`player${playerNum}`] };

  switch (direction) {
    case MOVING_DIRECTIONS.RIGHT:
      newCoords.x++;
      break;
    case MOVING_DIRECTIONS.LEFT:
      newCoords.x--;
      break;
    case MOVING_DIRECTIONS.UP:
      newCoords.y--;
      break;
    case MOVING_DIRECTIONS.DOWN:
      newCoords.y++;
      break;
  }
  const isValid = _checkIsCoordsInValidRange(newCoords);
  if (!isValid) return;

  const isMatchWithOtherPlayer = _coordsMatchWithOtherPlayer(newCoords);
  if (isMatchWithOtherPlayer) return;

  const isMatchWithGoogle = _coordsMatchWithGoogle(newCoords);

  if (isMatchWithGoogle) {
    _catchGoogle(playerNum);
  }

  _data.heroes[`player${playerNum}`] = newCoords;
  observer();
}
function _checkIsCoordsInValidRange(coords) {
  const xIsCorrect = coords.x >= 0 && coords.x < _data.settings.gridSize.x;
  const YIsCorrect = coords.y >= 0 && coords.y < _data.settings.gridSize.y;

  return xIsCorrect && YIsCorrect;
}
function _coordsMatchWithOtherPlayer(coords) {
  const player2IsInThisCell =
    coords.x === _data.heroes.player2.x && coords.y === _data.heroes.player2.y;
  const player1IsInThisCell =
    coords.x === _data.heroes.player1.x && coords.y === _data.heroes.player1.y;

  return player1IsInThisCell || player2IsInThisCell;
}
function _coordsMatchWithGoogle(coords) {
  return (
    coords.x === _data.heroes.google.x && coords.y === _data.heroes.google.y
  );
}
export function getCathCount() {
  return { ..._data.catch };
}
export function getMissCount() {
  return _data.miss;
}
export function getGoogleCoords() {
  return { ..._data.heroes.google };
}
export function getPlayer1Coords() {
  return { ..._data.heroes.player1 };
}
export function getPlayer2Coords() {
  return { ..._data.heroes.player2 };
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
export function getWinner() {
  return { ..._data.winner };
}
export function getIsSound() {
  return _data.settings.isSound;
}
export function validatePlayerNumberOrThrow(playerNum) {
  if (![1, 2].some((el) => el === playerNum)) {
    throw new Error("Incorrect player number");
  }
}
