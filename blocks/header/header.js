function collapseAllNavSections(sections) {
  sections.querySelectorAll('.nav-section').forEach(section  => {
    section.setAttribute('aria-expanded', 'false');
  })
}

export default async function decorate(block) {
  const resp = await fetch ('/nav.plain.html');
  const html = await resp.text();
  const nav = document.createElement('div');
  nav.classList.add('nav');
  const navSections = document.createElement('div');
  navSections.classList.add('nav-sections');
  nav.innerHTML = html;
  nav.querySelectorAll(':scope > div').forEach((navSection, i) => {
    if (!i) {
      const brand = navSection;
      brand.classList.add('nav-brand');
    } else {
      navSections.append(navSection);
      navSection.classList.add('nav-section');
      const h2 = navSection.querySelector('h2');
      if (h2) {
        h2.addEventListener('click', () => {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          collapseAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
      }
    }
  })
  nav.append(navSections);

  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = '<div class="nav-hamburger-icon"></div>';
  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    if (!expanded) { 
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  block.append(nav);
}