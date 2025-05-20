import { FunctionComponent, JSX, VNode } from 'preact';
import { ImageNodeRenderProps } from '@dropins/tools/types/elsie/src/components';
import { GiftWrappingConfigProps, GiftOptionsViewProps } from '../../../types';

interface GiftOptionModalProps {
    giftWrappingConfig: GiftWrappingConfigProps[];
    showModal: boolean;
    productName: string;
    view: GiftOptionsViewProps;
    imageSwatchImageNode?: VNode | ((props: ImageNodeRenderProps) => JSX.Element);
    setShowModal: () => void;
    updateGiftOptions: (name: string, value?: string | boolean | number, extraGiftOptions?: Record<string, string | boolean | number>) => void;
}
export declare const GiftOptionModal: FunctionComponent<GiftOptionModalProps>;
export {};
//# sourceMappingURL=GiftOptionModal.d.ts.map