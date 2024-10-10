import { ComponentChildren, RefObject, VNode } from 'preact';
import { StateUpdater } from 'preact/hooks';
import { Lang } from '../i18n';
import { HTMLAttributes } from 'preact/compat';

type MutateElement = (elem: HTMLElement) => void;
interface State {
    get: (key: string) => void;
    set: (key: string, value: any) => void;
}
interface SlotElement {
    appendChild: MutateElement;
    prependChild: MutateElement;
    appendSibling: MutateElement;
    prependSibling: MutateElement;
}
interface PrivateContext<T> {
    _setProps: (s: StateUpdater<{}>) => void;
    _registerMethod: (cb: (next: T & DefaultSlotContext<T>, state: State) => void) => void;
    _htmlElementToVNode: (element: HTMLElement) => VNode;
}
interface DefaultSlotContext<T> extends PrivateContext<T> {
    dictionary: Lang;
    getSlotElement: (key: string) => SlotElement;
    replaceWith: MutateElement;
    appendChild: MutateElement;
    prependChild: MutateElement;
    appendSibling: MutateElement;
    prependSibling: MutateElement;
    onRender: (cb: (next: T & DefaultSlotContext<T>) => void) => void;
    onChange: (cb: (next: T & DefaultSlotContext<T>) => void) => void;
}
type Context<T> = T & ThisType<DefaultSlotContext<T>>;
export type SlotProps<T = any> = (ctx: T & DefaultSlotContext<T>, element: HTMLDivElement | null) => Promise<void> | void;
export type SlotMethod<P = any> = (callback: (next: unknown, state: State) => P) => void;
export declare function useSlot<K, V extends HTMLDivElement>(name: string, context?: Context<K>, callback?: SlotProps<K>, children?: ComponentChildren, render?: Function): [RefObject<V>, Record<string, any>];
interface SlotPropsComponent<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'slot'> {
    name: string;
    slot?: SlotProps<T>;
    context?: Context<T>;
    render?: (props: Record<string, any>) => VNode | VNode[];
}
export declare function Slot<T>({ name, context, slot, children, render, ...props }: Readonly<SlotPropsComponent<T>>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=slot.d.ts.map