export default function decorate(block) {
  const directChildren = block.querySelectorAll(':scope > div');

  directChildren.forEach((child) => {
    child.classList.add('card-item');
    const secondDiv = child.querySelectorAll(':scope > div')[1];

    if (secondDiv) {
      const pTag = secondDiv.querySelector('p');
      if (pTag) {
        pTag.classList.add('desc');
      }
    }
  });

  const links = block.querySelectorAll('a');
  links.forEach((link) => {
    link.classList.add('button', 'alt');
  });
}
