import card from '/blocks/cards/cards.js';
import { createPage } from '/tests/test-helper.js';
import { defaultTemplate } from './cards.templates.js';

test('render cards', async () => {
  // preparing the page content
  createPage(defaultTemplate());

  // preparing the tests mocks
  // ...

  // execute the block's code
  const cardEl = document.querySelector('.cards');
  await card(cardEl);

  // checking assetions
  const cardsImages = document.querySelectorAll('.cards .cards-card-image');
  expect(cardsImages).toHaveLength(3);
});
