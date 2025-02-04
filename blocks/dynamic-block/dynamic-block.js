import { events } from '@dropins/tools/event-bus.js';
import * as Cart from '@dropins/storefront-cart/api.js';
import { fetchGraphQl } from '@dropins/tools/fetch-graphql.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const blocks = [];

const getActiveRules = async () => {
  try {
    const response = await fetchGraphQl(
      `query CUSTOMER_SEGMENTS($cartId: String!){
          customerSegments(cartId: $cartId) {
            name
          }
          CustomerGroup {
            name
          }
          cart(cart_id: $cartId) {
            rules {
              name
            }
          }
        }
      `,
      {
        method: 'GET',
        variables: {
          cartId: Cart.getCartDataFromCache().id,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Could not retrieve customer segments', error);
  }
  return [];
};

const segmentsMatched = (activeSegments, segments) => segments.filter(
  (segment) => (activeSegments.includes(segment)),
).length >= 1;

const groupMatched = (activeGroup, groups) => groups.includes(activeGroup);

const cartRulesMatched = (activeRules, rules) => rules.filter(
  (rule) => (activeRules.includes(rule)),
).length >= 1;

const conditionsMatched = (activeRules, blockConfig) => {
  const {
    'customer-segments': customerSegments,
    'customer-groups': customerGroups,
    'cart-rules': cartRules,
  } = blockConfig;

  const activeSegments = activeRules.customerSegments?.map(
    (segment) => segment.name,
  );
  const activeGroup = activeRules.CustomerGroup?.name;
  const activeCartRules = activeRules.cart?.rules?.map(
    (rule) => rule.name,
  );

  if (customerSegments !== undefined && !segmentsMatched(activeSegments, customerSegments.split(','))) {
    return false;
  }

  if (customerGroups !== undefined && !groupMatched(activeGroup, customerGroups.split(','))) {
    return false;
  }

  if (cartRules !== undefined && !cartRulesMatched(activeCartRules, cartRules.split(','))) {
    return false;
  }

  return true;
};

const updateDynamicBlocksVisibility = async () => {
  const activeRules = await getActiveRules();

  blocks.forEach(async (blockConfig) => {
    const index = blocks.indexOf(blockConfig);
    const { fragment } = blockConfig;

    const block = document.querySelector(`[data-dynamic-block-key="${index}"]`);
    block.style.display = 'none';
    if (conditionsMatched(activeRules, blockConfig)) {
      if (fragment !== undefined) {
        const content = await loadFragment(fragment);
        const blockContent = document.createElement('div');
        while (content.firstElementChild) blockContent.append(content.firstElementChild);
        block.textContent = '';
        block.append(blockContent);
      }
      block.style.display = '';
    }
  });
};

export default function decorate(block) {
  block.style.display = 'none';
  blocks.push(readBlockConfig(block));
  block.setAttribute('data-dynamic-block-key', blocks.length - 1);
}

events.on('cart/initialized', () => {
  updateDynamicBlocksVisibility();
});
events.on('cart/updated', () => {
  updateDynamicBlocksVisibility();
});
