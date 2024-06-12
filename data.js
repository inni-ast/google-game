// sounds
const audioEl = new Audio();

export function _addSound(sound) {
  if (getIsSound()) {
    audioEl.src = `./assets/sounds/${sound}.mp3`;
    audioEl.play();
  }
}
//state machine
export const EVENTS = {
  GOOGLE_JUMPED: "GOOGLE_JUMPED",
  PLAYER1_MOVED: "PLAYER1_MOVED",
  PLAYER2_MOVED: "PLAYER2_MOVED",
  SCORES_CHANGED: "SCORES_CHANGED",
  STATUS_CHANGED: "STATUS_CHANGED",
  SETTINGS_CHANGED: "SETTINGS_CHANGED",
};
export const GAME_STATES = {
  SETTINGS: "settings",
  IN_PROGRESS: "in_progress",
  WIN: "win",
  LOSE: "lose",
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
    player2ControlMode: "keyboard",
    isSound: false,
    googleJumpInterval: 3000,
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

//subscribers/подписчики /observers/eventHandler/ слушатель

let _subscribers = [];

// listeners

export function subscribe(subscriber) {
  _subscribers.push(subscriber);
}
function _notify(event) {
  _subscribers.forEach((f) => {
    try {
      f({ name: event });
    } catch (error) {
      console.log(error);
    }
  });
}
//for voice control
let observerPlayer2Move = () => {};
export function addEventListenerForPlayer2(subscriber) {
  observerPlayer2Move = subscriber;
}

//utils
let jumpIntervalId;

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}
function _runGoogleJumpInt() {
  jumpIntervalId = setInterval(() => {
    _changeGoogleCoords();
    _notify(EVENTS.GOOGLE_JUMPED);
    _data.miss++;
    _notify(EVENTS.SCORES_CHANGED);
    if (_data.miss === _data.settings.pointsToLose) {
      _stopGoogleJumpInt();
      _data.winner = {
        player: `Google`,
        points: _data.miss,
        time: "2m 00s",
      };
      _data.gameState = GAME_STATES.LOSE;
      _notify(EVENTS.STATUS_CHANGED);
      _addSound("lose_sound");
    }
  }, _data.settings.googleJumpInterval);
}
function _stopGoogleJumpInt(params) {
  clearInterval(jumpIntervalId);
}

//setter/mutation/command
export function setGridSize(x) {
  if (x < 1) throw new Error("Incorrect X grid size");

  _data.settings.gridSize.x = x;
  _data.settings.gridSize.y = x;
}
export function setPointsToWin(points) {
  _data.settings.pointsToWin = points;
}
export function setPointsToLose(points) {
  _data.settings.pointsToLose = points;
}
export function setIsSound(isSound) {
  _data.settings.isSound = isSound;
  //observer();
  _notify();
}
export function setPlayer2ControlMode(mode) {
  _data.settings.player2ControlMode = mode;
  //observer();
  _notify();
}

export function start() {
  if (_data.gameState !== GAME_STATES.SETTINGS) {
    throw new Error(`Game cannot be started from ${_data.gameState}`);
  }
  _data.miss = 0;
  _data.catch = { player1: 0, player2: 0 };
  _data.gameState = GAME_STATES.IN_PROGRESS;

  observerPlayer2Move();
  _notify(EVENTS.STATUS_CHANGED);
  _runGoogleJumpInt();
}
export function playAgain() {
  _data.miss = 0;
  _data.catch = { player1: 0, player2: 0 };
  _notify(EVENTS.SCORES_CHANGED);
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
    _notify(EVENTS.STATUS_CHANGED);
}

function _catchGoogle(playerNumber) {
  _stopGoogleJumpInt();
  _data.catch[`player${playerNumber}`]++;
  _notify(EVENTS.SCORES_CHANGED);
  if (_data.catch[`player${playerNumber}`] === _data.settings.pointsToWin) {
    _data.winner = {
      player: `Player${playerNumber}`,
      points: _data.catch[`player${playerNumber}`],
      time: "2m 00s",
    };

    _data.gameState = GAME_STATES.WIN;
    _notify(EVENTS.STATUS_CHANGED);
    _addSound("win_sound");
  } else {
    _addSound("move_sound");
    _changeGoogleCoords();
    _notify(EVENTS.GOOGLE_JUMPED);
    _runGoogleJumpInt();
  }
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

  //observer();
  _notify();
}

//getter/selector/query/adapter
/**
 *
 * @returns кол-во баллов, заработанных пользователем
 */

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
  } else {
    _addSound("move_sound");
  }

  _data.heroes[`player${playerNum}`] = newCoords;

  _notify(`EVENTS.PLAYER${playerNum}_MOVED`);
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
export function getPlayer2ControlMode() {
  return _data.settings.player2ControlMode;
}
export function validatePlayerNumberOrThrow(playerNum) {
  if (![1, 2].some((el) => el === playerNum)) {
    throw new Error("Incorrect player number");
  }
}
