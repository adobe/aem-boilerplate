export default async function decorate(block) {
  const [quotation, attribution] = [...block.children].map((c) => c.firstElementChild);
  const blockquote = document.createElement('blockquote');
  // decorate quotation
  quotation.className = 'quote-quotation';
  blockquote.append(quotation);
  // decoration attribution
  if (attribution) {
    attribution.className = 'quote-attribution';
    blockquote.append(attribution);
    const ems = attribution.querySelectorAll('em');
    ems.forEach((em) => {
      const cite = document.createElement('cite');
      cite.innerHTML = em.innerHTML;
      em.replaceWith(cite);
    });
  }
  block.innerHTML = '';
  block.append(blockquote);
}
