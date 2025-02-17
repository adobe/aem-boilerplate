function createBlock(title, paragraph, img, button) {
  const childDiv = `
  <li class="image-text-box__item -vertical">
  <div class="image-text-box__con">
    <div class="image-text-box__box">
      <div class="image-text-box__title">
        <h4>${title}</h4>
      </div>
      <div class="image-text-box__desc">
        ${paragraph}
      </div>
    </div>
    <div class="image-text-box__button-group">
      <div class="button-group -flex -left -middle button-group-gap4 button-group-gapm4">
        ${button}
      </div>
    </div>
  </div>
  <div class="image-text-box__img">
    <span>
  <span class="_hidden"></span>
  ${img}
  <img
    class="-full-img"
    src="/adobe/dynamicmedia/deliver/dm-p-oid--wIV21tkWEUmAUC_4OVelKLN7vIFZRdV5aZRZ-MWwlBuLIETNFmhUGt-ncB0xvPiIA2YBjWjn5ztYeY-pcYTbBSVOaD3m0Yocmbsqpk_HWLJ3kQ8C1s6-rrfodba7nTa6a-lMTY8LcllZJ9kaBs6V0g/first-airport-before-01.jpg?quality=85&amp;preferwebp=true"
    alt=""
  />
</span>
  </div>
</li>`;
  return childDiv;
}
export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement("ul");
  ul.classList.add("image-text-box");
  const lis = [...block.children].map((row) => {
    const [left, right] = [...row.children];
    const title = right.querySelector('h2').innerText;
    const paragraph = right.querySelector("p:not(.button-container)").innerHTML;
    const button = right.querySelector("p.button-container").innerHTML;
    debugger;
    return createBlock(title, paragraph, left.innerHTML, button);
  });
  ul.innerHTML = lis.join("");
  block.textContent = "";
  block.append(ul);
}
