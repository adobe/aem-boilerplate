import { Wishlist } from '../data/models';

export declare function setPersistedWishlistData(data: Wishlist | null): void;
export declare function getPersistedWishlistData(guest?: boolean): Wishlist | {};
export declare function clearPersistedLocalStorage(): void;
export declare function getWishlistItemFromStorage(productSku: string, optionUIDs?: string[]): any;
//# sourceMappingURL=persisted-data.d.ts.map