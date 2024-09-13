import { AddressFormElement, AddressFormType } from '../../data/models';

type FieldFactoryProps = {
    addressType: AddressFormType;
    element: AddressFormElement;
};
export declare const createField: ({ addressType, element }: FieldFactoryProps) => import("preact").JSX.Element | null;
export {};
//# sourceMappingURL=fieldFactory.d.ts.map