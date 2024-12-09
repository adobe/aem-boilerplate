import { OrderDataModel } from '../../data/models';
import { ReturnProps } from './requestReturn.types';

interface ErrorsProps {
    message: string;
}
export interface GuestConfirmReturnResponse {
    data: {
        confirmReturn: {
            return: ReturnProps & {
                order: OrderDataModel;
            };
        };
    };
    errors?: ErrorsProps[];
}
export {};
//# sourceMappingURL=confirmGuestReturn.types.d.ts.map