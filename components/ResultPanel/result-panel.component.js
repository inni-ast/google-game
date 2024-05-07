import { getCathCount, getMissCount } from "../../data.js";

export function ResultPanel() {
  const element = document.createElement("div");
  element.append("CATCH" + getCathCount() + "    ");
  element.append("MISS" + getMissCount());
  return element;
}
