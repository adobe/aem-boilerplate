import { ReadonlySignal } from '@dropins/tools/types/elsie/src/lib/signals';

export declare enum QueueName {
    Updates = "updates",
    Default = "default",
    ShippingEstimate = "shippingEstimate"
}
type Request<T> = () => Promise<T>;
export declare function enqueueRequest<T>(requestFn: Request<T>, name?: QueueName): Promise<T>;
export declare const hasPendingUpdates: ReadonlySignal<boolean>;
export declare const hasPendingShippingEstimate: ReadonlySignal<boolean>;
export {};
//# sourceMappingURL=enqueueRequest.d.ts.map