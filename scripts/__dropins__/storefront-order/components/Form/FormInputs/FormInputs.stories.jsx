"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultUse = void 0;
const FormInputs_1 = require("@/order/components/Form/FormInputs");
exports.default = {
    title: 'Components/Custom Form Inputs',
    component: FormInputs_1.FormInputs,
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    args: {
        values: {},
        fields: [],
        errors: {},
        className: 'test-form',
    },
    argTypes: {
        values: {
            control: 'object',
            description: 'Stores form field values.',
        },
        fields: {
            control: 'array',
            description: 'List of form fields.',
        },
        errors: {
            control: 'object',
            description: 'Maps field names to errors.',
        },
        className: {
            control: 'text',
            description: 'CSS class for styling the form.',
        },
        onChange: {
            action: 'clicked',
            defaultValue: () => {
                console.info('onChange');
            },
            description: 'Function called when the value of the input changes. It is used to capture and handle the input data.',
        },
        onBlur: {
            action: 'clicked',
            defaultValue: () => {
                console.info('onBlur');
            },
            description: 'Function called when the input loses focus. This can be used to trigger validation or other effects when the user moves away from the input field.',
        },
    },
};
const mockFields = [
    {
        entityType: 'CUSTOMER_ADDRESS',
        is_unique: false,
        label: 'First Name',
        options: [],
        multiline_count: 0,
        sort_order: 20,
        validate_rules: [],
        defaultValue: '',
        fieldType: 'TEXT',
        className: '',
        required: true,
        orderNumber: 2,
        name: 'firstname',
        id: 'firstname',
        code: 'firstname',
    },
    {
        entityType: 'CUSTOMER_ADDRESS',
        is_unique: false,
        label: 'Text area',
        options: [],
        multiline_count: 0,
        sort_order: 40,
        validate_rules: [],
        defaultValue: '',
        fieldType: 'TEXTAREA',
        className: '',
        required: true,
        orderNumber: 3,
        name: 'lastname',
        id: 'lastname',
        code: 'lastname',
    },
    {
        entityType: 'CUSTOMER_ADDRESS',
        is_unique: false,
        label: 'Country',
        options: [
            {
                value: 'CO',
                label: 'Colombia',
            },
            {
                value: 'CR',
                label: 'Costa Rica',
            },
            {
                value: 'CZ',
                label: 'Czechia',
            },
        ],
        multiline_count: 0,
        sort_order: 80,
        validate_rules: [],
        defaultValue: '',
        fieldType: 'SELECT',
        className: '',
        required: true,
        orderNumber: 10,
        name: 'country_code',
        id: 'country_code',
        code: 'country_code',
    },
    {
        entityType: 'CUSTOMER_ADDRESS',
        is_unique: false,
        label: 'Zip/Postal Code',
        options: [],
        multiline_count: 0,
        sort_order: 110,
        validate_rules: [],
        defaultValue: '',
        fieldType: 'TEXT',
        className: '',
        required: false,
        orderNumber: 10,
        name: 'postcode',
        id: 'postcode',
        code: 'postcode',
    },
    {
        entityType: 'CUSTOMER_ADDRESS',
        is_unique: false,
        label: 'Phone Number',
        options: [],
        multiline_count: 0,
        sort_order: 120,
        validate_rules: [],
        defaultValue: '',
        fieldType: 'TEXT',
        className: '',
        required: true,
        orderNumber: 10,
        name: 'telephone',
        id: 'telephone',
        code: 'telephone',
    },
    {
        entityType: 'CUSTOMER_ADDRESS',
        is_unique: false,
        label: 'Set as default billing address',
        options: [],
        multiline_count: 0,
        sort_order: 140,
        validate_rules: [],
        defaultValue: true,
        fieldType: 'BOOLEAN',
        className: '',
        required: false,
        orderNumber: 90,
        name: 'default_billing',
        id: 'default_billing',
        code: 'default_billing',
        is_hidden: false,
    },
];
const Template = {
    render: (args) => (<div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            margin: '40px auto',
            maxWidth: '1200px',
        }}>
      <FormInputs_1.FormInputs {...args}/>
    </div>),
};
exports.DefaultUse = {
    ...Template,
    args: {
        // @ts-ignore
        fields: mockFields,
        errors: { firstname: 'Please enter your name' },
        values: { email: 'defaultValueMail@mail.com' },
    },
};
