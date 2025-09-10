import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Option, OptionField } from '../../data/models/values-model';

export interface GiftCardOptionsProps extends HTMLAttributes<HTMLDivElement> {
    options: Option[];
    currency?: string;
    optionValues: OptionField[];
    onOptionChange: (uid: string, value: string) => void;
    onValidationChange: (valid: boolean) => void;
}
export declare const GiftCardOptions: FunctionComponent<GiftCardOptionsProps>;
//# sourceMappingURL=GiftCardOptions.d.ts.map