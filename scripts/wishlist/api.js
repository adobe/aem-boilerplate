import { getSignInToken, performMonolithGraphQLQuery } from '../commerce.js';

const redirectToSignin = () => {
  window.location = '/customer/login';
};

const getWishlistsQuery = `
 query GetWishlists {
  customer {
    wishlists {
      id
      name
      items_count
      items_v2 {
        items {
          id
          product {
            uid
            name
            sku
          }
        }
      }
    }
  }
}
`;

const addProductToWishlistMutation = `
mutation(
  $wishlistId: ID!,
  $sku: String!
) {
  addProductsToWishlist(
    wishlistId: $wishlistId,
    wishlistItems: [
      {
        sku: $sku
        quantity: 1
      }
    ]
  ) {
    user_errors {
      code
      message
    }
    wishlist {
      name
    }
  }
}
`;

export async function getWishlists() {
  const token = getSignInToken();
  if (!token) {
    redirectToSignin();
  }

  const wishlists = await performMonolithGraphQLQuery(
    getWishlistsQuery,
    {},
    true,
    token,
  );

  if (wishlists.errors?.find((error) => error.message === "The current customer isn't authorized.")) {
    redirectToSignin();
  }

  return wishlists.data?.customer?.wishlists;
}

/**
 * Adds a product to the specified wishlist
 * @param product SKU of the product to add
 * @param wishlistId Optionally pass a wishlist. If no option, the first wishlist will be used.
 * @returns {Promise<void>}
 */
export async function addToWishlist(product, wishlistId) {
  const token = getSignInToken();
  if (!token) {
    redirectToSignin();
  }

  const toWishlist = wishlistId ?? (await getWishlists())[0].id;

  const response = await performMonolithGraphQLQuery(
    addProductToWishlistMutation,
    {
      wishlistId: toWishlist,
      sku: product,
    },
    false,
    token,
  );

  if (response.user_errors) {
    console.error(response.user_errors);
  } else {
    window.location = `/customer/wishlist?wishlist_id=${toWishlist}`;
  }
}
