import { FunctionComponent } from 'preact';
import { GiftWrappingConfigProps, GiftOptionsViewProps } from '../../../types';

interface GiftOptionModalProps {
    giftWrappingConfig: GiftWrappingConfigProps[];
    showModal: boolean;
    productName: string;
    view: GiftOptionsViewProps;
    setShowModal: () => void;
    updateGiftOptions: (name: string, value?: string | boolean | number, extraGiftOptions?: Record<string, string | boolean | number>) => void;
}
export declare const GiftOptionModal: FunctionComponent<GiftOptionModalProps>;
export {};
//# sourceMappingURL=GiftOptionModal.d.ts.map