export default async function decorate(block) {
  block.replaceChildren(block.querySelector('picture'));
}
