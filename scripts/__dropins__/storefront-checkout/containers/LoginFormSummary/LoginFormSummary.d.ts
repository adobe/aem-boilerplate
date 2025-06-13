import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface LoginFormSummaryProps extends HTMLAttributes<HTMLDivElement> {
    onEditClick?: () => void;
    slots?: {
        Heading: SlotProps;
    };
}
export interface LoginFormSummaryData {
    email: string;
}
export declare const LoginFormSummary: Container<LoginFormSummaryProps, LoginFormSummaryData>;
//# sourceMappingURL=LoginFormSummary.d.ts.map