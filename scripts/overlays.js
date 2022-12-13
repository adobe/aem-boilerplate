export function overlays(element) {
  element.querySelector('.button-container').forEach(element => {
    if(element.classList.contains('.button-container')) {
      classList.add('divFloatButton');
    }
  });
}