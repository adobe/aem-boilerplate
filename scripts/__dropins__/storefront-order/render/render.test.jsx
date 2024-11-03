"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_1 = require("./render");
describe('render', () => {
    it('should render', async () => {
        const root = document.createElement('div');
        root.setAttribute('id', 'root');
        const Container = () => <div>container</div>;
        await render_1.render.render(Container, {})(root);
        expect(root.innerHTML).toBe('<div>container</div>');
    });
});
