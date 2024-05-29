/* eslint-disable import/no-unresolved */
// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { setEndpoint } from '@dropins/tools/fetch-graphql.js';
import { initializers } from '@dropins/tools/initializer.js';

// Libs
import { getConfigValue } from './configs.js';

export default async function initializeDropins() {
  // Set Fetch Endpoint (Global)
  setEndpoint(await getConfigValue('commerce-core-endpoint'));

  // Mount all registered dropins
  if (document.readyState === 'complete') {
    initializers.mount();
  } else {
    window.addEventListener('load', initializers.mount);
  }

  events.enableLogger(true);
}
