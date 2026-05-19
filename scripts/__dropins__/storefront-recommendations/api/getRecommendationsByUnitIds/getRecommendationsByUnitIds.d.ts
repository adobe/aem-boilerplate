import { RecommendationUnitModel } from '../../data/models';

export interface CurrentProduct {
    sku?: string;
    price?: number;
}
export interface GetRecommendationsByUnitIdsProps {
    currentSku?: string;
    cartSkus?: string[];
    userPurchaseHistory?: any[];
    userViewHistory?: any[];
    unitIds: string[];
    currentProduct?: CurrentProduct;
}
export declare const getRecommendationsByUnitIds: (params: GetRecommendationsByUnitIdsProps) => Promise<RecommendationUnitModel[] | null>;
//# sourceMappingURL=getRecommendationsByUnitIds.d.ts.map