import { FunctionComponent, JSX } from 'preact';

type BaseProps = {
    href?: string;
    type?: 'button';
    disabled?: boolean;
};
export type PaginationButtonProps = BaseProps & (Omit<JSX.HTMLAttributes<HTMLAnchorElement>, 'type'> | Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'href'>);
export declare const PaginationButton: FunctionComponent<PaginationButtonProps>;
export {};
//# sourceMappingURL=PaginationButton.d.ts.map