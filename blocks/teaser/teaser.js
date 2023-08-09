
export default async function decorate(block) {
  const content = document.createElement('div');
  content.classList.add('teaser-content');

  let n = 0;
  [...block.children].forEach((row) => {
    if(n == 1)
      content.append(row);

    n++;
  });
  block.append(content);
}