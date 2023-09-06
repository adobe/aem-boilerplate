export const loadEager = (doc, context) => {
  console.log('template foo: eager', context);
};

export const loadLazy = (doc, context) => {
  console.log('template foo: lazy', context);
};

export const loadDelayed = (doc, context) => {
  console.log('template foo: delayed', context);
};
