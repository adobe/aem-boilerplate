export const loadEager = (doc, context) => {
  console.error('plugin qux: eager', context); // should not run as plugin is loaded in lazy phase
};

export const loadLazy = (doc, context) => {
  console.log('plugin qux: lazy', context);
};

export const loadDelayed = (doc, context) => {
  console.log('plugin qux: delayed', context);
};
