/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
type Queue = {
    requests: (() => Promise<any>)[];
    onComplete?: () => void;
};
export declare const queues: Record<'cartUpdate' | 'default', Queue>;
export type QueueNames = keyof typeof queues;
export declare function enqueueRequest<T>(requestFn: () => Promise<T>, queueName?: keyof typeof queues): Promise<T>;
export declare function setQueueCompleteHandler(queueName: keyof typeof queues, handler: () => void): void;
export {};
//# sourceMappingURL=enqueueRequest.d.ts.map