import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

type statusTypes = '' | 'success' | 'error' | 'pending';
export interface ValidateLengthConfigProps {
    status?: statusTypes;
    icon?: statusTypes;
    message?: string;
}
export interface PasswordStatusIndicatorProps {
    validateLengthConfig?: ValidateLengthConfigProps;
    uniqueSymbolsStatus?: statusTypes;
    minLength?: number;
    requiredCharacterClasses?: number;
}
export declare const PasswordStatusIndicator: FunctionComponent<PasswordStatusIndicatorProps & HTMLAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=PasswordStatusIndicator.d.ts.map