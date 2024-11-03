"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultForm = void 0;
const Form_1 = require("@/order/components/Form");
const types_1 = require("@/order/types");
const FormInputs_1 = require("@/order/components/Form/FormInputs");
const Button_1 = __importDefault(require("@adobe/elsie/components/Button"));
const mockFields = [
    {
        entityType: 'CUSTOMER_ADDRESS',
        is_unique: false,
        label: 'First Name',
        options: [],
        multiline_count: 0,
        sort_order: 20,
        validateRules: [],
        defaultValue: '',
        fieldType: types_1.FieldEnumList.TEXT,
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
        label: 'Last Name',
        options: [],
        multilineCount: 0,
        sort_order: 40,
        validateRules: [],
        defaultValue: '',
        fieldType: types_1.FieldEnumList.TEXT,
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
        label: 'Street Address',
        options: [],
        multilineCount: 2,
        sort_order: 70,
        validateRules: [],
        defaultValue: '',
        fieldType: types_1.FieldEnumList.MULTILINE,
        className: '',
        required: true,
        orderNumber: 4,
        name: 'street',
        id: 'street',
        code: 'street',
    },
    {
        entityType: 'CUSTOMER_ADDRESS',
        is_unique: false,
        label: 'Street Address',
        options: [],
        defaultValue: '',
        fieldType: types_1.FieldEnumList.MULTILINE,
        className: '',
        required: true,
        orderNumber: 5,
        name: 'street_2',
        id: 'street_2',
        code: 'street_2',
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
        sortOrder: 80,
        validateRules: [],
        defaultValue: '',
        fieldType: types_1.FieldEnumList.SELECT,
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
        multilineCount: 0,
        sort_order: 110,
        validateRules: [],
        defaultValue: '',
        fieldType: types_1.FieldEnumList.TEXT,
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
        sortOrder: 120,
        validateRules: [],
        defaultValue: '',
        fieldType: types_1.FieldEnumList.TEXT,
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
        label: 'VAT Number',
        options: [],
        multilineCount: 0,
        sortOrder: 140,
        validateRules: [],
        defaultValue: '',
        fieldType: types_1.FieldEnumList.TEXT,
        className: '',
        required: false,
        orderNumber: 10,
        name: 'vat_id',
        id: 'vat_id',
        code: 'vat_id',
    },
    {
        entityType: 'CUSTOMER_ADDRESS',
        is_unique: false,
        label: 'Set as default shipping address',
        options: [],
        multilineCount: 0,
        sort_order: 140,
        validateRules: [],
        defaultValue: true,
        fieldType: types_1.FieldEnumList.BOOLEAN,
        className: '',
        required: false,
        orderNumber: 90,
        name: 'default_shipping',
        id: 'default_shipping',
        code: 'default_shipping',
        is_hidden: false,
    },
    {
        entityType: 'CUSTOMER_ADDRESS',
        is_unique: false,
        label: 'Set as default billing address',
        options: [],
        multilineCount: 0,
        sort_order: 140,
        validateRules: [],
        defaultValue: true,
        fieldType: types_1.FieldEnumList.BOOLEAN,
        className: '',
        required: false,
        orderNumber: 90,
        name: 'default_billing',
        id: 'default_billing',
        code: 'default_billing',
        is_hidden: false,
    },
];
exports.default = {
    title: 'Components/Custom Form',
    component: Form_1.Form,
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    args: {
        name: 'formName',
        loading: false,
        className: 'defaultForm',
        fieldsConfig: mockFields,
    },
    argTypes: {
        name: {
            control: 'text',
            description: 'Unique name for the form.',
        },
        loading: {
            control: 'boolean',
            description: 'Indicates if the form is loading.',
        },
        className: {
            control: 'text',
            description: 'CSS class for form styling.',
        },
        fieldsConfig: {
            control: 'array',
            description: 'Configuration for form fields.',
        },
        onSubmit: {
            action: 'clicked',
            defaultValue: (event, isValid) => {
                console.info('onSubmit', event, isValid);
            },
            description: 'Function called when the form is submitted. Use this to handle form submission events, such as sending data to a server.',
        },
    },
};
const mockErrors = {};
const mockFormData = {};
const mockClassName = 'custom-form-class';
const Template = {
    render: (args) => (<div style={{ margin: '40px auto', maxWidth: '1200px' }}>
      <Form_1.Form {...args}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormInputs_1.FormInputs fields={mockFields} errors={mockErrors} values={mockFormData} className={mockClassName}/>
          <Button_1.default type="submit" variant="primary">
            Create account
          </Button_1.default>
        </div>
      </Form_1.Form>
    </div>),
};
exports.DefaultForm = {
    ...Template,
    args: {
        fieldsConfig: [],
    },
};
