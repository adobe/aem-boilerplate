export type AttributeMetadata = {
    attribute: string;
    label: string;
    numeric: boolean;
};
export interface AttributeMetadataResponse {
    attributeMetadata: {
        sortable: AttributeMetadata[];
        filterableInSearch: AttributeMetadata[];
    };
}
//# sourceMappingURL=attributeMetadata.d.ts.map