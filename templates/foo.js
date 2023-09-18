export function loadEager(doc, options) {
  console.log('template foo: eager', options, this);
}

export function loadLazy(doc, options) {
  console.log('template foo: lazy', options, this);
}

export function loadDelayed(doc, options) {
  console.log('template foo: delayed', options, this);
}
