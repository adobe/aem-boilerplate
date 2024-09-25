export default `
query($sku: String!) {
  variants(sku: $sku) {
    ...ProductVariant
  }
}`;

export const variantsFragment = `
fragment ProductVariant on ProductViewVariantResults {
  variants {
    product {
      sku
      name
      inStock
      images(roles: ["image"]) {
        url
      }
      ...on SimpleProductView {
        price {
          final { amount { currency value } }
        }
      }
    }
  }
}
`;
