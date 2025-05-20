import { Item } from '../../data/models';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { GiftOptionsViewProps, GiftOptionsDataSourcesProps, GiftFormDataType, ProductGiftOptionsConfig, GiftOptionsReadOnlyViewProps } from '../../types';
import { ImageNodeRenderProps, ImageProps } from '@dropins/tools/types/elsie/src/components';

export interface GiftOptionsProps {
    item: Item | ProductGiftOptionsConfig;
    view?: GiftOptionsViewProps;
    readOnlyFormOrderView: GiftOptionsReadOnlyViewProps;
    dataSource?: GiftOptionsDataSourcesProps;
    isEditable?: boolean;
    initialLoading?: boolean;
    handleItemsLoading?: (uid: string, state: boolean) => void;
    handleItemsError?: (uid: string, message?: string) => void;
    onItemUpdate?: ({ item }: {
        item: Item;
    }) => void;
    onGiftOptionsChange?: (data: GiftFormDataType) => void;
    slots?: {
        SwatchImage?: SlotProps<{
            item: Item | ProductGiftOptionsConfig;
            imageSwatchContext: ImageNodeRenderProps['imageSwatchContext'];
            defaultImageProps: ImageProps;
        }>;
    };
}
export declare const GiftOptions: Container<GiftOptionsProps>;
//# sourceMappingURL=GiftOptions.d.ts.map