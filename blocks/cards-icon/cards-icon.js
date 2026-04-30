export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  block.textContent = '';

  const grid = document.createElement('div');
  grid.className = 'cards-icon-grid';

  let ctaLink = null;

  rows.forEach((row) => {
    const cols = [...row.children];
    const imageCol = cols[0];
    const textCol = cols[1];

    if (!imageCol || !textCol) return;

    const card = document.createElement('div');
    card.className = 'cards-icon-card';

    const img = imageCol.querySelector('img');
    if (img) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'cards-icon-image';
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      newImg.loading = 'lazy';
      imgWrap.append(newImg);
      card.append(imgWrap);
    }

    const content = document.createElement('div');
    content.className = 'cards-icon-text';

    const h3 = textCol.querySelector('h3');
    if (h3) {
      const heading = document.createElement('h3');
      heading.textContent = h3.textContent;
      content.append(heading);
    }

    const paragraphs = [...textCol.querySelectorAll('p')];
    paragraphs.forEach((p) => {
      const link = p.querySelector('a');
      if (link && !p.textContent.replace(link.textContent, '').trim()) {
        ctaLink = { href: link.href, text: link.textContent };
      } else {
        const para = document.createElement('p');
        para.textContent = p.textContent;
        content.append(para);
      }
    });

    card.append(content);
    grid.append(card);
  });

  block.append(grid);

  if (ctaLink) {
    const ctaWrap = document.createElement('div');
    ctaWrap.className = 'cards-icon-cta';
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.text;
    a.className = 'cards-icon-button';
    ctaWrap.append(a);
    block.append(ctaWrap);
  }
}
