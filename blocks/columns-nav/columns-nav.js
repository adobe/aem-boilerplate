export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const cols = [...row.children];
  const leftCol = cols[0];
  const rightCol = cols[1];

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'columns-nav-row';

  if (leftCol) {
    const navSection = document.createElement('div');
    navSection.className = 'columns-nav-links';
    navSection.innerHTML = leftCol.innerHTML;
    wrapper.append(navSection);
  }

  if (rightCol) {
    const teaserSection = document.createElement('div');
    teaserSection.className = 'columns-nav-teaser';

    const img = rightCol.querySelector('img');
    const link = rightCol.querySelector('a');

    if (img) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'columns-nav-teaser-image';
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      newImg.loading = 'lazy';
      imgWrap.append(newImg);
      teaserSection.append(imgWrap);
    }

    if (link) {
      const overlay = document.createElement('div');
      overlay.className = 'columns-nav-teaser-overlay';
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent;
      overlay.append(a);
      teaserSection.append(overlay);
    }

    wrapper.append(teaserSection);
  }

  block.append(wrapper);
}
