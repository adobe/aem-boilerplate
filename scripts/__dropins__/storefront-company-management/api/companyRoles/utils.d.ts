import { CompanyAclResourceModel } from '../../data/models/company-role';

/**
 * Helper function to flatten ACL resources into a list of permission IDs
 */
export declare const flattenPermissionIds: (resources: CompanyAclResourceModel[]) => string[];
/**
 * Helper function to build a permission tree from flat permission IDs
 */
export declare const buildPermissionTree: (allResources: CompanyAclResourceModel[], selectedIds: string[]) => CompanyAclResourceModel[];
//# sourceMappingURL=utils.d.ts.map