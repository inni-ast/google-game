import { data } from "./data.js";

export const SETTINGS = {
  maxMisses: [3, 5, 10],
  pointsToWin: [3, 5, 10],
  gridSize: [3, 4, 5, 6, 7, 8],
  delayMs: [200, 150, 100],
};

export function setGirdSize(size) {
  if (size) {
    data.settings.gridSize.columnsCount = size;
    data.settings.gridSize.rowsCount = size;
  }
}
export function setPointsToWin(points) {
  if (points) {
    data.settings.pointsToWin = points;
  }
}

export function setMaxMisses(misses) {
  if (misses) {
    data.settings.maximumMissesCount = misses;
  }
}
export function setDelayMs(ms) {
  if (ms) {
    data.settings.delayMs = ms;
  }
}
