import { Lang } from '../i18n';
import { ComponentChildren, RefObject, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { StateUpdater } from 'preact/hooks';

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
    remove: () => void;
}
interface PrivateContext<T> {
    _setProps: (s: StateUpdater<{}>) => void;
    _registerMethod: (cb: (next: T & DefaultSlotContext<T>, state: State) => void) => void;
    _htmlElementToVNode: (element: HTMLElement, tag: keyof HTMLElementTagNameMap) => VNode;
}
interface DefaultSlotContext<T> extends PrivateContext<T> {
    dictionary: Lang;
    getSlotElement: (key: string) => SlotElement;
    replaceWith: MutateElement;
    appendChild: MutateElement;
    prependChild: MutateElement;
    appendSibling: MutateElement;
    prependSibling: MutateElement;
    remove: () => void;
    onRender: (cb: (next: T & DefaultSlotContext<T>) => void) => void;
    onChange: (cb: (next: T & DefaultSlotContext<T>) => void) => void;
}
type Context<T> = T & ThisType<DefaultSlotContext<T>>;
export type SlotProps<T = any> = (ctx: T & DefaultSlotContext<T>, element: HTMLDivElement | null) => Promise<void> | void;
export type SlotMethod<P = any> = (callback: (next: unknown, state: State) => P) => void;
export declare function useSlot<K, V extends HTMLElement>(name: string, context?: Context<K>, callback?: SlotProps<K>, children?: ComponentChildren, render?: Function, contentTag?: keyof HTMLElementTagNameMap): [RefObject<V>, Record<string, any>, 'loading' | 'pending' | 'ready'];
interface SlotPropsComponent<T> extends Omit<HTMLAttributes<HTMLElement>, 'slot'> {
    name: string;
    lazy?: boolean;
    slot?: SlotProps<T>;
    context?: Context<T>;
    render?: (props: Record<string, any>) => VNode | VNode[];
    slotTag?: keyof HTMLElementTagNameMap;
    contentTag?: keyof HTMLElementTagNameMap;
    children?: ComponentChildren;
}
export declare function Slot<T>({ name, lazy, context, slot, children, render, slotTag, contentTag, ...props }: Readonly<SlotPropsComponent<T>>): VNode<{
    ref: RefObject<HTMLElement>;
    'data-slot': string;
    [key: string]: any;
}>;
export {};
//# sourceMappingURL=slot.d.ts.map