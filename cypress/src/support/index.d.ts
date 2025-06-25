/** Image data returned in the waitForImages command callback */
interface ImageData {
  /** The source URL of the image */
  src: string;

  /** The srcset attribute value of the image */
  srcsetEntries: {
    url: string;
    screenWidth?: number;
    density?: number;
  }[]

  /** The actual DOM image element */
  element: HTMLImageElement;
}

export interface CustomCypressCommands {
  /** 
   * Intercepts the config.json file and returns a promise that resolves to the config.json file.
   * @param withConfig - Optional callback that receives the config.json file.
   * 
   * @example
   *   cy.interceptConfig((config) => {
   *     return {
   *       ...config,
   *       hello: "world"
   *     }
   *   })
   * 
   *   // Do something that triggers that triggers the config.json network call
   *   // e.g. cy.visit('/gear')
   */
  interceptConfig: (withConfig?: (config: Record<string, any>) => Record<string, any>) => void;

  /** 
   * Waits for all images within the specified selector to be fully loaded.
   * Verifies that all images are complete and have a natural width greater than 0.
   * Optionally provides image data through a callback for further validation.
   * 
   * @param selector - CSS selector for targeting images (default: 'img')
   * @param callback - Optional callback that receives array of image data
   * @param customShouldCallback - Optional callback that receives the image node for further validation
   * @returns The JQuery collection of matched elements
   * 
   * @example
   *   cy.waitForImages()
   *   cy.waitForImages('.product-image')
   *   cy.waitForImages('img', (images) => {
   *     // Validate images data
   *   })
   */
  waitForImages: (
    selector?: string,
    callback?: (images: ImageData[]) => void | Promise<void>,
    customShouldCallback?: (imageNode: HTMLImageElement) => void
  ) => Cypress.Chainable<JQuery<HTMLElement>>;
}

declare global {
  namespace Cypress {
    interface Chainable<Subject> extends CustomCypressCommands { }
  }
}