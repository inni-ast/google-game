export function createEl(element, text, className, parent) {
  const el = document.createElement(element);
  if (text) el.append(text);
  if (className) el.classList.add(className);
  if (parent) parent.append(el);
  return el;
}
