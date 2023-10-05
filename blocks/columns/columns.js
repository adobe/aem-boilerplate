export default class Columns extends HTMLDivElement {
  connectedCallback() {
    const cols = [...this.firstElementChild.children];
    this.classList.add(`columns-${cols.length}-cols`);

    // setup image columns
    [...this.children].forEach((row) => {
      [...row.children].forEach((col) => {
        const pic = col.querySelector('picture');
        if (pic) {
          const picWrapper = pic.closest('div');
          if (picWrapper && picWrapper.children.length === 1) {
            // picture is only content in column
            picWrapper.classList.add('columns-img-col');
          }
        }
      });
    });
  }
}
