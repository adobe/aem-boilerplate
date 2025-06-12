/* eslint-disable import/no-unresolved */
import { TargetedBlock } from '@dropins/storefront-personalization/containers/TargetedBlock.js';
import { render } from '@dropins/storefront-personalization/render.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function prepareIds(providedIds) {
  return providedIds.split(',').map((num) => btoa(num.trim()));
}

export default async function decorate(block) {
  const blockConfig = readBlockConfig(block);

  const {
    fragment,
    type,
    'customer-segments': customerSegments,
    'customer-groups': customerGroups,
    'cart-rules': rules,
  } = blockConfig;

  const content = (blockConfig.fragment !== undefined)
    ? await loadFragment(fragment)
    : block.children[block.children.length - 1];

  const segments = customerSegments !== undefined ? prepareIds(customerSegments) : [];
  const groups = customerGroups !== undefined ? prepareIds(customerGroups) : [];
  const cartRules = rules !== undefined ? prepareIds(rules) : [];

  render.render(TargetedBlock, {
    type,
    personalizationData: {
      segments,
      groups,
      cartRules,
    },
    slots: {
      Content: (ctx) => {
        const container = document.createElement('div');
        container.append(content);
        ctx.replaceWith(container);
      },
    },
  })(block);
}
