function createSection(selctor, name) {
  const childDiv = document.createElement("div");
  const slots = document.querySelectorAll(`${selctor}`);
  [...slots].forEach((slot) => {
    childDiv.append(slot);
  });
  childDiv.classList.add(name);
  return childDiv;
}
export default function decorate(block) {
  /* change to ul, li */
  const div = document.createElement("div");
  div.classList.add("lnb__container");
  const [child] = block.children;
  const [left, right] = [...child.children];

  const leftSection = createSection(left.innerText, "lnb");
  const rightSection = createSection(right.innerText, "page-box");
  div.append(leftSection);
  div.append(rightSection);
  block.textContent = "";
  block.append(div);
}
