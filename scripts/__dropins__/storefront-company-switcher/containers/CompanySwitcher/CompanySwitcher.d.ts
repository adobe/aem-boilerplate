import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';

export interface CompanySwitcherProps extends HTMLAttributes<HTMLDivElement> {
    /** Custom aria-label for the picker */
    ariaLabel?: string;
}
/**
 * CompanySwitcher component allows users to switch between companies they have access to.
 * It only renders when a user has access to multiple companies.
 * This is a presentational component that uses the useCompanyData hook for all business logic.
 */
export declare const CompanySwitcher: Container<CompanySwitcherProps>;
//# sourceMappingURL=CompanySwitcher.d.ts.map