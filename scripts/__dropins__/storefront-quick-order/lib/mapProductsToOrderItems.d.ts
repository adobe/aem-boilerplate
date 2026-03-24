import { OrderItem, OrderItemInput } from '../types';

/**
 * Maps fetched products to OrderItems
 * Creates error items for products not found in the response
 * @param requestedItems - Items that were requested
 * @param products - Products returned from API
 * @returns Array of OrderItems with proper quantity set
 */
export declare const mapProductsToOrderItems: (requestedItems: OrderItemInput[], products: OrderItem[]) => OrderItem[];
//# sourceMappingURL=mapProductsToOrderItems.d.ts.map