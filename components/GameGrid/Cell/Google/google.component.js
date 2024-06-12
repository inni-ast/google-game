export function Google() {
  const element = document.createElement("span");
  const imgEl = document.createElement("img");

  imgEl.classList.add("google-img");
  imgEl.src = "./assets/images/google.svg";

  element.append(imgEl);
  return element;
}
