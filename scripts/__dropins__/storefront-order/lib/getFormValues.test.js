"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const getFormValues_1 = require("@/order/lib/getFormValues");
describe('[Account-LIB] - getFormValues', () => {
    test('returns null for undefined form', () => {
        const result = (0, getFormValues_1.getFormValues)(undefined);
        expect(result).toBeNull();
    });
    test('returns empty object for form without inputs', () => {
        const form = document.createElement('form');
        const result = (0, getFormValues_1.getFormValues)(form);
        expect(result).toEqual({});
    });
    test('correctly parses form with inputs', () => {
        const form = document.createElement('form');
        const inputName = document.createElement('input');
        inputName.setAttribute('name', 'name');
        inputName.value = 'John Doe';
        form.appendChild(inputName);
        const inputEmail = document.createElement('input');
        inputEmail.setAttribute('name', 'email');
        inputEmail.value = 'john@example.com';
        form.appendChild(inputEmail);
        const result = (0, getFormValues_1.getFormValues)(form);
        expect(result).toEqual({
            name: 'John Doe',
            email: 'john@example.com',
        });
    });
    test('handles form with complex structured names', () => {
        const form = document.createElement('form');
        const inputAddressStreet = document.createElement('input');
        inputAddressStreet.setAttribute('name', 'address[street]');
        inputAddressStreet.value = '123 Example St';
        form.appendChild(inputAddressStreet);
        const inputAddressCity = document.createElement('input');
        inputAddressCity.setAttribute('name', 'address[city]');
        inputAddressCity.value = 'Exampletown';
        form.appendChild(inputAddressCity);
        const result = (0, getFormValues_1.getFormValues)(form);
        expect(result).toEqual({
            'address[street]': '123 Example St',
            'address[city]': 'Exampletown',
        });
    });
    test('handles formData.entries not being a function', () => {
        const form = document.createElement('form');
        const fakeFormData = {
            entries: null,
        };
        const originalFormData = global.FormData;
        // @ts-ignore
        global.FormData = function () {
            return fakeFormData;
        };
        const result = (0, getFormValues_1.getFormValues)(form);
        global.FormData = originalFormData;
        expect(result).toEqual({});
    });
    test('handles formData.entries returning null', () => {
        const form = document.createElement('form');
        const fakeFormData = {
            entries: () => null,
        };
        const originalFormData = global.FormData;
        global.FormData = function () {
            return fakeFormData;
        };
        const result = (0, getFormValues_1.getFormValues)(form);
        global.FormData = originalFormData;
        expect(result).toEqual({});
    });
    test('handles formData.entries returning non-iterable', () => {
        const form = document.createElement('form');
        const fakeFormData = {
            entries: () => ({}),
        };
        const originalFormData = global.FormData;
        global.FormData = function () {
            return fakeFormData;
        };
        const result = (0, getFormValues_1.getFormValues)(form);
        global.FormData = originalFormData;
        expect(result).toEqual({});
    });
    test('handles unchecked checkboxes correctly', () => {
        const form = document.createElement('form');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', 'subscribe');
        form.appendChild(checkbox);
        const result = (0, getFormValues_1.getFormValues)(form);
        expect(result).toEqual({
            subscribe: 'false',
        });
    });
    test('handles checked checkboxes correctly', () => {
        const form = document.createElement('form');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', 'subscribe');
        checkbox.checked = true;
        form.appendChild(checkbox);
        const result = (0, getFormValues_1.getFormValues)(form);
        expect(result).toEqual({
            subscribe: 'true',
        });
    });
    test('handles multiple checkboxes with different states', () => {
        const form = document.createElement('form');
        const checkbox1 = document.createElement('input');
        checkbox1.setAttribute('type', 'checkbox');
        checkbox1.setAttribute('name', 'option1');
        checkbox1.checked = true;
        form.appendChild(checkbox1);
        const checkbox2 = document.createElement('input');
        checkbox2.setAttribute('type', 'checkbox');
        checkbox2.setAttribute('name', 'option2');
        form.appendChild(checkbox2);
        const result = (0, getFormValues_1.getFormValues)(form);
        expect(result).toEqual({
            option1: 'true',
            option2: 'false',
        });
    });
});
