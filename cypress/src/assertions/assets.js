/**
 * Expect a value or a match.
 * @param {RegExpMatchArray | null} match - The match result from a regular expression.
 * @param {string | undefined} value - The value to expect.
 * @param {number} index - The index of the match to expect.
 * @returns {string | undefined} The value or the match.
 */
function valueOrMatch(match, value, index = 1) {
  return value || match?.[index];
}

/**
 * Format the status of a component.
 * @param {boolean} match - Whether the component is present in the URL.
 * @param {string | undefined} option - The value of the component in the options.
 * @param {string} name - The name of the component.
 * @returns {string} The formatted status of the component.
 */
function formatComponentStatus(match, option, name) {
  return `\t- ${name}: ${match ? 'found in URL' : 'missing'} ${option ? '(provided in options)' : '(not provided in options)'}`;
}

/**
 * Expect an AEM Asset image format.
 * @type {import('./assets.d.ts').expectAemAssetImage}
 */
export const expectAemAssetsImage = (src, { protocol, environment, urn, format, alias, ...params }) => {
  const urnMatch = src.match(/urn:aaid:aem:[^/]+/);
  const formatMatch = src.match(/\.([^.?]+)(?:\?|$)/);
  const imageNameMatch = formatMatch ? src.match(new RegExp(`/as/([^/]+)\\.${formatMatch[1]}(?:\\?|$)`)) : null;
  const environmentMatch = src.match(/delivery-([^.]+)\.adobeaemcloud\.com/);
  const protocolMatch = src.match(/^(https?:)?\/\//);

  // We need these components to either be present in the URL or provided in the options.
  if ((!urnMatch && !urn)
    || (!imageNameMatch && !alias)
    || (!environmentMatch && !environment)
    || (!formatMatch && !format)
    || (!protocolMatch && !protocol)
  ) {
    throw new Error(
      `Some components of the AEM Asset image URL are missing and could not be inferred:
      ${formatComponentStatus(urnMatch, urn, 'URN')}
      ${formatComponentStatus(imageNameMatch, alias, 'Image name/alias')}
      ${formatComponentStatus(environmentMatch, environment, 'Environment')}
      ${formatComponentStatus(formatMatch, format, 'Format')}
      ${formatComponentStatus(protocolMatch, protocol, 'Protocol')}
      
      \tURL: ${src}`
    );
  }

  // The guard above ensures that at least one of the match or value is present.
  // We want to expect first the value that is given (if any), otherwise use the matched value.
  const resolvedEnvironment = valueOrMatch(environmentMatch, environment);
  const resolvedUrn = valueOrMatch(urnMatch, urn, 0);
  const resolvedImageName = valueOrMatch(imageNameMatch, alias);
  const resolvedFormat = valueOrMatch(formatMatch, format);
  let resolvedProtocol = valueOrMatch(protocolMatch, protocol);

  if (resolvedProtocol === '//') {
    // "//" means that the protocol is the same as the current page.
    // That is not supported by the URL constructor, so we need to convert it to a proper protocol.
    resolvedProtocol = window.location.protocol + '//';
    src = src.replace(/^\/\//, resolvedProtocol);
  }

  // This is the URL we expect.
  const baseUrl = `${resolvedProtocol}delivery-${resolvedEnvironment}.adobeaemcloud.com`;
  const url = new URL(`${baseUrl}/adobe/assets/${resolvedUrn}/as/${resolvedImageName}.${resolvedFormat}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  // Normalize the given URL and sort the query parameters to ensure consistent comparison.
  const normalizedGivenSrc = new URL(src);
  normalizedGivenSrc.searchParams.sort();
  url.searchParams.sort();

  expect(normalizedGivenSrc.toString()).to.equal(url.toString());
}

/**
 * Expect a default image format.
 * @type {import('./assets.d.ts').expectDefaultImage}
 */
export const expectDefaultImage = (src, { protocol, format, imageName, path, ...params }) => {
  const protocolMatch = src.match(/^(https?:)?\/\//);
  const pathMatch = src.match(/aemshop\.net\/(.+?)\/[^/]+\.[^/]+(?:\?|$)/);
  const formatMatch = src.match(/\.([^.?]+)(?:\?|$)/);
  const imageNameMatch = formatMatch ? 
    src.match(new RegExp(`/([^/]+)\\.${formatMatch[1]}(?:\\?|$)`)) : null;
    
  // We need these components to either be present in the URL or provided in the options.
  if ((!formatMatch && !format)
    || (!protocolMatch && !protocol)
    || (!imageNameMatch && !imageName)
    || (!pathMatch && !path)
  ) {
    throw new Error(
      `Some components of the default image URL are missing and could not be inferred:
      ${formatComponentStatus(formatMatch, format, 'Format')}
      ${formatComponentStatus(protocolMatch, protocol, 'Protocol')}
      ${formatComponentStatus(imageNameMatch, imageName, 'Image name')}
      ${formatComponentStatus(pathMatch, path, 'Path')}
      
      \tURL: ${src}`
    );
  }

  // The guard above ensures that at least one of the match or value is present.
  // We want to expect first the value that is given (if any), otherwise use the matched value.
  const resolvedFormat = valueOrMatch(formatMatch, format);
  const resolvedImageName = valueOrMatch(imageNameMatch, imageName);
  const resolvedPath = valueOrMatch(pathMatch, path);
  let resolvedProtocol = valueOrMatch(protocolMatch, protocol);

  if (resolvedProtocol === '//') {
    // "//" means that the protocol is the same as the current page.
    // That is not supported by the URL constructor, so we need to convert it to a proper protocol.
    resolvedProtocol = window.location.protocol + '//';
    src = src.replace(/^\/\//, resolvedProtocol);
  }

  // This is the URL we expect.
  const url = new URL(`${resolvedProtocol}www.aemshop.net/${resolvedPath}/${resolvedImageName}.${resolvedFormat}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  // Normalize the given URL and sort the query parameters to ensure consistent comparison.
  const normalizedGivenSrc = new URL(src);
  normalizedGivenSrc.searchParams.sort();
  url.searchParams.sort();

  expect(normalizedGivenSrc.toString()).to.equal(url.toString());
}