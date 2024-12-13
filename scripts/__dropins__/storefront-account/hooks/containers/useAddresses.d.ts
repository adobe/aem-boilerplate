import { CustomerAddressesModel } from '../../data/models';
import { KeysSortOrderProps, useAddressesProps } from '../../types';

export declare const useAddresses: ({ selectShipping, selectBilling, defaultSelectAddressId, onAddressData, minifiedView, routeAddressesPage, onSuccess, }: useAddressesProps) => {
    keysSortOrder: [] | KeysSortOrderProps[];
    submitLoading: boolean;
    isModalRendered: boolean;
    isFormRendered: boolean;
    loading: boolean;
    addNewAddress: boolean;
    addressesList: CustomerAddressesModel[];
    addressId: string;
    handleRenderForm: () => void;
    handleRenderModal: () => void;
    removeAddress: () => Promise<void>;
    onCloseBtnClick: () => void;
    setEditingAddressId: (id: string) => void;
    closeNewAddressForm: () => void;
    redirectToAddressesRoute: () => void;
    handleOnSuccess: () => Promise<void>;
    handleSelectAddressOption: (event: Event, item?: {} | CustomerAddressesModel | undefined) => void;
    selectedAddressOption: string;
};
//# sourceMappingURL=useAddresses.d.ts.map