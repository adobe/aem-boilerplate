import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';


function createLinks(links) {
  const linksElem = links.map((link) => {
    const href = link.querySelector("a")?.href || '#';
    return `<li class="snbs__item">
        <a
          href="${href}"
          class="snbs__link"
          target="_self"
        >
          ${link.innerText}
        </a>`;
  });
  return linksElem.join("");
}


function createSnbGroup(gropus) {
  const gropupElem = gropus.map((group, index)=>{
    const title = group.firstChild.innerText;
    const linksElem = group.querySelectorAll("li");
    const links = createLinks([...linksElem])
    return `<li class="snbs__group" data-role="item">
  <h6 class="snbs__title _mo-hidden" id="snb_heading${index}">
          ${title}
  </h6>
  <h6 class="snbs__heading _pc-hidden">
    <button
      name="0"
      class="snbs__button _accordion-btn"
      type="button"
      aria-expanded="false"
      aria-controls="snbs_panel${index}"
      data-role="title"
    >
      ${title}
    </button>
  </h6>
  <div
    role="region"
    aria-labelledby="snb_heading0"
    id="snbs_panel${index}"
    data-role="panel"
  >
    <ul id="snbs0" class="snbs__list">
        ${links}
      </li>
    </ul>
  </div>
</li>`;
  })
return gropupElem.join('');
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.classList.add("shortcuts");

  const container = footer.querySelector(".shortcuts__box");

  if(!fragment.firstElementChild){
    return;
  }
  const gropus = fragment.firstElementChild.querySelectorAll(".default-content-wrapper>ul>li");
  const grpElems = createSnbGroup([...gropus]);

  footer.innerHTML = `
  <div class="shortcuts__aligner">
    <div class="shortcuts__box">
      <div class="shortcuts__snbs">
        <ul class="snbs accordion">
          ${grpElems}
        <ul>
      <div>
    </div>
  </div>`;

  block.append(footer);
}
