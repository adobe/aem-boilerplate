import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { OrderSearch } from '@dropins/storefront-order/containers/OrderSearch.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { events } from '@dropins/tools/event-bus.js';
import { checkIsAuthenticated } from '../../scripts/commerce.js';
import { CUSTOMER_ORDER_DETAILS_PATH, ORDER_DETAILS_PATH } from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/auth.js';
import '../../scripts/initializers/order.js';
import { rootLink } from '../../scripts/scripts.js';

const renderSignIn = async (element, email, orderNumber) => authRenderer.render(SignIn, {
  initialEmailValue: email,
  renderSignUpLink: false,
  labels: {
    formTitleText: email
      ? 'Enter your password to view order details'
      : 'Sign in to view order details',
    primaryButtonText: 'View order',
  },
  routeForgotPassword: () => 'reset-password.html',
  routeRedirectOnSignIn: () => rootLink(`${CUSTOMER_ORDER_DETAILS_PATH}?orderRef=${orderNumber}`),
})(element);

export default async function decorate(block) {
  block.innerHTML = '';

  events.on('order/data', async (order) => {
    if (!order) return;

    block.innerHTML = '';

    await orderRenderer.render(OrderSearch, {
      isAuth: checkIsAuthenticated(),
      renderSignIn: async ({ render, formValues }) => {
        if (render) {
          renderSignIn(
            block,
            formValues?.email ?? '',
            formValues?.number ?? '',
          );

          return false;
        }

        return true;
      },
      routeCustomerOrder: () => rootLink(CUSTOMER_ORDER_DETAILS_PATH),
      routeGuestOrder: () => rootLink(ORDER_DETAILS_PATH),
      onError: async (errorInformation) => {
        console.info('errorInformation', errorInformation);
      },
    })(block);
  });

  await orderRenderer.render(OrderSearch, {
    isAuth: checkIsAuthenticated(),
    renderSignIn: async ({ render, formValues }) => {
      if (render) {
        renderSignIn(block, formValues?.email ?? '', formValues?.number ?? '');

        return false;
      }

      return true;
    },
    routeCustomerOrder: () => rootLink(CUSTOMER_ORDER_DETAILS_PATH),
    routeGuestOrder: () => rootLink(ORDER_DETAILS_PATH),
    onError: async (errorInformation) => {
      console.info('errorInformation', errorInformation);
    },
  })(block);
}
