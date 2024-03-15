/* eslint-disable import/no-cycle */
import { store } from './api.js';
import { performMonolithGraphQLQuery } from '../commerce.js';

/* Queries */

const cartQueryFragment = `fragment cartQuery on Cart {
  id
  items {
      prices {
          price {
              currency
              value
          }
          total_item_discount {
            value
          }
      }
      product {
          name
          sku
          url_key
          thumbnail {
              url
          }
      }
      ... on ConfigurableCartItem {
          configurable_options {
              option_label
              value_label
          }
          configured_variant {
              thumbnail {
                  url
              }
          }
      }
      quantity
      uid
  }
  prices {
      subtotal_excluding_tax {
          currency
          value
      }
  }
  total_quantity
}`;

const getCartQuery = `query getCart($cartId: String!) {
  cart(cart_id: $cartId) {
      ...cartQuery
  }
}
${cartQueryFragment}`;

const createCartMutation = `mutation createCart {
  cartId: createEmptyCart
}`;

const removeItemFromCartMutation = `mutation removeItemFromCart($cartId: String!, $uid: ID!) {
  removeItemFromCart(input: { cart_id: $cartId, cart_item_uid: $uid }) {
      cart {
          ...cartQuery
      }
  }
}
${cartQueryFragment}`;

const updateCartItemsMutation = `mutation updateCartItems($cartId: String!, $items: [CartItemUpdateInput!]!) {
  updateCartItems(input: { cart_id: $cartId, cart_items: $items }) {
      cart {
          ...cartQuery
      }
  }
}
${cartQueryFragment}`;

const addProductsToCartMutation = `mutation addProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
  addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
      cart {
          ...cartQuery
      }
      user_errors {
          code
          message
      }
  }
}
${cartQueryFragment}`;

export {
  getCartQuery,
  createCartMutation,
  removeItemFromCartMutation,
  updateCartItemsMutation,
  addProductsToCartMutation,
};

/* Methods */
function mapCartItem(item) {
  return {
    id: item.uid,
    prices: {
      price: {
        value: item.prices?.price?.value,
        currency: item.prices?.price?.currency,
      },
    },
    product: {
      // TODO: productId not exposed by core GraphQL as number
      productId: 0,
      name: item.product?.name,
      sku: item.product?.sku,
    },
    configurableOptions: item.configurable_options?.map((option) => ({
      optionLabel: option?.option_label,
      valueLabel: option?.value_label,
    })),
    quantity: item.quantity,
  };
}

function mapCartToMSE(cart, source) {
  return {
    id: cart.id,
    items: cart.items.map(mapCartItem),
    prices: {
      subtotalExcludingTax: {
        value: cart.prices?.subtotal_excluding_tax?.value,
        currency: cart.prices?.subtotal_excluding_tax?.currency,
      },
    },
    totalQuantity: cart.total_quantity,
    source,
  };
}

const handleCartErrors = (errors) => {
  if (!errors) {
    return;
  }

  // Cart cannot be found
  if (errors.some(({ extensions }) => extensions?.category === 'graphql-no-such-entity')) {
    console.error('Cart does not exist, resetting cart');
    store.resetCart();
    return;
  }

  // No access to cart
  if (errors.some(({ extensions }) => extensions?.category === 'graphql-authorization')) {
    console.error('No access to cart, resetting cart');
    store.resetCart();
    return;
  }

  if (errors.some(({ extensions }) => extensions?.category === 'graphql-input')) {
    console.error('Some items in the cart might not be available anymore');
    return;
  }

  // Throw for everything else
  throw new Error(errors);
};

export function waitForCart() {
  const buttons = document.querySelectorAll('button.nav-cart-button, .minicart-header > .close');
  buttons.forEach((button) => { button.disabled = true; });
  return () => {
    buttons.forEach((button) => { button.disabled = false; });
  };
}

export async function getCart() {
  if (!store.getCartId()) {
    return;
  }

  const done = waitForCart();
  let data;
  let errors;
  try {
    ({ data, errors } = await performMonolithGraphQLQuery(
      getCartQuery,
      { cartId: store.getCartId() },
      false,
      true,
    ));
    handleCartErrors(errors);

    data.cart.items = data.cart.items.filter((item) => item);
    store.setCart(data.cart);
  } catch (err) {
    console.error('Could not fetch cart', err);
  } finally {
    done();
  }
}

export async function createCart() {
  try {
    const { data, errors } = await performMonolithGraphQLQuery(createCartMutation, {}, false);
    handleCartErrors(errors);
    const { cartId } = data;
    store.setCartId(cartId);
    console.debug('created empty cart', cartId);
  } catch (err) {
    console.error('Could not create empty cart', err);
  }
}

export async function addToCart(sku, options, quantity, source) {
  const done = waitForCart();
  try {
    const variables = {
      cartId: store.getCartId(),
      cartItems: [{
        sku,
        quantity,
        selected_options: options,
      }],
    };

    const { data, errors } = await performMonolithGraphQLQuery(
      addProductsToCartMutation,
      variables,
      false,
      true,
    );
    handleCartErrors(errors);

    const { cart, user_errors: userErrors } = data.addProductsToCart;
    if (userErrors && userErrors.length > 0) {
      console.error('User errors while adding item to cart', userErrors);
    }

    cart.items = cart.items.filter((item) => item);
    store.setCart(cart);
    const mseCart = mapCartToMSE(cart, source);

    // TODO: Find exact item by comparing options UIDs
    const mseChangedItems = cart.items.filter((item) => item.product.sku === sku).map(mapCartItem);
    window.adobeDataLayer.push((dl) => {
      dl.push({ shoppingCartContext: mseCart });
      dl.push({ changedProductsContext: { items: mseChangedItems } });
      // TODO: Remove eventInfo once collector is updated
      dl.push({ event: 'add-to-cart', eventInfo: { ...dl.getState() } });
    });

    console.debug('Added items to cart', variables, cart);
  } catch (err) {
    console.error('Could not add item to cart', err);
  } finally {
    done();
  }
}

export async function removeItemFromCart(uid) {
  const done = waitForCart();
  const variables = {
    cartId: store.getCartId(),
    uid,
  };

  try {
    const { data, errors } = await performMonolithGraphQLQuery(
      removeItemFromCartMutation,
      variables,
      false,
      true,
    );
    handleCartErrors(errors);
    store.setCart(data.removeItemFromCart.cart);
  } catch (err) {
    console.error('Could not remove item from cart', err);
  } finally {
    done();
  }
}

export async function updateQuantityOfCartItem(cartItemUid, quantity) {
  const done = waitForCart();
  const variables = {
    cartId: store.getCartId(),
    items: [{
      cart_item_uid: cartItemUid,
      quantity,
    }],
  };
  try {
    const { data, errors } = await performMonolithGraphQLQuery(
      updateCartItemsMutation,
      variables,
      false,
      true,
    );
    handleCartErrors(errors);
    store.setCart(data.updateCartItems.cart);

    console.debug('Update quantity of item in cart', variables, data.updateCartItems.cart);
  } catch (err) {
    console.error('Could not update quantity of item in cart', err);
  } finally {
    done();
  }
}
