export default async function decorate(block) {
  const tabList = block.querySelector('ul');
  if (!tabList) {
    block.innerHTML = '<p>No Tab Panels found</p>';
  }
}
