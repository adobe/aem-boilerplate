export const loadEager = (doc, options, context) => {
  console.error('plugin qux: eager', options, context); // should not run as plugin is loaded in lazy phase
};

export const loadLazy = (doc, options, context) => {
  console.log('plugin qux: lazy', options, context);
};

export const loadDelayed = (doc, options, context) => {
  console.log('plugin qux: delayed', options, context);
};
