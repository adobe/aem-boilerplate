export default function decorate(block, blockName) {
  /* apply classes to elements */
  const applyClasses = (elements, classNames) => {
    elements.forEach((cell, i) => {
      cell.className = classNames[i] ? `${blockName}-${classNames[i]}` : '';
    });
  };

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    applyClasses([...li.children], ['image', 'body']);
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
