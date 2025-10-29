import { FormRef } from '../../types';
import { RefObject } from 'preact';

type HTMLForm = {
    name: string;
    ref?: RefObject<FormRef>;
};
export declare function validateForm(form: HTMLForm, autoScrollOnError?: boolean): boolean;
export declare function validateForms(forms: HTMLForm[]): boolean;
export {};
//# sourceMappingURL=forms.d.ts.map