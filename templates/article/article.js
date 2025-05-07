import { getMetadata } from '../../scripts/nx.js';

function createRelatedFeed(section, related) {
  const html = `
    <div class="side-section">
      <div class="article-feed grid">
        <div>
          <div>
            <h2 id="related">Related</h2>
          </div>
        </div>
        <div>
          <div>filter</div>
          <div>tags = ${related}</div>
        </div>
      </div>
    </div>
  `;

  section.insertAdjacentHTML('afterend', html);
}

(function decorateTemplate() {
  const mainSection = document.body.querySelector('main > div');
  mainSection.className = 'article-section';

  const related = getMetadata('related');
  if (related) createRelatedFeed(mainSection, related);
}());