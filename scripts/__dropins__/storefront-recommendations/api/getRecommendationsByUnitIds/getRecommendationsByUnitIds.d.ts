import { RecommendationUnitModel } from '../../data/models';

export interface GetRecommendationsByUnitIdsProps {
    currentSku?: string;
    cartSkus?: string[];
    userPurchaseHistory?: any[];
    userViewHistory?: any[];
    unitIds: string[];
}
export declare const getRecommendationsByUnitIds: (params: GetRecommendationsByUnitIdsProps) => Promise<RecommendationUnitModel[] | null>;
//# sourceMappingURL=getRecommendationsByUnitIds.d.ts.map