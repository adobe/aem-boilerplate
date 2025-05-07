const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      entry.target.callback(entry.target);
    }
  });
});

export default function observe(el, callback) {
  el.callback = callback;
  io.observe(el);
}
