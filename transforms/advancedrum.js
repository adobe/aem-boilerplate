/**
 * This replaces every occurrence of variable "foo".
 */
module.exports = function (fileInfo, api, options) {
  const j = api.jscodeshift;
  const rootSource = j(fileInfo.source);

  let oldGeneration;

  // find literal generation value
  rootSource
    .find(j.FunctionDeclaration).filter(path => path.value.id.loc.identifierName === 'sampleRUM')
    .find(j.VariableDeclarator).filter(vpath => vpath.value.id.name === 'sendPing')
    .find(j.VariableDeclarator).filter(vpath => vpath.value.id.name === 'body')
    .find(j.CallExpression)
    .find(j.ObjectExpression)
    .find(j.Property).filter(ppath => ppath.value.key.name === 'generation')
    .filter(core => j(core).toSource() !== 'window.RUM_GENERATION')
    .forEach(core => {
      //console.log('found core', core.value);
      //console.log('before', j(core).toSource());

      oldGeneration = core.value.value;

      core.value.value = j.memberExpression(
        j.identifier('window'),
        j.identifier('RUM_GENERATION'),
        false);
      // console.log('after', j(core).toSource());
    });

  // set it at the end of the file
  if (oldGeneration && !rootSource
    .find(j.ExpressionStatement)
    .find(j.AssignmentExpression)
    .find(j.Identifier).filter(id => id.value.name === 'RUM_GENERATION')
    .length) {
    // inject the old generation into the body
    rootSource.find(j.Program).forEach(p => {
      p.value.body.push(j.expressionStatement(
        j.assignmentExpression(
          '=',
          j.memberExpression(
            j.identifier('window'),
            j.identifier('RUM_GENERATION'),
            false),
          oldGeneration
        )
      ));
    });
  }


  let sampleRUM;
  rootSource
    .find(j.FunctionDeclaration)
    .filter(path => path.value.id.loc.identifierName === 'sampleRUM')
    .forEach(path => {
      sampleRUM = path.parent;
    });


  let mediaobserver;
  rootSource
    .find(j.AssignmentExpression)
    .filter(path => path.value.left.property)
    .filter(path => path.value.left.property.name === 'mediaobserver')
    .forEach(cur => {
      mediaobserver = cur.value.right;
    });

  const freshmediaobserver = j(`
sampleRUM.mediaobserver = (window.IntersectionObserver) ? new IntersectionObserver((entries) => {
  entries
    .filter((entry) => entry.isIntersecting)
    .forEach((entry) => {
      sampleRUM.mediaobserver.unobserve(entry.target); // observe only once
      const target = sampleRUM.targetselector(entry.target);
      const source = sampleRUM.sourceselector(entry.target);
      sampleRUM('viewmedia', { target, source });
    });
}, { threshold: 0.25 }) : { observe: () => { } };
`);

  `
sampleRUM.blockobserver = (window.IntersectionObserver) ? new IntersectionObserver((entries) => {
  entries
    .filter((entry) => entry.isIntersecting)
    .forEach((entry) => {
      sampleRUM.blockobserver.unobserve(entry.target); // observe only once
      const target = sampleRUM.targetselector(entry.target);
      const source = sampleRUM.sourceselector(entry.target);
      sampleRUM('viewblock', { target, source });
    });
}, { threshold: 0.25 }) : { observe: () => { } };

sampleRUM.observe = ((elements) => {
  elements.forEach((element) => {
    if (element.tagName.toLowerCase() === 'img'
      || element.tagName.toLowerCase() === 'video'
      || element.tagName.toLowerCase() === 'audio'
      || element.tagName.toLowerCase() === 'iframe') {
      sampleRUM.mediaobserver.observe(element);
    } else {
      sampleRUM.blockobserver.observe(element);
    }
  });
});

sampleRUM.sourceselector = (element) => {
  if (element === document.body || element === document.documentElement || !element) {
    return undefined;
  }
  if (element.id) {
    return `#${ element.id; } `;
  }
  if (element.getAttribute('data-block-name')) {
    return `.${ element.getAttribute('data-block-name'); } `;
  }
  return sampleRUM.sourceselector(element.parentElement);
};

sampleRUM.targetselector = (element) => {
  let value = element.getAttribute('href') || element.currentSrc || element.getAttribute('src');
  if (value && value.startsWith('https://')) {
    // resolve relative links
    value = new URL(value, window.location).href;
  }
  return value;
};
`;

  if (!mediaobserver && sampleRUM) {
    sampleRUM.insertAfter(freshmediaobserver.toSource());
  }


  //console.log(rootSource.toSource());
  return rootSource.toSource();
};