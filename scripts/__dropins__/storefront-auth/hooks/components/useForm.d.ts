import { useFormProps } from '../../types';

export declare const useForm: ({ fieldsConfig, onSubmit }: useFormProps) => {
    formData: Record<string, string | number | boolean>;
    errors: Record<string, string>;
    formRef: import('preact').RefObject<HTMLFormElement>;
    handleChange: (event: Event) => void;
    handleBlur: (event: Event) => void;
    handleSubmit: (event: SubmitEvent) => void;
    handleFocus: (event: FocusEvent) => Promise<void>;
};
//# sourceMappingURL=useForm.d.ts.map