import { Config } from '.';

type Listener = {
    off(): void;
};
type Listeners<T> = (config?: T) => Array<Listener | undefined>;
type Init<T> = (config?: T) => Promise<void>;
type Options<T> = {
    init: Init<T>;
    listeners: Listeners<T>;
};
export type Model<T = any, D = any> = {
    transformer?: (data: D) => T & {
        [key: string]: any;
    };
};
/**
 * The `Initializer` class is responsible for setting up event listeners and initializing a module with the given configuration.
 *
 * @template T - The type of the configuration object.
 * @class
 */
export declare class Initializer<T> {
    private _listeners;
    listeners: Listeners<T>;
    init: Init<T>;
    config: Config<T>;
    /**
     * Creates an instance of Initializer.
     * @param options - The initialization options.
     * @param options.init - A function that initializes the module.
     * @param options.listeners - A function that sets up event listeners.
     */
    constructor({ init, listeners }: Options<T>);
}
type Initializers = [Initializer<any>, {
    [key: string]: any;
} | undefined][];
/**
 * The Initializers class provides methods to register, mount, and configure initializers.
 *
 * @class
 *
 * @method register - Registers a new initializer. If the initializers have already been mounted, it immediately binds the event listeners and initializes the API for the new initializer.
 * @method mount - Mounts all registered initializers. This involves binding the event listeners and initializing the APIs for each initializer, in that order.
 * @method setImageParamKeys - Sets the image parameter keys. These keys are used when initializing the APIs for the initializers.
 */
export declare class initializers {
    static _initializers: Initializers;
    static _mounted: boolean;
    static _imageParamsKeyMap: {
        [key: string]: string;
    } | undefined;
    /**
     * Registers a new initializer. If the initializers have already been mounted,it immediately binds the event listeners and initializes the API for the new initializer.
     * @param initializer - The initializer to register.
     * @param options - Optional configuration for the initializer.
     */
    static register(initializer: Initializer<any>, options?: {
        [key: string]: any;
    }): void;
    /**
     * Mounts the provided initializer immediately. This involves binding the event listeners and initializing the API for the initializer.
     */
    static mountImmediately(initializer: Initializer<any>, options?: {
        [key: string]: any;
    }): Promise<void>;
    /**
     * Mounts all registered initializers. This involves binding the event listeners and initializing the APIs for each initializer, in that order.
     */
    static mount(): void;
    /**
     * Sets the image parameter keys. These keys are used when initializing the APIs for the initializers.
     * @param params - The image parameter keys.
     */
    static setImageParamKeys(params: {
        [key: string]: any;
    }): void;
}
export {};
//# sourceMappingURL=initializer.d.ts.map