const _data = {
  settings: {
    gridSize: {
      x: 4,
      y: 4,
    },
  },
  catch: 0,
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

export function setGridSize(x, y) {
  if (x < 1) throw new Error("Incorrect X grid size");
  if (y < 1) throw new Error("Incorrect Y grid size");
  _data.settings.gridSize.x = x;
  _data.settings.gridSize.y = y;
}

export function getGridSizeSettings() {
  return { ..._data.settings.gridSize };
}
export function getCathCount() {
  return _data.catch;
}
export function getGoogleCoords() {
  return { ..._data.heroes.google };
}
function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}
