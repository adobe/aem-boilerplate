"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
const ReturnReasonForm_1 = require("@/order/components/ReturnReasonForm");
describe('order/Components/ReturnReasonForm', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(<ReturnReasonForm_1.ReturnReasonForm />);
        expect(!!container).toEqual(true);
    });
});
