import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ActionsBarProps extends HTMLAttributes<HTMLDivElement> {
    dropdownPlaceholder?: string;
    dropdownOptions?: {
        label: string;
        value: string;
    }[];
    dropdownValue?: string;
    handleDropdownChange?: (event: Event) => void;
    buttons?: VNode[];
}
export declare const ActionsBar: FunctionComponent<ActionsBarProps>;
//# sourceMappingURL=ActionsBar.d.ts.map