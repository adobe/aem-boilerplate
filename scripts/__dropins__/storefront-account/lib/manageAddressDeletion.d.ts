import { CustomerAddressesModel } from '../data/models';

/**

Manages the deletion of an address from a list. If the address is the last one in the list, it removes any default properties before deletion. If the address is not the last, it ensures that no default properties are set on the item, transfers them if necessary to another address, and then deletes the address.

*/
export declare const manageAddressDeletion: (removeId: string, addressesList: CustomerAddressesModel[]) => Promise<boolean>;
//# sourceMappingURL=manageAddressDeletion.d.ts.map