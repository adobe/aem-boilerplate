"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyList = void 0;
const compat_1 = require("preact/compat");
const lib_1 = require("@adobe/elsie/lib");
const components_1 = require("@adobe/elsie/components");
const icons_1 = require("@adobe/elsie/icons");
require("@/order/components/EmptyList/EmptyList.css");
const EmptyList = ({ typeList, isEmpty, minifiedView, message, }) => {
    const config = (0, compat_1.useMemo)(() => {
        switch (typeList) {
            case 'orders':
                return {
                    icon: icons_1.EmptyBox,
                    text: <p>{message}</p>,
                    className: 'order-empty-list--empty-box',
                };
            default:
                return { icon: '', text: '', className: "" };
        }
    }, [typeList, message]);
    if (!isEmpty || !typeList || !config.text)
        return null;
    return (<components_1.IllustratedMessage className={(0, lib_1.classes)([
            'order-empty-list',
            config.className,
            minifiedView ? 'order-empty-list--minified' : '',
        ])} message={config.text} icon={<components_1.Icon source={config.icon}/>} data-testid="emptyList"/>);
};
exports.EmptyList = EmptyList;
