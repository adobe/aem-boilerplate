import { config, getBreakPoint } from './libs.js';

export default class ComponentLoader {
  constructor(blockName, element) {
    window.raqnComponents = window.raqnComponents || {};
    this.blockName = blockName;
    this.setBlockPaths();
    this.block = element;
    if (this.block) {
      this.setParams();
      this.content = this.block.children;
    }
  }

  async loadCSS(href) {
    return new Promise((resolve, reject) => {
      if (!document.querySelector(`head > link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = resolve;
        link.onerror = reject;
        document.head.append(link);
      } else {
        resolve();
      }
    });
  }

  setParams() {
    const mediaParams = {};
    this.params = {
      ...Array.from(this.block.classList)
        .filter((c) => c !== this.blockName && c !== 'block')
        .reduce((acc, c) => {
          const values = c.split('-');
          let key = values.shift();
          const breakpoint = getBreakPoint();
          if (breakpoint === key) {
            key = values.shift();
            mediaParams[key] = values.join('-');
            return acc;
          }

          if (config.breakpoints[key] !== undefined) {
            return acc;
          }

          if (acc[key] && Array.isArray(acc[key])) {
            acc[key].push(values.join('-'));
          } else if (acc[key]) {
            acc[key] = [acc[key], values.join('-')];
          } else {
            acc[key] = values.join('-');
          }
          return acc;
        }, {}),
      ...mediaParams,
    };
  }

  setBlockPaths() {
    this.cssPath = `/blocks/${this.blockName}/${this.blockName}.css`;
    this.jsPath = `/blocks/${this.blockName}/${this.blockName}.js`;
  }

  setupElement() {
    const elementName = `raqn-${this.blockName.toLowerCase()}`;
    const element = document.createElement(elementName);
    element.append(...this.block.children);
    Object.keys(this.params).forEach((key) => {
      const value = Array.isArray(this.params[key])
        ? this.params[key].join(' ')
        : this.params[key];
      element.setAttribute(key, value);
    });
    this.block.replaceWith(element);
  }

  async loadWebComponent() {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const mod = await import(this.jsPath);
          if (
            mod.default &&
            mod.default.name &&
            mod.default.name !== 'decorate'
          ) {
            const { name } = mod.default;
            const elementName = `raqn-${name.toLowerCase()}`;
            // define the custom element if it doesn't exist
            if (!window.raqnComponents[name]) {
              const Contructor = mod.default;
              customElements.define(elementName, Contructor);
              window.raqnComponents[name] = Contructor;
            }
            if (this.block) {
              this.setupElement();
            }
          } else if (mod.default) {
            await mod.default(this.block);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`failed to load module for ${this.blockName}`, error);
          return reject(error);
        }
        return resolve();
      })();
    });
  }

  async decorate() {
    if (window.raqnComponents[this.blockName]) {
      return this.setupElement();
    }
    try {
      const cssLoaded = this.loadCSS(this.cssPath);
      const decorationComplete = this.loadWebComponent();
      return Promise.all([cssLoaded, decorationComplete]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`failed to load module for ${this.blockName}`, error);
      return Promise.resolve();
    }
  }
}
