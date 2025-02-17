export default function decorate(block) {
  /* change to ul, li */
  debugger;
  const [firstRow] = block.children;
  const attrText = firstRow.innerText.trim() || '';
  attrText.split(",").forEach((text) => {
    const [attribute, value] = text.split("=");
    block.setAttribute(attribute, value);
  });

  block.textContent = "Adarsh";
}
