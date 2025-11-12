/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
export declare const MOCK_DATE = "2024-01-01T00:00:00Z";
export declare const validCartIdForPlacePurchaseOrder = "cart-123";
export declare const mockGraphQLResponseForPlacePurchaseOrder: {
    data: {
        placePurchaseOrder: {
            purchase_order: {
                __typename: string;
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                approval_flow: never[];
                available_actions: never[];
                comments: never[];
                created_by: null;
                history_log: never[];
                order: null;
                quote: null;
            };
        };
    };
    errors: undefined;
};
export declare const mockErrorResponseForPlacePurchaseOrder: {
    data: null;
    errors: {
        message: string;
        extensions: {
            category: string;
        };
    }[];
};
export declare const mockNetworkErrorForPlacePurchaseOrder: Error;
export declare const mockEmptyDataResponseForPlacePurchaseOrder: {
    data: null;
    errors: undefined;
};
export declare const mockMissingPlacePurchaseOrderResponse: {
    data: {};
    errors: undefined;
};
export declare const validUidForRejectPurchaseOrders = "purchase-order-123";
export declare const validUidsForRejectPurchaseOrders: string[];
export declare const mockPurchaseOrderForReject: {
    uid: string;
    number: string;
    created_at: string;
    updated_at: string;
    status: string;
    available_actions: string[];
    approval_flow: {
        status: string;
        current_step: null;
    };
    comments: {
        uid: string;
        author: {
            firstname: string;
            lastname: string;
            email: string;
        };
        text: string;
        created_at: string;
    }[];
    created_by: {
        firstname: string;
        lastname: string;
        email: string;
    };
    history_log: {
        activity: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
            email: string;
        };
    }[];
};
export declare const mockPurchaseOrder2ForReject: {
    uid: string;
    number: string;
    created_at: string;
    updated_at: string;
    status: string;
    available_actions: string[];
};
export declare const mockSuccessResponseForReject: {
    data: {
        rejectPurchaseOrders: {
            purchase_orders: {
                uid: string;
                number: string;
                created_at: string;
                updated_at: string;
                status: string;
                available_actions: string[];
                approval_flow: {
                    status: string;
                    current_step: null;
                };
                comments: {
                    uid: string;
                    author: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                    text: string;
                    created_at: string;
                }[];
                created_by: {
                    firstname: string;
                    lastname: string;
                    email: string;
                };
                history_log: {
                    activity: string;
                    created_at: string;
                    author: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                }[];
            }[];
            errors: never[];
        };
    };
};
export declare const mockCancelPurchaseOrderSingleSuccessResponse: {
    data: {
        cancelPurchaseOrders: {
            purchase_orders: {
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                available_actions: string[];
            }[];
            errors: never[];
        };
    };
};
export declare const mockCancelPurchaseOrderMultipleSuccessResponse: {
    data: {
        cancelPurchaseOrders: {
            purchase_orders: {
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                available_actions: string[];
            }[];
            errors: never[];
        };
    };
};
export declare const mockCancelPurchaseOrderEmptyResponse: {
    data: {
        cancelPurchaseOrders: {
            purchase_orders: never[];
            errors: never[];
        };
    };
};
export declare const mockCancelPurchaseOrderGraphQLErrorResponse: {
    errors: {
        message: string;
        extensions: {
            category: string;
        };
    }[];
    data: {
        cancelPurchaseOrders: {
            purchase_orders: never[];
            errors: never[];
        };
    };
};
export declare const mockCancelPurchaseOrderMissingDataResponse: {
    data: undefined;
};
export declare const mockCancelPurchaseOrderMissingCancelResponse: {
    data: {};
};
export declare const mockCancelPurchaseOrderNotFoundResponse: {
    data: {
        cancelPurchaseOrders: {
            purchase_orders: never[];
            errors: {
                message: string;
                type: string;
            }[];
        };
    };
};
export declare const mockCancelPurchaseOrderPartialMixedResponse: {
    data: {
        cancelPurchaseOrders: {
            purchase_orders: {
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                available_actions: string[];
            }[];
            errors: {
                message: string;
                type: string;
            }[];
        };
    };
};
export declare const mockCancelPurchaseOrderComplexResponse: {
    data: {
        cancelPurchaseOrders: {
            purchase_orders: {
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                available_actions: string[];
                approval_flow: {
                    rules_requiring_approval: {
                        rule_id: string;
                        name: string;
                    }[];
                };
                comments: {
                    id: string;
                    message: string;
                }[];
                history_log: {
                    action: string;
                    timestamp: string;
                }[];
                created_by: {
                    name: string;
                    email: string;
                };
                quote: {
                    id: string;
                    total: number;
                };
                order: null;
            }[];
            errors: never[];
        };
    };
};
export declare const validPurchaseOrderUidForApproval = "test-uid-1";
export declare const validPurchaseOrderUidsForApproval: string[];
export declare const mockSinglePurchaseOrder: {
    uid: string;
    number: string;
    status: string;
    created_at: string;
    updated_at: string;
    available_actions: string[];
    __typename: string;
    approval_flow: undefined;
    comments: undefined;
    created_by: undefined;
    history_log: undefined;
    order: undefined;
    quote: undefined;
};
export declare const mockPurchaseOrder: {
    uid: string;
    number: string;
    status: string;
    created_at: string;
    updated_at: string;
    available_actions: string[];
    __typename: string;
    approval_flow: undefined;
    comments: undefined;
    created_by: undefined;
    history_log: undefined;
    order: undefined;
    quote: undefined;
};
export declare const mockPurchaseOrderForApproval2: {
    uid: string;
    number: string;
    status: string;
    created_at: string;
    updated_at: string;
    available_actions: string[];
    __typename: string;
    approval_flow: undefined;
    comments: undefined;
    created_by: undefined;
    history_log: undefined;
    order: undefined;
    quote: undefined;
};
export declare const mockApprovePurchaseOrderSingleSuccessResponse: {
    data: {
        approvePurchaseOrders: {
            purchase_orders: {
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                available_actions: string[];
                __typename: string;
                approval_flow: undefined;
                comments: undefined;
                created_by: undefined;
                history_log: undefined;
                order: undefined;
                quote: undefined;
            }[];
            errors: never[];
        };
    };
};
export declare const mockApprovePurchaseOrderMultipleSuccessResponse: {
    data: {
        approvePurchaseOrders: {
            purchase_orders: {
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                available_actions: string[];
                __typename: string;
                approval_flow: undefined;
                comments: undefined;
                created_by: undefined;
                history_log: undefined;
                order: undefined;
                quote: undefined;
            }[];
            errors: never[];
        };
    };
};
export declare const mockGraphQLErrors: {
    message: string;
    extensions: {
        category: string;
    };
}[];
export declare const mockApprovePurchaseOrderErrorResponse: {
    data: {
        approvePurchaseOrders: {
            purchase_orders: never[];
            errors: never[];
        };
    };
    errors: {
        message: string;
        extensions: {
            category: string;
        };
    }[];
};
export declare const mockApprovePurchaseOrderEmptyResponse: {
    data: {
        approvePurchaseOrders: {
            purchase_orders: never[];
            errors: never[];
        };
    };
};
export declare const mockApprovePurchaseOrderMissingDataResponse: {
    data: undefined;
};
export declare const mockApprovePurchaseOrderMissingApprovalResponse: {
    data: {};
};
export declare const mockApprovePurchaseOrderNotFoundResponse: {
    data: {
        approvePurchaseOrders: {
            purchase_orders: never[];
            errors: {
                message: string;
                type: string;
            }[];
        };
    };
};
export declare const mockApprovePurchaseOrderPartialMixedResponse: {
    data: {
        approvePurchaseOrders: {
            purchase_orders: {
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                available_actions: string[];
            }[];
            errors: {
                message: string;
                type: string;
            }[];
        };
    };
};
export declare const mockApprovePurchaseOrderComplexResponse: {
    data: {
        approvePurchaseOrders: {
            purchase_orders: {
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                available_actions: string[];
                approval_flow: {
                    rules_requiring_approval: {
                        rule_id: string;
                        name: string;
                    }[];
                };
                comments: {
                    id: string;
                    message: string;
                }[];
                history_log: {
                    action: string;
                    timestamp: string;
                }[];
                created_by: {
                    name: string;
                    email: string;
                };
                quote: {
                    id: string;
                    total: number;
                };
                order: null;
            }[];
            errors: never[];
        };
    };
};
export declare const validPurchaseOrderUidForCart = "valid-po-uid-123";
export declare const validPurchaseOrderUidForPlaceOrder = "purchase-order-123";
export declare const mockOrderDataForPlaceOrder: {
    id: string;
    number: string;
    order_date: string;
    order_status_change_date: string;
    status: string;
    email: string;
    available_actions: string[];
    carrier: string;
    gift_receipt_included: boolean;
    is_virtual: boolean;
    printed_card_included: boolean;
    shipping_method: string;
    token: string;
    applied_coupons: never[];
    applied_gift_cards: never[];
    billing_address: {
        firstname: string;
        lastname: string;
        street: string[];
        city: string;
        region: string;
        postcode: string;
        country_code: string;
        telephone: string;
    };
    comments: never[];
    credit_memos: never[];
    custom_attributes: never[];
    customer_info: {
        firstname: string;
        lastname: string;
        email: string;
    };
    gift_message: null;
    gift_wrapping: null;
    invoices: never[];
    items: {
        id: string;
        product_name: string;
        product_sku: string;
        quantity_ordered: number;
        product_sale_price: {
            value: number;
            currency: string;
        };
    }[];
    items_eligible_for_return: never[];
    payment_methods: {
        name: string;
        type: string;
        additional_data: never[];
    }[];
    returns: null;
    shipments: never[];
    shipping_address: {
        firstname: string;
        lastname: string;
        street: string[];
        city: string;
        region: string;
        postcode: string;
        country_code: string;
        telephone: string;
    };
    total: {
        grand_total: {
            value: number;
            currency: string;
        };
        subtotal: {
            value: number;
            currency: string;
        };
        taxes: never[];
    };
};
export declare const mockSuccessResponseForPlaceOrder: {
    data: {
        placeOrderForPurchaseOrder: {
            order: {
                id: string;
                number: string;
                order_date: string;
                order_status_change_date: string;
                status: string;
                email: string;
                available_actions: string[];
                carrier: string;
                gift_receipt_included: boolean;
                is_virtual: boolean;
                printed_card_included: boolean;
                shipping_method: string;
                token: string;
                applied_coupons: never[];
                applied_gift_cards: never[];
                billing_address: {
                    firstname: string;
                    lastname: string;
                    street: string[];
                    city: string;
                    region: string;
                    postcode: string;
                    country_code: string;
                    telephone: string;
                };
                comments: never[];
                credit_memos: never[];
                custom_attributes: never[];
                customer_info: {
                    firstname: string;
                    lastname: string;
                    email: string;
                };
                gift_message: null;
                gift_wrapping: null;
                invoices: never[];
                items: {
                    id: string;
                    product_name: string;
                    product_sku: string;
                    quantity_ordered: number;
                    product_sale_price: {
                        value: number;
                        currency: string;
                    };
                }[];
                items_eligible_for_return: never[];
                payment_methods: {
                    name: string;
                    type: string;
                    additional_data: never[];
                }[];
                returns: null;
                shipments: never[];
                shipping_address: {
                    firstname: string;
                    lastname: string;
                    street: string[];
                    city: string;
                    region: string;
                    postcode: string;
                    country_code: string;
                    telephone: string;
                };
                total: {
                    grand_total: {
                        value: number;
                        currency: string;
                    };
                    subtotal: {
                        value: number;
                        currency: string;
                    };
                    taxes: never[];
                };
            };
        };
    };
};
export declare const validCartId = "valid-cart-id-456";
export declare const mockProduct: {
    uid: string;
    name: string;
    sku: string;
};
export declare const mockCartItem: {
    uid: string;
    quantity: number;
    product: {
        uid: string;
        name: string;
        sku: string;
    };
};
export declare const mockCart: {
    id: string;
    itemsV2: {
        items: {
            uid: string;
            quantity: number;
            product: {
                uid: string;
                name: string;
                sku: string;
            };
        }[];
        page_info: {
            current_page: number;
            page_size: number;
            total_pages: number;
        };
        total_count: number;
    };
};
export declare const mockAddPurchaseOrderItemsToCartSuccessResponse: {
    data: {
        addPurchaseOrderItemsToCart: {
            cart: {
                id: string;
                itemsV2: {
                    items: {
                        uid: string;
                        quantity: number;
                        product: {
                            uid: string;
                            name: string;
                            sku: string;
                        };
                    }[];
                    page_info: {
                        current_page: number;
                        page_size: number;
                        total_pages: number;
                    };
                    total_count: number;
                };
            };
            user_errors: never[];
        };
    };
};
export declare const mockErrors: {
    message: string;
}[];
export declare const mockErrorResponse: {
    data: {
        addPurchaseOrderItemsToCart: {
            cart: {
                id: string;
                itemsV2: {
                    items: {
                        uid: string;
                        quantity: number;
                        product: {
                            uid: string;
                            name: string;
                            sku: string;
                        };
                    }[];
                    page_info: {
                        current_page: number;
                        page_size: number;
                        total_pages: number;
                    };
                    total_count: number;
                };
            };
            user_errors: never[];
        };
    };
    errors: {
        message: string;
    }[];
};
export declare const mockCommentDataSnakeCase: {
    created_at: string;
    text: string;
    uid: string;
    author: {
        allow_remote_shopping_assistance: boolean;
        confirmation_status: string;
        created_at: string;
        date_of_birth: string;
        email: string;
        firstname: string;
        gender: number;
        job_title: string;
        lastname: string;
        middlename: string;
        prefix: string;
        suffix: string;
        telephone: string;
    };
};
export declare const mockPartialAuthorCommentDataSnakeCase: {
    created_at: string;
    text: string;
    uid: string;
    author: {
        email: string;
        firstname: string;
        lastname: string;
    };
};
export declare const mockNoAuthorCommentDataSnakeCase: {
    created_at: string;
    text: string;
    uid: string;
    author: {};
};
export declare const mockEmptyAuthorCommentDataSnakeCase: {
    text: string;
    uid: string;
    created_at: string;
    author: {};
};
export declare const mockCartDataSnakeCase: {
    cart: {
        id: string;
        itemsV2: {
            items: {
                uid: string;
                quantity: number;
                product: {
                    uid: string;
                    name: string;
                    sku: string;
                };
            }[];
            page_info: {
                current_page: number;
                page_size: number;
                total_pages: number;
            };
            total_count: number;
        };
    };
    user_errors: {
        message: string;
    }[];
};
export declare const mockEmptyCartDataSnakeCase: {
    cart: {
        id: string;
        items: never[];
    };
    user_errors: never[];
};
export declare const mockCartWithErrorsSnakeCase: {
    cart: {
        id: string;
        items: never[];
    };
    user_errors: {
        message: string;
    }[];
};
export declare const mockCartNoItemsArraySnakeCase: {
    cart: {
        id: string;
    };
    user_errors: never[];
};
export declare const mockPartialCartItemDataSnakeCase: {
    cart: {
        id: string;
        itemsV2: {
            items: {
                uid: string;
                quantity: number;
                product: {
                    uid: string;
                };
            }[];
            page_info: {
                current_page: number;
                page_size: number;
                total_pages: number;
            };
            total_count: number;
        };
    };
    user_errors: never[];
};
export declare const mockCartItemsV2SnakeCase: {
    cart: {
        id: string;
        itemsV2: {
            items: {
                uid: string;
                quantity: number;
                product: {
                    uid: string;
                    name: string;
                    sku: string;
                };
            }[];
            page_info: {
                current_page: number;
                page_size: number;
                total_pages: number;
            };
            total_count: number;
        };
    };
    user_errors: never[];
};
export declare const mockCartItemsV2AndItemsSnakeCase: {
    cart: {
        id: string;
        items: {
            uid: string;
            quantity: number;
            product: {
                uid: string;
                name: string;
                sku: string;
            };
        }[];
        itemsV2: {
            items: {
                uid: string;
                quantity: number;
                product: {
                    uid: string;
                    name: string;
                    sku: string;
                };
            }[];
            page_info: {
                current_page: number;
                page_size: number;
                total_pages: number;
            };
            total_count: number;
        };
    };
    user_errors: never[];
};
export declare const mockApprovalDataSnakeCase: {
    errors: {
        message: string;
        type: string;
    }[];
    purchase_orders: {
        __typename: string;
        uid: string;
        number: string;
        status: string;
        created_at: string;
        updated_at: string;
        approval_flow: {
            rules: never[];
        };
        available_actions: string[];
        comments: never[];
        created_by: {
            email: string;
            firstname: string;
            lastname: string;
        };
        history_log: never[];
        order: null;
        quote: {
            uid: string;
            number: string;
        };
    }[];
};
export declare const mockEmptyApprovalDataSnakeCase: {
    errors: never[];
    purchase_orders: never[];
};
export declare const mockPartialPurchaseOrderSnakeCase: {
    errors: never[];
    purchase_orders: {
        uid: string;
        number: string;
        status: string;
        created_at: string;
        updated_at: string;
        available_actions: never[];
    }[];
};
export declare const mockMultipleErrorTypesSnakeCase: {
    errors: {
        message: string;
        type: string;
    }[];
    purchase_orders: never[];
};
export declare const mockNullErrorAndPurchaseOrderSnakeCase: {
    errors: {
        message: null;
        type: null;
    }[];
    purchase_orders: {
        uid: null;
        number: null;
        status: null;
        created_at: null;
        updated_at: null;
        available_actions: null;
    }[];
};
export declare const mockPartialCancelPurchaseOrderSnakeCase: {
    errors: never[];
    purchase_orders: {
        uid: string;
        number: string;
        status: string;
        created_at: string;
        updated_at: string;
        available_actions: never[];
    }[];
};
export declare const mockComplexCancelPurchaseOrderSnakeCase: {
    errors: never[];
    purchase_orders: {
        uid: string;
        number: string;
        status: string;
        created_at: string;
        updated_at: string;
        available_actions: never[];
        comments: {
            message: string;
            uid: string;
        }[];
        approval_flow: undefined;
    }[];
};
export declare const mockCreateApprovalRuleSnakeCase: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            description: string;
            status: string;
            created_at: string;
            updated_at: string;
            created_by: {
                firstname: string;
                lastname: string;
                email: string;
            };
            applies_to_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: {
                    id: string;
                    sort_order: number;
                    text: string;
                }[];
            }[];
            approver_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: {
                    id: string;
                    sort_order: number;
                    text: string;
                }[];
            }[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreateApprovalRulePartialSnakeCase: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreateApprovalRuleNullsSnakeCase: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: null;
            name: null;
            description: null;
            status: null;
            created_at: null;
            updated_at: null;
            created_by: null;
            applies_to_roles: never[];
            approver_roles: never[];
            condition: {
                attribute: null;
                operator: null;
            };
        };
    };
};
export declare const mockCreateApprovalRuleIncompleteRolesSnakeCase: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            applies_to_roles: {
                id: null;
                name: null;
                users_count: null;
                permissions: never[];
            }[];
            approver_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: {
                    id: null;
                    sort_order: null;
                    text: null;
                }[];
            }[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreateApprovalRuleEmptyPermissionsSnakeCase: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            applies_to_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: never[];
            }[];
            approver_roles: never[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreateApprovalRuleNoDataSnakeCase: {
    data: null;
};
export declare const mockCreateApprovalRuleNoRuleSnakeCase: {
    data: {
        createPurchaseOrderApprovalRule: null;
    };
};
export declare const mockCreateApprovalRuleMultipleRolesSnakeCase: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            applies_to_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: {
                    id: string;
                    sort_order: number;
                    text: string;
                }[];
            }[];
            approver_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: {
                    id: string;
                    sort_order: number;
                    text: string;
                }[];
            }[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockDeleteApprovalRuleSuccessSnakeCase: {
    data: {
        deletePurchaseOrderApprovalRule: {
            errors: never[];
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRuleMetadataFullDataSnakeCase: {
    data: {
        customer: {
            purchase_order_approval_rule_metadata: {
                available_applies_to: {
                    id: string;
                    name: string;
                    users_count: number;
                    permissions: ({
                        id: string;
                        sort_order: number;
                        text: string;
                        children: {
                            id: string;
                            sort_order: number;
                            text: string;
                            children: {
                                id: string;
                                sort_order: number;
                                text: string;
                            }[];
                        }[];
                    } | {
                        id: string;
                        sort_order: number;
                        text: string;
                        children?: undefined;
                    })[];
                }[];
                available_requires_approval_from: {
                    id: string;
                    name: string;
                    users_count: number;
                }[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRuleMetadataNoChildrenSnakeCase: {
    data: {
        customer: {
            purchase_order_approval_rule_metadata: {
                available_applies_to: {
                    id: string;
                    name: string;
                    users_count: number;
                    permissions: {
                        id: string;
                        sort_order: number;
                        text: string;
                    }[];
                }[];
                available_requires_approval_from: never[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRuleMetadataNullsSnakeCase: {
    data: {
        customer: {
            purchase_order_approval_rule_metadata: {
                available_applies_to: {
                    id: null;
                    name: null;
                    users_count: null;
                    permissions: {
                        id: null;
                        sort_order: null;
                        text: null;
                        children: null;
                    }[];
                }[];
                available_requires_approval_from: {
                    id: null;
                    name: null;
                    users_count: null;
                }[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRuleMetadataUndefinedSnakeCase: {
    data: {
        customer: {
            purchase_order_approval_rule_metadata: {
                available_applies_to: {
                    id: undefined;
                    name: undefined;
                    users_count: undefined;
                    permissions: {
                        id: undefined;
                        sort_order: undefined;
                        text: undefined;
                        children: undefined;
                    }[];
                }[];
                available_requires_approval_from: {
                    id: undefined;
                    name: undefined;
                    users_count: undefined;
                }[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRuleMetadataMissingMetadataSnakeCase: {
    data: {
        customer: {
            purchase_order_approval_rule_metadata: null;
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRuleMetadataNoCustomerSnakeCase: {
    data: {
        customer: null;
    };
};
export declare const mockGetPurchaseOrderApprovalRuleMetadataNoDataSnakeCase: {
    data: null;
};
export declare const mockGetPurchaseOrderApprovalRuleMetadataEmptyArraysSnakeCase: {
    data: {
        customer: {
            purchase_order_approval_rule_metadata: {
                available_applies_to: never[];
                available_requires_approval_from: never[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRuleMetadataEmptyPermissionsSnakeCase: {
    data: {
        customer: {
            purchase_order_approval_rule_metadata: {
                available_applies_to: {
                    id: string;
                    name: string;
                    users_count: number;
                    permissions: never[];
                }[];
                available_requires_approval_from: never[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRuleMetadataNullPermissionsSnakeCase: {
    data: {
        customer: {
            purchase_order_approval_rule_metadata: {
                available_applies_to: {
                    id: string;
                    name: string;
                    users_count: number;
                    permissions: null;
                }[];
                available_requires_approval_from: never[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRuleMetadataComplexStructureSnakeCase: {
    data: {
        customer: {
            purchase_order_approval_rule_metadata: {
                available_applies_to: {
                    id: string;
                    name: string;
                    users_count: number;
                    permissions: {
                        id: string;
                        sort_order: number;
                        text: string;
                        children: {
                            id: string;
                            sort_order: number;
                            text: string;
                            children: {
                                id: string;
                                sort_order: number;
                                text: string;
                            }[];
                        }[];
                    }[];
                }[];
                available_requires_approval_from: {
                    id: string;
                    name: string;
                    users_count: number;
                }[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderFullDataSnakeCase: {
    data: {
        customer: {
            purchase_order: {
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                available_actions: string[];
                comments: {
                    uid: string;
                    author: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                    text: string;
                    created_at: string;
                }[];
                created_by: {
                    firstname: string;
                    lastname: string;
                    email: string;
                };
                order: {
                    id: string;
                    number: string;
                    total: {
                        grand_total: {
                            value: number;
                            currency: string;
                        };
                    };
                };
                quote: {
                    id: string;
                    prices: {
                        grand_total: {
                            value: number;
                            currency: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const mockGetPurchaseOrderMinimalDataSnakeCase: {
    data: {
        customer: {
            purchase_order: {
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                available_actions: never[];
                comments: never[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderNullDataSnakeCase: {
    data: {
        customer: {
            purchase_order: {
                __typename: null;
                uid: null;
                number: null;
                created_at: null;
                updated_at: null;
                status: null;
                approval_flow: null;
                available_actions: null;
                comments: null;
                created_by: null;
                history_log: null;
                order: null;
                quote: null;
            };
        };
    };
};
export declare const mockGetPurchaseOrderIncompleteCommentsSnakeCase: {
    data: {
        customer: {
            purchase_order: {
                uid: string;
                number: string;
                status: string;
                created_at: string;
                updated_at: string;
                available_actions: string[];
                comments: ({
                    uid: null;
                    author: null;
                    text: null;
                    created_at: null;
                } | {
                    uid: string;
                    author: {
                        firstname: null;
                        lastname: null;
                        email: null;
                    };
                    text: string;
                    created_at: string;
                })[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderNoDataSnakeCase: {
    data: null;
};
export declare const mockGetPurchaseOrderNoCustomerSnakeCase: {
    data: {
        customer: null;
    };
};
export declare const mockGetPurchaseOrderNoPurchaseOrderSnakeCase: {
    data: {
        customer: {
            purchase_order: null;
        };
    };
};
export declare const mockGetPurchaseOrdersEmptyDataSnakeCase: {
    data: {
        customer: {
            purchase_orders: {
                total_count: number;
                page_info: {
                    total_pages: number;
                    current_page: number;
                    page_size: number;
                };
                items: never[];
            };
        };
    };
};
export declare const mockGetPurchaseOrdersIncompleteDataSnakeCase: {
    data: {
        customer: {
            purchase_orders: {
                total_count: number;
                page_info: {
                    current_page: number;
                    page_size: number;
                    total_pages: number;
                };
                items: {
                    uid: string;
                    number: string;
                    created_by: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                    order: {
                        id: string;
                        total: {
                            grand_total: {
                                value: number;
                            };
                        };
                    };
                    quote: {
                        prices: {
                            grand_total: {
                                currency: string;
                            };
                        };
                    };
                }[];
            };
        };
    };
};
export declare const mockGetPurchaseOrdersNoDataSnakeCase: {
    data: null;
};
export declare const mockGetPurchaseOrdersNoCustomerSnakeCase: {
    data: {
        customer: null;
    };
};
export declare const mockGetPurchaseOrdersNoPurchaseOrdersSnakeCase: {
    data: {
        customer: {
            purchase_orders: null;
        };
    };
};
export declare const mockGetPurchaseOrdersUndefinedResponseSnakeCase: undefined;
export declare const mockGetPurchaseOrdersNullResponseSnakeCase: null;
export declare const mockGetPurchaseOrdersQuoteWithIdSnakeCase: {
    data: {
        customer: {
            purchase_orders: {
                total_count: number;
                page_info: {
                    current_page: number;
                    page_size: number;
                    total_pages: number;
                };
                items: {
                    uid: string;
                    number: string;
                    status: string;
                    created_at: string;
                    updated_at: string;
                    available_actions: string[];
                    quote: {
                        id: string;
                        prices: {
                            grand_total: {
                                value: number;
                                currency: string;
                            };
                        };
                    };
                }[];
            };
        };
    };
};
export declare const mockPlaceOrderForPurchaseOrderFullDataSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: {
            order: {
                id: string;
                number: string;
                email: string;
                status: string;
                order_date: string;
                order_status_change_date: string;
                token: string;
                carrier: string;
                shipping_method: string;
                is_virtual: boolean;
                gift_receipt_included: boolean;
                printed_card_included: boolean;
                gift_message: string;
                applied_coupons: {
                    code: string;
                    label: string;
                }[];
                applied_gift_cards: {
                    code: string;
                    applied_balance: {
                        value: number;
                        currency: string;
                    };
                    current_balance: {
                        value: number;
                        currency: string;
                    };
                }[];
                available_actions: string[];
                billing_address: {
                    city: string;
                    country: {
                        code: string;
                        label: string;
                    };
                    firstname: string;
                    lastname: string;
                    postcode: string;
                    region: {
                        code: string;
                        label: string;
                        region_id: number;
                    };
                    street: string[];
                    telephone: string;
                };
                shipping_address: {
                    city: string;
                    country: {
                        code: string;
                        label: string;
                    };
                    firstname: string;
                    lastname: string;
                    postcode: string;
                    region: {
                        code: string;
                        label: string;
                        region_id: number;
                    };
                    street: string[];
                    telephone: string;
                };
                customer_info: {
                    firstname: string;
                    lastname: string;
                    email: string;
                };
                payment_methods: {
                    name: string;
                    type: string;
                    additional_data: {
                        last_four: string;
                        card_type: string;
                    };
                }[];
                shipments: {
                    id: string;
                    number: string;
                    tracking: {
                        number: string;
                        carrier: string;
                        title: string;
                    }[];
                    comments: {
                        message: string;
                        timestamp: string;
                    }[];
                    items: {
                        id: string;
                        product_name: string;
                        product_sku: string;
                        quantity_shipped: number;
                    }[];
                }[];
                total: {
                    base_grand_total: {
                        value: number;
                        currency: string;
                    };
                    grand_total: {
                        value: number;
                        currency: string;
                    };
                    subtotal: {
                        value: number;
                        currency: string;
                    };
                    total_tax: {
                        value: number;
                        currency: string;
                    };
                    total_shipping: {
                        value: number;
                        currency: string;
                    };
                    discounts: {
                        label: string;
                        amount: {
                            value: number;
                            currency: string;
                        };
                    }[];
                };
                comments: string[];
                custom_attributes: {
                    attribute_code: string;
                    value: string;
                }[];
                credit_memos: never[];
                invoices: never[];
                items_eligible_for_return: never[];
                returns: null;
                gift_wrapping: null;
                items: {
                    id: string;
                    product_name: string;
                    product_sku: string;
                    quantity_ordered: number;
                    quantity_shipped: number;
                    quantity_canceled: number;
                    quantity_invoiced: number;
                    quantity_refunded: number;
                    quantity_returned: number;
                    status: string;
                    selected_options: {
                        label: string;
                        value: string;
                    }[];
                    entered_options: {
                        label: string;
                        value: string;
                    }[];
                }[];
            };
        };
    };
};
export declare const mockPlaceOrderForPurchaseOrderMinimalDataSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: {
            order: {
                id: string;
                number: string;
                email: string;
                status: string;
                order_date: string;
                token: string;
                is_virtual: boolean;
                gift_receipt_included: boolean;
                printed_card_included: boolean;
                applied_coupons: never[];
                applied_gift_cards: never[];
                available_actions: never[];
                items: never[];
                shipments: never[];
                payment_methods: never[];
                comments: never[];
                custom_attributes: never[];
                credit_memos: never[];
                invoices: never[];
                items_eligible_for_return: never[];
            };
        };
    };
};
export declare const mockPlaceOrderForPurchaseOrderNullDataSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: {
            order: {
                id: null;
                number: null;
                email: null;
                status: null;
                order_date: null;
                order_status_change_date: null;
                token: null;
                carrier: null;
                shipping_method: null;
                is_virtual: null;
                gift_receipt_included: null;
                printed_card_included: null;
                gift_message: null;
                applied_coupons: null;
                applied_gift_cards: null;
                available_actions: null;
                billing_address: null;
                shipping_address: null;
                customer_info: null;
                payment_methods: null;
                shipments: null;
                total: null;
                comments: null;
                custom_attributes: null;
                credit_memos: null;
                invoices: null;
                items_eligible_for_return: null;
                returns: null;
                gift_wrapping: null;
                items: null;
            };
        };
    };
};
export declare const mockPlaceOrderForPurchaseOrderNoDataSnakeCase: {
    data: null;
};
export declare const mockPlaceOrderForPurchaseOrderNoPlaceOrderSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: null;
    };
};
export declare const mockPlaceOrderForPurchaseOrderNoOrderSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: {
            order: null;
        };
    };
};
export declare const mockPlaceOrderForPurchaseOrderEmptyArraysSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: {
            order: {
                id: string;
                number: string;
                email: string;
                status: string;
                order_date: string;
                applied_coupons: never[];
                applied_gift_cards: never[];
                available_actions: never[];
                items: never[];
                shipments: never[];
                payment_methods: never[];
                comments: never[];
                custom_attributes: never[];
                credit_memos: never[];
                invoices: never[];
                items_eligible_for_return: never[];
            };
        };
    };
};
export declare const mockPlaceOrderForPurchaseOrderUndefinedResponseSnakeCase: undefined;
export declare const mockPlaceOrderForPurchaseOrderNullResponseSnakeCase: null;
export declare const mockPlaceOrderForPurchaseOrderPartialAddressSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: {
            order: {
                id: string;
                billing_address: {
                    firstname: string;
                    city: string;
                    postcode: string;
                    telephone: string;
                };
                shipping_address: null;
            };
        };
    };
};
export declare const mockPlaceOrderForPurchaseOrderPartialPaymentSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: {
            order: {
                id: string;
                payment_methods: ({
                    name: string;
                } | null)[];
            };
        };
    };
};
export declare const mockPlaceOrderForPurchaseOrderPartialShipmentSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: {
            order: {
                id: string;
                shipments: {
                    id: string;
                    tracking: null;
                    comments: undefined;
                    items: {
                        id: string;
                    }[];
                }[];
            };
        };
    };
};
export declare const mockPlaceOrderForPurchaseOrderPartialItemSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: {
            order: {
                id: string;
                items: {
                    id: string;
                }[];
            };
        };
    };
};
export declare const mockPlaceOrderForPurchaseOrderPartialTotalSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: {
            order: {
                id: string;
                total: {
                    grand_total: null;
                    subtotal: undefined;
                    total_tax: null;
                    total_shipping: undefined;
                    discounts: null;
                };
            };
        };
    };
};
export declare const mockPlaceOrderForPurchaseOrderNullArraysSnakeCase: {
    data: {
        placeOrderForPurchaseOrder: {
            order: {
                id: string;
                applied_coupons: null;
                applied_gift_cards: null;
                available_actions: null;
                items: null;
                shipments: null;
                payment_methods: null;
                comments: null;
                custom_attributes: null;
                credit_memos: null;
                invoices: null;
                items_eligible_for_return: null;
            };
        };
    };
};
export declare const mockPlacePurchaseOrderFullDataSnakeCase: {
    placePurchaseOrder: {
        purchase_order: {
            uid: string;
            number: string;
            status: string;
            created_at: string;
            updated_at: string;
            approval_flow: {
                status: string;
                rule: {
                    name: string;
                };
            }[];
            available_actions: string[];
            comments: {
                uid: string;
                text: string;
                created_at: string;
                author: {
                    firstname: string;
                    lastname: string;
                    email: string;
                };
            }[];
            created_by: {
                firstname: string;
                lastname: string;
                email: string;
            };
            history_log: {
                activity: string;
                date: string;
                author: {
                    firstname: string;
                    lastname: string;
                };
            }[];
            order: {
                id: string;
                number: string;
                is_virtual: boolean;
                applied_coupons: never[];
                applied_gift_cards: never[];
                billing_address: {
                    firstname: string;
                    lastname: string;
                };
                shipping_address: {
                    firstname: string;
                    lastname: string;
                };
                total: {
                    grand_total: {
                        value: number;
                        currency: string;
                    };
                };
            };
            quote: null;
        };
    };
};
export declare const mockPlacePurchaseOrderMinimalDataSnakeCase: {
    placePurchaseOrder: {
        purchase_order: {
            uid: string;
            number: string;
            status: string;
            created_at: string;
            updated_at: string;
            approval_flow: never[];
            available_actions: never[];
            comments: never[];
            created_by: null;
            history_log: never[];
            order: null;
            quote: null;
        };
    };
};
export declare const mockUpdatePurchaseOrderApprovalRuleFullDataSnakeCase: {
    data: {
        updatePurchaseOrderApprovalRule: {
            applies_to_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: {
                    id: string;
                    sort_order: number;
                    text: string;
                }[];
            }[];
            approver_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: {
                    id: string;
                    sort_order: number;
                    text: string;
                }[];
            }[];
            condition: {
                attribute: string;
                operator: string;
            };
            created_at: string;
            created_by: {
                firstname: string;
                lastname: string;
                email: string;
            };
            description: string;
            name: string;
            status: string;
            uid: string;
            updated_at: string;
        };
    };
};
export declare const mockUpdatePurchaseOrderApprovalRuleMinimalDataSnakeCase: {
    data: {
        updatePurchaseOrderApprovalRule: {
            applies_to_roles: never[];
            approver_roles: never[];
            condition: {
                attribute: string;
                operator: string;
            };
            created_at: string;
            created_by: null;
            description: string;
            name: string;
            status: string;
            uid: string;
            updated_at: string;
        };
    };
};
export declare const mockUpdatePurchaseOrderApprovalRuleNullDataSnakeCase: {
    data: {
        updatePurchaseOrderApprovalRule: {
            applies_to_roles: null;
            approver_roles: null;
            condition: null;
            created_at: null;
            created_by: null;
            description: null;
            name: null;
            status: null;
            uid: null;
            updated_at: null;
        };
    };
};
export declare const mockUpdatePurchaseOrderApprovalRuleNoDataSnakeCase: {
    data: undefined;
};
export declare const mockUpdatePurchaseOrderApprovalRulePartialRolesSnakeCase: {
    data: {
        updatePurchaseOrderApprovalRule: {
            applies_to_roles: {
                id: string;
                name: string;
                users_count: undefined;
                permissions: undefined;
            }[];
            approver_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: {
                    id: string;
                    sort_order: undefined;
                    text: string;
                }[];
            }[];
            condition: {
                attribute: string;
                operator: string;
            };
            created_at: string;
            created_by: null;
            description: string;
            name: string;
            status: string;
            uid: string;
            updated_at: string;
        };
    };
};
export declare const mockValidatePurchaseOrdersUndefinedValuesDataSnakeCase: {
    data: {
        validatePurchaseOrders: {
            errors: never[];
            purchase_orders: {
                uid: string;
                number: string;
                created_at: string;
                updated_at: string;
                status: string;
                available_actions: undefined;
            }[];
        };
    };
};
export declare const mockValidatePurchaseOrdersMixedDataSnakeCase: {
    data: {
        validatePurchaseOrders: {
            errors: {
                message: string;
                type: string;
            }[];
            purchase_orders: {
                uid: string;
                number: string;
                created_at: string;
                updated_at: string;
                status: string;
                available_actions: string[];
            }[];
        };
    };
};
export declare const mockValidatePurchaseOrdersComplexDataSnakeCase: {
    data: {
        validatePurchaseOrders: {
            errors: never[];
            purchase_orders: {
                __typename: string;
                approval_flow: {
                    status: string;
                    steps: {
                        step: number;
                        approver: string;
                        status: string;
                        timestamp: string;
                    }[];
                };
                available_actions: string[];
                comments: {
                    uid: string;
                    author: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                    message: string;
                    timestamp: string;
                }[];
                created_at: string;
                created_by: {
                    id: string;
                    firstname: string;
                    lastname: string;
                    email: string;
                    department: string;
                };
                history_log: {
                    action: string;
                    timestamp: string;
                    user: string;
                }[];
                number: string;
                order: null;
                quote: {
                    uid: string;
                    number: string;
                    total: {
                        value: number;
                        currency: string;
                    };
                    items: {
                        sku: string;
                        name: string;
                        quantity: number;
                        unit_price: number;
                        total_price: number;
                    }[];
                };
                status: string;
                uid: string;
                updated_at: string;
            }[];
        };
    };
};
export declare const mockValidatePurchaseOrdersErrorMissingFieldsDataSnakeCase: {
    data: {
        validatePurchaseOrders: {
            errors: ({
                message?: undefined;
                type?: undefined;
            } | {
                message: string;
                type?: undefined;
            } | {
                type: string;
                message?: undefined;
            })[];
            purchase_orders: never[];
        };
    };
};
export declare const mockValidatePurchaseOrdersMissingFieldsDataSnakeCase: {
    data: {
        validatePurchaseOrders: {
            errors: never[];
            purchase_orders: ({
                uid: string;
                __typename?: undefined;
                number?: undefined;
            } | {
                __typename: string;
                uid: string;
                number: string;
            })[];
        };
    };
};
export declare const mockAddPurchaseOrderCommentRequest: {
    purchaseOrderUid: string;
    comment: string;
};
export declare const mockAddPurchaseOrderCommentResponse: {
    data: {
        addPurchaseOrderComment: {
            comment: {
                created_at: string;
                text: string;
                uid: string;
                author: {
                    allow_remote_shopping_assistance: boolean;
                    confirmation_status: string;
                    created_at: string;
                    date_of_birth: string;
                    email: string;
                    firstname: string;
                    gender: number;
                    job_title: string;
                    lastname: string;
                    middlename: string;
                    prefix: string;
                    suffix: string;
                    telephone: string;
                };
            };
        };
    };
};
export declare const mockTransformedAddPurchaseOrderComment: {
    createdAt: string;
    text: string;
    uid: string;
    author: {
        allowRemoteShoppingAssistance: boolean;
        confirmationStatus: string;
        createdAt: string;
        dateOfBirth: string;
        email: string;
        firstname: string;
        gender: number;
        jobTitle: string;
        lastname: string;
        middlename: string;
        prefix: string;
        status: string;
        structureId: string;
        suffix: string;
        telephone: string;
    };
};
export declare const mockTransformPurchaseOrderApprovalRuleFullData: {
    uid: string;
    name: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    created_by: {
        firstname: string;
        lastname: string;
        email: string;
    };
    applies_to_roles: {
        id: string;
        name: string;
        users_count: number;
        permissions: {
            id: string;
            sort_order: number;
            text: string;
        }[];
    }[];
    approver_roles: {
        id: string;
        name: string;
        users_count: number;
        permissions: {
            id: string;
            sort_order: number;
            text: string;
        }[];
    }[];
    condition: {
        attribute: string;
        operator: string;
    };
};
export declare const mockTransformPurchaseOrderApprovalRulePartialData: {
    uid: string;
    name: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    created_by: null;
    applies_to_roles: never[];
    approver_roles: never[];
    condition: {
        attribute: string;
        operator: string;
    };
};
export declare const mockTransformPurchaseOrderApprovalRuleMinimalData: {
    uid: string;
    name: string;
};
export declare const mockTransformPurchaseOrderApprovalRuleEmptyData: {};
export declare const mockCreatePurchaseOrderApprovalRuleBasicResponse: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            description: string;
            status: string;
            created_at: string;
            updated_at: string;
            created_by: {
                name: string;
            };
            applies_to_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: never[];
            }[];
            approver_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: never[];
            }[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreatePurchaseOrderApprovalRuleQuantityResponse: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            created_by: {
                name: string;
            };
            applies_to_roles: never[];
            approver_roles: never[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreatePurchaseOrderApprovalRuleShippingResponse: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            created_by: {
                name: string;
            };
            applies_to_roles: never[];
            approver_roles: never[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreatePurchaseOrderApprovalRuleErrorResponse: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            created_by: null;
            applies_to_roles: never[];
            approver_roles: never[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
    errors: {
        message: string;
        extensions: {
            category: string;
        };
    }[];
};
export declare const mockCreatePurchaseOrderApprovalRuleMissingDataResponse: {
    data: undefined;
};
export declare const mockCreatePurchaseOrderApprovalRuleMissingRuleResponse: {
    data: {};
};
export declare const mockCreatePurchaseOrderApprovalRuleSimpleResponse: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            created_by: {
                name: string;
            };
            applies_to_roles: never[];
            approver_roles: never[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreatePurchaseOrderApprovalRuleMultipleRolesResponse: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            created_by: {
                name: string;
            };
            applies_to_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: never[];
            }[];
            approver_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: never[];
            }[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreatePurchaseOrderApprovalRuleLongNameResponse: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            created_by: {
                name: string;
            };
            applies_to_roles: never[];
            approver_roles: never[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreatePurchaseOrderApprovalRuleSpecialCharsResponse: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            created_by: {
                name: string;
            };
            applies_to_roles: never[];
            approver_roles: never[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreatePurchaseOrderApprovalRuleLargeAmountResponse: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            status: string;
            created_at: string;
            updated_at: string;
            created_by: {
                name: string;
            };
            applies_to_roles: never[];
            approver_roles: never[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockCreatePurchaseOrderApprovalRuleComplexResponse: {
    data: {
        createPurchaseOrderApprovalRule: {
            uid: string;
            name: string;
            description: string;
            status: string;
            created_at: string;
            updated_at: string;
            created_by: {
                name: string;
                email: string;
            };
            applies_to_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: {
                    id: string;
                    sort_order: number;
                    text: string;
                }[];
            }[];
            approver_roles: {
                id: string;
                name: string;
                users_count: number;
                permissions: {
                    id: string;
                    sort_order: number;
                    text: string;
                }[];
            }[];
            condition: {
                attribute: string;
                operator: string;
            };
        };
    };
};
export declare const mockGetPurchaseOrdersErrorSnakeCase: {
    data: {
        customer: {
            purchase_orders: {
                total_count: number;
                page_info: {
                    current_page: number;
                    page_size: number;
                    total_pages: number;
                };
                items: never[];
            };
        };
    };
    errors: {
        message: string;
    }[];
};
export declare const mockGetPurchaseOrdersSuccessSnakeCase: {
    data: {
        customer: {
            purchase_orders: {
                total_count: number;
                page_info: {
                    current_page: number;
                    page_size: number;
                    total_pages: number;
                };
                items: {
                    uid: string;
                    number: string;
                    status: string;
                    created_at: string;
                    updated_at: string;
                    available_actions: string[];
                    created_by: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                    order: {
                        id: string;
                        number: string;
                        total: {
                            grand_total: {
                                value: number;
                                currency: string;
                            };
                        };
                    };
                    quote: {
                        prices: {
                            grand_total: {
                                value: number;
                                currency: string;
                            };
                        };
                    };
                }[];
            };
        };
    };
};
export declare const mockFullPermissionsResponse: {
    data: {
        customer: {
            purchase_orders_enabled: boolean;
            role: {
                id: string;
                name: string;
                permissions: {
                    id: string;
                    text: string;
                    sort_order: number;
                    children: {
                        id: string;
                        text: string;
                        sort_order: number;
                        children: {
                            id: string;
                            text: string;
                            sort_order: number;
                            children: {
                                id: string;
                                text: string;
                                sort_order: number;
                                children: never[];
                            }[];
                        }[];
                    }[];
                }[];
            };
        };
    };
};
export declare const mockPartialPermissionsResponse: {
    data: {
        customer: {
            purchase_orders_enabled: boolean;
            role: {
                id: string;
                name: string;
                permissions: {
                    id: string;
                    text: string;
                    sort_order: number;
                    children: never[];
                }[];
            };
        };
    };
};
export declare const mockEmptyPermissionsResponse: {
    data: {
        customer: {
            purchase_orders_enabled: boolean;
            role: {
                id: string;
                name: string;
                permissions: never[];
            };
        };
    };
};
export declare const mockNullResponse: {
    data: {
        customer: {
            purchase_orders_enabled: null;
            role: {
                id: any;
                name: any;
                permissions: any;
            };
        };
    };
};
export declare const mockUndefinedResponse: {
    data: {
        customer: {
            purchase_orders_enabled: undefined;
            role: {
                id: any;
                name: any;
                permissions: any;
            };
        };
    };
};
export declare const mockNoCustomerResponse: {
    data: {
        customer: any;
    };
};
export declare const mockNoDataResponse: {
    data: any;
};
export declare const mockNoResponseData: any;
export declare const mockNullRoleResponse: {
    data: {
        customer: {
            purchase_orders_enabled: boolean;
            role: null;
        };
    };
};
export declare const mockGetPurchaseOrdersFullDataSnakeCase: {
    data: {
        customer: {
            purchase_orders: {
                total_count: number;
                page_info: {
                    current_page: number;
                    page_size: number;
                    total_pages: number;
                };
                items: ({
                    uid: string;
                    number: string;
                    status: string;
                    created_at: string;
                    updated_at: string;
                    available_actions: string[];
                    created_by: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                    order: {
                        id: string;
                        number: string;
                        total: {
                            grand_total: {
                                value: number;
                                currency: string;
                            };
                        };
                    };
                    quote: {
                        prices: {
                            grand_total: {
                                value: number;
                                currency: string;
                            };
                        };
                    };
                } | {
                    uid: string;
                    number: string;
                    status: string;
                    created_at: string;
                    updated_at: string;
                    available_actions: string[];
                    created_by: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                    order?: undefined;
                    quote?: undefined;
                })[];
            };
        };
    };
};
export declare const mockCurrencyInfoSuccessResponse: {
    data: {
        currency: {
            base_currency_code: string;
            available_currency_codes: string[];
        };
    };
    errors: undefined;
};
export declare const mockCurrencyInfoEmptyCodesResponse: {
    data: {
        currency: {
            base_currency_code: string;
            available_currency_codes: never[];
        };
    };
    errors: undefined;
};
export declare const mockCurrencyInfoNullBaseResponse: {
    data: {
        currency: {
            base_currency_code: null;
            available_currency_codes: string[];
        };
    };
    errors: undefined;
};
export declare const mockCurrencyInfoMissingDataResponse: {
    data: {
        currency: {
            base_currency_code: string;
            available_currency_codes: undefined;
        };
    };
    errors: undefined;
};
export declare const mockCurrencyInfoErrorResponse: {
    data: {
        currency: {
            base_currency_code: string;
            available_currency_codes: never[];
        };
    };
    errors: {
        message: string;
        extensions: {
            category: string;
        };
    }[];
};
export declare const mockGetPurchaseOrderApprovalRulesSuccessSnakeCase: {
    data: {
        customer: {
            email: string;
            purchase_order_approval_rules: {
                total_count: number;
                page_info: {
                    page_size: number;
                    current_page: number;
                    total_pages: number;
                };
                items: {
                    uid: string;
                    name: string;
                    description: string;
                    status: string;
                    created_at: string;
                    updated_at: string;
                    created_by: string;
                    applies_to_roles: {
                        id: string;
                        name: string;
                        users_count: number;
                        permissions: {
                            id: string;
                            sort_order: number;
                            text: string;
                            children: never[];
                        }[];
                    }[];
                    approver_roles: {
                        id: string;
                        name: string;
                        users_count: number;
                        permissions: {
                            id: string;
                            sort_order: number;
                            text: string;
                            children: never[];
                        }[];
                    }[];
                    condition: {
                        attribute: string;
                        operator: string;
                    };
                }[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRulesErrorSnakeCase: {
    errors: {
        message: string;
        extensions: {
            category: string;
        };
    }[];
};
export declare const mockCurrencyInfoNoDataResponse: {
    data: null;
    errors: undefined;
};
export declare const mockCurrencyInfoNoCurrencyResponse: {
    data: {};
    errors: undefined;
};
export declare const mockCurrencyInfoPartialResponse: {
    data: {
        currency: {
            base_currency_code: string;
            available_currency_codes: undefined;
        };
    };
    errors: undefined;
};
export declare const mockGetPurchaseOrderApprovalRulesEmptyDataSnakeCase: {
    data: {
        customer: {
            email: string;
            purchase_order_approval_rules: {
                total_count: number;
                page_info: {
                    page_size: number;
                    current_page: number;
                    total_pages: number;
                };
                items: never[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRulesIncompleteDataSnakeCase: {
    data: {
        customer: {
            email: string;
            purchase_order_approval_rules: {
                total_count: number;
                page_info: {
                    page_size: number;
                    current_page: number;
                    total_pages: number;
                };
                items: {
                    uid: string;
                    name: string;
                    description: null;
                    status: string;
                    created_at: string;
                    updated_at: string;
                    created_by: null;
                    applies_to_roles: never[];
                    approver_roles: never[];
                    condition: null;
                }[];
            };
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRulesNullDataSnakeCase: {
    data: {
        customer: {
            email: string;
            purchase_order_approval_rules: null;
        };
    };
};
export declare const mockGetPurchaseOrderApprovalRulesMissingRulesSnakeCase: {
    data: {
        customer: {
            email: string;
            purchase_order_approval_rules: {
                total_count: number;
                page_info: {
                    page_size: number;
                    current_page: number;
                    total_pages: number;
                };
            };
        };
    };
};
//# sourceMappingURL=index.d.ts.map