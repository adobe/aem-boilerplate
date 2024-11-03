"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Provider_1 = require("./Provider");
const event_bus_1 = require("@adobe/event-bus");
const components_1 = require("@adobe/elsie/components");
const preact_1 = require("@testing-library/preact");
const en_US_json_1 = __importDefault(require("../i18n/en_US.json"));
jest.mock('@adobe/elsie/components/UIProvider', () => ({
    UIProvider: jest.fn(),
}));
describe('Provider', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('initial render', async () => {
        (0, preact_1.render)(<Provider_1.Provider>test</Provider_1.Provider>);
        const { children, lang, langDefinitions } = components_1.UIProvider.mock
            .calls[0][0];
        expect(children).toBe('test');
        expect(lang).toEqual('en_US');
        expect(langDefinitions.default).toBeDefined();
    });
    test('listen to locale event', async () => {
        event_bus_1.events.emit('locale', 'fr_FR');
        (0, preact_1.render)(<Provider_1.Provider>test</Provider_1.Provider>);
        const { children, lang, langDefinitions } = components_1.UIProvider.mock
            .calls[1][0];
        expect(children).toBe('test');
        expect(lang).toEqual('fr_FR');
        expect(langDefinitions.default).toEqual({ ...en_US_json_1.default });
    });
});
