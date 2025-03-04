import { FunctionComponent } from 'preact';
import { GiftFormDataType, GiftWrappingConfigProps, GiftOptionsReadOnlyViewProps, GiftOptionsViewProps } from '../../../types';

export interface ReadOnlyFormViewProps {
    view: GiftOptionsViewProps;
    giftOptions: GiftFormDataType;
    readOnlyFormOrderView: GiftOptionsReadOnlyViewProps;
    giftWrappingConfig: GiftWrappingConfigProps[] | [];
}
export declare const ReadOnlyFormView: FunctionComponent<ReadOnlyFormViewProps>;
//# sourceMappingURL=ReadOnlyFormView.d.ts.map