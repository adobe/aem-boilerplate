function createCard(title, desc, href) {
  return `<li class="related-card__item">
      <a
        class="related-card__link"
        href="${href}"
        data-deeplink-url=""
        data-click-area="How about these topics?"
        data-click-name="fleet"
        data-ga4-click-area="How about these topics?"
        data-ga4-click-name="fleet"
      >
        <div class="related-card__box">
          <em class="related-card__title">${title}</em>
          <p class="related-card__p">
            ${desc}
          </p>
        </div>
      </a>
    </li>`;
}

export default function decorate(block) {
  const div = document.createElement("div");
  const [firstChild, ...rows] = block.children;
  const lis = [...rows].map((row) => {
    const [firstColumn, secondColumn] = [...row.children];
    const link = firstColumn.querySelector("a");
    const title = firstColumn.innerText;
    const desc = secondColumn.innerText;
    const href = link.href;
    return createCard(title, desc, href);
  });
  div.innerHTML = `
  <h2>${firstChild.innerHTML}</h2>
  <div class="related-card">
    <ul class="related-card__list -col3">${lis.join("")}</ul>
  </div>`;
  block.textContent = "";
  block.append(div);
}
