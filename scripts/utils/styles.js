const loadStyle = (() => {
  const styles = {};

  return (href) => {
    const path = href.endsWith('.js') ? href.replace('.js', '.css') : href;
    if (!styles[path]) {
      styles[path] = new Promise((resolve) => {
        (async () => {
          const resp = await fetch(path);
          const text = await resp.text();
          const style = new CSSStyleSheet();
          style.path = path;
          style.replaceSync(text);
          resolve(style);
        })();
      });
    }

    return styles[path];
  };
})();

export default loadStyle;
