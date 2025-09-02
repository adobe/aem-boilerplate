import { VNode } from 'preact';
import { Container } from '.';
import { Signal } from './signals';

export declare const SlotQueueContext: import('preact').Context<Signal<Set<string>> | null>;
type RenderAPI = {
    remove: () => void;
    setProps: (cb: (prev: any) => any) => void;
};
/**
 * The `Render` class provides methods to render and unmount components, as well as to render components to a string.
 * @class
 *
 * @property {Function} render - Renders a component to a root element.
 * @property {Function} toString - Renders a component to a string.
 */
export declare class Render {
    private _provider;
    constructor(provider: VNode<any>);
    /**
     * Renders a container to a root element.
     * @param Container - The container to render.
     * @param props - The container parameters.
     * @returns A function to render the component to a root element.
     */
    render<T>(Component: Container<T>, props: T): (rootElement: HTMLElement) => Promise<RenderAPI>;
    /**
     * Unmounts a container from a root element.
     * @param rootElement - The root element to unmount the container from.
     */
    static unmount(rootElement: HTMLElement): void;
    /**
     * UnRenders a component from a root element.
     * @param rootElement - The root element to unmount the component from.
     * @deprecated Use `remove` method from the returned object of the `mount` method instead or `unmount` method from the `Render` class.
     */
    unmount(rootElement: HTMLElement): void;
    /**
     * Renders a component to a string.
     * @param Component - The component to render.
     * @param props - The component props.
     * @param options - Optional rendering options.
     */
    toString<T>(Component: Container<T>, props: T, options?: T): Promise<string>;
}
export {};
//# sourceMappingURL=render.d.ts.map