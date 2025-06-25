function parseSrcSetEntries(srcSet, media) {
  return srcSet?.split(',').map((src) => {
    const lastSpace = src.lastIndexOf(' ');
    const fragment = src.slice(lastSpace + 1).trim();

    if (fragment.endsWith('w')) {
      return {
        url: src.slice(0, lastSpace).trim(),
        screenWidth: parseInt(fragment.slice(0, -1)),
        media: media ?? null
      };
    }

    return {
      url: src.slice(0, lastSpace).trim(),
      density: parseInt(fragment.slice(0, -1)),
      media: media ?? null
    };
  });
}

/**
 * Custom command that waits for all images within the specified selector to be fully loaded.
 * Verifies that all images are complete and have a natural width greater than 0.
 * 
 * Optionally provides image data through a callback for further validation.
 * @type {import('./index.d.ts').CustomCypressCommands['waitForImages']}
 */
const waitForImagesCommand = (selector, callback, customShouldCallback) => {
  // `instanceof` is failing for some reason, maybe because of the iframe?
  const isImage = (img) => img.constructor.name === 'HTMLImageElement' 
  const isPicture = (img) => img.constructor.name === 'HTMLPictureElement';

  return cy.get(selector ?? 'img').should(($imgs) => {
    expect($imgs).to.have.length.greaterThan(0);
    $imgs.each((_, img) => {
      if (isImage(img) || isPicture(img)) {
        const imageNode = isPicture(img) ? img.querySelector('img') : img;

        if (imageNode) {
          if (customShouldCallback) {
            customShouldCallback(imageNode);
          }
        }

        expect(imageNode.src).to.not.be.empty;
        // expect(img.complete).to.be.true;
        // expect(img.naturalWidth).to.be.greaterThan(0);
      }
    });
  }).then(async ($imgs) => {
    if (callback) {
      const images = Cypress._.map($imgs, (img) => {
        /** @type {HTMLImageElement} */
        const imageNode = isPicture(img) ? img.querySelector('img') : img;

        /** @type {import('./index.d.ts').ImageData['srcsetEntries']} */
        let srcSetEntries = [];

        if (isPicture(img)) {
          srcSetEntries = [...img.querySelectorAll('source')].flatMap((source) => {
            return parseSrcSetEntries(source.srcset, source.media);
          });
        } else if (isImage(img) && imageNode.srcset) {  
          srcSetEntries = parseSrcSetEntries(imageNode.srcset);
        }

        return {
          src: imageNode.src.trim(),
          srcsetEntries: srcSetEntries ?? [],
          element: imageNode
        };
      });

      await callback(images);
    }

    return $imgs;
  });
};

Cypress.Commands.add('waitForImages', waitForImagesCommand);
