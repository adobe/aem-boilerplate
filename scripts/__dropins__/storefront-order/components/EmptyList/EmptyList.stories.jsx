"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const EmptyList_1 = require("@/order/components/EmptyList");
exports.default = {
    title: 'Components/EmptyList',
    component: EmptyList_1.EmptyList,
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    args: { isEmpty: true },
    argTypes: {
        typeList: {
            control: 'select',
            defaultValue: 'address',
            options: ['address', 'orders'],
            description: 'This setting determines which type of list is currently active',
        },
        isEmpty: {
            control: 'boolean',
            description: 'Defines is component visible or not.',
        },
        minifiedView: {
            description: 'Determines the initial size of the form.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
            control: { type: 'boolean' },
        },
        className: {
            control: 'text',
            description: 'CSS class for additional styling customization of the container.',
        },
    },
};
const Template = {
    render: (args) => (<div style={{
            margin: '40px auto',
            maxWidth: '1200px',
            height: '260px',
            border: '1px solid lightgrey',
            padding: '0 20px',
        }}>
      <EmptyList_1.EmptyList {...args}/>
    </div>),
};
exports.Default = {
    ...Template,
    args: {},
};
