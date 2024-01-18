import { init } from './init.js';

export default class ComponentBase extends HTMLElement {
  constructor() {
    super();
    this.external = false;
    this.uuid = `gen${crypto.randomUUID().split('-')[0]}`;
  }

  async connectedCallback() {
    const inicialized = this.getAttribute('inicialized');
    if (!inicialized) {
      this.setAttribute('inicialized', true);
      this.setAttribute('id', this.uuid);
      if (this.external) {
        await this.load(this.external);
      }
      this.connected();
      this.ready();
    }
  }

  async load(block) {
    const response = await fetch(
      `${block}`,
      window.location.pathname.endsWith(block) ? { cache: 'reload' } : {},
    );
    return this.processExternal(response);
  }

  async processExternal(response) {
    if (response.ok) {
      const html = await response.text();
      this.innerHTML = html;
      return this.refresh(this);
    }
    return response;
  }

  refresh(el = this) {
    init(el);
  }

  connected() {}

  ready() {}
}
