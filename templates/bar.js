export const loadEager = (doc, options, context) => {
  console.log('bar: eager', options, context);
};

export const loadLazy = (doc, options, context) => {
  console.log('bar: lazy', options, context);
};

export const loadDelayed = (doc, options, context) => {
  console.log('bar: delayed', options, context);
};

export default function () {}
