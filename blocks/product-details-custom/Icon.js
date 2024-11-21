import {
  h, Component, Fragment,
  // eslint-disable-next-line import/no-unresolved,import/extensions
} from '@dropins/tools/preact.js';
// eslint-disable-next-line import/no-unresolved,import/extensions
import htm from '../../scripts/htm.js';

const html = htm.bind(h);

export default class Icon extends Component {
  constructor(props) {
    super();

    this.iconName = props.name;
  }

  async componentDidMount() {
    const resp = await fetch(`${window.hlx.codeBasePath}/icons/${this.iconName}.svg`);
    if (resp.ok) {
      const iconHTML = await resp.text();
      this.setState({ iconHTML });
    }
  }

  render() {
    if (!this.state.iconHTML) {
      return null;
    }

    if (this.state.iconHTML.match(/<style/i)) {
      const src = `data:image/svg+xml,${encodeURIComponent(this.state.iconHTML)}`;
      return html`
        <span class=${`icon icon${this.iconName}`}><img src=${src} /></span>
      `;
    }

    return html`<${Fragment}>
        <span class=${`icon icon${this.iconName}`} dangerouslySetInnerHTML=${{ __html: this.state.iconHTML }}>
        </span>
    </Fragment>
    `;
  }
}
