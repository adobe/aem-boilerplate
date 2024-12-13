import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { OrderDataModel, OrdersReturnPropsModel } from '../data/models';
import { IconNode, IconType } from '@dropins/tools/types/elsie/src/components';

export interface KeysSortOrderProps {
    name: string;
    orderNumber?: number;
    label?: string | null;
}
export interface NormalizeAddressProps extends KeysSortOrderProps {
    name: string;
    orderNumber: number;
    value?: string | string[];
    label?: string | null;
}
export interface CustomerDetailsProps {
    className?: string;
    paymentIconsMap?: Record<string, IconType | IconNode>;
    orderData?: OrderDataModel;
    withHeader?: boolean;
    title?: string;
    slots?: {
        OrderReturnInformation: SlotProps<OrdersReturnPropsModel | undefined>;
        PaymentMethodIcon: SlotProps<Record<string, string>>;
    };
}
export interface UseCustomerDetails {
    orderData?: OrderDataModel;
}
export interface CustomerDetailsContentProps extends Omit<CustomerDetailsProps, 'orderData' | 'className'> {
    translations: Record<string, string>;
    loading: boolean;
    order?: OrderDataModel;
    normalizeAddress: {
        billingAddress: NormalizeAddressProps[][];
        shippingAddress: NormalizeAddressProps[][];
    };
}
export interface CustomerAddressesModel {
    firstname?: string;
    lastname?: string;
    city?: string;
    company?: string;
    countryCode?: string;
    region?: {
        region: string;
        regionCode: string;
        regionId: string | number;
    };
    telephone?: string;
    id?: string;
    vatId?: string;
    postcode?: string;
    street?: string;
    street_2?: string;
    defaultShipping?: boolean;
    defaultBilling?: boolean;
}
//# sourceMappingURL=customerDetails.types.d.ts.map