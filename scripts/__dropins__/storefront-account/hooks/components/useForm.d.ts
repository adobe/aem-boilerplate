import { useFormProps } from '../../types';

export declare const useForm: ({ fieldsConfig, onSubmit, onChange, setInputChange, formName, }: useFormProps) => {
    formData: Record<string, string | number>;
    errors: Record<string, string>;
    formRef: import('preact').RefObject<HTMLFormElement>;
    handleInputChange: (event: Event) => void;
    onFocus: (event: Event) => void;
    handleBlur: (event: Event) => void;
    handleSubmit: (event: SubmitEvent) => void;
    handleValidationSubmit: (disableShowError?: boolean) => boolean;
};
//# sourceMappingURL=useForm.d.ts.map