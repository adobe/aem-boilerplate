function getCustomAnchor(str) {
  const results = [];
  const regex = /\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(str)) !== null) {
    results.push(match[1]);
  }
  return results.length ? results[0] : null;
}

function isAnchorAtTop(anchors) {
  return anchors.map((anchor, index) => {
    const anchorsEls = document.querySelectorAll(`[id=${anchor.anchorId}]`);
    const activeInEls = [...anchorsEls]?.findIndex((anchor) => {
      const anchorRect = anchor.getBoundingClientRect();
      return anchorRect.top <= 100;
    });
    const matched = anchors.filter(item => item.anchorId === anchor.anchorId);
    const match = matched[activeInEls];
    return { active: anchor.el.getAttribute('data-index') === match?.el.getAttribute('data-index'), anchor };
  })
}

export default function decorate(block) {
  const anchorIds = [...block.children].map((el, i) => {
    const type = el.firstElementChild?.textContent;
    if (type === 'title') {
      const title = el.querySelector('h1, h2, h3, h4, h5, h6');
      el.className = 'title';
      el.replaceChildren(title);
    } else if (type.includes('anchor')) {
      const label = el.children[1].textContent;
      const anchor = document.createElement('div');
      anchor.className = 'menu-anchor';
      const anchorName = getCustomAnchor(type) ?? label;
      const anchorId = anchorName.replaceAll(' ', '-').toLowerCase();
      el.setAttribute('data-index', i);
      anchor.addEventListener('click', () => {
        const ael = document.getElementById(anchorId.replaceAll(' ', '-').toLowerCase());
        const accItem = ael.closest('.accordion-item');
        if (!accItem.hasAttribute('open')) accItem.setAttribute('open', true);
        ael.scrollIntoView({ behavior: "smooth" });
      });
      anchor.innerText = label;
      el.replaceChildren(anchor);
      return { anchorId, el };
    }
    return;
  }).filter(i => i !== undefined);

  // handle sticky menu
  const top = 95;
  let container;
  window.addEventListener('scroll', () => {
    if (block.classList.contains('sticky')) {
      const offset = block.parentElement.getBoundingClientRect();
      const inView = offset.top > top;
      if (!container) container = offset.height;
      const accordion = document.querySelector('.accordion.block')?.getBoundingClientRect();
      if (accordion.bottom <= container + 80) {
        block.style.position = 'absolute';
        block.style.top = 'unset';
        block.style.bottom = '20px';
      } else {
        block.style.position = inView ? '' : 'fixed';
        block.style.top = inView ? '' : `${top}px`;
        block.style.bottom = '20px';
      }
    }
    // handle active on scroll
    const actives = isAnchorAtTop(anchorIds, block.parentElement);
    actives.forEach(a => a.anchor.el.classList.remove('active'));
    const active = actives.filter(i => i.active);
    active?.pop()?.anchor?.el?.classList.add('active');
  });
}
