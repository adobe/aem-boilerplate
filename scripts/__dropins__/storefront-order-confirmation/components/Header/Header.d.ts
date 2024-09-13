import { FunctionComponent } from 'preact';

export interface HeaderProps {
    isLoading: boolean;
    customerName?: string;
    orderNumber?: string;
    orderStatus?: string;
    onSignUpClick?: () => void;
}
export declare const Header: FunctionComponent<HeaderProps>;
//# sourceMappingURL=Header.d.ts.map