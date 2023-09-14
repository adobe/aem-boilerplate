export const loadEager = (doc, context) => {
  console.log('plugin grault: eager', context);
};

export const loadLazy = (doc, context) => {
  console.log('plugin grault: lazy', context);
};

export const loadDelayed = (doc, context) => {
  console.log('plugin grault: delayed', context);
};
