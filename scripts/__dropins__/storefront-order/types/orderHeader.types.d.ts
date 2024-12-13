import { OrderDataModel } from '../data/models';

export interface SignUpContext {
    inputsDefaultValueSet: DefaultValues;
    addressesData: any[];
}
type DefaultValues = {
    code: string;
    defaultValue: string;
}[];
export interface OrderHeaderProps {
    handleEmailAvailability?: (email: string) => Promise<boolean>;
    handleSignUpClick?: (ctx: SignUpContext) => void;
    orderData?: OrderDataModel;
}
export interface UseOrderHeaderProps extends OrderHeaderProps {
}
export {};
//# sourceMappingURL=orderHeader.types.d.ts.map