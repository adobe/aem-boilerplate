"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const hooks_1 = require("preact/hooks");
const components_1 = require("@adobe/elsie/components");
const event_bus_1 = require("@adobe/event-bus");
const en_US_json_1 = __importDefault(require("../i18n/en_US.json"));
// Langs
const langDefinitions = {
    default: en_US_json_1.default,
};
const Provider = ({ children, }) => {
    const [lang, setLang] = (0, hooks_1.useState)('en_US');
    //   Events
    (0, hooks_1.useEffect)(() => {
        const localeEvent = event_bus_1.events.on('locale', (locale) => {
            setLang(locale);
        }, { eager: true });
        return () => {
            localeEvent?.off();
        };
    }, []);
    return (<components_1.UIProvider lang={lang} langDefinitions={langDefinitions}>
      {children}
    </components_1.UIProvider>);
};
exports.Provider = Provider;
