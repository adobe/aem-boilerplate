"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormInputs = void 0;
const lib_1 = require("@adobe/elsie/lib");
const compat_1 = require("preact/compat");
const icons_1 = require("@adobe/elsie/icons");
const components_1 = require("@adobe/elsie/components");
exports.FormInputs = (0, compat_1.memo)(({ loading, values, fields = [], errors, className = '', onChange, onBlur, }) => {
    const itemClassName = `${className}__item`;
    const selectElement = (0, compat_1.useCallback)((item, valueMessage, errorMessage) => {
        const pickerOptions = item.options.map((option) => {
            return { text: option.label, value: option.value };
        });
        return (<components_1.Field key={item.id} error={errorMessage} className={(0, lib_1.classes)([
                itemClassName,
                `${itemClassName}--${item.id}`,
                [`${itemClassName}--${item.id}-hidden`, item.is_hidden],
                item.className,
            ])} data-testid={`${className}--${item.id}`} disabled={loading}>
            <components_1.Picker name={item.id} floatingLabel={`${item.label} ${item.required ? '*' : ''}`} placeholder={item.label} aria-label={item.label} options={pickerOptions} onBlur={onBlur} handleSelect={onChange} value={valueMessage || item.defaultValue}/>
          </components_1.Field>);
    }, [className, loading, itemClassName, onBlur, onChange]);
    const inputElement = (0, compat_1.useCallback)((item, valueMessage, errorMessage) => {
        const isEmail = item.id === 'email';
        const icon = isEmail ? <icons_1.User /> : undefined;
        const autoComplete = isEmail ? 'username' : '';
        return (<components_1.Field key={item.id} error={errorMessage} className={(0, lib_1.classes)([
                itemClassName,
                `${itemClassName}--${item.id}`,
                [`${itemClassName}--${item.id}-hidden`, item?.is_hidden],
                item.className,
            ])} data-testid={`${className}--${item.id}`} disabled={loading}>
            <components_1.Input aria-label={item.label} aria-required={item.required} autoComplete={autoComplete} icon={icon} type="text" name={item.id} value={valueMessage || item.defaultValue} placeholder={item.label} floatingLabel={`${item.label} ${item.required ? '*' : ''}`} onBlur={onBlur} onChange={onChange}/>
          </components_1.Field>);
    }, [className, loading, itemClassName, onBlur, onChange]);
    const inputDateElement = (0, compat_1.useCallback)((item, valueMessage, errorMessage) => {
        return (<components_1.Field key={item.id} error={errorMessage} className={(0, lib_1.classes)([
                itemClassName,
                `${itemClassName}--${item.id}`,
                [`${itemClassName}--${item.id}-hidden`, item.is_hidden],
                item.className,
            ])} data-testid={`${className}--${item.id}`} disabled={loading}>
            <components_1.InputDate type="text" name={item.id} value={valueMessage || item.defaultValue} placeholder={item.label} floatingLabel={`${item.label} ${item.required ? '*' : ''}`} onBlur={onBlur} onChange={onChange}/>
          </components_1.Field>);
    }, [className, loading, itemClassName, onBlur, onChange]);
    const inputCheckBoxElement = (0, compat_1.useCallback)((item, valueMessage, errorMessage) => {
        return (<components_1.Field key={item.id} error={errorMessage} className={(0, lib_1.classes)([
                itemClassName,
                `${itemClassName}--${item.id}`,
                [`${itemClassName}--${item.id}-hidden`, item.is_hidden],
                item.className,
            ])} data-testid={`${className}--${item.id}`} disabled={loading}>
            <components_1.Checkbox name={item.id} checked={valueMessage || item.defaultValue} placeholder={item.label} label={`${item.label} ${item.required ? '*' : ''}`} onBlur={onBlur} onChange={onChange}/>
          </components_1.Field>);
    }, [className, loading, itemClassName, onBlur, onChange]);
    const textAreaElement = (0, compat_1.useCallback)((item, valueMessage, errorMessage) => {
        return (<components_1.Field key={item.id} error={errorMessage} className={(0, lib_1.classes)([
                itemClassName,
                `${itemClassName}--${item.id}`,
                [`${itemClassName}--${item.id}-hidden`, item.is_hidden],
                item.className,
            ])} data-testid={`${className}--${item.id}`} disabled={loading}>
            <components_1.TextArea type="text" name={item.id} value={valueMessage === undefined ? item.defaultValue : valueMessage} label={`${item.label} ${item.required ? '*' : ''}`} onBlur={onBlur} onChange={onChange}/>
          </components_1.Field>);
    }, [className, loading, itemClassName, onBlur, onChange]);
    if (!fields.length)
        return null;
    return (<>
        {fields.map((item) => {
            const errorMessage = errors?.[item.id] ?? '';
            const valueMessage = values?.[item.id] ?? '';
            switch (item.fieldType) {
                case 'TEXT': {
                    if (item?.options?.length) {
                        return selectElement(item, valueMessage, errorMessage);
                    }
                    return inputElement(item, valueMessage, errorMessage);
                }
                case 'MULTILINE': {
                    return inputElement(item, valueMessage, errorMessage);
                }
                case 'SELECT': {
                    return selectElement(item, valueMessage, errorMessage);
                }
                case 'DATE': {
                    return inputDateElement(item, valueMessage, errorMessage);
                }
                case 'BOOLEAN': {
                    return inputCheckBoxElement(item, valueMessage, errorMessage);
                }
                case 'TEXTAREA': {
                    return textAreaElement(item, valueMessage, errorMessage);
                }
                default:
                    return null;
            }
        })}
      </>);
});
