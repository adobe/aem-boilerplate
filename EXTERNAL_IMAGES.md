# Using images from external URLs in AEM Franklin pages

## Introduction
This document explains a mechanism for getting images served from external URLs on AEM Franklin pages. You may find this useful if you want to have your images served from an external assets repository.

## Process
During the page authoring process, the author has to specify the external URL from which the image is served. This is done by placing external image links containing the hyperlinked publicly accessible image URLs on the Word/Google Document. The image links are then replaced with the actual images during the page rendering process.

### Note for site authors
Here's [an example page and document](https://ext-images--franklin-assets-selector--hlxsites.hlx.page/external-images-example?view-doc-source=true) that shows how to use external images in AEM Franklin pages.
You can specify external images by just copying and pasting the image URL in the Word/Google Document. The image URL must be hyperlinked. If the hyperlink has an image file extension, it will be treated as an external image. If the hyperlink does not have an image file extension, it will be treated as a regular hyperlink.
Alternatively, you can also explicitly specify an external image marker and adding the external image url as a hyperlink in it.
The above [example page](https://ext-images--franklin-assets-selector--hlxsites.hlx.page/external-images-example?view-doc-source=true) demonstrates both the approaches.

### Note for site developers
Anchor tags get treated as external images if their `textContent` is same as their `href` attribute and the URL specified in `href` is of an image file extension. For e.g. `'jpg', 'jpeg', 'png', 'gif', 'webp'`. Web optimized image formats such as `webp` should be preferred.  You can find the implementation of this [here](https://github.com/hlxsites/franklin-assets-selector/blob/9145aeac55512ec199152065b16db6c24cea3421/scripts/scripts.js#L105-L110)

Alternatively, an *image marker* text can be used to explicitly indicate external images. This is a pre-configured value. You can configure it [here](https://github.com/hlxsites/franklin-assets-selector/blob/9145aeac55512ec199152065b16db6c24cea3421/scripts/scripts.js#L227).


Also note that for creating optimized `picture` tags for external images, you must override `createOptimizedPicture` function. You can find a sample overidden implementation of `createOptimizedPicture` [here](https://github.com/hlxsites/franklin-assets-selector/blob/9145aeac55512ec199152065b16db6c24cea3421/scripts/scripts.js#L142-L182).

To summarize, most of the logic for this [is here](https://github.com/hlxsites/franklin-assets-selector/blob/9145aeac55512ec199152065b16db6c24cea3421/scripts/scripts.js#L69-L218) and trigger point for it starts with `decorateExternalImages`.  For e.g. [here with an implict external image decoration](https://github.com/hlxsites/franklin-assets-selector/blob/9145aeac55512ec199152065b16db6c24cea3421/scripts/scripts.js#L229-L230).

```
export function decorateMain(main) {
  // decorate external images with implicit external image detection
  decorateExternalImages(main);
  ...
}
```

And [here with an explicit external image marker](https://github.com/hlxsites/franklin-assets-selector/blob/9145aeac55512ec199152065b16db6c24cea3421/scripts/scripts.js#L226-L227).
```
export function decorateMain(main) {
  // decorate external images with explicit external image marker
  decorateExternalImages(main, '//External Image//');
...
}
```

## How does this work?
During the page rendering process, the frontend code replaces the anchor tags identified as exteernal images on the page with the `picture` tags with `src`/`srcset` attributes set as the external image's url as specified in the external image link placed on the Word / Google Document during the page authoring process.

Authors can optionally specify query paramaters in the hyperlinked external url and they would be retained in the `picture` tag's `src`/`srcset` attributes. These are useful for specifying image delivery parameters such as image width, height, format, etc. as understood by the external image delivery service.