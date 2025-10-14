import { CartModel } from '../data/models';

export declare function setPersistedCartData(data: CartModel | null): void;
export declare function getPersistedCartData(): CartModel | null;
export declare function setEstimatedShippingLocation(data: {
    [key: string]: string;
} | null): void;
export declare function getEstimatedShippingLocation(): {
    [key: string]: string;
} | null;
export declare function setAuthenticatedCart(isAuthenticated: boolean): void;
export declare function getAuthenticatedCart(): boolean;
//# sourceMappingURL=persisted-data.d.ts.map