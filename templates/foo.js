export const loadEager = (doc, options, context) => {
  console.log('template foo: eager', options, context);
};

export const loadLazy = (doc, options, context) => {
  console.log('template foo: lazy', options, context);
};

export const loadDelayed = (doc, options, context) => {
  console.log('template foo: delayed', options, context);
};
