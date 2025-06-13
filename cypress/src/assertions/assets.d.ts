/** The components we may expect in an AEM Asset image URL */
interface AemAssetImageUrlExpectOptions {
  alias?: string;
  environment?: `p${number}-e${number}`;
  protocol?: 'https://' | 'http://' | '//';
  format?: 'webp' | 'png' | 'jpg' | 'jpeg' | 'gif';
  urn?: `urn:aaid:aem:${string}`;

  // Optimization parameters
  width?: number;
  height?: number;
  quality?: number;
  smartCrop?: string;
  rotation?: 90 | 180 | 270;
  flip?: 'h' | 'v' | 'hv';
  attachment?: 'true' | 'false' | '1' | '0';
  size?: string;
  crop?: string;
}

/**
 * Expect an AEM Asset image format.
 * @param options - The options for the AEM asset image
 */
export function expectAemAssetsImage(url: string, options: AemAssetImageUrlExpectOptions): void;

/** The components we may expect in a default image URL */
interface DefaultImageUrlExpectOptions {
  protocol?: 'https://' | 'http://' | '//';
  format?: string;
  imageName?: string;
  path?: string;

  // Optimization parameters
  width: number;
  height?: number;
  auto?: string;
  quality?: number;
  crop?: boolean;
  fit?: string;
  dpi?: number;
}

/**
 * Expect a default image format.
 * @param url - The URL of the image
 * @param options - The options for the default image
 */
export function expectDefaultImage(url: string, options: DefaultImageUrlExpectOptions): void;
