export const loadEager = (doc, options, context) => {
  console.log('plugin grault: eager', options, context);
};

export const loadLazy = (doc, options, context) => {
  console.log('plugin grault: lazy', options, context);
};

export const loadDelayed = (doc, options, context) => {
  console.log('plugin grault: delayed', options, context);
};
