import { FormValues, useFormProps } from '../../types';

export declare const useForm: ({ fieldsConfig, onSubmit }: useFormProps) => {
    formData: FormValues;
    errors: Record<string, string>;
    formRef: import('preact').RefObject<HTMLFormElement>;
    handleChange: (event: Event) => void;
    handleBlur: (event: Event) => void;
    handleSubmit: (event: SubmitEvent) => void;
};
//# sourceMappingURL=useForm.d.ts.map