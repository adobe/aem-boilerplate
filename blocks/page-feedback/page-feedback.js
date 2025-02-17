function createTemplate(question, positiveTitle, negetiveTitle) {
  return `<div class="page-feedback__wrap">
  <div class="page-feedback -thumbs">
    <p class="page-feedback__question" id="thumbradios">
      ${question}
    </p>
    <div class="page-feedback__inner">
      <div
        role="group"
        aria-labelledby="thumbradios"
        class="page-feedback__thumbs"
      >
        <div class="page-feedback__thumb -thumb0" data-index="0">
          <button
            type="button"
            id="thumbBtn-0"
            aria-pressed="false"
            aria-haspopup="dialog"
            data-value="1"
            class="page-feedback__thumb-btn"
          >
            <span class="_hidden">${positiveTitle}</span>
          </button>
        </div>
        <div class="page-feedback__thumb -thumb1" data-index="1">
          <button
            type="button"
            id="thumbBtn-1"
            aria-pressed="false"
            aria-haspopup="dialog"
            data-value="-1"
            class="page-feedback__thumb-btn"
          >
            <span class="_hidden">${negetiveTitle}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

export default function decorate(block) {
  /* change to ul, li */
  const div = document.createElement("div");
  debugger;


   const [question, positive, negetive] = block.children;

const title = question.innerText;
const positiveTitle = positive.innerText;
const negetiveTitle = negetive.innerText;
  div.innerHTML = createTemplate(title, positiveTitle, negetiveTitle);
  block.textContent = "";
  block.append(div);
}
