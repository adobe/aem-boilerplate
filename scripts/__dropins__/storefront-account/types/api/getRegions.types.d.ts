export interface RegionsFormResponse {
    data: {
        country: {
            id: string;
            available_regions: {
                id: number;
                code: string;
                name: string;
            }[];
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getRegions.types.d.ts.map