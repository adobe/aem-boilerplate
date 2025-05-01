import { ReadonlySignal } from '../../@adobe-commerce/elsie/src/lib/signals';

export declare enum QueueName {
    CartUpdate = "cartUpdate",
    Default = "default",
    ShippingEstimate = "shippingEstimate"
}
type Request<T> = () => Promise<T>;
export declare function enqueueRequest<T>(requestFn: Request<T>, name?: QueueName): Promise<T>;
export declare const hasPendingCartUpdates: ReadonlySignal<boolean>;
export declare const hasPendingShippingEstimate: ReadonlySignal<boolean>;
export {};
//# sourceMappingURL=enqueueRequest.d.ts.map