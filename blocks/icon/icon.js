import ComponentBase from '../../scripts/component-base.js';

export default class Icon extends ComponentBase {
  constructor() {
    super();
    this.setupSprite();
  }

  setupSprite() {
    this.svgSprite = document.getElementById('franklin-svg-sprite');
    if (!this.svgSprite) {
      this.svgSprite = document.createElement('div');
      this.svgSprite.id = 'franklin-svg-sprite';
      document.body.append(this.svgSprite);
    }
  }

  get iconUrl() {
    return `/icons/${this.iconName}.svg`;
  }

  get cache() {
    window.ICONS_CACHE = window.ICONS_CACHE || {};
    return window.ICONS_CACHE;
  }

  async connected() {
    this.iconName = this.getAttribute('icon');
    if (!this.cache[this.iconName]) {
      this.cache[this.iconName] = {
        loading: new Promise((resolve) => {
          resolve(this.load(this.iconUrl));
        }),
      };
    } else {
      await this.cache[this.iconName].loading;
      this.innerHTML = this.template();
    }
    this.classList.add('loaded');
  }

  template() {
    const { viewBox } = this.cache[this.iconName];
    const attributes = Object.keys({ viewBox })
      .map((k) => {
        if (this.cache[this.iconName][k]) {
          return `${k}="${this.cache[this.iconName][k]}"`;
        }
        return '';
      })
      .join(' ');
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ${attributes}><use xlink:href="#icons-sprite-${this.iconName}"/></svg>`;
  }

  iconTemplate(iconName, svg, viewBox, width, height) {
    return `<defs><g id="icons-sprite-${iconName}" viewBox="${viewBox}" width="${width}" height="${height}">${svg.innerHTML}</g></defs>`;
  }

  async processExternal(response) {
    if (response.ok) {
      const { iconName } = this;
      this.svg = await response.text();

      if (this.svg.match(/(<style | class=|url\(#| xlink:href="#)/)) {
        this.cache[iconName] = {
          styled: true,
          html: this.svg
            // rescope ids and references to avoid clashes across icons;
            .replaceAll(/ id="([^"]+)"/g, (_, id) => ` id="${iconName}-${id}"`)
            .replaceAll(
              /="url\(#([^)]+)\)"/g,
              (_, id) => `="url(#${iconName}-${id})"`,
            )
            .replaceAll(
              / xlink:href="#([^"]+)"/g,
              (_, id) => ` xlink:href="#${iconName}-${id}"`,
            ),
        };
      } else {
        const dummy = document.createElement('div');
        dummy.innerHTML = this.svg;
        const svg = dummy.querySelector('svg');
        const width = svg.getAttribute('width');
        const height = svg.getAttribute('height');
        const viewBox = svg.getAttribute('viewBox');
        svg.innerHTML = this.iconTemplate(
          iconName,
          svg,
          viewBox,
          width,
          height,
        );
        this.cache[iconName].width = width;
        this.cache[iconName].height = height;
        this.cache[iconName].viewBox = viewBox;
        this.cache[iconName].svg = svg;
      }
      this.svgSprite.append(this.cache[iconName].svg);
      this.innerHTML = this.template();
    } else {
      this.cache[this.iconName] = false;
    }
  }
}
