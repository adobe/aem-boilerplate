export const loadEager = (doc, context) => {
  console.log('bar: eager', context);
};

export const loadLazy = (doc, context) => {
  console.log('bar: lazy', context);
};

export const loadDelayed = (doc, context) => {
  console.log('bar: delayed', context);
};
