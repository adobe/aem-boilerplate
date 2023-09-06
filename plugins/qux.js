export const loadEager = (doc, context) => {
  console.log('plugin qux: eager', context);
};

export const loadLazy = (doc, context) => {
  console.log('plugin qux: lazy', context);
};

export const loadDelayed = (doc, context) => {
  console.log('plugin qux: delayed', context);
};
