import { OrderDataModel } from '../data/models';
import { UserInputErrorProps } from '.';

export interface ReorderProps {
    orderData?: OrderDataModel;
    routeOnSuccess?: () => string;
    onError?: (errorInformation: UserInputErrorProps[] | string) => void;
}
//# sourceMappingURL=reorder.types.d.ts.map