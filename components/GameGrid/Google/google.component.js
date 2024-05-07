import { catchGoogle } from "../../../data.js";

export function Google() {
  const element = document.createElement("span");
  element.append("google");
  element.addEventListener("click", catchGoogle);
  return element;
}
