"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const useForm_1 = require("@/order/hooks/components/useForm");
const FormInputs_1 = __importDefault(require("./FormInputs"));
const compat_1 = require("preact/compat");
const lib_1 = require("@adobe/elsie/lib");
exports.Form = (0, compat_1.memo)(({ name, loading, children, className = 'defaultForm', fieldsConfig, onSubmit, }) => {
    const { formData, errors, formRef, handleChange, handleBlur, handleSubmit, } = (0, useForm_1.useForm)({
        fieldsConfig,
        onSubmit,
    });
    return (<form className={(0, lib_1.classes)(['order-form', className])} onSubmit={handleSubmit} name={name} ref={formRef}>
        <FormInputs_1.default className={className} loading={loading} fields={fieldsConfig} onChange={handleChange} onBlur={handleBlur} errors={errors} values={formData}/>
        {children}
      </form>);
});
