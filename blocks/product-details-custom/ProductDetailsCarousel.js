import {
  h, Component, Fragment,
} from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';
import Icon from './Icon.js';

const html = htm.bind(h);

function OptimizedSources({
  src,
  sizes,
  width,
  height,
  loading = 'lazy',
}) {
  const createUrlForWidth = (url, w, useWebply = true) => {
    const newUrl = new URL(url);
    if (useWebply) {
      newUrl.searchParams.set('format', 'webply');
      newUrl.searchParams.set('optimize', 'medium');
    } else {
      newUrl.searchParams.delete('format');
    }
    newUrl.searchParams.set('width', w);
    newUrl.searchParams.delete('quality');
    newUrl.searchParams.delete('dpr');
    newUrl.searchParams.delete('bg-color');
    return newUrl.toString();
  };

  const createUrlForDpi = (url, w, useWebply = true) => `${createUrlForWidth(url, w, useWebply)} 1x, ${createUrlForWidth(url, w * 2, useWebply)} 2x, ${createUrlForWidth(url, w * 3, useWebply)} 3x`;

  return html`<${Fragment}>
    ${sizes.map((size) => {
    const webpUrl = createUrlForDpi(src, size.width || width, true);
    const jpgUrl = createUrlForDpi(src, size.width || width, false);
    const mediaAttribute = {};
    if (size.media) {
      mediaAttribute.media = `(max-width: ${size.media}px)`;
    }
    const jpgTag = html`<source ...${mediaAttribute} srcset=${jpgUrl} />`;
    const webpTag = html`<source ...${mediaAttribute} srcset=${webpUrl}/>`;
    return html`${webpTag}\n${jpgTag}`;
  })}
    <img height=${height} width=${width} src=${createUrlForWidth(src, width, false)} loading=${loading} />
  <//>`;
}

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: 0,
      thumbnailSlide: 0,
    };
  }

  getImages() {
    const productImages = this.props.product?.images.map((i) => {
      const url = new URL(i.url);
      url.protocol = window.location.protocol;
      return url.toString();
    });

    if (productImages) {
      this.thumbnailImages = productImages.map((image) => `${image}?quality=100&bg-color=255,255,255`);
      this.images = productImages.map((image) => `${image}?width=700&quality=100&bg-color=255,255,255`);
    }
  }

  static negativeModulo(i, mod) {
    return ((i % mod) + mod) % mod;
  }

  updateThumbnailSlide(getNextIndex) {
    const nextIndex = getNextIndex(this.state.thumbnailSlide);
    const limitedIndex = Math.min(Math.max(nextIndex, 0), this.thumbnailImages.length - 1);
    this.setState({ thumbnailSlide: limitedIndex });
  }

  updateSlide(getNextIndex) {
    const nextIndex = getNextIndex(this.state.slide);
    const correctedNextIndex = Carousel.negativeModulo(nextIndex, this.images.length);
    this.setState({
      slide: correctedNextIndex,
      thumbnailSlide: correctedNextIndex,
    });
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (state.slide >= nextProps.product?.productImages?.length ?? 0) {
      return {
        ...state,
        slide: 0,
        thumbnailSlide: 0,
      };
    }
    return null;
  }

  render() {
    this.getImages();

    return html`
        <div class="product-detail-carousel">
            <div class="carousel-thumbnails-wrapper">
                <div class="thumbnail-controls">
                    <button class="button" name="thumbnail-prev" disabled=${this.props.shimmer} onClick=${() => this.updateThumbnailSlide((index) => index - 1)}><${Icon} name="caret-up-fill" /></button>
                    <button class="button" name="thumbnail-next" disabled=${this.props.shimmer} onClick=${() => this.updateThumbnailSlide((index) => index + 1)}><${Icon} name="caret-down-fill" /></button>
                </div>
                <ul class="carousel-thumbnails" style="transform: translateY(-${(this.state.thumbnailSlide === 0 ? 0 : 1) * -252.7 + (this.state.thumbnailSlide) * 322.6}px)">
                    ${!this.props.loading && this.thumbnailImages.map((image, i) => html`
                          <li key=${image} onClick=${() => this.setState({ slide: i, thumbnailSlide: i })}>
                              <picture>
                                  <${OptimizedSources} src=${image} height="313" width="247" loading=${'lazy'} sizes=${[]} />
                              </picture>
                          </li>`)}
                    ${this.props.loading && [1, 2, 3].map(() => html`
                        <li><picture class="shimmer"><img height="313" width="247" /></picture></li>
                    `)}
                </ul>
            </div>
            <div class="carousel-stage-wrapper">
                ${!this.props.loading && html`
                    <div class="main-controls">
                        <button class="button" name="stage-prev" onClick=${() => this.updateSlide((index) => index - 1)}><${Icon} name="caret-left-fill" /></button>
                        <button class="button" name="stage-next" onClick=${() => this.updateSlide((index) => index + 1)}><${Icon} name="caret-right-fill" /></button>
                    </div>
                `}
                <ul
                        class="carousel-stage"
                        style="transform: translateX(-${this.state.slide * 100}%)"
                >
                    ${!this.props.loading && this.images.map((image, i) => html`
                        <li key=${image} active=${i === this.state.slide ? 'true' : 'false'}>
                            <picture>
                                <${OptimizedSources} src=${image} width="700" height="888" loading=${i === 0 ? 'eager' : 'lazy'} sizes=${[{ media: 450, width: 450 }, { width: 700 }]} />
                            </picture>
                        </li>
                    `)}
                    ${this.props.loading && html`
                        <li><picture class="shimmer"><img width="700" height="888" /></picture></li>
                    `}
                </ul>
            </div>
        </div>
    `;
  }
}
