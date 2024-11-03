"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const FormInputs_1 = require("@/order/components/Form/FormInputs/FormInputs");
const tests_1 = require("@adobe/elsie/lib/tests");
require("@testing-library/jest-dom");
describe('[ORDER-FORM-INPUTS] - FormInputs', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('renders', () => {
        const { container } = (0, tests_1.render)(<FormInputs_1.FormInputs />);
        expect(!!container).toEqual(true);
    });
    test('renders EmailField for email fieldType', () => {
        const fields = [
            {
                id: 'email',
                default_value: '',
                entityType: 'CUSTOMER',
                className: '',
                fieldType: 'TEXT',
                label: 'Email',
                required: true,
                options: [],
            },
        ];
        (0, tests_1.render)(<FormInputs_1.FormInputs fields={fields} className="test" onChange={onChange} onBlur={onBlur} values={undefined}/>);
        const emailField = tests_1.screen.getByPlaceholderText('Email');
        expect(emailField).toHaveAttribute('placeholder', 'Email');
        expect(emailField.value).toBe('');
        expect(tests_1.screen.getByText('Email *')).toBeInTheDocument();
    });
    test('renders SelectField for SELECT fieldType', () => {
        const fields = [
            {
                fieldType: 'SELECT',
                entityType: 'CUSTOMER',
                id: 'country',
                label: 'Country',
                required: true,
                options: [{ value: 'us', label: 'Country', is_default: false }],
            },
        ];
        (0, tests_1.render)(<FormInputs_1.FormInputs fields={fields}/>);
        expect(tests_1.screen.getByText('Country *')).toBeInTheDocument();
    });
    test('renders CheckboxField for BOOLEAN fieldType', () => {
        const handleOnChange = jest.fn();
        const handleOnBlur = jest.fn();
        const fields = [
            {
                fieldType: 'BOOLEAN',
                id: 'acceptTerms',
                label: 'Accept Terms',
                required: false,
            },
        ];
        (0, tests_1.render)(<FormInputs_1.FormInputs fields={fields} onChange={handleOnChange} onBlur={handleOnBlur}/>);
        expect(tests_1.screen.getByText('Accept Terms')).toBeInTheDocument();
    });
    test('renders CheckboxField for BOOLEAN fieldType is required', () => {
        const handleOnChange = jest.fn();
        const handleOnBlur = jest.fn();
        const fields = [
            {
                fieldType: 'BOOLEAN',
                id: 'acceptTerms',
                label: 'Accept Terms',
                required: true,
            },
        ];
        (0, tests_1.render)(<FormInputs_1.FormInputs fields={fields} onChange={handleOnChange} onBlur={handleOnBlur}/>);
        expect(tests_1.screen.getByText('Accept Terms *')).toBeInTheDocument();
    });
    test('renders MULTILINE fieldType', () => {
        const fields = [
            {
                fieldType: 'MULTILINE',
                entityType: 'CUSTOMER',
                id: 'street',
                label: 'Street',
                options: ['one', 'two'],
            },
        ];
        (0, tests_1.render)(<FormInputs_1.FormInputs fields={fields}/>);
        expect(tests_1.screen.getByLabelText('Street')).toBeInTheDocument();
    });
    test('replace input text => select if item have options list', () => {
        const fields = [
            {
                fieldType: 'TEXT',
                entityType: 'CUSTOMER',
                id: 'country',
                label: 'Country',
                required: false,
                options: [{ value: 'us', label: 'Country', is_default: false }],
            },
        ];
        (0, tests_1.render)(<FormInputs_1.FormInputs fields={fields}/>);
        expect(tests_1.screen.getByLabelText('Country')).toBeInTheDocument();
    });
    test('should not render label if fieldType is empty or unknown', () => {
        const handleOnChange = jest.fn();
        const handleOnBlur = jest.fn();
        const fields = [{ fieldType: '', id: 'test', label: 'Accept Terms' }];
        (0, tests_1.render)(<FormInputs_1.FormInputs fields={fields} onChange={handleOnChange} onBlur={handleOnBlur}/>);
        expect(tests_1.screen.queryByText('Accept Terms')).not.toBeInTheDocument();
    });
    test('renders DATE fieldType required', () => {
        const fields = [
            {
                fieldType: 'DATE',
                entityType: 'CUSTOMER',
                id: 'date',
                code: 'date',
                label: 'Date',
                name: 'date',
                required: true,
                defaultValue: '',
                options: [],
            },
        ];
        (0, tests_1.render)(<FormInputs_1.FormInputs fields={fields}/>);
        expect(tests_1.screen.getByLabelText('Date *')).toBeInTheDocument();
    });
    test('renders DATE fieldType not required', () => {
        const fields = [
            {
                fieldType: 'DATE',
                entityType: 'CUSTOMER',
                id: 'date',
                code: 'date',
                label: 'Date',
                name: 'date',
                required: false,
                defaultValue: '',
                options: [],
            },
        ];
        (0, tests_1.render)(<FormInputs_1.FormInputs fields={fields}/>);
        expect(tests_1.screen.getByLabelText('Date')).toBeInTheDocument();
    });
    test('renders TEXTAREA fieldType not required', () => {
        const fields = [
            {
                fieldType: 'TEXTAREA',
                entityType: 'CUSTOMER',
                id: 'textarea',
                code: 'textarea',
                label: 'Textarea',
                name: 'textarea',
                required: false,
                defaultValue: '',
                options: [],
            },
        ];
        (0, tests_1.render)(<FormInputs_1.FormInputs fields={fields}/>);
        expect(tests_1.screen.getByLabelText('Textarea')).toBeInTheDocument();
    });
});
