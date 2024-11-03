"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
const hooks_1 = require("preact/hooks");
const i18n_1 = require("@adobe/elsie/i18n");
const initializeFormData = (fieldsConfig) => {
    return fieldsConfig.reduce((obj, { code, required, defaultValue }) => {
        if (required)
            obj[code] = defaultValue;
        return obj;
    }, {});
};
const useForm = ({ fieldsConfig, onSubmit }) => {
    const { requiredFieldError } = (0, i18n_1.useText)({
        requiredFieldError: 'Order.Form.notifications.requiredFieldError',
    });
    const formRef = (0, hooks_1.useRef)(null);
    const [formData, setFormData] = (0, hooks_1.useState)({});
    const [errors, setErrors] = (0, hooks_1.useState)({});
    (0, hooks_1.useEffect)(() => {
        setFormData({});
        if (!fieldsConfig || !fieldsConfig.length)
            return;
        const initialData = initializeFormData(fieldsConfig);
        setFormData(initialData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldsConfig?.length]);
    (0, hooks_1.useEffect)(() => {
        return () => {
            setFormData({});
            formRef.current?.reset();
        };
    }, []);
    const getRequiredFieldError = (0, hooks_1.useCallback)((name, value) => {
        const error = fieldsConfig.find((el) => el.code === name);
        const renderErrorMessage = error?.required && !value ? requiredFieldError : '';
        return renderErrorMessage;
    }, [fieldsConfig, requiredFieldError]);
    const handleChange = (0, hooks_1.useCallback)((event) => {
        const { name, value, type, checked } = event?.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    }, []);
    const handleBlur = (0, hooks_1.useCallback)((event) => {
        const { name, value, type, checked } = event?.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: getRequiredFieldError(name, fieldValue),
        }));
    }, [getRequiredFieldError]);
    const handleSubmit = (0, hooks_1.useCallback)((event) => {
        event.preventDefault();
        let formValid = true;
        let newErrors = {};
        let firstErrorField = null;
        for (const [name, value] of Object.entries(formData)) {
            const error = getRequiredFieldError(name, value);
            if (error) {
                newErrors[name] = error;
                formValid = false;
                if (!firstErrorField) {
                    firstErrorField = name;
                }
            }
        }
        setErrors(newErrors);
        if (firstErrorField && formRef.current) {
            const input = formRef.current.elements.namedItem(firstErrorField);
            input?.focus();
        }
        onSubmit?.(event, formValid);
    }, [formData, getRequiredFieldError, onSubmit]);
    return {
        formData,
        errors,
        formRef,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};
exports.useForm = useForm;
