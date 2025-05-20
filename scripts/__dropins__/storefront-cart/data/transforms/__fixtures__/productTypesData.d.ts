/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
declare const bundleOptions: {
    __typename: string;
    bundle_options: {
        uid: string;
        label: string;
        values: {
            uid: string;
            label: string;
            quantity: number;
            price: number;
        }[];
    }[];
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
    product: {
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
};
declare const bundleOptionsEmpty: {
    __typename: string;
    bundle_options: never[];
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
    product: {
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
};
declare const giftCardPhysical: {
    __typename: string;
    message: string;
    recipient_name: string;
    sender_name: string;
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
    product: {
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
};
declare const giftCardVirtual: {
    message: string;
    recipient_email: string;
    sender_email: string;
    __typename: string;
    recipient_name: string;
    sender_name: string;
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
    product: {
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
};
declare const simple: {
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
    product: {
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
};
declare const simpleCustomizable: {
    __typename: string;
    customizable_options: ({
        type: string;
        customizable_option_uid: string;
        label: string;
        values: {
            customizable_option_value_uid: string;
            label: string;
            value: string;
        }[];
    } | {
        type: string;
        customizable_option_uid: string;
        label: string;
        values: {
            label: string;
            value: string;
        }[];
    })[];
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
    product: {
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
};
declare const configurable: {
    __typename: string;
    configurable_options: {
        configurable_product_option_uid: string;
        option_label: string;
        value_label: string;
        configurable_product_option_value_uid: string;
    }[];
    configured_variant: {
        uid: string;
        thumbnail: {
            label: string;
            url: string;
        };
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
    product: {
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
};
declare const configurableCustomizable: {
    customizable_options: ({
        type: string;
        customizable_option_uid: string;
        label: string;
        values: {
            customizable_option_value_uid: string;
            label: string;
            value: string;
        }[];
    } | {
        type: string;
        customizable_option_uid: string;
        label: string;
        values: {
            label: string;
            value: string;
        }[];
    })[];
    __typename: string;
    configurable_options: {
        configurable_product_option_uid: string;
        option_label: string;
        value_label: string;
        configurable_product_option_value_uid: string;
    }[];
    configured_variant: {
        uid: string;
        thumbnail: {
            label: string;
            url: string;
        };
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
    product: {
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
};
declare const giftCard: {
    __typename: string;
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
    product: {
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
};
declare const downloadbleWithMultipleLinks: {
    __typename: string;
    links: {
        title: string;
        url: string;
    }[];
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
    product: {
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
};
declare const simpleLowInventory: {
    __typename: string;
    is_available: boolean;
    customizable_options: never[];
    product: {
        only_x_left_in_stock: number;
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
};
declare const complexInsufficientQuantity: {
    is_available: boolean;
    not_available_message: string;
    product: {
        only_x_left_in_stock: number;
        stock_status: string;
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
    __typename: string;
    links: {
        title: string;
        url: string;
    }[];
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
};
declare const complexInsufficientQuantityGeneralMessage: {
    is_available: boolean;
    not_available_message: string;
    product: {
        only_x_left_in_stock: number;
        stock_status: string;
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
    __typename: string;
    links: {
        title: string;
        url: string;
    }[];
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
};
declare const complexWithProductAttributes: {
    product: {
        custom_attributesV2: {
            items: ({
                code: string;
                value: string;
                selected_options?: undefined;
            } | {
                code: string;
                selected_options: {
                    value: string;
                    label: string;
                }[];
                value?: undefined;
            })[];
        };
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
    };
    __typename: string;
    links: {
        title: string;
        url: string;
    }[];
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
    prices: {
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        row_total: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
};
declare const simpleWithNoDiscount: {
    prices: {
        row_total: {
            value: number;
            currency: string;
        };
        original_row_total: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        total_item_discount: {
            value: number;
            currency: string;
        };
        price_including_tax: {
            value: number;
            currency: string;
        };
        row_total_including_tax: {
            value: number;
        };
        original_item_price: {
            value: number;
            currency: string;
        };
    };
    product: {
        price_range: {
            maximum_price: {
                regular_price: {
                    value: number;
                    currency: string;
                };
                final_price: {
                    value: number;
                    currency: string;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            };
        };
        name: string;
        sku: string;
        quantity: number;
        thumbnail: {
            url: string;
            label: string;
        };
        url_key: string;
        categories: {
            url_path: string;
            url_key: string;
        }[];
    };
    uid: string;
    quantity: number;
    gift_message_available: string;
    errors: null;
};
export { bundleOptions, bundleOptionsEmpty, giftCardPhysical, giftCardVirtual, simple, simpleCustomizable, configurable, configurableCustomizable, giftCard, downloadbleWithMultipleLinks, simpleLowInventory, complexInsufficientQuantity, complexInsufficientQuantityGeneralMessage, complexWithProductAttributes, simpleWithNoDiscount, };
//# sourceMappingURL=productTypesData.d.ts.map