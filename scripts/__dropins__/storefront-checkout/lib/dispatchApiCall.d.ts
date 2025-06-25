import { FetchOptions } from '../api';
import { QueueName } from './enqueueRequest';

type DispatchApiCallParams<T> = {
    defaultValueOnFail?: T;
    options?: FetchOptions;
    path: string;
    query: string;
    queueName?: QueueName;
    transformer?: (data: any) => T;
    type: 'query' | 'mutation';
};
export declare function getValueAtPath(obj: any, path: string): any;
declare function dispatchApiCall<T>(params: DispatchApiCallParams<T>): Promise<T>;
export { dispatchApiCall };
//# sourceMappingURL=dispatchApiCall.d.ts.map