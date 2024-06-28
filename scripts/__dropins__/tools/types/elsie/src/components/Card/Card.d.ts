import { ComponentChildren, FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary';
    children: ComponentChildren | ComponentChildren[];
}
export declare const Card: FunctionComponent<CardProps>;
//# sourceMappingURL=Card.d.ts.map