import { OrderDataModel } from '../../data/models';
import { UseOrderHeaderProps } from '../../types';

export declare const useOrderHeader: ({ orderData, handleEmailAvailability, handleSignUpClick, }: UseOrderHeaderProps) => {
    order: OrderDataModel | undefined;
    onSignUpClickHandler: (() => void) | undefined;
};
//# sourceMappingURL=useOrderHeader.d.ts.map