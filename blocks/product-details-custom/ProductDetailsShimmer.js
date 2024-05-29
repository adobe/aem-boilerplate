import {
  h, Fragment,
} from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';
import Sidebar from './ProductDetailsSidebar.js';
import Carousel from './ProductDetailsCarousel.js';

const html = htm.bind(h);

export default function ProductDetailsShimmer() {
  return html`<${Fragment}>
      <div class="title-shimmer shimmer desktop-hidden"></div>
      <${Carousel} loading />
      <${Sidebar} loading />
      <div class="detail-shimmer shimmer mobile-hidden"></div>
  <//>`;
}
