// Dropin Tools
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';

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
import Coupons from '@dropins/storefront-cart/containers/Coupons.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import GiftCards from '@dropins/storefront-cart/containers/GiftCards.js';
import GiftOptions from '@dropins/storefront-cart/containers/GiftOptions.js';
import OrderSummary from '@dropins/storefront-cart/containers/OrderSummary.js';
import { render as CartProvider } from '@dropins/storefront-cart/render.js';

// Checkout Dropin
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import BillToShippingAddress from '@dropins/storefront-checkout/containers/BillToShippingAddress.js';
import EstimateShipping from '@dropins/storefront-checkout/containers/EstimateShipping.js';
import LoginForm from '@dropins/storefront-checkout/containers/LoginForm.js';
import MergedCartBanner from '@dropins/storefront-checkout/containers/MergedCartBanner.js';
import OutOfStock from '@dropins/storefront-checkout/containers/OutOfStock.js';
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import PlaceOrder from '@dropins/storefront-checkout/containers/PlaceOrder.js';
import ServerError from '@dropins/storefront-checkout/containers/ServerError.js';
import ShippingMethods from '@dropins/storefront-checkout/containers/ShippingMethods.js';
import TermsAndConditions from '@dropins/storefront-checkout/containers/TermsAndConditions.js';

import { render as CheckoutProvider } from '@dropins/storefront-checkout/render.js';

// Order Dropin Modules
import * as orderApi from '@dropins/storefront-order/api.js';
import CustomerDetails from '@dropins/storefront-order/containers/CustomerDetails.js';
import OrderCostSummary from '@dropins/storefront-order/containers/OrderCostSummary.js';
import OrderHeader from '@dropins/storefront-order/containers/OrderHeader.js';
import OrderProductList from '@dropins/storefront-order/containers/OrderProductList.js';
import OrderStatus from '@dropins/storefront-order/containers/OrderStatus.js';
import ShippingStatus from '@dropins/storefront-order/containers/ShippingStatus.js';
import { render as OrderProvider } from '@dropins/storefront-order/render.js';

// Payment Services Dropin
import { PaymentMethodCode } from '@dropins/storefront-payment-services/api.js';
import CreditCard from '@dropins/storefront-payment-services/containers/CreditCard.js';
import { render as PaymentServices } from '@dropins/storefront-payment-services/render.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';

// Block-level
import createModal from '../modal/modal.js';

import {
  estimateShippingCost,
  getCartAddress,
  isCartEmpty,
  isCheckoutEmpty,
  scrollToElement,
  setAddressOnCart,
} from './utils.js';

import { authPrivacyPolicyConsentSlot, SUPPORT_PATH, fetchPlaceholders } from '../../scripts/commerce.js';
import { rootLink } from '../../scripts/scripts.js';

// Initializers
import '../../scripts/initializers/account.js';
import '../../scripts/initializers/checkout.js';
import '../../scripts/initializers/order.js';

function createMetaTag(property, content, type) {
  if (!property || !type) {
    return;
  }
  let meta = document.head.querySelector(`meta[${type}="${property}"]`);
  if (meta) {
    if (!content) {
      meta.remove();
      return;
    }
    meta.setAttribute(type, property);
    meta.setAttribute('content', content);
    return;
  }
  if (!content) {
    return;
  }
  meta = document.createElement('meta');
  meta.setAttribute(type, property);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

function setMetaTags(dropin) {
  createMetaTag('title', dropin);
  createMetaTag('description', dropin);
  createMetaTag('keywords', dropin);

  createMetaTag('og:description', dropin);
  createMetaTag('og:title', dropin);
  createMetaTag('og:url', window.location.href, 'property');
}

export default async function decorate(block) {
  setMetaTags('Checkout');
  document.title = 'Checkout';

  events.on('order/placed', () => {
    setMetaTags('Order Confirmation');
    document.title = 'Order Confirmation';
  });

  const DEBOUNCE_TIME = 1000;
  const LOGIN_FORM_NAME = 'login-form';
  const SHIPPING_FORM_NAME = 'selectedShippingAddress';
  const BILLING_FORM_NAME = 'selectedBillingAddress';
  const SHIPPING_ADDRESS_DATA_KEY = `${SHIPPING_FORM_NAME}_addressData`;
  const BILLING_ADDRESS_DATA_KEY = `${BILLING_FORM_NAME}_addressData`;
  const TERMS_AND_CONDITIONS_FORM_NAME = 'checkout-terms-and-conditions__form';

  // Define the Layout for the Checkout
  const checkoutFragment = document.createRange().createContextualFragment(`
    <div class="checkout__wrapper">
      <div class="checkout__loader"></div>
      <div class="checkout__merged-cart-banner"></div>
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
          <div class="checkout__block checkout__terms-and-conditions"></div>
          <div class="checkout__block checkout__place-order"></div>
        </div>
        <div class="checkout__aside">
          <div class="checkout__block checkout__order-summary"></div>
          <div class="checkout__block checkout__gift-options"></div>
          <div class="checkout__block checkout__cart-summary"></div>
        </div>
      </div>
    </div>
  `);

  const $content = checkoutFragment.querySelector('.checkout__content');
  const $loader = checkoutFragment.querySelector('.checkout__loader');
  const $mergedCartBanner = checkoutFragment.querySelector(
    '.checkout__merged-cart-banner',
  );

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
  const $giftOptions = checkoutFragment.querySelector(
    '.checkout__gift-options',
  );
  const $termsAndConditions = checkoutFragment.querySelector('.checkout__terms-and-conditions');

  block.appendChild(checkoutFragment);

  // Container and component references
  let loader;
  let modal;
  let emptyCart;
  let shippingForm;
  let billingForm;
  let shippingAddresses;
  let billingAddresses;

  const shippingFormRef = { current: null };
  const billingFormRef = { current: null };
  const creditCardFormRef = { current: null };

  // Adobe Commerce GraphQL endpoint
  const commerceCoreEndpoint = await getConfigValue('commerce-core-endpoint');

  // Render the initial containers
  const [
    _mergedCartBanner,
    _header,
    _serverError,
    _outOfStock,
    _loginForm,
    shippingFormSkeleton,
    _billToShipping,
    _shippingMethods,
    _paymentMethods,
    billingFormSkeleton,
    _orderSummary,
    _cartSummary,
    _termsAndConditions,
    placeOrder,
  ] = await Promise.all([
    CheckoutProvider.render(MergedCartBanner)($mergedCartBanner),

    UI.render(Header, {
      className: 'checkout-header',
      title: 'Checkout',
      size: 'large',
      divider: true,
      level: 1,
    })($heading),

    CheckoutProvider.render(ServerError, {
      autoScroll: true,
      onRetry: () => {
        $content.classList.remove('checkout__content--error');
      },
      onServerError: () => {
        $content.classList.add('checkout__content--error');
      },
    })($serverError),

    CheckoutProvider.render(OutOfStock, {
      routeCart: () => rootLink('/cart'),
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
          signUpFormConfig: {
            slots: {
              ...authPrivacyPolicyConsentSlot,
            },
          },
          resetPasswordFormConfig: {},
        })(signInForm);

        showModal(signInForm);
      },
      onSignOutClick: () => {
        authApi.revokeCustomerToken();
      },
    })($login),

    AccountProvider.render(AddressForm, {
      fieldIdPrefix: 'shipping',
      isOpen: true,
      showFormLoader: true,
    })($shippingForm),

    CheckoutProvider.render(BillToShippingAddress, {
      onChange: (checked) => {
        $billingForm.style.display = checked ? 'none' : 'block';
        if (!checked && billingFormRef?.current) {
          const { formData, isDataValid } = billingFormRef.current;

          setAddressOnCart({
            api: checkoutApi.setBillingAddress,
            debounceMs: DEBOUNCE_TIME,
            placeOrderBtn: placeOrder,
          })({ data: formData, isDataValid });
        }
      },
    })($billToShipping),

    CheckoutProvider.render(ShippingMethods)($delivery),

    CheckoutProvider.render(PaymentMethods, {
      slots: {
        Methods: {
          [PaymentMethodCode.CREDIT_CARD]: {
            render: (ctx) => {
              const $creditCard = document.createElement('div');

              PaymentServices.render(CreditCard, {
                apiUrl: commerceCoreEndpoint,
                getCustomerToken: getUserTokenCookie,
                getCartId: () => ctx.cartId,
                creditCardFormRef,
              })($creditCard);

              ctx.replaceHTML($creditCard);
            },
          },
          [PaymentMethodCode.SMART_BUTTONS]: {
            enabled: false,
          },
          [PaymentMethodCode.APPLE_PAY]: {
            enabled: false,
          },
          [PaymentMethodCode.GOOGLE_PAY]: {
            enabled: false,
          },
          [PaymentMethodCode.VAULT]: {
            enabled: false,
          },
        },
      },
    })($paymentMethods),

    AccountProvider.render(AddressForm, {
      fieldIdPrefix: 'billing',
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
        Coupons: (ctx) => {
          const coupons = document.createElement('div');

          CartProvider.render(Coupons)(coupons);

          ctx.appendChild(coupons);
        },
        GiftCards: (ctx) => {
          const giftCards = document.createElement('div');

          CartProvider.render(GiftCards)(giftCards);

          ctx.appendChild(giftCards);
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
          editCartLink.href = rootLink('/cart');
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
        Thumbnail: (ctx) => {
          const { item, defaultImageProps } = ctx;
          tryRenderAemAssetsImage(ctx, {
            alias: item.sku,
            imageProps: defaultImageProps,
          });
        },
        Footer: (ctx) => {
          const giftOptions = document.createElement('div');

          CartProvider.render(GiftOptions, {
            item: ctx.item,
            view: 'product',
            dataSource: 'cart',
            isEditable: false,
            handleItemsLoading: ctx.handleItemsLoading,
            handleItemsError: ctx.handleItemsError,
            onItemUpdate: ctx.onItemUpdate,
            slots: {
              SwatchImage: swatchImageSlot,
            },
          })(giftOptions);

          ctx.appendChild(giftOptions);
        },
      },
    })($cartSummary),

    CheckoutProvider.render(TermsAndConditions, {
      slots: {
        Agreements: (ctx) => {
          ctx.appendAgreement(() => ({
            name: 'default',
            mode: 'manual',
            translationId: 'Checkout.TermsAndConditions.label',
          }));
        },
      },
    })($termsAndConditions),

    CheckoutProvider.render(PlaceOrder, {
      handleValidation: () => {
        let success = true;
        const { forms } = document;

        const loginForm = forms[LOGIN_FORM_NAME];

        if (loginForm) {
          success = loginForm.checkValidity();
          if (!success) scrollToElement($login);
        }

        const selectedShippingForm = forms[SHIPPING_FORM_NAME];

        if (
          success
          && shippingFormRef.current
          && selectedShippingForm
          && selectedShippingForm.checkVisibility()
        ) {
          success = shippingFormRef.current.handleValidationSubmit(false);
        }

        const selectedBillingForm = forms[BILLING_FORM_NAME];

        if (
          success
          && billingFormRef.current
          && selectedBillingForm
          && selectedBillingForm.checkVisibility()
        ) {
          success = billingFormRef.current.handleValidationSubmit(false);
        }

        const termsAndConditionsForm = forms[TERMS_AND_CONDITIONS_FORM_NAME];

        if (success && termsAndConditionsForm) {
          success = termsAndConditionsForm.checkValidity();
          if (!success) scrollToElement($termsAndConditions);
        }

        return success;
      },
      handlePlaceOrder: async ({ cartId, code }) => {
        await displayOverlaySpinner();
        try {
          // Payment Services credit card
          if (code === PaymentMethodCode.CREDIT_CARD) {
            if (!creditCardFormRef.current) {
              console.error('Credit card form not rendered.');
              return;
            }
            if (!creditCardFormRef.current.validate()) {
              // Credit card form invalid; abort order placement
              return;
            }
            // Submit Payment Services credit card form
            await creditCardFormRef.current.submit();
          }
          // Place order
          await orderApi.placeOrder(cartId);
        } catch (error) {
          console.error(error);
          throw error;
        } finally {
          await removeOverlaySpinner();
        }
      },
    })($placeOrder),

    CartProvider.render(GiftOptions, {
      view: 'order',
      dataSource: 'cart',
      isEditable: false,
      slots: {
        SwatchImage: swatchImageSlot,
      },
    })($giftOptions),
  ]);

  // Dynamic containers and components
  async function showModal(content) {
    modal = await createModal([content]);
    modal.showModal();
  }

  function removeModal() {
    if (!modal) return;
    modal.removeModal();
    modal = null;
  }

  async function displayEmptyCart() {
    if (emptyCart) return;

    emptyCart = await CartProvider.render(EmptyCart, {
      routeCTA: () => rootLink('/'),
    })($emptyCart);

    $content.classList.add('checkout__content--empty');
  }

  function removeEmptyCart() {
    if (!emptyCart) return;

    emptyCart.remove();
    emptyCart = null;
    $emptyCart.innerHTML = '';

    $content.classList.remove('checkout__content--empty');
  }

  async function displayOverlaySpinner() {
    if (loader) return;

    loader = await UI.render(ProgressSpinner, {
      className: '.checkout__overlay-spinner',
    })($loader);
  }

  function removeOverlaySpinner() {
    if (!loader) return;

    loader.remove();
    loader = null;
    $loader.innerHTML = '';
  }

  async function initializeCheckout(data) {
    removeEmptyCart();
    if (data.isGuest) await displayGuestAddressForms(data);
    else {
      removeOverlaySpinner();
      await displayCustomerAddressForms(data);
    }
  }

  async function displayGuestAddressForms(data) {
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

      shippingFormSkeleton.remove();

      let isFirstRenderShipping = true;
      const hasCartShippingAddress = Boolean(data.shippingAddresses?.[0]);

      const setShippingAddressOnCart = setAddressOnCart({
        api: checkoutApi.setShippingAddress,
        debounceMs: DEBOUNCE_TIME,
        placeOrderBtn: placeOrder,
      });

      const estimateShippingCostOnCart = estimateShippingCost({
        api: checkoutApi.estimateShippingMethods,
        debounceMs: DEBOUNCE_TIME,
      });

      const storeConfig = checkoutApi.getStoreConfigCache();

      shippingForm = await AccountProvider.render(AddressForm, {
        addressesFormTitle: 'Shipping address',
        className: 'checkout-shipping-form__address-form',
        fieldIdPrefix: 'shipping',
        formName: SHIPPING_FORM_NAME,
        forwardFormRef: shippingFormRef,
        hideActionFormButtons: true,
        inputsDefaultValueSet: cartShippingAddress ?? {
          countryCode: storeConfig.defaultCountry,
        },
        isOpen: true,
        onChange: (values) => {
          const canSetShippingAddressOnCart = !isFirstRenderShipping || !hasCartShippingAddress;
          if (canSetShippingAddressOnCart) setShippingAddressOnCart(values);
          if (!hasCartShippingAddress) estimateShippingCostOnCart(values);
          if (isFirstRenderShipping) isFirstRenderShipping = false;
        },
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

      const setBillingAddressOnCart = setAddressOnCart({
        api: checkoutApi.setBillingAddress,
        debounceMs: DEBOUNCE_TIME,
        placeOrderBtn: placeOrder,
      });

      const storeConfig = checkoutApi.getStoreConfigCache();

      if (!data.isVirtual) {
        $billingForm.style.display = 'none';
      }
      billingForm = await AccountProvider.render(AddressForm, {
        addressesFormTitle: 'Billing address',
        className: 'checkout-billing-form__address-form',
        fieldIdPrefix: 'billing',
        formName: BILLING_FORM_NAME,
        forwardFormRef: billingFormRef,
        hideActionFormButtons: true,
        inputsDefaultValueSet: cartBillingAddress ?? {
          countryCode: storeConfig.defaultCountry,
        },
        isOpen: true,
        onChange: (values) => {
          const canSetBillingAddressOnCart = !isFirstRenderBilling || !hasCartBillingAddress;
          if (canSetBillingAddressOnCart) setBillingAddressOnCart(values);
          if (isFirstRenderBilling) isFirstRenderBilling = false;
        },
        showBillingCheckBox: false,
        showFormLoader: false,
        showShippingCheckBox: false,
      })($billingForm);
    }
  }

  async function displayCustomerAddressForms(data) {
    if (data.isVirtual) {
      shippingAddresses?.remove();
      shippingAddresses = null;
      $shippingForm.innerHTML = '';
    } else if (!shippingAddresses) {
      shippingForm?.remove();
      shippingForm = null;
      shippingFormRef.current = null;

      const cartShippingAddress = getCartAddress(data, 'shipping');

      const shippingAddressId = cartShippingAddress
        ? cartShippingAddress?.id ?? 0
        : undefined;

      const shippingAddressCache = sessionStorage.getItem(
        SHIPPING_ADDRESS_DATA_KEY,
      );

      // clear persisted shipping address if cart has a shipping address
      if (cartShippingAddress && shippingAddressCache) {
        sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
      }

      const storeConfig = checkoutApi.getStoreConfigCache();

      const inputsDefaultValueSet = cartShippingAddress && cartShippingAddress.id === undefined
        ? cartShippingAddress
        : { countryCode: storeConfig.defaultCountry };

      const hasCartShippingAddress = Boolean(data.shippingAddresses?.[0]);
      let isFirstRenderShipping = true;

      const setShippingAddressOnCart = setAddressOnCart({
        api: checkoutApi.setShippingAddress,
        debounceMs: DEBOUNCE_TIME,
        placeOrderBtn: placeOrder,
      });

      const estimateShippingCostOnCart = estimateShippingCost({
        api: checkoutApi.estimateShippingMethods,
        debounceMs: DEBOUNCE_TIME,
      });

      shippingAddresses = await AccountProvider.render(Addresses, {
        addressFormTitle: 'Deliver to new address',
        defaultSelectAddressId: shippingAddressId,
        fieldIdPrefix: 'shipping',
        formName: SHIPPING_FORM_NAME,
        forwardFormRef: shippingFormRef,
        inputsDefaultValueSet,
        minifiedView: false,
        onAddressData: (values) => {
          const canSetShippingAddressOnCart = !isFirstRenderShipping || !hasCartShippingAddress;
          if (canSetShippingAddressOnCart) setShippingAddressOnCart(values);
          if (!hasCartShippingAddress) estimateShippingCostOnCart(values);
          if (isFirstRenderShipping) isFirstRenderShipping = false;
        },
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
      billingFormRef.current = null;

      const cartBillingAddress = getCartAddress(data, 'billing');

      const billingAddressId = cartBillingAddress
        ? cartBillingAddress?.id ?? 0
        : undefined;

      const billingAddressCache = sessionStorage.getItem(
        BILLING_ADDRESS_DATA_KEY,
      );

      // clear persisted billing address if cart has a billing address
      if (cartBillingAddress && billingAddressCache) {
        sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);
      }

      const storeConfig = checkoutApi.getStoreConfigCache();

      const inputsDefaultValueSet = cartBillingAddress && cartBillingAddress.id === undefined
        ? cartBillingAddress
        : { countryCode: storeConfig.defaultCountry };

      const hasCartBillingAddress = Boolean(data.billingAddress);
      let isFirstRenderBilling = true;

      const setBillingAddressOnCart = setAddressOnCart({
        api: checkoutApi.setBillingAddress,
        debounceMs: DEBOUNCE_TIME,
        placeOrderBtn: placeOrder,
      });

      billingAddresses = await AccountProvider.render(Addresses, {
        addressFormTitle: 'Bill to new address',
        defaultSelectAddressId: billingAddressId,
        formName: BILLING_FORM_NAME,
        forwardFormRef: billingFormRef,
        inputsDefaultValueSet,
        minifiedView: false,
        onAddressData: (values) => {
          const canSetBillingAddressOnCart = !isFirstRenderBilling || !hasCartBillingAddress;
          if (canSetBillingAddressOnCart) setBillingAddressOnCart(values);
          if (isFirstRenderBilling) isFirstRenderBilling = false;
        },
        selectable: true,
        selectBilling: true,
        showBillingCheckBox: false,
        showSaveCheckBox: true,
        showShippingCheckBox: false,
        title: 'Billing address',
      })($billingForm);
    }
  }

  // Define the Layout for the Order Confirmation
  async function displayOrderConfirmation(orderData) {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

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
          <div class="order-confirmation__block order-confirmation__gift-options"></div>
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
    const $orderGiftOptions = orderConfirmationFragment.querySelector(
      '.order-confirmation__gift-options',
    );
    const $orderProductList = orderConfirmationFragment.querySelector(
      '.order-confirmation__order-product-list',
    );
    const $orderConfirmationFooter = orderConfirmationFragment.querySelector(
      '.order-confirmation__footer',
    );

    const labels = await fetchPlaceholders();
    const langDefinitions = {
      default: {
        ...labels,
      },
    };
    await initializers.mountImmediately(orderApi.initialize, { orderData, langDefinitions });

    block.replaceChildren(orderConfirmationFragment);

    const handleSignUpClick = async ({
      inputsDefaultValueSet,
      addressesData,
    }) => {
      const signUpForm = document.createElement('div');
      AuthProvider.render(SignUp, {
        routeSignIn: () => rootLink('/customer/login'),
        routeRedirectOnEmailConfirmationClose: () => rootLink('/customer/account'),
        inputsDefaultValueSet,
        addressesData,
        slots: {
          ...authPrivacyPolicyConsentSlot,
        },
      })(signUpForm);

      await showModal(signUpForm);
    };

    OrderProvider.render(OrderHeader, {
      handleEmailAvailability: checkoutApi.isEmailAvailable,
      handleSignUpClick,
      orderData,
    })($orderConfirmationHeader);

    OrderProvider.render(OrderStatus, { slots: { OrderActions: () => null } })(
      $orderStatus,
    );
    OrderProvider.render(ShippingStatus)($shippingStatus);
    OrderProvider.render(CustomerDetails)($customerDetails);
    OrderProvider.render(OrderCostSummary)($orderCostSummary);
    CartProvider.render(GiftOptions, {
      view: 'order',
      dataSource: 'order',
      isEditable: false,
      readOnlyFormOrderView: 'secondary',
      slots: {
        SwatchImage: swatchImageSlot,
      },
    })($orderGiftOptions);
    OrderProvider.render(OrderProductList, {
      slots: {
        Footer: (ctx) => {
          const giftOptions = document.createElement('div');

          CartProvider.render(GiftOptions, {
            item: ctx.item,
            view: 'product',
            dataSource: 'order',
            isEditable: false,
            slots: {
              SwatchImage: swatchImageSlot,
            },
          })(giftOptions);

          ctx.appendChild(giftOptions);
        },
        CartSummaryItemImage: (ctx) => {
          const { data, defaultImageProps } = ctx;

          tryRenderAemAssetsImage(ctx, {
            alias: data.product.sku,
            imageProps: defaultImageProps,
          });
        },
      },
    })($orderProductList);

    $orderConfirmationFooter.innerHTML = `
      <div class="order-confirmation-footer__continue-button"></div>
      <div class="order-confirmation-footer__contact-support">
        <p>
          Need help?
          <a
            href="${rootLink(SUPPORT_PATH)}"
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
      href: rootLink('/'),
    })($orderConfirmationFooterContinueBtn);
  }

  // Define the event handlers
  async function handleCartInitialized(data) {
    if (isCartEmpty(data)) await displayEmptyCart();
  }

  async function handleCheckoutInitialized(data) {
    if (isCheckoutEmpty(data)) return;
    initializeCheckout(data);
  }

  async function handleCheckoutUpdated(data) {
    if (isCheckoutEmpty(data)) {
      await displayEmptyCart();
      return;
    }

    await initializeCheckout(data);
  }

  function handleAuthenticated(authenticated) {
    if (!authenticated) return;
    removeModal();
  }

  async function handleOrderPlaced(orderData) {
    // Clear address form data
    sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
    sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);

    const token = getUserTokenCookie();
    const orderRef = token ? orderData.number : orderData.token;
    const orderNumber = orderData.number;
    const encodedOrderRef = encodeURIComponent(orderRef);
    const encodedOrderNumber = encodeURIComponent(orderNumber);

    const url = token
      ? rootLink(`/order-details?orderRef=${encodedOrderRef}`)
      : rootLink(`/order-details?orderRef=${encodedOrderRef}&orderNumber=${encodedOrderNumber}`);

    window.history.pushState({}, '', url);

    // TODO cleanup checkout containers
    await displayOrderConfirmation(orderData);
  }

  events.on('authenticated', handleAuthenticated);
  events.on('cart/initialized', handleCartInitialized, { eager: true });
  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
  events.on('checkout/updated', handleCheckoutUpdated);
  events.on('order/placed', handleOrderPlaced);
}

function swatchImageSlot(ctx) {
  const { imageSwatchContext, defaultImageProps } = ctx;
  tryRenderAemAssetsImage(ctx, {
    alias: imageSwatchContext.label,
    imageProps: defaultImageProps,
    wrapper: document.createElement('span'),
  });
}
