export default function decorate(block) {
  /* change to ul, li */
  const div = document.createElement("div");
  const [child] = block.children;
  [...child.children].forEach((row) => {
    const slotName = row.innerText;
    const childDiv = document.createElement('div');
    childDiv.classList.add(slotName);
    const slot = document.createElement("slot");
    slot.name = slotName;
    childDiv.append(slot);
    div.append(childDiv)
  });
  block.textContent = "";
  div.classList.add('lnb__container');
  block.append(div);
}
