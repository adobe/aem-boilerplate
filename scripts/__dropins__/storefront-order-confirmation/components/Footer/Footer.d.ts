import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    routeHome?: () => string;
    routeSupport?: () => string;
}
export declare const Footer: FunctionComponent<FooterProps>;
//# sourceMappingURL=Footer.d.ts.map