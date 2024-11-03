"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormValues = void 0;
const getFormValues = (form) => {
    if (!form)
        return null;
    const formData = new FormData(form);
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        if (!formData.has(checkbox.name)) {
            formData.set(checkbox.name, 'false');
        }
        if (checkbox.checked) {
            formData.set(checkbox.name, 'true');
        }
    });
    if (formData && typeof formData.entries === 'function') {
        const entries = formData.entries();
        if (entries && typeof entries[Symbol.iterator] === 'function') {
            return JSON.parse(JSON.stringify(Object.fromEntries(entries))) || {};
        }
    }
    return {};
};
exports.getFormValues = getFormValues;
