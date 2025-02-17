function tabContentCreation(listItems) {
  if (!listItems) {
    return "";
  }
  return [...listItems].map((listItem) => {
    listItem.classList.add("lnb__item");
    listItem.classList.add("-two-depth");
    listItem.querySelector("a")?.classList.add("lnb__link");
    return listItem.outerHTML;
  }).join('');
}

function buildChildRow(rows) {
  return rows.map((row, index) => {
    const [firstChild, secondChild] = [...row.children];
    const titleObj = {
      text: firstChild.innerText,
      href: firstChild.querySelector("a")?.href || "#",
    };
    const tabContent = tabContentCreation(secondChild?.querySelectorAll("li"));
    return `
      <li
        class="lnb__item -one-depth"
        role="treeitem"
        aria-expanded="${index === 0 ? true : false}"
        tabindex="0"
      >

        ${
          secondChild
            ? `
          <span class="lnb__link -two-depth-ctrl" id="lnb-active-${index}">
            ${titleObj.text}
          </span>
        <ul class="lnb__list -two-depth" role="group">
          ${tabContent}
        </ul>`
            : `
            <a class="lnb__link" id="lnb-active-${index}" href="${titleObj.href}">
              ${titleObj.text}
            </a>`
        }
      </li>`;
  });
}

function createTemplate(titleObj, rows) {
  return `
  <div
  id="lnb-title"
  class="lnb__side"
  role="navigation"
  aria-label="Subcategory menu"
>
  <ul class="lnb__list" role="tree" aria-label="Subcategory menu">
    <li role="none">
      <div class="lnb__title">
        <a
          id="lnb-list-title"
          href="${titleObj.href}"
          class="lnb__link"
          role="treeitem"
          tabindex="-1"
        >
          ${titleObj.text}
        </a>
      </div>
      <ul id="lnb-list" class="lnb__list" role="group">
        ${buildChildRow(rows).join("")}
      </ul>
    </li>
  </ul>
</div>
  `;
}

function attachEventLister(block) {
  const tabs = block.querySelectorAll(".-two-depth-ctrl");
  [...tabs].forEach((tab) => {
    tab.addEventListener("click", function (e) {
      const tabElem = e.target;
      const parent = tabElem.parentNode;
      const isExpanded = parent.getAttribute("aria-expanded") === "true";
      parent.setAttribute("aria-expanded", !isExpanded);
      console.log(e);
    });
  });
}

export default function decorate(block) {
  const [title, ...rows] = [...block.children];
  const titleObj = {
    text: title.innerText.trim(),
    href: title.querySelector("a")?.href || "#",
  };
  block.textContent = "";
  block.innerHTML = createTemplate(titleObj, rows);
  attachEventLister(block);
}
