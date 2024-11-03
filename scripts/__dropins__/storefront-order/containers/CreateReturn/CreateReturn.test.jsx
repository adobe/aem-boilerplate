"use strict";
/** https://preactjs.com/guide/v10/preact-testing-library/ */
Object.defineProperty(exports, "__esModule", { value: true });
const tests_1 = require("@adobe/elsie/lib/tests");
const CreateReturn_1 = require("@/order/containers/CreateReturn");
describe('order/Containers/CreateReturn', () => {
    test('renders', () => {
        const { container } = (0, tests_1.render)(<CreateReturn_1.CreateReturn />);
        expect(!!container).toEqual(true);
    });
});
