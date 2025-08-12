import { Events } from './events-catalog';

export * from './events-catalog';
/**
 * The `events` class provides static methods for event handling.
 * It allows subscribing to events, emitting events, and enabling or disabling event logging.
 *
 * @class
 * @extends {Events}
 *
 * @property {Function} on - Subscribes to an event.
 * @property {Function} emit - Emits an event.
 * @property {Function} enableLogger - Enables or disables event logging.
 * @property {Function} lastPayload - Returns the last payload of the event.
 */
export declare class events {
    static _identifier: string;
    static _logger: BroadcastChannel | null;
    static _lastEvent: {
        [key: string]: {
            payload: any;
        };
    };
    /**
     * Returns a scoped event key.
     * @param scope - The scope to get the event from.
     * @returns - The scoped event key.
     */
    static _getScopedEvent(scope?: string): <K extends keyof Events>(event: K) => K;
    /**
     * Returns the last payload of the event.
     * @param event – The event to get the last payload from.
     * @param options - Optional configuration for the event.
     * @returns – The last payload of the event.
     */
    static lastPayload<K extends keyof Events>(event: K, options?: {
        scope?: string;
    }): any;
    /**
     * Subscribes to an event.
     * @param event - The event to subscribe to.
     * @param handler - The event handler.
     * @param options - Optional configuration for the event handler.
     */
    static on<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void, options?: {
        eager?: boolean;
        scope?: string;
    }): {
        off(): void;
    } | undefined;
    /**
     * Emits an event.
     * @param event - The event to emit.
     * @param payload - The event payload.
     * @param options - Optional configuration for the event.
     */
    static emit<K extends keyof Events>(event: K, payload: Events[K], options?: {
        scope?: string;
    }): void;
    /**
     * Enables or disables event logging.
     * @param enabled - Whether to enable or disable event logging.
     */
    static enableLogger(enabled: boolean): void;
}
//# sourceMappingURL=index.d.ts.map