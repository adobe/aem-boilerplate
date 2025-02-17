function createTemplate() {
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
          href="/contents/plan-your-travel/service-by-class"
          class="lnb__link"
          role="treeitem"
          tabindex="-1"
          data-path="/contents/plan-your-travel/service-by-class"
          data-click-area="LNB_LNB"
          data-click-name="LNB_service-by-class"
          data-ga4-click-area="LNB_LNB"
          data-ga4-click-name="LNB_service-by-class"
        >
          Service by Class
        </a>
      </div>
      <ul id="lnb-list" class="lnb__list" role="group">
        <li
          class="lnb__item -one-depth"
          role="treeitem"
          aria-expanded="true"
          tabindex="0"
          data-id="51"
          data-focus="true"
        >
          <span class="lnb__link -two-depth-ctrl -focus" id="lnb-active-0">
            First
          </span>
          <ul class="lnb__list -two-depth" role="group">
            <li class="lnb__item -two-depth" role="none">
              <a
                href="/contents/plan-your-travel/service-by-class/first/before-boarding"
                target="_self"
                aria-current="page"
                class="lnb__link -active"
                role="treeitem"
                tabindex="-1"
                data-path="/contents/plan-your-travel/service-by-class/first/before-boarding"
                data-click-area="LNB_LNB"
                data-click-name="LNB_before-service"
                data-ga4-click-area="LNB_LNB"
                data-ga4-click-name="LNB_before-service"
              >
                Before Boarding
              </a>
            </li>
            <li class="lnb__item -two-depth" role="none">
              <a
                href="/contents/plan-your-travel/service-by-class/first/after-boarding"
                target="_self"
                class="lnb__link"
                role="treeitem"
                tabindex="-1"
                data-path="/contents/plan-your-travel/service-by-class/first/after-boarding"
                data-click-area="LNB_LNB"
                data-click-name="LNB_after-service"
                data-ga4-click-area="LNB_LNB"
                data-ga4-click-name="LNB_after-service"
              >
                After Boarding
              </a>
            </li>
          </ul>
        </li>
        <li
          class="lnb__item -one-depth"
          role="treeitem"
          aria-expanded="false"
          tabindex="-1"
          data-id="52"
          data-focus="false"
        >
          <span class="lnb__link -two-depth-ctrl" id="lnb-active-1">
            Prestige
          </span>
          <ul class="lnb__list -two-depth" role="group">
            <li class="lnb__item -two-depth" role="none">
              <a
                href="/contents/plan-your-travel/service-by-class/prestige/before-boarding"
                target="_self"
                class="lnb__link"
                role="treeitem"
                tabindex="-1"
                data-path="/contents/plan-your-travel/service-by-class/prestige/before-boarding"
                data-click-area="LNB_LNB"
                data-click-name="LNB_before-service"
                data-ga4-click-area="LNB_LNB"
                data-ga4-click-name="LNB_before-service"
              >
                Before Boarding
              </a>
            </li>
            <li class="lnb__item -two-depth" role="none">
              <a
                href="/contents/plan-your-travel/service-by-class/prestige/after-boarding"
                target="_self"
                class="lnb__link"
                role="treeitem"
                tabindex="-1"
                data-path="/contents/plan-your-travel/service-by-class/prestige/after-boarding"
                data-click-area="LNB_LNB"
                data-click-name="LNB_after-service"
                data-ga4-click-area="LNB_LNB"
                data-ga4-click-name="LNB_after-service"
              >
                After Boarding
              </a>
            </li>
          </ul>
        </li>
        <li
          class="lnb__item -one-depth"
          role="treeitem"
          aria-expanded="false"
          tabindex="-1"
          data-id="53"
          data-focus="false"
        >
          <span class="lnb__link -two-depth-ctrl" id="lnb-active-2">
            Economy
          </span>
          <ul class="lnb__list -two-depth" role="group">
            <li class="lnb__item -two-depth" role="none">
              <a
                href="/contents/plan-your-travel/service-by-class/economy/before-boarding"
                target="_self"
                class="lnb__link"
                role="treeitem"
                tabindex="-1"
                data-path="/contents/plan-your-travel/service-by-class/economy/before-boarding"
                data-click-area="LNB_LNB"
                data-click-name="LNB_before-service"
                data-ga4-click-area="LNB_LNB"
                data-ga4-click-name="LNB_before-service"
              >
                Before Boarding
              </a>
            </li>
            <li class="lnb__item -two-depth" role="none">
              <a
                href="/contents/plan-your-travel/service-by-class/economy/after-boarding"
                target="_self"
                class="lnb__link"
                role="treeitem"
                tabindex="-1"
                data-path="/contents/plan-your-travel/service-by-class/economy/after-boarding"
                data-click-area="LNB_LNB"
                data-click-name="LNB_after-service"
                data-ga4-click-area="LNB_LNB"
                data-ga4-click-name="LNB_after-service"
              >
                After Boarding
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>
  `;
}

export default function decorate(block) {
  /* change to ul, li */
  debugger;
  // const [firstRow] = block.children;
  // const attrText = firstRow.innerText.trim() || "";
  // attrText.split(",").forEach((text) => {
  //   const [attribute, value] = text.split("=");
  //   block.setAttribute(attribute, value);
  // });

  block.textContent = "";
  block.innerHTML = createTemplate();
}
