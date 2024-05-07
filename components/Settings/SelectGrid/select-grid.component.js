import {
  getGridSizeSettings,
  setGridSize,
  GAME_SETTINGS,
} from "../../../data.js";

export function SelectGrid() {
  const { gridSize } = GAME_SETTINGS;

  const containerEl = document.createElement("label");
  containerEl.classList.add("settings__item");
  containerEl.append("Grid size");

  const selectEl = document.createElement("select");
  selectEl.name = "grid";

  for (let i = 0; i < gridSize.length; i++) {
    const optionEl = document.createElement("option");

    optionEl.append(`${gridSize[i]} x ${gridSize[i]}`);
    optionEl.value = gridSize[i];

    if (getGridSizeSettings().x === +optionEl.value) {
      optionEl.setAttribute("selected", "true");
    }
    selectEl.append(optionEl);
  }
  selectEl.addEventListener("change", () => {
    setGridSize(+selectEl.value, +selectEl.value);
  });

  containerEl.append(selectEl);
  return containerEl;
}
