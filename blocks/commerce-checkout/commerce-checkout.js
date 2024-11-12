/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
import { debounce } from '@dropins/tools/lib.js';

// Dropin Components
import {
  Button,
  Header,
  ProgressSpinner,
  provider as UI,
} from '@dropins/tools/components.js';

// Auth Dropin
import * as authApi from '@dropins/storefront-auth/api.js';
import AuthCombine from '@dropins/storefront-auth/containers/AuthCombine.js';
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';
import { render as AuthProvider } from '@dropins/storefront-auth/render.js';

// Account Dropin
import Addresses from '@dropins/storefront-account/containers/Addresses.js';
import AddressForm from '@dropins/storefront-account/containers/AddressForm.js';
import { render as AccountProvider } from '@dropins/storefront-account/render.js';

// Cart Dropin
import * as cartApi from '@dropins/storefront-cart/api.js';
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import { OrderSummary } from '@dropins/storefront-cart/containers/OrderSummary.js';
import { render as CartProvider } from '@dropins/storefront-cart/render.js';

// Checkout Dropin
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import BillToShippingAddress from '@dropins/storefront-checkout/containers/BillToShippingAddress.js';
import EstimateShipping from '@dropins/storefront-checkout/containers/EstimateShipping.js';
import LoginForm from '@dropins/storefront-checkout/containers/LoginForm.js';
import OrderConfirmationHeader from '@dropins/storefront-checkout/containers/OrderConfirmationHeader.js';
import OutOfStock from '@dropins/storefront-checkout/containers/OutOfStock.js';
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import PlaceOrder from '@dropins/storefront-checkout/containers/PlaceOrder.js';
import ServerError from '@dropins/storefront-checkout/containers/ServerError.js';
import ShippingMethods from '@dropins/storefront-checkout/containers/ShippingMethods.js';

import { render as CheckoutProvider } from '@dropins/storefront-checkout/render.js';

// Order Dropin Modules
import * as orderApi from '@dropins/storefront-order/api.js';
import CustomerDetails from '@dropins/storefront-order/containers/CustomerDetails.js';
import OrderCostSummary from '@dropins/storefront-order/containers/OrderCostSummary.js';
import OrderProductList from '@dropins/storefront-order/containers/OrderProductList.js';
import OrderStatus from '@dropins/storefront-order/containers/OrderStatus.js';
import ShippingStatus from '@dropins/storefront-order/containers/ShippingStatus.js';
import { render as OrderProvider } from '@dropins/storefront-order/render.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';

// Block-level
import createModal from '../modal/modal.js';

import {
  getCartAddress,
  scrollToElement,
  setAddressOnCart,
} from '../../scripts/checkout.js';

// Initializers
import '../../scripts/initializers/account.js';
import '../../scripts/initializers/auth.js';
import '../../scripts/initializers/cart.js';
import '../../scripts/initializers/checkout.js';

export default async function decorate(block) {
  const DEBOUNCE_TIME = 1000;
  const LOGIN_FORM_NAME = 'login-form';
  const SHIPPING_FORM_NAME = 'selectedShippingAddress';
  const BILLING_FORM_NAME = 'selectedBillingAddress';
  const SHIPPING_ADDRESS_DATA_KEY = `${SHIPPING_FORM_NAME}_addressData`;
  const BILLING_ADDRESS_DATA_KEY = `${BILLING_FORM_NAME}_addressData`;

  // Pre-fetch checkout store configuration
  const storeConfig = await checkoutApi.getStoreConfig();

  // Define the Layout for the Checkout
  const checkoutFragment = document.createRange().createContextualFragment(`
    <div class="checkout__wrapper">
      <div class="checkout__loader"></div>
      <div class="checkout__content">
        <div class="checkout__main">
          <div class="checkout__block checkout__heading"></div>
          <div class="checkout__block checkout__empty-cart"></div>
          <div class="checkout__block checkout__server-error"></div>
          <div class="checkout__block checkout__out-of-stock"></div>
          <div class="checkout__block checkout__login"></div>
          <div class="checkout__block checkout__shipping-form"></div>
          <div class="checkout__block checkout__bill-to-shipping"></div>
          <div class="checkout__block checkout__delivery"></div>
          <div class="checkout__block checkout__payment-methods"></div>
          <div class="checkout__block checkout__billing-form"></div>
        </div>
        <div class="checkout__aside">
          <div class="checkout__block checkout__block--aside checkout__order-summary"></div>
          <div class="checkout__block checkout__block--aside checkout__cart-summary"></div>
        </div>
        <div class="checkout__place-order"></div>
      </div>
    </div>
  `);

  const $content = checkoutFragment.querySelector('.checkout__content');
  const $loader = checkoutFragment.querySelector('.checkout__loader');
  const $heading = checkoutFragment.querySelector('.checkout__heading');
  const $emptyCart = checkoutFragment.querySelector('.checkout__empty-cart');
  const $serverError = checkoutFragment.querySelector(
    '.checkout__server-error',
  );
  const $outOfStock = checkoutFragment.querySelector('.checkout__out-of-stock');
  const $login = checkoutFragment.querySelector('.checkout__login');
  const $shippingForm = checkoutFragment.querySelector(
    '.checkout__shipping-form',
  );
  const $billToShipping = checkoutFragment.querySelector(
    '.checkout__bill-to-shipping',
  );
  const $delivery = checkoutFragment.querySelector('.checkout__delivery');
  const $paymentMethods = checkoutFragment.querySelector(
    '.checkout__payment-methods',
  );
  const $billingForm = checkoutFragment.querySelector(
    '.checkout__billing-form',
  );
  const $orderSummary = checkoutFragment.querySelector(
    '.checkout__order-summary',
  );
  const $cartSummary = checkoutFragment.querySelector(
    '.checkout__cart-summary',
  );
  const $placeOrder = checkoutFragment.querySelector('.checkout__place-order');

  block.appendChild(checkoutFragment);

  // Render main containers
  let shippingFormRef = { current: null };
  let billingFormRef = { current: null };

  let loader;
  const displayOverlaySpinner = async () => {
    if (loader) return;

    loader = await UI.render(ProgressSpinner, {
      className: '.checkout__overlay-spinner',
    })($loader);
  };

  const removeOverlaySpinner = () => {
    if (!loader) return;

    loader.remove();
    loader = null;
    $loader.innerHTML = '';
  };

  let modal;
  const showModal = async (content) => {
    modal = await createModal([content]);
    modal.showModal();
  };

  const removeModal = () => {
    if (!modal) return;
    modal.removeModal();
    modal = null;
  };

  const [
    _heading,
    _serverError,
    _outOfStock,
    _login,
    shippingFormSkeleton,
    _billToShipping,
    _delivery,
    _paymentMethods,
    billingFormSkeleton,
    _orderSummary,
    _cartSummary,
    _placeOrder,
  ] = await Promise.all([
    UI.render(Header, {
      title: 'Checkout',
      size: 'large',
      divider: true,
    })($heading),

    CheckoutProvider.render(ServerError, {
      onRetry: () => {
        $content.classList.remove('checkout__content--error');
      },
      onServerError: () => {
        $content.classList.add('checkout__content--error');
      },
    })($serverError),

    CheckoutProvider.render(OutOfStock, {
      routeCart: () => '/cart',
      onCartProductsUpdate: (items) => {
        cartApi.updateProductsFromCart(items).catch(console.error);
      },
    })($outOfStock),

    CheckoutProvider.render(LoginForm, {
      name: LOGIN_FORM_NAME,
      onSignInClick: async (initialEmailValue) => {
        const signInForm = document.createElement('div');

        AuthProvider.render(AuthCombine, {
          signInFormConfig: {
            renderSignUpLink: true,
            initialEmailValue,
            onSuccessCallback: () => {
              displayOverlaySpinner();
            },
          },
          signUpFormConfig: {},
          resetPasswordFormConfig: {},
        })(signInForm);

        showModal(signInForm);
      },
      onSignOutClick: () => {
        authApi.revokeCustomerToken();
      },
    })($login),

    AccountProvider.render(AddressForm, {
      isOpen: true,
      showFormLoader: true,
    })($shippingForm),

    CheckoutProvider.render(BillToShippingAddress, {
      hideOnVirtualCart: true,
      onChange: (checked) => {
        $billingForm.style.display = checked ? 'none' : 'block';

        if (!checked && billingFormRef.current) {
          const isDataValid = billingFormRef.current.handleValidationSubmit();

          setAddressOnCart(
            { data: billingFormRef.current.formData, isDataValid },
            checkoutApi.setBillingAddress,
          );
        }
      },
    })($billToShipping),

    CheckoutProvider.render(ShippingMethods, {
      hideOnVirtualCart: true,
      onCheckoutDataUpdate: () => {
        cartApi.refreshCart().catch(console.error);
      },
    })($delivery),

    CheckoutProvider.render(PaymentMethods)($paymentMethods),

    AccountProvider.render(AddressForm, {
      isOpen: true,
      showFormLoader: true,
    })($billingForm),

    CartProvider.render(OrderSummary, {
      slots: {
        EstimateShipping: (esCtx) => {
          const estimateShippingForm = document.createElement('div');
          CheckoutProvider.render(EstimateShipping)(estimateShippingForm);
          esCtx.appendChild(estimateShippingForm);
        },
      },
    })($orderSummary),

    CartProvider.render(CartSummaryList, {
      variant: 'secondary',
      slots: {
        Heading: (headingCtx) => {
          const title = 'Your Cart ({count})';

          const cartSummaryListHeading = document.createElement('div');
          cartSummaryListHeading.classList.add('cart-summary-list__heading');

          const cartSummaryListHeadingText = document.createElement('div');
          cartSummaryListHeadingText.classList.add(
            'cart-summary-list__heading-text',
          );

          cartSummaryListHeadingText.innerText = title.replace(
            '({count})',
            headingCtx.count ? `(${headingCtx.count})` : '',
          );
          const editCartLink = document.createElement('a');
          editCartLink.classList.add('cart-summary-list__edit');
          editCartLink.href = '/cart';
          editCartLink.rel = 'noreferrer';
          editCartLink.innerText = 'Edit';

          cartSummaryListHeading.appendChild(cartSummaryListHeadingText);
          cartSummaryListHeading.appendChild(editCartLink);
          headingCtx.appendChild(cartSummaryListHeading);

          headingCtx.onChange((nextHeadingCtx) => {
            cartSummaryListHeadingText.innerText = title.replace(
              '({count})',
              nextHeadingCtx.count ? `(${nextHeadingCtx.count})` : '',
            );
          });
        },
      },
    })($cartSummary),

    CheckoutProvider.render(PlaceOrder, {
      handleValidation: () => {
        let success = true;
        const { forms } = document;

        const loginForm = forms[LOGIN_FORM_NAME];

        if (loginForm) {
          success = loginForm.checkValidity();
          if (!success) scrollToElement($login);
        }

        const shippingForm = forms[SHIPPING_FORM_NAME];

        if (
          success
          && shippingFormRef.current
          && shippingForm
          && shippingForm.checkVisibility()
        ) {
          success = shippingFormRef.current.handleValidationSubmit(false);
        }

        const billingForm = forms[BILLING_FORM_NAME];

        if (
          success
          && billingFormRef.current
          && billingForm
          && billingForm.checkVisibility()
        ) {
          success = billingFormRef.current.handleValidationSubmit(false);
        }

        return success;
      },
      onPlaceOrder: async () => {
        displayOverlaySpinner();

        try {
          await checkoutApi.placeOrder();
        } catch (error) {
          console.error(error);
          throw error;
        } finally {
          removeOverlaySpinner();
        }
      },
    })($placeOrder),
  ]);

  let emptyCart;
  const displayEmptyCart = async () => {
    if (emptyCart) return;

    emptyCart = await CartProvider.render(EmptyCart, {
      routeCTA: () => '/',
    })($emptyCart);

    $content.classList.add('checkout__content--empty');
  };

  const removeEmptyCart = () => {
    if (!emptyCart) return;

    emptyCart.remove();
    emptyCart = null;
    $emptyCart.innerHTML = '';

    $content.classList.remove('checkout__content--empty');
  };

  let shippingForm;
  let billingForm;
  const displayGuestAddressForms = async (data) => {
    if (data.isVirtual) {
      shippingForm?.remove();
      shippingForm = null;
      $shippingForm.innerHTML = '';
    } else if (!shippingForm) {
      const cartShippingAddress = getCartAddress(data, 'shipping');

      const shippingAddressCache = sessionStorage.getItem(
        SHIPPING_ADDRESS_DATA_KEY,
      );

      if (cartShippingAddress && shippingAddressCache) {
        sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
      }

      // when shipping address form is empty
      if (!cartShippingAddress) {
        checkoutApi.estimateShippingMethods();

        events.emit('checkout/estimate-shipping-address', {
          address: {},
          isValid: false,
        });
      }

      shippingFormSkeleton.remove();

      let prevEstimateShippingData = {};
      let isFirstRenderShipping = true;
      const hasCartShippingAddress = Boolean(data.shippingAddresses?.[0]);
      shippingForm = await AccountProvider.render(AddressForm, {
        addressesFormTitle: 'Shipping address',
        className: 'checkout-shipping-form__address-form',
        formName: SHIPPING_FORM_NAME,
        forwardFormRef: shippingFormRef,
        hideActionFormButtons: true,
        inputsDefaultValueSet: cartShippingAddress ?? {
          countryCode: storeConfig.defaultCountry,
        },
        isOpen: true,
        onChange: debounce((values) => {
          if (!isFirstRenderShipping || !hasCartShippingAddress) {
            setAddressOnCart(values, checkoutApi.setShippingAddress);
          }

          const { data, isDataValid } = values;

          if (isFirstRenderShipping) isFirstRenderShipping = false;

          if (hasCartShippingAddress || isDataValid) return;

          if (
            prevEstimateShippingData.countryCode === data.countryCode
            && prevEstimateShippingData.regionCode === data.region.regionCode
            && prevEstimateShippingData.regionId === data.region.regionId
            && prevEstimateShippingData.postcode === data.postcode
          ) {
            return;
          }

          const criteria = {
            country_code: data.countryCode,
            region_name: String(data.region.regionCode || ''),
            region_id: String(data.region.regionId || ''),
          };
          checkoutApi.estimateShippingMethods({ criteria });

          events.emit('checkout/estimate-shipping-address', {
            address: {
              country_id: data.countryCode,
              region: String(data.region.regionCode || ''),
              region_id: String(data.region.regionId || ''),
              postcode: data.postcode,
            },
            isValid: isDataValid,
          });

          prevEstimateShippingData = {
            countryCode: data.countryCode,
            regionCode: data.region.regionCode,
            regionId: data.region.regionId,
            postcode: data.postcode,
          };
        }, DEBOUNCE_TIME),
        showBillingCheckBox: false,
        showFormLoader: false,
        showShippingCheckBox: false,
      })($shippingForm);
    }

    if (!billingForm) {
      const cartBillingAddress = getCartAddress(data, 'billing');

      const billingAddressCache = sessionStorage.getItem(
        BILLING_ADDRESS_DATA_KEY,
      );

      if (cartBillingAddress && billingAddressCache) {
        sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);
      }

      billingFormSkeleton.remove();

      let isFirstRenderBilling = true;
      const hasCartBillingAddress = Boolean(data.billingAddress);

      billingForm = await AccountProvider.render(AddressForm, {
        addressesFormTitle: 'Billing address',
        className: 'checkout-billing-form__address-form',
        formName: BILLING_FORM_NAME,
        forwardFormRef: billingFormRef,
        hideActionFormButtons: true,
        inputsDefaultValueSet: cartBillingAddress ?? {
          countryCode: storeConfig.defaultCountry,
        },
        isOpen: true,
        onChange: debounce((values) => {
          if (!isFirstRenderBilling || !hasCartBillingAddress) {
            setAddressOnCart(values, checkoutApi.setBillingAddress);
          }

          if (isFirstRenderBilling) isFirstRenderBilling = false;
        }, DEBOUNCE_TIME),
        showBillingCheckBox: false,
        showFormLoader: false,
        showShippingCheckBox: false,
      })($billingForm);
    }
  };

  let shippingAddresses;
  let billingAddresses;
  const displayCustomerAddressForms = async (data) => {
    if (data.isVirtual) {
      shippingAddresses?.remove();
      shippingAddresses = null;
      $shippingForm.innerHTML = '';
    } else if (!shippingAddresses) {
      shippingForm?.remove();
      shippingForm = null;
      shippingFormRef = { current: null };

      const cartShippingAddress = getCartAddress(data, 'shipping');

      const shippingAddressId = cartShippingAddress
        ? (cartShippingAddress?.id ?? 0)
        : undefined;

      const shippingAddressCache = sessionStorage.getItem(
        SHIPPING_ADDRESS_DATA_KEY,
      );

      // clear persisted shipping address if cart has a shipping address
      if (cartShippingAddress && shippingAddressCache) {
        sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
      }

      // when shipping address form is empty
      if (!cartShippingAddress) {
        checkoutApi.estimateShippingMethods();
        events.emit('checkout/estimate-shipping-address', {
          address: {},
          isValid: false,
        });
      }

      const inputsDefaultValueSet = cartShippingAddress && cartShippingAddress.id === undefined
        ? cartShippingAddress
        : { countryCode: storeConfig.defaultCountry };

      const hasCartShippingAddress = Boolean(data.shippingAddresses?.[0]);
      let isFirstRenderShipping = true;

      shippingAddresses = await AccountProvider.render(Addresses, {
        addressFormTitle: 'Deliver to new address',
        defaultSelectAddressId: shippingAddressId,
        formName: SHIPPING_FORM_NAME,
        forwardFormRef: shippingFormRef,
        inputsDefaultValueSet,
        minifiedView: false,
        onAddressData: debounce((values) => {
          if (!isFirstRenderShipping || !hasCartShippingAddress) {
            setAddressOnCart(values, checkoutApi.setShippingAddress);
          }

          if (isFirstRenderShipping) isFirstRenderShipping = false;
        }, DEBOUNCE_TIME),
        selectable: true,
        selectShipping: true,
        showBillingCheckBox: false,
        showSaveCheckBox: true,
        showShippingCheckBox: false,
        title: 'Shipping address',
      })($shippingForm);
    }

    if (!billingAddresses) {
      billingForm?.remove();
      billingForm = null;
      billingFormRef = { current: null };

      const cartBillingAddress = getCartAddress(data, 'billing');

      const billingAddressId = cartBillingAddress
        ? (cartBillingAddress?.id ?? 0)
        : undefined;

      const billingAddressCache = sessionStorage.getItem(
        BILLING_ADDRESS_DATA_KEY,
      );

      // clear persisted billing address if cart has a billing address
      if (cartBillingAddress && billingAddressCache) {
        sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);
      }

      const inputsDefaultValueSet = cartBillingAddress && cartBillingAddress.id === undefined
        ? cartBillingAddress
        : { countryCode: storeConfig.defaultCountry };

      const hasCartBillingAddress = Boolean(data.billingAddress);
      let isFirstRenderBilling = true;

      billingAddresses = await AccountProvider.render(Addresses, {
        addressFormTitle: 'Bill to new address',
        defaultSelectAddressId: billingAddressId,
        formName: BILLING_FORM_NAME,
        forwardFormRef: billingFormRef,
        inputsDefaultValueSet,
        minifiedView: false,
        onAddressData: debounce((values) => {
          if (!isFirstRenderBilling || !hasCartBillingAddress) {
            setAddressOnCart(values, checkoutApi.setBillingAddress);
          }

          if (isFirstRenderBilling) isFirstRenderBilling = false;
        }, DEBOUNCE_TIME),
        selectable: true,
        selectBilling: true,
        showBillingCheckBox: false,
        showSaveCheckBox: true,
        showShippingCheckBox: false,
        title: 'Billing address',
      })($billingForm);
    }
  };

  // Define the Layout for the Order Confirmation
  const displayOrderConfirmation = async (orderData) => {
    const orderConfirmationFragment = document.createRange()
      .createContextualFragment(`
      <div class="order-confirmation">
        <div class="order-confirmation__main">
          <div class="order-confirmation__block order-confirmation__header"></div>
          <div class="order-confirmation__block order-confirmation__order-status"></div>
          <div class="order-confirmation__block order-confirmation__shipping-status"></div>
          <div class="order-confirmation__block order-confirmation__customer-details"></div>
        </div>
        <div class="order-confirmation__aside">
          <div class="order-confirmation__block order-confirmation__order-cost-summary"></div>
          <div class="order-confirmation__block order-confirmation__order-product-list"></div>
          <div class="order-confirmation__block order-confirmation__footer"></div>
        </div>
      </div>
  `);

    // Order confirmation elements
    const $orderConfirmationHeader = orderConfirmationFragment.querySelector(
      '.order-confirmation__header',
    );
    const $orderStatus = orderConfirmationFragment.querySelector(
      '.order-confirmation__order-status',
    );
    const $shippingStatus = orderConfirmationFragment.querySelector(
      '.order-confirmation__shipping-status',
    );
    const $customerDetails = orderConfirmationFragment.querySelector(
      '.order-confirmation__customer-details',
    );
    const $orderCostSummary = orderConfirmationFragment.querySelector(
      '.order-confirmation__order-cost-summary',
    );
    const $orderProductList = orderConfirmationFragment.querySelector(
      '.order-confirmation__order-product-list',
    );
    const $orderConfirmationFooter = orderConfirmationFragment.querySelector(
      '.order-confirmation__footer',
    );

    await initializers.mountImmediately(orderApi.initialize, { orderData });

    block.replaceChildren(orderConfirmationFragment);

    const onSignUpClick = async ({ inputsDefaultValueSet, addressesData }) => {
      const signUpForm = document.createElement('div');
      AuthProvider.render(SignUp, {
        routeSignIn: () => '/customer/login',
        routeRedirectOnEmailConfirmationClose: () => '/customer/account',
        inputsDefaultValueSet,
        addressesData,
      })(signUpForm);

      await showModal(signUpForm);
    };

    CheckoutProvider.render(OrderConfirmationHeader, {
      orderData,
      onSignUpClick,
    })($orderConfirmationHeader);

    OrderProvider.render(OrderStatus, { slots: { OrderActions: () => null } })(
      $orderStatus,
    );
    OrderProvider.render(ShippingStatus)($shippingStatus);
    OrderProvider.render(CustomerDetails)($customerDetails);
    OrderProvider.render(OrderCostSummary)($orderCostSummary);
    OrderProvider.render(OrderProductList)($orderProductList);

    $orderConfirmationFooter.innerHTML = `
      <div class="order-confirmation-footer__continue-button"></div>
      <div class="order-confirmation-footer__contact-support">
        <p>
          Need help?
          <a
            href="/support"
            rel="noreferrer"
            class="order-confirmation-footer__contact-support-link"
            data-testid="order-confirmation-footer__contact-support-link"
          >
            Contact us
          </a>
        </p>
      </div>
    `;

    const $orderConfirmationFooterContinueBtn = $orderConfirmationFooter.querySelector(
      '.order-confirmation-footer__continue-button',
    );

    UI.render(Button, {
      children: 'Continue shopping',
      'data-testid': 'order-confirmation-footer__continue-button',
      className: 'order-confirmation-footer__continue-button',
      size: 'medium',
      variant: 'primary',
      type: 'submit',
      href: '/',
    })($orderConfirmationFooterContinueBtn);
  };

  // Event handlers
  const handleCheckoutInitialized = async (data) => {
    if (data === null || data.isEmpty) {
      await displayEmptyCart();
      return;
    }

    if (data.isGuest) {
      await displayGuestAddressForms(data);
    } else {
      await displayCustomerAddressForms(data);
    }
  };

  const handleCheckoutUpdated = async (data) => {
    if (data === null || data.isEmpty) {
      await displayEmptyCart();
      return;
    }

    removeEmptyCart();

    if (data.isGuest) {
      await displayGuestAddressForms(data);
    } else {
      removeOverlaySpinner();
      await displayCustomerAddressForms(data);
    }
  };

  const handleAuthenticated = (authenticated) => {
    if (!authenticated) return;
    removeModal();
  };

  const handleCheckoutOrder = async (orderData) => {
    // clear address form data
    sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
    sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);

    const token = getUserTokenCookie();
    const orderRef = token ? orderData.number : orderData.token;
    const encodedOrderRef = encodeURIComponent(orderRef);

    window.history.pushState(
      {},
      '',
      `/order-details?orderRef=${encodedOrderRef}`,
    );

    // TODO cleanup checkout containers
    await displayOrderConfirmation(orderData);
  };

  events.on('authenticated', handleAuthenticated);
  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
  events.on('checkout/order', handleCheckoutOrder);
  events.on('checkout/updated', handleCheckoutUpdated);
}
