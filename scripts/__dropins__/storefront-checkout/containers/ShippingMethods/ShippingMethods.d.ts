import { ShippingMethod } from '../../data/models';
import { TitleProps } from '../../types/TitleProps';
import { Container } from '../../../@adobe-commerce/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';
import { UIComponentType } from '../../types/ComponentTypes';

export interface ShippingMethodsProps extends HTMLAttributes<HTMLDivElement>, TitleProps {
    onShippingMethodSelect?: (method: ShippingMethod) => void;
    preSelectedMethod?: {
        carrierCode: string;
        methodCode: string;
    };
    UIComponentType?: UIComponentType;
}
export declare const ShippingMethods: Container<ShippingMethodsProps>;
//# sourceMappingURL=ShippingMethods.d.ts.map