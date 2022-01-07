export default function decorate($block) {
  // turn links into buttons
  $block.querySelectorAll(':scope a').forEach(($a) => {
    const $button = document.createElement('button');
    $button.title = $a.title || $a.textContent;
    $button.textContent = $a.textContent;
    $button.addEventListener('click', () => {
      window.location.href = $a.href;
    });
    $a.replaceWith($button);
  });
}
