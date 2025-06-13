import { RecommendationUnitModel } from '../../data/models';

export interface GetRecommendationsProps {
    currentSku?: string;
    pageType: string;
    cartSkus?: string[];
    userPurchaseHistory?: any[];
    userViewHistory?: any[];
}
export declare const getRecommendations: (params: GetRecommendationsProps) => Promise<RecommendationUnitModel | null>;
//# sourceMappingURL=getRecommendations.d.ts.map