export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {
    [key: string]: unknown;
}, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: {
        input: string;
        output: string;
    };
    String: {
        input: string;
        output: string;
    };
    Boolean: {
        input: boolean;
        output: boolean;
    };
    Int: {
        input: number;
        output: number;
    };
    Float: {
        input: number;
        output: number;
    };
    JSON: {
        input: any;
        output: any;
    };
};
/** Defines the bundle products to add to the cart. */
export type AddBundleProductsToCartInput = {
    /** The ID of the cart. */
    cart_id: Scalars['String']['input'];
    /** An array of bundle products to add. */
    cart_items: Array<InputMaybe<BundleProductCartItemInput>>;
};
/** Contains details about the cart after adding bundle products. */
export type AddBundleProductsToCartOutput = {
    __typename?: 'AddBundleProductsToCartOutput';
    /** The cart after adding products. */
    cart: Cart;
};
/** Defines the configurable products to add to the cart. */
export type AddConfigurableProductsToCartInput = {
    /** The ID of the cart. */
    cart_id: Scalars['String']['input'];
    /** An array of configurable products to add. */
    cart_items: Array<InputMaybe<ConfigurableProductCartItemInput>>;
};
/** Contains details about the cart after adding configurable products. */
export type AddConfigurableProductsToCartOutput = {
    __typename?: 'AddConfigurableProductsToCartOutput';
    /** The cart after adding products. */
    cart: Cart;
};
export type AddDownloadableProductsToCartInput = {
    /** The ID of the cart. */
    cart_id: Scalars['String']['input'];
    /** An array of downloadable products to add. */
    cart_items: Array<InputMaybe<DownloadableProductCartItemInput>>;
};
/** Contains details about the cart after adding downloadable products. */
export type AddDownloadableProductsToCartOutput = {
    __typename?: 'AddDownloadableProductsToCartOutput';
    /** The cart after adding products. */
    cart: Cart;
};
/** Defines an item to add to the gift registry. */
export type AddGiftRegistryItemInput = {
    /** An array of options the customer has entered. */
    entered_options?: InputMaybe<Array<InputMaybe<EnteredOptionInput>>>;
    /** A brief note about the item. */
    note?: InputMaybe<Scalars['String']['input']>;
    /** For complex product types, the SKU of the parent product. */
    parent_sku?: InputMaybe<Scalars['String']['input']>;
    /** The quantity of the product to add. */
    quantity: Scalars['Float']['input'];
    /** An array of strings corresponding to options the customer has selected. */
    selected_options?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    /** The SKU of the product to add to the gift registry. */
    sku: Scalars['String']['input'];
};
/** Defines a new registrant. */
export type AddGiftRegistryRegistrantInput = {
    /** Additional attributes specified as a code-value pair. */
    dynamic_attributes?: InputMaybe<Array<InputMaybe<GiftRegistryDynamicAttributeInput>>>;
    /** The email address of the registrant. */
    email: Scalars['String']['input'];
    /** The first name of the registrant. */
    firstname: Scalars['String']['input'];
    /** The last name of the registrant. */
    lastname: Scalars['String']['input'];
};
/** Contains the results of a request to add registrants. */
export type AddGiftRegistryRegistrantsOutput = {
    __typename?: 'AddGiftRegistryRegistrantsOutput';
    /** The gift registry after adding registrants. */
    gift_registry?: Maybe<GiftRegistry>;
};
/** Contains details about the cart after adding products to it. */
export type AddProductsToCartOutput = {
    __typename?: 'AddProductsToCartOutput';
    /** The cart after products have been added. */
    cart: Cart;
    /** Contains errors encountered while adding an item to the cart. */
    user_errors: Array<Maybe<CartUserInputError>>;
};
/** Contains products to add to an existing compare list. */
export type AddProductsToCompareListInput = {
    /** An array of product IDs to add to the compare list. */
    products: Array<InputMaybe<Scalars['ID']['input']>>;
    /** The unique identifier of the compare list to modify. */
    uid: Scalars['ID']['input'];
};
/** Contains the customer's wish list and any errors encountered. */
export type AddProductsToWishlistOutput = {
    __typename?: 'AddProductsToWishlistOutput';
    /** An array of errors encountered while adding products to a wish list. */
    user_errors: Array<Maybe<WishListUserInputError>>;
    /** Contains the wish list with all items that were successfully added. */
    wishlist: Wishlist;
};
/** Defines a return comment. */
export type AddReturnCommentInput = {
    /** The text added to the return request. */
    comment_text: Scalars['String']['input'];
    /** The unique ID for a `Return` object. */
    return_uid: Scalars['ID']['input'];
};
/** Contains details about the return request. */
export type AddReturnCommentOutput = {
    __typename?: 'AddReturnCommentOutput';
    /** The modified return. */
    return?: Maybe<Return>;
};
/** Defines tracking information to be added to the return. */
export type AddReturnTrackingInput = {
    /** The unique ID for a `ReturnShippingCarrier` object. */
    carrier_uid: Scalars['ID']['input'];
    /** The unique ID for a `Returns` object. */
    return_uid: Scalars['ID']['input'];
    /** The shipping tracking number for this return request. */
    tracking_number: Scalars['String']['input'];
};
/** Contains the response after adding tracking information. */
export type AddReturnTrackingOutput = {
    __typename?: 'AddReturnTrackingOutput';
    /** Details about the modified return. */
    return?: Maybe<Return>;
    /** Details about shipping for a return. */
    return_shipping_tracking?: Maybe<ReturnShippingTracking>;
};
/** Defines the simple and group products to add to the cart. */
export type AddSimpleProductsToCartInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** An array of simple and group items to add. */
    cart_items: Array<InputMaybe<SimpleProductCartItemInput>>;
};
/** Contains details about the cart after adding simple or group products. */
export type AddSimpleProductsToCartOutput = {
    __typename?: 'AddSimpleProductsToCartOutput';
    /** The cart after adding products. */
    cart: Cart;
};
/** Defines the virtual products to add to the cart. */
export type AddVirtualProductsToCartInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** An array of virtual products to add. */
    cart_items: Array<InputMaybe<VirtualProductCartItemInput>>;
};
/** Contains details about the cart after adding virtual products. */
export type AddVirtualProductsToCartOutput = {
    __typename?: 'AddVirtualProductsToCartOutput';
    /** The cart after adding products. */
    cart: Cart;
};
/** Contains the resultant wish list and any error information. */
export type AddWishlistItemsToCartOutput = {
    __typename?: 'AddWishlistItemsToCartOutput';
    /** An array of errors encountered while adding products to the customer's cart. */
    add_wishlist_items_to_cart_user_errors: Array<Maybe<WishlistCartUserInputError>>;
    /** Indicates whether the attempt to add items to the customer's cart was successful. */
    status: Scalars['Boolean']['output'];
    /** Contains the wish list with all items that were successfully added. */
    wishlist: Wishlist;
};
/** Contains information for each filterable option (such as price, category `UID`, and custom attributes). */
export type Aggregation = {
    __typename?: 'Aggregation';
    /** Attribute code of the aggregation group. */
    attribute_code: Scalars['String']['output'];
    /** The number of options in the aggregation group. */
    count?: Maybe<Scalars['Int']['output']>;
    /** The aggregation display name. */
    label?: Maybe<Scalars['String']['output']>;
    /** Array of options for the aggregation. */
    options?: Maybe<Array<Maybe<AggregationOption>>>;
    /** The relative position of the attribute in a layered navigation block. */
    position?: Maybe<Scalars['Int']['output']>;
};
/** An implementation of `AggregationOptionInterface`. */
export type AggregationOption = AggregationOptionInterface & {
    __typename?: 'AggregationOption';
    /** The number of items that match the aggregation option. */
    count?: Maybe<Scalars['Int']['output']>;
    /** The display label for an aggregation option. */
    label?: Maybe<Scalars['String']['output']>;
    /** The internal ID that represents the value of the option. */
    value: Scalars['String']['output'];
};
/** Defines aggregation option fields. */
export type AggregationOptionInterface = {
    /** The number of items that match the aggregation option. */
    count?: Maybe<Scalars['Int']['output']>;
    /** The display label for an aggregation option. */
    label?: Maybe<Scalars['String']['output']>;
    /** The internal ID that represents the value of the option. */
    value: Scalars['String']['output'];
};
/** Filter category aggregations in layered navigation. */
export type AggregationsCategoryFilterInput = {
    /** Indicates whether to include only direct subcategories or all children categories at all levels. */
    includeDirectChildrenOnly?: InputMaybe<Scalars['Boolean']['input']>;
};
/** An input object that specifies the filters used in product aggregations. */
export type AggregationsFilterInput = {
    /** Filter category aggregations in layered navigation. */
    category?: InputMaybe<AggregationsCategoryFilterInput>;
};
export type ApplePayConfig = PaymentConfigItem & {
    __typename?: 'ApplePayConfig';
    /** The styles for the ApplePay Smart Button configuration */
    button_styles?: Maybe<ButtonStyles>;
    /** The payment method code as defined in the payment gateway */
    code?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the payment method is displayed */
    is_visible?: Maybe<Scalars['Boolean']['output']>;
    /** Defines the payment intent (Authorize or Capture */
    payment_intent?: Maybe<Scalars['String']['output']>;
    /** The payment source for the payment method */
    payment_source?: Maybe<Scalars['String']['output']>;
    /** The PayPal parameters required to load the JS SDK */
    sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
    /** The relative order the payment method is displayed on the checkout page */
    sort_order?: Maybe<Scalars['String']['output']>;
    /** The name displayed for the payment method */
    title?: Maybe<Scalars['String']['output']>;
};
/** Apple Pay inputs */
export type ApplePayMethodInput = {
    /** The payment source for the payment method */
    payment_source?: InputMaybe<Scalars['String']['input']>;
    /** The payment services order ID */
    payments_order_id?: InputMaybe<Scalars['String']['input']>;
    /** PayPal order ID */
    paypal_order_id?: InputMaybe<Scalars['String']['input']>;
};
/** Contains the applied coupon code. */
export type AppliedCoupon = {
    __typename?: 'AppliedCoupon';
    /** The coupon code the shopper applied to the card. */
    code: Scalars['String']['output'];
};
/** Contains an applied gift card with applied and remaining balance. */
export type AppliedGiftCard = {
    __typename?: 'AppliedGiftCard';
    /** The amount applied to the current cart. */
    applied_balance?: Maybe<Money>;
    /** The gift card account code. */
    code?: Maybe<Scalars['String']['output']>;
    /** The remaining balance on the gift card. */
    current_balance?: Maybe<Money>;
    /** The expiration date of the gift card. */
    expiration_date?: Maybe<Scalars['String']['output']>;
};
/** Contains the applied and current balances. */
export type AppliedStoreCredit = {
    __typename?: 'AppliedStoreCredit';
    /** The applied store credit balance to the current cart. */
    applied_balance?: Maybe<Money>;
    /** The current balance remaining on store credit. */
    current_balance?: Maybe<Money>;
    /** Indicates whether store credits are enabled. If the feature is disabled, then the current balance will not be returned. */
    enabled?: Maybe<Scalars['Boolean']['output']>;
};
/** Specifies the coupon code to apply to the cart. */
export type ApplyCouponToCartInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** A valid coupon code. */
    coupon_code: Scalars['String']['input'];
};
/** Contains details about the cart after applying a coupon. */
export type ApplyCouponToCartOutput = {
    __typename?: 'ApplyCouponToCartOutput';
    /** The cart after applying a coupon. */
    cart: Cart;
};
/** The strategy to apply coupons to the cart. */
export declare enum ApplyCouponsStrategy {
    /** Append new coupons keeping the coupons that have been applied before. */
    Append = "APPEND",
    /** Remove all the coupons from the cart and apply only new provided coupons. */
    Replace = "REPLACE"
}
/** Apply coupons to the cart. */
export type ApplyCouponsToCartInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** An array of valid coupon codes. */
    coupon_codes: Array<InputMaybe<Scalars['String']['input']>>;
    /** `replace` to replace the existing coupon(s) or `append` to add the coupon to the coupon(s) list. */
    type?: InputMaybe<ApplyCouponsStrategy>;
};
/** Defines the input required to run the `applyGiftCardToCart` mutation. */
export type ApplyGiftCardToCartInput = {
    /** The unique ID that identifies the customer's cart. */
    cart_id: Scalars['String']['input'];
    /** The gift card code to be applied to the cart. */
    gift_card_code: Scalars['String']['input'];
};
/** Defines the possible output for the `applyGiftCardToCart` mutation. */
export type ApplyGiftCardToCartOutput = {
    __typename?: 'ApplyGiftCardToCartOutput';
    /** Describes the contents of the specified shopping cart. */
    cart: Cart;
};
/** Contains the customer cart. */
export type ApplyRewardPointsToCartOutput = {
    __typename?: 'ApplyRewardPointsToCartOutput';
    /** The customer cart after reward points are applied. */
    cart: Cart;
};
/** Defines the input required to run the `applyStoreCreditToCart` mutation. */
export type ApplyStoreCreditToCartInput = {
    /** The unique ID that identifies the customer's cart. */
    cart_id: Scalars['String']['input'];
};
/** Defines the possible output for the `applyStoreCreditToCart` mutation. */
export type ApplyStoreCreditToCartOutput = {
    __typename?: 'ApplyStoreCreditToCartOutput';
    /** The contents of the specified shopping cart. */
    cart: Cart;
};
/** AreaInput defines the parameters which will be used for filter by specified location. */
export type AreaInput = {
    /** The radius for the search in KM. */
    radius: Scalars['Int']['input'];
    /** The country code where search must be performed. Required parameter together with region, city or postcode. */
    search_term: Scalars['String']['input'];
};
/** Contains the results of the request to assign a compare list. */
export type AssignCompareListToCustomerOutput = {
    __typename?: 'AssignCompareListToCustomerOutput';
    /** The contents of the customer's compare list. */
    compare_list?: Maybe<CompareList>;
    /** Indicates whether the compare list was successfully assigned to the customer. */
    result: Scalars['Boolean']['output'];
};
/** Contains details about the attribute, including the code and type. */
export type Attribute = {
    __typename?: 'Attribute';
    /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
    attribute_code?: Maybe<Scalars['String']['output']>;
    /** Attribute options list. */
    attribute_options?: Maybe<Array<Maybe<AttributeOption>>>;
    /** The data type of the attribute. */
    attribute_type?: Maybe<Scalars['String']['output']>;
    /** The type of entity that defines the attribute. */
    entity_type?: Maybe<Scalars['String']['output']>;
    /** The frontend input type of the attribute. */
    input_type?: Maybe<Scalars['String']['output']>;
    /** Details about the storefront properties configured for the attribute. */
    storefront_properties?: Maybe<StorefrontProperties>;
};
/** List of all entity types. Populated by the modules introducing EAV entities. */
export declare enum AttributeEntityTypeEnum {
    CatalogCategory = "CATALOG_CATEGORY",
    CatalogProduct = "CATALOG_PRODUCT",
    Customer = "CUSTOMER",
    CustomerAddress = "CUSTOMER_ADDRESS",
    RmaItem = "RMA_ITEM"
}
/** An input object that specifies the filters used for attributes. */
export type AttributeFilterInput = {
    /** Whether a product or category attribute can be compared against another or not. */
    is_comparable?: InputMaybe<Scalars['Boolean']['input']>;
    /** Whether a product or category attribute can be filtered or not. */
    is_filterable?: InputMaybe<Scalars['Boolean']['input']>;
    /** Whether a product or category attribute can be filtered in search or not. */
    is_filterable_in_search?: InputMaybe<Scalars['Boolean']['input']>;
    /** Whether a product or category attribute can use HTML on front or not. */
    is_html_allowed_on_front?: InputMaybe<Scalars['Boolean']['input']>;
    /** Whether a product or category attribute can be searched or not. */
    is_searchable?: InputMaybe<Scalars['Boolean']['input']>;
    /** Whether a customer or customer address attribute is used for customer segment or not. */
    is_used_for_customer_segment?: InputMaybe<Scalars['Boolean']['input']>;
    /** Whether a product or category attribute can be used for price rules or not. */
    is_used_for_price_rules?: InputMaybe<Scalars['Boolean']['input']>;
    /** Whether a product or category attribute is used for promo rules or not. */
    is_used_for_promo_rules?: InputMaybe<Scalars['Boolean']['input']>;
    /** Whether a product or category attribute is visible in advanced search or not. */
    is_visible_in_advanced_search?: InputMaybe<Scalars['Boolean']['input']>;
    /** Whether a product or category attribute is visible on front or not. */
    is_visible_on_front?: InputMaybe<Scalars['Boolean']['input']>;
    /** Whether a product or category attribute has WYSIWYG enabled or not. */
    is_wysiwyg_enabled?: InputMaybe<Scalars['Boolean']['input']>;
    /** Whether a product or category attribute is used in product listing or not. */
    used_in_product_listing?: InputMaybe<Scalars['Boolean']['input']>;
};
/** EAV attribute frontend input types. */
export declare enum AttributeFrontendInputEnum {
    Boolean = "BOOLEAN",
    Date = "DATE",
    Datetime = "DATETIME",
    File = "FILE",
    Gallery = "GALLERY",
    Hidden = "HIDDEN",
    Image = "IMAGE",
    MediaImage = "MEDIA_IMAGE",
    Multiline = "MULTILINE",
    Multiselect = "MULTISELECT",
    Price = "PRICE",
    Select = "SELECT",
    Text = "TEXT",
    Textarea = "TEXTAREA",
    Undefined = "UNDEFINED",
    Weight = "WEIGHT"
}
/** Defines the attribute characteristics to search for the `attribute_code` and `entity_type` to search. */
export type AttributeInput = {
    /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
    attribute_code?: InputMaybe<Scalars['String']['input']>;
    /** The type of entity that defines the attribute. */
    entity_type?: InputMaybe<Scalars['String']['input']>;
};
/** Specifies selected option for a select or multiselect attribute value. */
export type AttributeInputSelectedOption = {
    /** The attribute option value. */
    value: Scalars['String']['input'];
};
/** Base EAV implementation of CustomAttributeMetadataInterface. */
export type AttributeMetadata = CustomAttributeMetadataInterface & {
    __typename?: 'AttributeMetadata';
    /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
    code: Scalars['ID']['output'];
    /** Default attribute value. */
    default_value?: Maybe<Scalars['String']['output']>;
    /** The type of entity that defines the attribute. */
    entity_type: AttributeEntityTypeEnum;
    /** The frontend class of the attribute. */
    frontend_class?: Maybe<Scalars['String']['output']>;
    /** The frontend input type of the attribute. */
    frontend_input?: Maybe<AttributeFrontendInputEnum>;
    /** Whether the attribute value is required. */
    is_required: Scalars['Boolean']['output'];
    /** Whether the attribute value must be unique. */
    is_unique: Scalars['Boolean']['output'];
    /** The label assigned to the attribute. */
    label?: Maybe<Scalars['String']['output']>;
    /** Attribute options. */
    options: Array<Maybe<CustomAttributeOptionInterface>>;
};
/** Attribute metadata retrieval error. */
export type AttributeMetadataError = {
    __typename?: 'AttributeMetadataError';
    /** Attribute metadata retrieval error message. */
    message: Scalars['String']['output'];
    /** Attribute metadata retrieval error type. */
    type: AttributeMetadataErrorType;
};
/** Attribute metadata retrieval error types. */
export declare enum AttributeMetadataErrorType {
    /** The requested attribute was not found. */
    AttributeNotFound = "ATTRIBUTE_NOT_FOUND",
    /** The requested entity was not found. */
    EntityNotFound = "ENTITY_NOT_FOUND",
    /** The filter cannot be applied as it does not belong to the entity */
    FilterNotFound = "FILTER_NOT_FOUND",
    /** Not categorized error, see the error message. */
    Undefined = "UNDEFINED"
}
/** Defines an attribute option. */
export type AttributeOption = {
    __typename?: 'AttributeOption';
    /** The label assigned to the attribute option. */
    label?: Maybe<Scalars['String']['output']>;
    /** The attribute option value. */
    value?: Maybe<Scalars['String']['output']>;
};
/** Base EAV implementation of CustomAttributeOptionInterface. */
export type AttributeOptionMetadata = CustomAttributeOptionInterface & {
    __typename?: 'AttributeOptionMetadata';
    /** Is the option value default. */
    is_default: Scalars['Boolean']['output'];
    /** The label assigned to the attribute option. */
    label: Scalars['String']['output'];
    /** The attribute option value. */
    value: Scalars['String']['output'];
};
export type AttributeSelectedOption = AttributeSelectedOptionInterface & {
    __typename?: 'AttributeSelectedOption';
    /** The attribute selected option label. */
    label: Scalars['String']['output'];
    /** The attribute selected option value. */
    value: Scalars['String']['output'];
};
export type AttributeSelectedOptionInterface = {
    /** The attribute selected option label. */
    label: Scalars['String']['output'];
    /** The attribute selected option value. */
    value: Scalars['String']['output'];
};
export type AttributeSelectedOptions = AttributeValueInterface & {
    __typename?: 'AttributeSelectedOptions';
    /** The attribute code. */
    code: Scalars['ID']['output'];
    selected_options: Array<Maybe<AttributeSelectedOptionInterface>>;
};
export type AttributeValue = AttributeValueInterface & {
    __typename?: 'AttributeValue';
    /** The attribute code. */
    code: Scalars['ID']['output'];
    /** The attribute value. */
    value: Scalars['String']['output'];
};
/** Specifies the value for attribute. */
export type AttributeValueInput = {
    /** The code of the attribute. */
    attribute_code: Scalars['String']['input'];
    /** An array containing selected options for a select or multiselect attribute. */
    selected_options?: InputMaybe<Array<InputMaybe<AttributeInputSelectedOption>>>;
    /** The value assigned to the attribute. */
    value?: InputMaybe<Scalars['String']['input']>;
};
export type AttributeValueInterface = {
    /** The attribute code. */
    code: Scalars['ID']['output'];
};
/** Metadata of EAV attributes associated to form */
export type AttributesFormOutput = {
    __typename?: 'AttributesFormOutput';
    /** Errors of retrieving certain attributes metadata. */
    errors: Array<Maybe<AttributeMetadataError>>;
    /** Requested attributes metadata. */
    items: Array<Maybe<CustomAttributeMetadataInterface>>;
};
/** Metadata of EAV attributes. */
export type AttributesMetadataOutput = {
    __typename?: 'AttributesMetadataOutput';
    /** Errors of retrieving certain attributes metadata. */
    errors: Array<Maybe<AttributeMetadataError>>;
    /** Requested attributes metadata. */
    items: Array<Maybe<CustomAttributeMetadataInterface>>;
};
/** Describes a payment method that the shopper can use to pay for the order. */
export type AvailablePaymentMethod = {
    __typename?: 'AvailablePaymentMethod';
    /** The payment method code. */
    code: Scalars['String']['output'];
    /** If the payment method is an online integration */
    is_deferred: Scalars['Boolean']['output'];
    /** The payment method title. */
    title: Scalars['String']['output'];
};
/** Contains details about the possible shipping methods and carriers. */
export type AvailableShippingMethod = {
    __typename?: 'AvailableShippingMethod';
    /** The cost of shipping using this shipping method. */
    amount: Money;
    /** Indicates whether this shipping method can be applied to the cart. */
    available: Scalars['Boolean']['output'];
    /** @deprecated The field should not be used on the storefront. */
    base_amount?: Maybe<Money>;
    /** A string that identifies a commercial carrier or an offline shipping method. */
    carrier_code: Scalars['String']['output'];
    /** The label for the carrier code. */
    carrier_title: Scalars['String']['output'];
    /** Describes an error condition. */
    error_message?: Maybe<Scalars['String']['output']>;
    /** A shipping method code associated with a carrier. The value could be null if no method is available. */
    method_code?: Maybe<Scalars['String']['output']>;
    /** The label for the shipping method code. The value could be null if no method is available. */
    method_title?: Maybe<Scalars['String']['output']>;
    /** The cost of shipping using this shipping method, excluding tax. */
    price_excl_tax: Money;
    /** The cost of shipping using this shipping method, including tax. */
    price_incl_tax: Money;
};
export declare enum BatchMutationStatus {
    Failure = "FAILURE",
    MixedResults = "MIXED_RESULTS",
    Success = "SUCCESS"
}
/** Defines the billing address. */
export type BillingAddressInput = {
    /** Defines a billing address. */
    address?: InputMaybe<CartAddressInput>;
    /** An ID from the customer's address book that uniquely identifies the address to be used for billing. */
    customer_address_id?: InputMaybe<Scalars['Int']['input']>;
    /** Indicates whether to set the billing address to be the same as the existing shipping address on the cart. */
    same_as_shipping?: InputMaybe<Scalars['Boolean']['input']>;
    /** Indicates whether to set the shipping address to be the same as this billing address. */
    use_for_shipping?: InputMaybe<Scalars['Boolean']['input']>;
};
/** Contains details about the billing address. */
export type BillingCartAddress = CartAddressInterface & {
    __typename?: 'BillingCartAddress';
    /** The city specified for the billing or shipping address. */
    city: Scalars['String']['output'];
    /** The company specified for the billing or shipping address. */
    company?: Maybe<Scalars['String']['output']>;
    /** An object containing the country label and code. */
    country: CartAddressCountry;
    /** The custom attribute values of the billing or shipping address. */
    custom_attributes: Array<Maybe<AttributeValueInterface>>;
    /** @deprecated The field is used only in shipping address. */
    customer_notes?: Maybe<Scalars['String']['output']>;
    /** The customer's fax number. */
    fax?: Maybe<Scalars['String']['output']>;
    /** The first name of the customer or guest. */
    firstname: Scalars['String']['output'];
    /** The last name of the customer or guest. */
    lastname: Scalars['String']['output'];
    /** The middle name of the person associated with the billing/shipping address. */
    middlename?: Maybe<Scalars['String']['output']>;
    /** The ZIP or postal code of the billing or shipping address. */
    postcode?: Maybe<Scalars['String']['output']>;
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']['output']>;
    /** An object containing the region label and code. */
    region?: Maybe<CartAddressRegion>;
    /** An array containing the street for the billing or shipping address. */
    street: Array<Maybe<Scalars['String']['output']>>;
    /** A value such as Sr., Jr., or III. */
    suffix?: Maybe<Scalars['String']['output']>;
    /** The telephone number for the billing or shipping address. */
    telephone?: Maybe<Scalars['String']['output']>;
    /** The unique id of the customer address. */
    uid: Scalars['String']['output'];
    /** The VAT company number for billing or shipping address. */
    vat_id?: Maybe<Scalars['String']['output']>;
};
export type Boolean_Container = {
    __typename?: 'Boolean_container';
    Boolean?: Maybe<Scalars['Boolean']['output']>;
};
export type BraintreeCcVaultInput = {
    device_data?: InputMaybe<Scalars['String']['input']>;
    public_hash: Scalars['String']['input'];
};
export type BraintreeInput = {
    /** Contains a fingerprint provided by Braintree JS SDK and should be sent with sale transaction details to the Braintree payment gateway. */
    device_data?: InputMaybe<Scalars['String']['input']>;
    /** States whether the payment details (Credit/Debit Card, PayPal Account) entered by a customer should be tokenized for later usage. Required only if Vault is enabled for the relevant Braintree payment integration. */
    is_active_payment_token_enabler: Scalars['Boolean']['input'];
    /** The one-time payment token generated by Braintree payment gateway based on payment details (Card, PayPal). Required field to make sale transaction. */
    payment_method_nonce: Scalars['String']['input'];
};
export type BraintreeVaultInput = {
    device_data?: InputMaybe<Scalars['String']['input']>;
    public_hash: Scalars['String']['input'];
};
/** Contains details about an individual category that comprises a breadcrumb. */
export type Breadcrumb = {
    __typename?: 'Breadcrumb';
    /**
     * The ID of the category.
     * @deprecated Use `category_uid` instead.
     */
    category_id?: Maybe<Scalars['Int']['output']>;
    /** The category level. */
    category_level?: Maybe<Scalars['Int']['output']>;
    /** The display name of the category. */
    category_name?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `Breadcrumb` object. */
    category_uid: Scalars['ID']['output'];
    /** The URL key of the category. */
    category_url_key?: Maybe<Scalars['String']['output']>;
    /** The URL path of the category. */
    category_url_path?: Maybe<Scalars['String']['output']>;
};
/** An implementation for bundle product cart items. */
export type BundleCartItem = CartItemInterface & {
    __typename?: 'BundleCartItem';
    /** The list of available gift wrapping options for the cart item. */
    available_gift_wrapping: Array<Maybe<GiftWrapping>>;
    /** An array containing the bundle options the shopper selected. */
    bundle_options: Array<Maybe<SelectedBundleOption>>;
    /** An array containing the customizable options the shopper selected. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** An array of errors encountered while loading the cart item */
    errors?: Maybe<Array<Maybe<CartItemError>>>;
    /** The entered gift message for the cart item */
    gift_message?: Maybe<GiftMessage>;
    /** The selected gift wrapping for the cart item. */
    gift_wrapping?: Maybe<GiftWrapping>;
    /** @deprecated Use `uid` instead. */
    id: Scalars['String']['output'];
    /** True if requested quantity is less than available stock, false otherwise. */
    is_available: Scalars['Boolean']['output'];
    /** Message to display when the product is not available with this selected option. */
    not_available_message?: Maybe<Scalars['String']['output']>;
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<CartItemPrices>;
    /** Details about an item in the cart. */
    product: ProductInterface;
    /** The quantity of this item in the cart. */
    quantity: Scalars['Float']['output'];
    /** The unique ID for a `CartItemInterface` object. */
    uid: Scalars['ID']['output'];
};
/** Defines bundle product options for `CreditMemoItemInterface`. */
export type BundleCreditMemoItem = CreditMemoItemInterface & {
    __typename?: 'BundleCreditMemoItem';
    /** A list of bundle options that are assigned to a bundle product that is part of a credit memo. */
    bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
    /** Details about the final discount amount for the base product, including discounts on options. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** The unique ID for a `CreditMemoItemInterface` object. */
    id: Scalars['ID']['output'];
    /** The order item the credit memo is applied to. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product, including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of refunded items. */
    quantity_refunded?: Maybe<Scalars['Float']['output']>;
};
/** Defines bundle product options for `InvoiceItemInterface`. */
export type BundleInvoiceItem = InvoiceItemInterface & {
    __typename?: 'BundleInvoiceItem';
    /** A list of bundle options that are assigned to an invoiced bundle product. */
    bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
    /** Information about the final discount amount for the base product, including discounts on options. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** The unique ID for an `InvoiceItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Details about an individual order item. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of invoiced items. */
    quantity_invoiced?: Maybe<Scalars['Float']['output']>;
};
/** Defines an individual item within a bundle product. */
export type BundleItem = {
    __typename?: 'BundleItem';
    /**
     * An ID assigned to each type of item in a bundle product.
     * @deprecated Use `uid` instead
     */
    option_id?: Maybe<Scalars['Int']['output']>;
    /** An array of additional options for this bundle item. */
    options?: Maybe<Array<Maybe<BundleItemOption>>>;
    /** A number indicating the sequence order of this item compared to the other bundle items. */
    position?: Maybe<Scalars['Int']['output']>;
    /** The range of prices for the product */
    price_range: PriceRange;
    /** Indicates whether the item must be included in the bundle. */
    required?: Maybe<Scalars['Boolean']['output']>;
    /** The SKU of the bundle product. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The display name of the item. */
    title?: Maybe<Scalars['String']['output']>;
    /** The input type that the customer uses to select the item. Examples include radio button and checkbox. */
    type?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `BundleItem` object. */
    uid?: Maybe<Scalars['ID']['output']>;
};
/** Defines the characteristics that comprise a specific bundle item and its options. */
export type BundleItemOption = {
    __typename?: 'BundleItemOption';
    /** Indicates whether the customer can change the number of items for this option. */
    can_change_quantity?: Maybe<Scalars['Boolean']['output']>;
    /**
     * The ID assigned to the bundled item option.
     * @deprecated Use `uid` instead
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether this option is the default option. */
    is_default?: Maybe<Scalars['Boolean']['output']>;
    /** The text that identifies the bundled item option. */
    label?: Maybe<Scalars['String']['output']>;
    /** When a bundle item contains multiple options, the relative position of this option compared to the other options. */
    position?: Maybe<Scalars['Int']['output']>;
    /** The price of the selected option. */
    price?: Maybe<Scalars['Float']['output']>;
    /** One of FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>;
    /** Contains details about this product option. */
    product?: Maybe<ProductInterface>;
    /**
     * Indicates the quantity of this specific bundle item.
     * @deprecated Use `quantity` instead.
     */
    qty?: Maybe<Scalars['Float']['output']>;
    /** The quantity of this specific bundle item. */
    quantity?: Maybe<Scalars['Float']['output']>;
    /** The unique ID for a `BundleItemOption` object. */
    uid: Scalars['ID']['output'];
};
/** Defines the input for a bundle option. */
export type BundleOptionInput = {
    /** The ID of the option. */
    id: Scalars['Int']['input'];
    /** The number of the selected item to add to the cart. */
    quantity: Scalars['Float']['input'];
    /** An array with the chosen value of the option. */
    value: Array<InputMaybe<Scalars['String']['input']>>;
};
/** Defines bundle product options for `OrderItemInterface`. */
export type BundleOrderItem = OrderItemInterface & {
    __typename?: 'BundleOrderItem';
    /** A list of bundle options that are assigned to the bundle product. */
    bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
    /** The final discount information for the product. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** Indicates whether the order item is eligible to be in a return request. */
    eligible_for_return?: Maybe<Scalars['Boolean']['output']>;
    /** The entered option for the base product, such as a logo or image. */
    entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
    /** The selected gift message for the order item */
    gift_message?: Maybe<GiftMessage>;
    /** The selected gift wrapping for the order item. */
    gift_wrapping?: Maybe<GiftWrapping>;
    /** The unique ID for an `OrderItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<OrderItemPrices>;
    /** The ProductInterface object, which contains details about the base product */
    product?: Maybe<ProductInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price of the base product, including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The type of product, such as simple, configurable, etc. */
    product_type?: Maybe<Scalars['String']['output']>;
    /** URL key of the base product. */
    product_url_key?: Maybe<Scalars['String']['output']>;
    /** The number of canceled items. */
    quantity_canceled?: Maybe<Scalars['Float']['output']>;
    /** The number of invoiced items. */
    quantity_invoiced?: Maybe<Scalars['Float']['output']>;
    /** The number of units ordered for this item. */
    quantity_ordered?: Maybe<Scalars['Float']['output']>;
    /** The number of refunded items. */
    quantity_refunded?: Maybe<Scalars['Float']['output']>;
    /** The number of returned items. */
    quantity_returned?: Maybe<Scalars['Float']['output']>;
    /** The number of shipped items. */
    quantity_shipped?: Maybe<Scalars['Float']['output']>;
    /** The selected options for the base product, such as color or size. */
    selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
    /** The status of the order item. */
    status?: Maybe<Scalars['String']['output']>;
};
/** Defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProduct = CustomizableProductInterface & PhysicalProductInterface & ProductInterface & RoutableInterface & {
    __typename?: 'BundleProduct';
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_announcement_date?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_brand?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_custom_engraving_text?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_detailed_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_pagebuilder_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_gemstone_addon?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_recyclable_material?: Maybe<Scalars['Int']['output']>;
    /**
     * The attribute set assigned to the product.
     * @deprecated The field should not be used on the storefront.
     */
    attribute_set_id?: Maybe<Scalars['Int']['output']>;
    /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
    canonical_url?: Maybe<Scalars['String']['output']>;
    /** The categories assigned to a product. */
    categories?: Maybe<Array<Maybe<CategoryInterface>>>;
    /** @deprecated Use the `custom_attributes` field instead. */
    color?: Maybe<Scalars['Int']['output']>;
    /** The product's country of origin. */
    country_of_manufacture?: Maybe<Scalars['String']['output']>;
    /**
     * Timestamp indicating when the product was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: Maybe<Scalars['String']['output']>;
    /** An array of cross-sell products. */
    crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** Product custom attributes. */
    custom_attributesV2?: Maybe<ProductCustomAttributes>;
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: Maybe<ComplexTextValue>;
    /** @deprecated Use the `custom_attributes` field instead. */
    description_extra?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the bundle product has a dynamic price. */
    dynamic_price?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether the bundle product has a dynamic SKU. */
    dynamic_sku?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether the bundle product has a dynamically calculated weight. */
    dynamic_weight?: Maybe<Scalars['Boolean']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_color?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_material?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_size?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_style?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    format?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    has_video?: Maybe<Scalars['Int']['output']>;
    /**
     * The ID number assigned to the product.
     * @deprecated Use the `uid` field instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** The relative path to the main image on the product page. */
    image?: Maybe<ProductImage>;
    /** Indicates whether the product can be returned. */
    is_returnable?: Maybe<Scalars['String']['output']>;
    /** An array containing information about individual bundle items. */
    items?: Maybe<Array<Maybe<BundleItem>>>;
    /**
     * A number representing the product's manufacturer.
     * @deprecated Use the `custom_attributes` field instead.
     */
    manufacturer?: Maybe<Scalars['Int']['output']>;
    /** An array of media gallery objects. */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use `media_gallery` instead.
     */
    media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: Maybe<Scalars['String']['output']>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: Maybe<Scalars['String']['output']>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: Maybe<Scalars['String']['output']>;
    /** The product name. Customers use this name to identify the product. */
    name?: Maybe<Scalars['String']['output']>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    new_from_date?: Maybe<Scalars['String']['output']>;
    /** The end date for new product listings. */
    new_to_date?: Maybe<Scalars['String']['output']>;
    /** Product stock only x left count */
    only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
    /** An array of options for a customizable product. */
    options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: Maybe<Scalars['String']['output']>;
    /**
     * Indicates the price of an item.
     * @deprecated Use `price_range` for product price information.
     */
    price?: Maybe<ProductPrices>;
    /** The price details of the main product */
    price_details?: Maybe<PriceDetails>;
    /** The range of prices for the product */
    price_range: PriceRange;
    /** An array of `TierPrice` objects. */
    price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
    /** One of PRICE_RANGE or AS_LOW_AS. */
    price_view?: Maybe<PriceViewEnum>;
    /** An array of `ProductLinks` objects. */
    product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
    /** The average of all the ratings given to the product. */
    rating_summary: Scalars['Float']['output'];
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirect_code: Scalars['Int']['output'];
    /** An array of related products. */
    related_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** The total count of all the reviews given to the product. */
    review_count: Scalars['Int']['output'];
    /** The list of products reviews. */
    reviews: ProductReviews;
    /** Indicates whether to ship bundle items together or individually. */
    ship_bundle_items?: Maybe<ShipBundleItemsEnum>;
    /** A short description of the product. Its use depends on the theme. */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: Maybe<ProductImage>;
    /**
     * The beginning date that a product has a special price.
     * @deprecated The field should not be used on the storefront.
     */
    special_from_date?: Maybe<Scalars['String']['output']>;
    /** The discounted price of the product. */
    special_price?: Maybe<Scalars['Float']['output']>;
    /** The end date for a product with a special price. */
    special_to_date?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the product is staged for a future campaign. */
    staged: Scalars['Boolean']['output'];
    /** Stock status of the product */
    stock_status?: Maybe<ProductStockStatus>;
    /** The file name of a swatch image. */
    swatch_image?: Maybe<Scalars['String']['output']>;
    /** The relative path to the product's thumbnail image. */
    thumbnail?: Maybe<ProductImage>;
    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_price?: Maybe<Scalars['Float']['output']>;
    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use `__typename` instead.
     */
    type_id?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `ProductInterface` object. */
    uid: Scalars['ID']['output'];
    /**
     * Timestamp indicating when the product was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** An array of up-sell products. */
    upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The part of the URL that identifies the product */
    url_key?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use product's `canonical_url` or url rewrites instead */
    url_path?: Maybe<Scalars['String']['output']>;
    /** URL rewrites list */
    url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
    /** The part of the product URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    video_file?: Maybe<Scalars['String']['output']>;
    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Maybe<Array<Maybe<Website>>>;
    /** The weight of the item, in units defined by the store. */
    weight?: Maybe<Scalars['Float']['output']>;
};
/** Defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProductCustom_AttributesV2Args = {
    filters?: InputMaybe<AttributeFilterInput>;
};
/** Defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProductReviewsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** Defines a single bundle product. */
export type BundleProductCartItemInput = {
    /** A mandatory array of options for the bundle product, including each chosen option and specified quantity. */
    bundle_options: Array<InputMaybe<BundleOptionInput>>;
    /** The ID and value of the option. */
    customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
    /** The quantity and SKU of the bundle product. */
    data: CartItemInput;
};
/** Defines bundle product options for `ShipmentItemInterface`. */
export type BundleShipmentItem = ShipmentItemInterface & {
    __typename?: 'BundleShipmentItem';
    /** A list of bundle options that are assigned to a shipped product. */
    bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
    /** The unique ID for a `ShipmentItemInterface` object. */
    id: Scalars['ID']['output'];
    /** The order item associated with the shipment item. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of shipped items. */
    quantity_shipped: Scalars['Float']['output'];
};
/** Defines bundle product options for `WishlistItemInterface`. */
export type BundleWishlistItem = WishlistItemInterface & {
    __typename?: 'BundleWishlistItem';
    /** The date and time the item was added to the wish list. */
    added_at: Scalars['String']['output'];
    /** An array containing information about the selected bundle items. */
    bundle_options?: Maybe<Array<Maybe<SelectedBundleOption>>>;
    /** Custom options selected for the wish list item. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** The description of the item. */
    description?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `WishlistItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Product details of the wish list item. */
    product?: Maybe<ProductInterface>;
    /** The quantity of this wish list item. */
    quantity: Scalars['Float']['output'];
};
export type ButtonStyles = {
    __typename?: 'ButtonStyles';
    /** The button color */
    color?: Maybe<Scalars['String']['output']>;
    /** The button height in pixels */
    height?: Maybe<Scalars['Int']['output']>;
    /** The button label */
    label?: Maybe<Scalars['String']['output']>;
    /** The button layout */
    layout?: Maybe<Scalars['String']['output']>;
    /** The button shape */
    shape?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the tagline is displayed */
    tagline?: Maybe<Scalars['Boolean']['output']>;
    /** Defines if the button uses default height. If the value is false, the value of height is used */
    use_default_height?: Maybe<Scalars['Boolean']['output']>;
};
/** Defines the order to cancel. */
export type CancelOrderInput = {
    /** Order ID. */
    order_id: Scalars['ID']['input'];
    /** Cancellation reason. */
    reason: Scalars['String']['input'];
};
/** Contains the updated customer order and error message if any. */
export type CancelOrderOutput = {
    __typename?: 'CancelOrderOutput';
    /** Error encountered while cancelling the order. */
    error?: Maybe<Scalars['String']['output']>;
    /** Updated customer order. */
    order?: Maybe<CustomerOrder>;
};
export type CancellationReason = {
    __typename?: 'CancellationReason';
    description: Scalars['String']['output'];
};
export type Card = {
    __typename?: 'Card';
    /** Card bin details */
    bin_details?: Maybe<CardBin>;
    /** Expiration month of the card */
    card_expiry_month?: Maybe<Scalars['String']['output']>;
    /** Expiration year of the card */
    card_expiry_year?: Maybe<Scalars['String']['output']>;
    /** Last four digits of the card */
    last_digits?: Maybe<Scalars['String']['output']>;
    /** Name on the card */
    name?: Maybe<Scalars['String']['output']>;
};
export type CardBin = {
    __typename?: 'CardBin';
    /** Card bin number */
    bin?: Maybe<Scalars['String']['output']>;
};
/** Contains the contents and other details about a guest or customer cart. */
export type Cart = {
    __typename?: 'Cart';
    /** @deprecated Use `applied_coupons` instead. */
    applied_coupon?: Maybe<AppliedCoupon>;
    /** An array of `AppliedCoupon` objects. Each object contains the `code` text attribute, which specifies the coupon code. */
    applied_coupons?: Maybe<Array<Maybe<AppliedCoupon>>>;
    /** An array of gift card items applied to the cart. */
    applied_gift_cards?: Maybe<Array<Maybe<AppliedGiftCard>>>;
    /** The amount of reward points applied to the cart. */
    applied_reward_points?: Maybe<RewardPointsAmount>;
    /** Store credit information applied to the cart. */
    applied_store_credit?: Maybe<AppliedStoreCredit>;
    /** The list of available gift wrapping options for the cart. */
    available_gift_wrappings: Array<Maybe<GiftWrapping>>;
    /** An array of available payment methods. */
    available_payment_methods?: Maybe<Array<Maybe<AvailablePaymentMethod>>>;
    /** The billing address assigned to the cart. */
    billing_address?: Maybe<BillingCartAddress>;
    /** The email address of the guest or customer. */
    email?: Maybe<Scalars['String']['output']>;
    /** The entered gift message for the cart */
    gift_message?: Maybe<GiftMessage>;
    /** Indicates whether the shopper requested gift receipt for the cart. */
    gift_receipt_included: Scalars['Boolean']['output'];
    /** The selected gift wrapping for the cart. */
    gift_wrapping?: Maybe<GiftWrapping>;
    /** The unique ID for a `Cart` object. */
    id: Scalars['ID']['output'];
    /** Indicates whether the cart contains only virtual products. */
    is_virtual: Scalars['Boolean']['output'];
    /**
     * An array of products that have been added to the cart.
     * @deprecated Use `itemsV2` instead.
     */
    items?: Maybe<Array<Maybe<CartItemInterface>>>;
    itemsV2?: Maybe<CartItems>;
    /** Pricing details for the quote. */
    prices?: Maybe<CartPrices>;
    /** Indicates whether the shopper requested a printed card for the cart. */
    printed_card_included: Scalars['Boolean']['output'];
    /** Indicates which payment method was applied to the cart. */
    selected_payment_method?: Maybe<SelectedPaymentMethod>;
    /** An array of shipping addresses assigned to the cart. */
    shipping_addresses: Array<Maybe<ShippingCartAddress>>;
    /** The total number of items in the cart. */
    total_quantity: Scalars['Float']['output'];
};
/** Contains the contents and other details about a guest or customer cart. */
export type CartItemsV2Args = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<QuoteItemsSortInput>;
};
/** Contains details the country in a billing or shipping address. */
export type CartAddressCountry = {
    __typename?: 'CartAddressCountry';
    /** The country code. */
    code: Scalars['String']['output'];
    /** The display label for the country. */
    label: Scalars['String']['output'];
};
/** Defines the billing or shipping address to be applied to the cart. */
export type CartAddressInput = {
    /** The city specified for the billing or shipping address. */
    city: Scalars['String']['input'];
    /** The company specified for the billing or shipping address. */
    company?: InputMaybe<Scalars['String']['input']>;
    /** The country code and label for the billing or shipping address. */
    country_code: Scalars['String']['input'];
    /** The custom attribute values of the billing or shipping address. */
    custom_attributes?: InputMaybe<Array<InputMaybe<AttributeValueInput>>>;
    /** The customer's fax number. */
    fax?: InputMaybe<Scalars['String']['input']>;
    /** The first name of the customer or guest. */
    firstname: Scalars['String']['input'];
    /** The last name of the customer or guest. */
    lastname: Scalars['String']['input'];
    /** The middle name of the person associated with the billing/shipping address. */
    middlename?: InputMaybe<Scalars['String']['input']>;
    /** The ZIP or postal code of the billing or shipping address. */
    postcode?: InputMaybe<Scalars['String']['input']>;
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: InputMaybe<Scalars['String']['input']>;
    /** A string that defines the state or province of the billing or shipping address. */
    region?: InputMaybe<Scalars['String']['input']>;
    /** An integer that defines the state or province of the billing or shipping address. */
    region_id?: InputMaybe<Scalars['Int']['input']>;
    /** Determines whether to save the address in the customer's address book. The default value is true. */
    save_in_address_book?: InputMaybe<Scalars['Boolean']['input']>;
    /** An array containing the street for the billing or shipping address. */
    street: Array<InputMaybe<Scalars['String']['input']>>;
    /** A value such as Sr., Jr., or III. */
    suffix?: InputMaybe<Scalars['String']['input']>;
    /** The telephone number for the billing or shipping address. */
    telephone?: InputMaybe<Scalars['String']['input']>;
    /** The VAT company number for billing or shipping address. */
    vat_id?: InputMaybe<Scalars['String']['input']>;
};
export type CartAddressInterface = {
    /** The city specified for the billing or shipping address. */
    city: Scalars['String']['output'];
    /** The company specified for the billing or shipping address. */
    company?: Maybe<Scalars['String']['output']>;
    /** An object containing the country label and code. */
    country: CartAddressCountry;
    /** The custom attribute values of the billing or shipping address. */
    custom_attributes: Array<Maybe<AttributeValueInterface>>;
    /** The customer's fax number. */
    fax?: Maybe<Scalars['String']['output']>;
    /** The first name of the customer or guest. */
    firstname: Scalars['String']['output'];
    /** The last name of the customer or guest. */
    lastname: Scalars['String']['output'];
    /** The middle name of the person associated with the billing/shipping address. */
    middlename?: Maybe<Scalars['String']['output']>;
    /** The ZIP or postal code of the billing or shipping address. */
    postcode?: Maybe<Scalars['String']['output']>;
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']['output']>;
    /** An object containing the region label and code. */
    region?: Maybe<CartAddressRegion>;
    /** An array containing the street for the billing or shipping address. */
    street: Array<Maybe<Scalars['String']['output']>>;
    /** A value such as Sr., Jr., or III. */
    suffix?: Maybe<Scalars['String']['output']>;
    /** The telephone number for the billing or shipping address. */
    telephone?: Maybe<Scalars['String']['output']>;
    /** The unique id of the customer address. */
    uid: Scalars['String']['output'];
    /** The VAT company number for billing or shipping address. */
    vat_id?: Maybe<Scalars['String']['output']>;
};
/** Contains details about the region in a billing or shipping address. */
export type CartAddressRegion = {
    __typename?: 'CartAddressRegion';
    /** The state or province code. */
    code?: Maybe<Scalars['String']['output']>;
    /** The display label for the region. */
    label?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a pre-defined region. */
    region_id?: Maybe<Scalars['Int']['output']>;
};
/** Contains information about discounts applied to the cart. */
export type CartDiscount = {
    __typename?: 'CartDiscount';
    /** The amount of the discount applied to the item. */
    amount: Money;
    /** The description of the discount. */
    label: Array<Maybe<Scalars['String']['output']>>;
};
export declare enum CartDiscountType {
    Item = "ITEM",
    Shipping = "SHIPPING"
}
export type CartItemError = {
    __typename?: 'CartItemError';
    /** An error code that describes the error encountered */
    code: CartItemErrorType;
    /** A localized error message */
    message: Scalars['String']['output'];
};
export declare enum CartItemErrorType {
    ItemIncrements = "ITEM_INCREMENTS",
    ItemQty = "ITEM_QTY",
    Undefined = "UNDEFINED"
}
/** Defines an item to be added to the cart. */
export type CartItemInput = {
    /** An array of entered options for the base product, such as personalization text. */
    entered_options?: InputMaybe<Array<InputMaybe<EnteredOptionInput>>>;
    /** For a child product, the SKU of its parent product. */
    parent_sku?: InputMaybe<Scalars['String']['input']>;
    /** The amount or number of an item to add. */
    quantity: Scalars['Float']['input'];
    /** The selected options for the base product, such as color or size, using the unique ID for an object such as `CustomizableRadioOption`, `CustomizableDropDownOption`, or `ConfigurableProductOptionsValues`. */
    selected_options?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    /** The SKU of the product. */
    sku: Scalars['String']['input'];
};
/** An interface for products in a cart. */
export type CartItemInterface = {
    /** An array of errors encountered while loading the cart item */
    errors?: Maybe<Array<Maybe<CartItemError>>>;
    /** @deprecated Use `uid` instead. */
    id: Scalars['String']['output'];
    /** True if requested quantity is less than available stock, false otherwise. */
    is_available: Scalars['Boolean']['output'];
    /** Message to display when the product is not available with this selected option. */
    not_available_message?: Maybe<Scalars['String']['output']>;
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<CartItemPrices>;
    /** Details about an item in the cart. */
    product: ProductInterface;
    /** The quantity of this item in the cart. */
    quantity: Scalars['Float']['output'];
    /** The unique ID for a `CartItemInterface` object. */
    uid: Scalars['ID']['output'];
};
/** Contains details about the price of the item, including taxes and discounts. */
export type CartItemPrices = {
    __typename?: 'CartItemPrices';
    /** An array of discounts to be applied to the cart item. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** An array of FPTs applied to the cart item. */
    fixed_product_taxes?: Maybe<Array<Maybe<FixedProductTax>>>;
    /** The value of the original unit price for the item. */
    original_item_price: Money;
    /** The value of the original price multiplied by the quantity of the item. */
    original_row_total: Money;
    /** The price of the item before any discounts were applied. The price that might include tax, depending on the configured display settings for cart. */
    price: Money;
    /** The price of the item before any discounts were applied. The price that might include tax, depending on the configured display settings for cart. */
    price_including_tax: Money;
    /** The value of the price multiplied by the quantity of the item. */
    row_total: Money;
    /** The value of `row_total` plus the tax applied to the item. */
    row_total_including_tax: Money;
    /** The total of all discounts applied to the item. */
    total_item_discount?: Maybe<Money>;
};
/** Deprecated: The `ShippingCartAddress.cart_items` field now returns `CartItemInterface`. */
export type CartItemQuantity = {
    __typename?: 'CartItemQuantity';
    /** @deprecated The `ShippingCartAddress.cart_items` field now returns `CartItemInterface`. */
    cart_item_id: Scalars['Int']['output'];
    /** @deprecated The `ShippingCartAddress.cart_items` field now returns `CartItemInterface`. */
    quantity: Scalars['Float']['output'];
};
/** Contains details about the price of a selected customizable value. */
export type CartItemSelectedOptionValuePrice = {
    __typename?: 'CartItemSelectedOptionValuePrice';
    /** Indicates whether the price type is fixed, percent, or dynamic. */
    type: PriceTypeEnum;
    /** A string that describes the unit of the value. */
    units: Scalars['String']['output'];
    /** A price value. */
    value: Scalars['Float']['output'];
};
/** A single item to be updated. */
export type CartItemUpdateInput = {
    /** Deprecated. Use `cart_item_uid` instead. */
    cart_item_id?: InputMaybe<Scalars['Int']['input']>;
    /** The unique ID for a `CartItemInterface` object. */
    cart_item_uid?: InputMaybe<Scalars['ID']['input']>;
    /** An array that defines customizable options for the product. */
    customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
    /** Gift message details for the cart item */
    gift_message?: InputMaybe<GiftMessageInput>;
    /** The unique ID for a `GiftWrapping` object to be used for the cart item. */
    gift_wrapping_id?: InputMaybe<Scalars['ID']['input']>;
    /** The new quantity of the item. */
    quantity?: InputMaybe<Scalars['Float']['input']>;
};
export type CartItems = {
    __typename?: 'CartItems';
    /** An array of products that have been added to the cart. */
    items: Array<Maybe<CartItemInterface>>;
    /** Metadata for pagination rendering. */
    page_info?: Maybe<SearchResultPageInfo>;
    /** The number of returned cart items. */
    total_count: Scalars['Int']['output'];
};
/** Contains details about the final price of items in the cart, including discount and tax information. */
export type CartPrices = {
    __typename?: 'CartPrices';
    /** An array containing the names and amounts of taxes applied to each item in the cart. */
    applied_taxes?: Maybe<Array<Maybe<CartTaxItem>>>;
    /** @deprecated Use discounts instead. */
    discount?: Maybe<CartDiscount>;
    /** An array containing cart rule discounts, store credit and gift cards applied to the cart. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** The list of prices for the selected gift options. */
    gift_options?: Maybe<GiftOptionsPrices>;
    /** The total, including discounts, taxes, shipping, and other fees. */
    grand_total?: Maybe<Money>;
    /** The total of the cart, including discounts, shipping, and other fees without tax. */
    grand_total_excluding_tax?: Maybe<Money>;
    /** The subtotal without any applied taxes. */
    subtotal_excluding_tax?: Maybe<Money>;
    /** The subtotal including any applied taxes. */
    subtotal_including_tax?: Maybe<Money>;
    /** The subtotal with any discounts applied, but not taxes. */
    subtotal_with_discount_excluding_tax?: Maybe<Money>;
};
/** Contains tax information about an item in the cart. */
export type CartTaxItem = {
    __typename?: 'CartTaxItem';
    /** The amount of tax applied to the item. */
    amount: Money;
    /** The description of the tax. */
    label: Scalars['String']['output'];
};
/** An error encountered while adding an item to the the cart. */
export type CartUserInputError = {
    __typename?: 'CartUserInputError';
    /** A cart-specific error code. */
    code: CartUserInputErrorType;
    /** A localized error message. */
    message: Scalars['String']['output'];
};
export declare enum CartUserInputErrorType {
    InsufficientStock = "INSUFFICIENT_STOCK",
    NotSalable = "NOT_SALABLE",
    PermissionDenied = "PERMISSION_DENIED",
    ProductNotFound = "PRODUCT_NOT_FOUND",
    Undefined = "UNDEFINED"
}
export declare enum CatalogAttributeApplyToEnum {
    Bundle = "BUNDLE",
    Category = "CATEGORY",
    Configurable = "CONFIGURABLE",
    Downloadable = "DOWNLOADABLE",
    Grouped = "GROUPED",
    Simple = "SIMPLE",
    Virtual = "VIRTUAL"
}
/** Swatch attribute metadata. */
export type CatalogAttributeMetadata = CustomAttributeMetadataInterface & {
    __typename?: 'CatalogAttributeMetadata';
    /** To which catalog types an attribute can be applied. */
    apply_to?: Maybe<Array<Maybe<CatalogAttributeApplyToEnum>>>;
    /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
    code: Scalars['ID']['output'];
    /** Default attribute value. */
    default_value?: Maybe<Scalars['String']['output']>;
    /** The type of entity that defines the attribute. */
    entity_type: AttributeEntityTypeEnum;
    /** The frontend class of the attribute. */
    frontend_class?: Maybe<Scalars['String']['output']>;
    /** The frontend input type of the attribute. */
    frontend_input?: Maybe<AttributeFrontendInputEnum>;
    /** Whether a product or category attribute can be compared against another or not. */
    is_comparable?: Maybe<Scalars['Boolean']['output']>;
    /** Whether a product or category attribute can be filtered or not. */
    is_filterable?: Maybe<Scalars['Boolean']['output']>;
    /** Whether a product or category attribute can be filtered in search or not. */
    is_filterable_in_search?: Maybe<Scalars['Boolean']['output']>;
    /** Whether a product or category attribute can use HTML on front or not. */
    is_html_allowed_on_front?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the attribute value is required. */
    is_required: Scalars['Boolean']['output'];
    /** Whether a product or category attribute can be searched or not. */
    is_searchable?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the attribute value must be unique. */
    is_unique: Scalars['Boolean']['output'];
    /** Whether a product or category attribute can be used for price rules or not. */
    is_used_for_price_rules?: Maybe<Scalars['Boolean']['output']>;
    /** Whether a product or category attribute is used for promo rules or not. */
    is_used_for_promo_rules?: Maybe<Scalars['Boolean']['output']>;
    /** Whether a product or category attribute is visible in advanced search or not. */
    is_visible_in_advanced_search?: Maybe<Scalars['Boolean']['output']>;
    /** Whether a product or category attribute is visible on front or not. */
    is_visible_on_front?: Maybe<Scalars['Boolean']['output']>;
    /** Whether a product or category attribute has WYSIWYG enabled or not. */
    is_wysiwyg_enabled?: Maybe<Scalars['Boolean']['output']>;
    /** The label assigned to the attribute. */
    label?: Maybe<Scalars['String']['output']>;
    /** Attribute options. */
    options: Array<Maybe<CustomAttributeOptionInterface>>;
    /** Input type of the swatch attribute option. */
    swatch_input_type?: Maybe<SwatchInputTypeEnum>;
    /** Whether update product preview image or not. */
    update_product_preview_image?: Maybe<Scalars['Boolean']['output']>;
    /** Whether use product image for swatch or not. */
    use_product_image_for_swatch?: Maybe<Scalars['Boolean']['output']>;
    /** Whether a product or category attribute is used in product listing or not. */
    used_in_product_listing?: Maybe<Scalars['Boolean']['output']>;
};
/** Defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for. */
export type CategoryFilterInput = {
    /** Filter by the unique category ID for a `CategoryInterface` object. */
    category_uid?: InputMaybe<FilterEqualTypeInput>;
    /** Deprecated: use 'category_uid' to filter uniquely identifiers of categories. */
    ids?: InputMaybe<FilterEqualTypeInput>;
    /** Filter by the display name of the category. */
    name?: InputMaybe<FilterMatchTypeInput>;
    /** Filter by the unique parent category ID for a `CategoryInterface` object. */
    parent_category_uid?: InputMaybe<FilterEqualTypeInput>;
    /** Filter by the unique parent category ID for a `CategoryInterface` object. */
    parent_id?: InputMaybe<FilterEqualTypeInput>;
    /** Filter by the part of the URL that identifies the category. */
    url_key?: InputMaybe<FilterEqualTypeInput>;
    /** Filter by the URL path for the category. */
    url_path?: InputMaybe<FilterEqualTypeInput>;
};
/** Contains the full set of attributes that can be returned in a category search. */
export type CategoryInterface = {
    automatic_sorting?: Maybe<Scalars['String']['output']>;
    available_sort_by?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** An array of breadcrumb items. */
    breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>;
    /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Categories' is enabled. */
    canonical_url?: Maybe<Scalars['String']['output']>;
    children_count?: Maybe<Scalars['String']['output']>;
    /** Contains a category CMS block. */
    cms_block?: Maybe<CmsBlock>;
    /**
     * The timestamp indicating when the category was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: Maybe<Scalars['String']['output']>;
    custom_layout_update_file?: Maybe<Scalars['String']['output']>;
    /** The attribute to use for sorting. */
    default_sort_by?: Maybe<Scalars['String']['output']>;
    /** An optional description of the category. */
    description?: Maybe<Scalars['String']['output']>;
    display_mode?: Maybe<Scalars['String']['output']>;
    filter_price_range?: Maybe<Scalars['Float']['output']>;
    /**
     * An ID that uniquely identifies the category.
     * @deprecated Use `uid` instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    image?: Maybe<Scalars['String']['output']>;
    include_in_menu?: Maybe<Scalars['Int']['output']>;
    is_anchor?: Maybe<Scalars['Int']['output']>;
    landing_page?: Maybe<Scalars['Int']['output']>;
    /** The depth of the category within the tree. */
    level?: Maybe<Scalars['Int']['output']>;
    meta_description?: Maybe<Scalars['String']['output']>;
    meta_keywords?: Maybe<Scalars['String']['output']>;
    meta_title?: Maybe<Scalars['String']['output']>;
    /** The display name of the category. */
    name?: Maybe<Scalars['String']['output']>;
    /** The full category path. */
    path?: Maybe<Scalars['String']['output']>;
    /** The category path within the store. */
    path_in_store?: Maybe<Scalars['String']['output']>;
    /** The position of the category relative to other categories at the same level in tree. */
    position?: Maybe<Scalars['Int']['output']>;
    /** The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
    product_count?: Maybe<Scalars['Int']['output']>;
    /** The list of products assigned to the category. */
    products?: Maybe<CategoryProducts>;
    /** Indicates whether the category is staged for a future campaign. */
    staged: Scalars['Boolean']['output'];
    /** The unique ID for a `CategoryInterface` object. */
    uid: Scalars['ID']['output'];
    /**
     * The timestamp indicating when the category was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** The URL key assigned to the category. */
    url_key?: Maybe<Scalars['String']['output']>;
    /** The URL path assigned to the category. */
    url_path?: Maybe<Scalars['String']['output']>;
    /** The part of the category URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']['output']>;
};
/** Contains the full set of attributes that can be returned in a category search. */
export type CategoryInterfaceProductsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<ProductAttributeSortInput>;
};
/** Contains details about the products assigned to a category. */
export type CategoryProducts = {
    __typename?: 'CategoryProducts';
    /** An array of products that are assigned to the category. */
    items?: Maybe<Array<Maybe<ProductInterface>>>;
    /** Pagination metadata. */
    page_info?: Maybe<SearchResultPageInfo>;
    /** The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
    total_count?: Maybe<Scalars['Int']['output']>;
};
/** Contains a collection of `CategoryTree` objects and pagination information. */
export type CategoryResult = {
    __typename?: 'CategoryResult';
    /** A list of categories that match the filter criteria. */
    items?: Maybe<Array<Maybe<CategoryTree>>>;
    /** An object that includes the `page_info` and `currentPage` values specified in the query. */
    page_info?: Maybe<SearchResultPageInfo>;
    /** The total number of categories that match the criteria. */
    total_count?: Maybe<Scalars['Int']['output']>;
};
/** Contains the hierarchy of categories. */
export type CategoryTree = CategoryInterface & RoutableInterface & {
    __typename?: 'CategoryTree';
    automatic_sorting?: Maybe<Scalars['String']['output']>;
    available_sort_by?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** An array of breadcrumb items. */
    breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>;
    /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Categories' is enabled. */
    canonical_url?: Maybe<Scalars['String']['output']>;
    /** A tree of child categories. */
    children?: Maybe<Array<Maybe<CategoryTree>>>;
    children_count?: Maybe<Scalars['String']['output']>;
    /** Contains a category CMS block. */
    cms_block?: Maybe<CmsBlock>;
    /**
     * The timestamp indicating when the category was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: Maybe<Scalars['String']['output']>;
    custom_layout_update_file?: Maybe<Scalars['String']['output']>;
    /** The attribute to use for sorting. */
    default_sort_by?: Maybe<Scalars['String']['output']>;
    /** An optional description of the category. */
    description?: Maybe<Scalars['String']['output']>;
    display_mode?: Maybe<Scalars['String']['output']>;
    filter_price_range?: Maybe<Scalars['Float']['output']>;
    /**
     * An ID that uniquely identifies the category.
     * @deprecated Use `uid` instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    image?: Maybe<Scalars['String']['output']>;
    include_in_menu?: Maybe<Scalars['Int']['output']>;
    is_anchor?: Maybe<Scalars['Int']['output']>;
    landing_page?: Maybe<Scalars['Int']['output']>;
    /** The depth of the category within the tree. */
    level?: Maybe<Scalars['Int']['output']>;
    meta_description?: Maybe<Scalars['String']['output']>;
    meta_keywords?: Maybe<Scalars['String']['output']>;
    meta_title?: Maybe<Scalars['String']['output']>;
    /** The display name of the category. */
    name?: Maybe<Scalars['String']['output']>;
    /** The full category path. */
    path?: Maybe<Scalars['String']['output']>;
    /** The category path within the store. */
    path_in_store?: Maybe<Scalars['String']['output']>;
    /** The position of the category relative to other categories at the same level in tree. */
    position?: Maybe<Scalars['Int']['output']>;
    /** The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
    product_count?: Maybe<Scalars['Int']['output']>;
    /** The list of products assigned to the category. */
    products?: Maybe<CategoryProducts>;
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirect_code: Scalars['Int']['output'];
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the category is staged for a future campaign. */
    staged: Scalars['Boolean']['output'];
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
    /** The unique ID for a `CategoryInterface` object. */
    uid: Scalars['ID']['output'];
    /**
     * The timestamp indicating when the category was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** The URL key assigned to the category. */
    url_key?: Maybe<Scalars['String']['output']>;
    /** The URL path assigned to the category. */
    url_path?: Maybe<Scalars['String']['output']>;
    /** The part of the category URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']['output']>;
};
/** Contains the hierarchy of categories. */
export type CategoryTreeProductsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<ProductAttributeSortInput>;
};
/** Defines details about an individual checkout agreement. */
export type CheckoutAgreement = {
    __typename?: 'CheckoutAgreement';
    /** The ID for a checkout agreement. */
    agreement_id: Scalars['Int']['output'];
    /** The checkbox text for the checkout agreement. */
    checkbox_text: Scalars['String']['output'];
    /** Required. The text of the agreement. */
    content: Scalars['String']['output'];
    /** The height of the text box where the Terms and Conditions statement appears during checkout. */
    content_height?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the `content` text is in HTML format. */
    is_html: Scalars['Boolean']['output'];
    /** Indicates whether agreements are accepted automatically or manually. */
    mode: CheckoutAgreementMode;
    /** The name given to the condition. */
    name: Scalars['String']['output'];
};
/** Indicates how agreements are accepted. */
export declare enum CheckoutAgreementMode {
    /** Conditions are automatically accepted upon checkout. */
    Auto = "AUTO",
    /** Shoppers must manually accept the conditions to place an order. */
    Manual = "MANUAL"
}
/** An error encountered while adding an item to the cart. */
export type CheckoutUserInputError = {
    __typename?: 'CheckoutUserInputError';
    /** An error code that is specific to Checkout. */
    code: CheckoutUserInputErrorCodes;
    /** A localized error message. */
    message: Scalars['String']['output'];
    /** The path to the input field that caused an error. See the GraphQL specification about path errors for details: http://spec.graphql.org/draft/#sec-Errors */
    path: Array<Maybe<Scalars['String']['output']>>;
};
export declare enum CheckoutUserInputErrorCodes {
    InsufficientStock = "INSUFFICIENT_STOCK",
    NotSalable = "NOT_SALABLE",
    ProductNotFound = "PRODUCT_NOT_FOUND",
    ReorderNotAvailable = "REORDER_NOT_AVAILABLE",
    Undefined = "UNDEFINED"
}
/** Contains details about errors encountered when a customer clear cart. */
export type ClearCartError = {
    __typename?: 'ClearCartError';
    /** A localized error message */
    message: Scalars['String']['output'];
    /** A cart-specific error type. */
    type: ClearCartErrorType;
};
export declare enum ClearCartErrorType {
    Inactive = "INACTIVE",
    NotFound = "NOT_FOUND",
    Unauthorised = "UNAUTHORISED",
    Undefined = "UNDEFINED"
}
/** Assigns a specific `cart_id` to the empty cart. */
export type ClearCartInput = {
    /** The unique ID of a `Cart` object. */
    uid: Scalars['ID']['input'];
};
/** Output of the request to clear the customer cart. */
export type ClearCartOutput = {
    __typename?: 'ClearCartOutput';
    /** The cart after clear cart items. */
    cart?: Maybe<Cart>;
    /** An array of errors encountered while clearing the cart item */
    errors?: Maybe<Array<Maybe<ClearCartError>>>;
};
/** Contains details about a specific CMS block. */
export type CmsBlock = {
    __typename?: 'CmsBlock';
    /** The content of the CMS block in raw HTML. */
    content?: Maybe<Scalars['String']['output']>;
    /** The CMS block identifier. */
    identifier?: Maybe<Scalars['String']['output']>;
    /** The title assigned to the CMS block. */
    title?: Maybe<Scalars['String']['output']>;
};
/** Contains an array CMS block items. */
export type CmsBlocks = {
    __typename?: 'CmsBlocks';
    /** An array of CMS blocks. */
    items?: Maybe<Array<Maybe<CmsBlock>>>;
};
/** Contains details about a CMS page. */
export type CmsPage = RoutableInterface & {
    __typename?: 'CmsPage';
    /** The content of the CMS page in raw HTML. */
    content?: Maybe<Scalars['String']['output']>;
    /** The heading that displays at the top of the CMS page. */
    content_heading?: Maybe<Scalars['String']['output']>;
    /** The ID of a CMS page. */
    identifier?: Maybe<Scalars['String']['output']>;
    /** A brief description of the page for search results listings. */
    meta_description?: Maybe<Scalars['String']['output']>;
    /** A brief description of the page for search results listings. */
    meta_keywords?: Maybe<Scalars['String']['output']>;
    /** A page title that is indexed by search engines and appears in search results listings. */
    meta_title?: Maybe<Scalars['String']['output']>;
    /** The design layout of the page, indicating the number of columns and navigation features used on the page. */
    page_layout?: Maybe<Scalars['String']['output']>;
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirect_code: Scalars['Int']['output'];
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** The name that appears in the breadcrumb trail navigation and in the browser title bar and tab. */
    title?: Maybe<Scalars['String']['output']>;
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
    /** The URL key of the CMS page, which is often based on the `content_heading`. */
    url_key?: Maybe<Scalars['String']['output']>;
};
export type ColorSwatchData = SwatchDataInterface & {
    __typename?: 'ColorSwatchData';
    /** The value can be represented as color (HEX code), image link, or text. */
    value?: Maybe<Scalars['String']['output']>;
};
/** Contains an attribute code that is used for product comparisons. */
export type ComparableAttribute = {
    __typename?: 'ComparableAttribute';
    /** An attribute code that is enabled for product comparisons. */
    code: Scalars['String']['output'];
    /** The label of the attribute code. */
    label: Scalars['String']['output'];
};
/** Defines an object used to iterate through items for product comparisons. */
export type ComparableItem = {
    __typename?: 'ComparableItem';
    /** An array of product attributes that can be used to compare products. */
    attributes: Array<Maybe<ProductAttribute>>;
    /** Details about a product in a compare list. */
    product: ProductInterface;
    /** The unique ID of an item in a compare list. */
    uid: Scalars['ID']['output'];
};
/** Contains iterable information such as the array of items, the count, and attributes that represent the compare list. */
export type CompareList = {
    __typename?: 'CompareList';
    /** An array of attributes that can be used for comparing products. */
    attributes?: Maybe<Array<Maybe<ComparableAttribute>>>;
    /** The number of items in the compare list. */
    item_count: Scalars['Int']['output'];
    /** An array of products to compare. */
    items?: Maybe<Array<Maybe<ComparableItem>>>;
    /** The unique ID assigned to the compare list. */
    uid: Scalars['ID']['output'];
};
export type ComplexTextValue = {
    __typename?: 'ComplexTextValue';
    /** Text that can contain HTML tags. */
    html: Scalars['String']['output'];
};
/** Contains details about a configurable product attribute option. */
export type ConfigurableAttributeOption = {
    __typename?: 'ConfigurableAttributeOption';
    /** The ID assigned to the attribute. */
    code?: Maybe<Scalars['String']['output']>;
    /** A string that describes the configurable attribute option. */
    label?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `ConfigurableAttributeOption` object. */
    uid: Scalars['ID']['output'];
    /** A unique index number assigned to the configurable product option. */
    value_index?: Maybe<Scalars['Int']['output']>;
};
/** An implementation for configurable product cart items. */
export type ConfigurableCartItem = CartItemInterface & {
    __typename?: 'ConfigurableCartItem';
    /** The list of available gift wrapping options for the cart item. */
    available_gift_wrapping: Array<Maybe<GiftWrapping>>;
    /** An array containing the configuranle options the shopper selected. */
    configurable_options: Array<Maybe<SelectedConfigurableOption>>;
    /** Product details of the cart item. */
    configured_variant: ProductInterface;
    /** An array containing the customizable options the shopper selected. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** An array of errors encountered while loading the cart item */
    errors?: Maybe<Array<Maybe<CartItemError>>>;
    /** The entered gift message for the cart item */
    gift_message?: Maybe<GiftMessage>;
    /** The selected gift wrapping for the cart item. */
    gift_wrapping?: Maybe<GiftWrapping>;
    /** @deprecated Use `uid` instead. */
    id: Scalars['String']['output'];
    /** True if requested quantity is less than available stock, false otherwise. */
    is_available: Scalars['Boolean']['output'];
    /** Message to display when the product is not available with this selected option. */
    not_available_message?: Maybe<Scalars['String']['output']>;
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<CartItemPrices>;
    /** Details about an item in the cart. */
    product: ProductInterface;
    /** The quantity of this item in the cart. */
    quantity: Scalars['Float']['output'];
    /** The unique ID for a `CartItemInterface` object. */
    uid: Scalars['ID']['output'];
};
/** Describes configurable options that have been selected and can be selected as a result of the previous selections. */
export type ConfigurableOptionAvailableForSelection = {
    __typename?: 'ConfigurableOptionAvailableForSelection';
    /** An attribute code that uniquely identifies a configurable option. */
    attribute_code: Scalars['String']['output'];
    /** An array of selectable option value IDs. */
    option_value_uids: Array<Maybe<Scalars['ID']['output']>>;
};
/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProduct = CustomizableProductInterface & PhysicalProductInterface & ProductInterface & RoutableInterface & {
    __typename?: 'ConfigurableProduct';
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_announcement_date?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_brand?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_custom_engraving_text?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_detailed_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_pagebuilder_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_gemstone_addon?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_recyclable_material?: Maybe<Scalars['Int']['output']>;
    /**
     * The attribute set assigned to the product.
     * @deprecated The field should not be used on the storefront.
     */
    attribute_set_id?: Maybe<Scalars['Int']['output']>;
    /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
    canonical_url?: Maybe<Scalars['String']['output']>;
    /** The categories assigned to a product. */
    categories?: Maybe<Array<Maybe<CategoryInterface>>>;
    /** @deprecated Use the `custom_attributes` field instead. */
    color?: Maybe<Scalars['Int']['output']>;
    /** An array of options for the configurable product. */
    configurable_options?: Maybe<Array<Maybe<ConfigurableProductOptions>>>;
    /** An array of media gallery items and other details about selected configurable product options as well as details about remaining selectable options. */
    configurable_product_options_selection?: Maybe<ConfigurableProductOptionsSelection>;
    /** The product's country of origin. */
    country_of_manufacture?: Maybe<Scalars['String']['output']>;
    /**
     * Timestamp indicating when the product was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: Maybe<Scalars['String']['output']>;
    /** An array of cross-sell products. */
    crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** Product custom attributes. */
    custom_attributesV2?: Maybe<ProductCustomAttributes>;
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: Maybe<ComplexTextValue>;
    /** @deprecated Use the `custom_attributes` field instead. */
    description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_color?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_material?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_size?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_style?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    format?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    has_video?: Maybe<Scalars['Int']['output']>;
    /**
     * The ID number assigned to the product.
     * @deprecated Use the `uid` field instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** The relative path to the main image on the product page. */
    image?: Maybe<ProductImage>;
    /** Indicates whether the product can be returned. */
    is_returnable?: Maybe<Scalars['String']['output']>;
    /**
     * A number representing the product's manufacturer.
     * @deprecated Use the `custom_attributes` field instead.
     */
    manufacturer?: Maybe<Scalars['Int']['output']>;
    /** An array of media gallery objects. */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use `media_gallery` instead.
     */
    media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: Maybe<Scalars['String']['output']>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: Maybe<Scalars['String']['output']>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: Maybe<Scalars['String']['output']>;
    /** The product name. Customers use this name to identify the product. */
    name?: Maybe<Scalars['String']['output']>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    new_from_date?: Maybe<Scalars['String']['output']>;
    /** The end date for new product listings. */
    new_to_date?: Maybe<Scalars['String']['output']>;
    /** Product stock only x left count */
    only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
    /** An array of options for a customizable product. */
    options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: Maybe<Scalars['String']['output']>;
    /**
     * Indicates the price of an item.
     * @deprecated Use `price_range` for product price information.
     */
    price?: Maybe<ProductPrices>;
    /** The range of prices for the product */
    price_range: PriceRange;
    /** An array of `TierPrice` objects. */
    price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
    /** An array of `ProductLinks` objects. */
    product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
    /** The average of all the ratings given to the product. */
    rating_summary: Scalars['Float']['output'];
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirect_code: Scalars['Int']['output'];
    /** An array of related products. */
    related_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** The total count of all the reviews given to the product. */
    review_count: Scalars['Int']['output'];
    /** The list of products reviews. */
    reviews: ProductReviews;
    /** A short description of the product. Its use depends on the theme. */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: Maybe<ProductImage>;
    /**
     * The beginning date that a product has a special price.
     * @deprecated The field should not be used on the storefront.
     */
    special_from_date?: Maybe<Scalars['String']['output']>;
    /** The discounted price of the product. */
    special_price?: Maybe<Scalars['Float']['output']>;
    /** The end date for a product with a special price. */
    special_to_date?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the product is staged for a future campaign. */
    staged: Scalars['Boolean']['output'];
    /** Stock status of the product */
    stock_status?: Maybe<ProductStockStatus>;
    /** The file name of a swatch image. */
    swatch_image?: Maybe<Scalars['String']['output']>;
    /** The relative path to the product's thumbnail image. */
    thumbnail?: Maybe<ProductImage>;
    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_price?: Maybe<Scalars['Float']['output']>;
    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use `__typename` instead.
     */
    type_id?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `ProductInterface` object. */
    uid: Scalars['ID']['output'];
    /**
     * Timestamp indicating when the product was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** An array of up-sell products. */
    upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The part of the URL that identifies the product */
    url_key?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use product's `canonical_url` or url rewrites instead */
    url_path?: Maybe<Scalars['String']['output']>;
    /** URL rewrites list */
    url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
    /** The part of the product URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']['output']>;
    /** An array of simple product variants. */
    variants?: Maybe<Array<Maybe<ConfigurableVariant>>>;
    /** @deprecated Use the `custom_attributes` field instead. */
    video_file?: Maybe<Scalars['String']['output']>;
    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Maybe<Array<Maybe<Website>>>;
    /** The weight of the item, in units defined by the store. */
    weight?: Maybe<Scalars['Float']['output']>;
};
/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProductConfigurable_Product_Options_SelectionArgs = {
    configurableOptionValueUids?: InputMaybe<Array<Scalars['ID']['input']>>;
};
/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProductCustom_AttributesV2Args = {
    filters?: InputMaybe<AttributeFilterInput>;
};
/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProductReviewsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
export type ConfigurableProductCartItemInput = {
    /** The ID and value of the option. */
    customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
    /** The quantity and SKU of the configurable product. */
    data: CartItemInput;
    /** The SKU of the parent configurable product. */
    parent_sku?: InputMaybe<Scalars['String']['input']>;
    /** Deprecated. Use `CartItemInput.sku` instead. */
    variant_sku?: InputMaybe<Scalars['String']['input']>;
};
/** Contains details about configurable product options. */
export type ConfigurableProductOption = {
    __typename?: 'ConfigurableProductOption';
    /** An attribute code that uniquely identifies a configurable option. */
    attribute_code: Scalars['String']['output'];
    /** The display name of the option. */
    label: Scalars['String']['output'];
    /** The unique ID of the configurable option. */
    uid: Scalars['ID']['output'];
    /** An array of values that are applicable for this option. */
    values?: Maybe<Array<Maybe<ConfigurableProductOptionValue>>>;
};
/** Defines a value for a configurable product option. */
export type ConfigurableProductOptionValue = {
    __typename?: 'ConfigurableProductOptionValue';
    /** Indicates whether the product is available with this selected option. */
    is_available: Scalars['Boolean']['output'];
    /** Indicates whether the value is the default. */
    is_use_default: Scalars['Boolean']['output'];
    /** The display name of the value. */
    label: Scalars['String']['output'];
    /** The URL assigned to the thumbnail of the swatch image. */
    swatch?: Maybe<SwatchDataInterface>;
    /** The unique ID of the value. */
    uid: Scalars['ID']['output'];
};
/** Defines configurable attributes for the specified product. */
export type ConfigurableProductOptions = {
    __typename?: 'ConfigurableProductOptions';
    /** A string that identifies the attribute. */
    attribute_code?: Maybe<Scalars['String']['output']>;
    /**
     * The ID assigned to the attribute.
     * @deprecated Use `attribute_uid` instead.
     */
    attribute_id?: Maybe<Scalars['String']['output']>;
    /**
     * The ID assigned to the attribute.
     * @deprecated Use `attribute_uid` instead.
     */
    attribute_id_v2?: Maybe<Scalars['Int']['output']>;
    /** The unique ID for an `Attribute` object. */
    attribute_uid: Scalars['ID']['output'];
    /**
     * The configurable option ID number assigned by the system.
     * @deprecated Use `uid` instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** A displayed string that describes the configurable product option. */
    label?: Maybe<Scalars['String']['output']>;
    /** A number that indicates the order in which the attribute is displayed. */
    position?: Maybe<Scalars['Int']['output']>;
    /**
     * This is the same as a product's `id` field.
     * @deprecated `product_id` is not needed and can be obtained from its parent.
     */
    product_id?: Maybe<Scalars['Int']['output']>;
    /** The unique ID for a `ConfigurableProductOptions` object. */
    uid: Scalars['ID']['output'];
    /** Indicates whether the option is the default. */
    use_default?: Maybe<Scalars['Boolean']['output']>;
    /** An array that defines the `value_index` codes assigned to the configurable product. */
    values?: Maybe<Array<Maybe<ConfigurableProductOptionsValues>>>;
};
/** Contains metadata corresponding to the selected configurable options. */
export type ConfigurableProductOptionsSelection = {
    __typename?: 'ConfigurableProductOptionsSelection';
    /** An array of all possible configurable options. */
    configurable_options?: Maybe<Array<Maybe<ConfigurableProductOption>>>;
    /** Product images and videos corresponding to the specified configurable options selection. */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /** The configurable options available for further selection based on the current selection. */
    options_available_for_selection?: Maybe<Array<Maybe<ConfigurableOptionAvailableForSelection>>>;
    /** A variant represented by the specified configurable options selection. The value is expected to be null until selections are made for each configurable option. */
    variant?: Maybe<SimpleProduct>;
};
/** Contains the index number assigned to a configurable product option. */
export type ConfigurableProductOptionsValues = {
    __typename?: 'ConfigurableProductOptionsValues';
    /** The label of the product on the default store. */
    default_label?: Maybe<Scalars['String']['output']>;
    /** The label of the product. */
    label?: Maybe<Scalars['String']['output']>;
    /** The label of the product on the current store. */
    store_label?: Maybe<Scalars['String']['output']>;
    /** Swatch data for a configurable product option. */
    swatch_data?: Maybe<SwatchDataInterface>;
    /** The unique ID for a `ConfigurableProductOptionsValues` object. */
    uid?: Maybe<Scalars['ID']['output']>;
    /** Indicates whether to use the default_label. */
    use_default_value?: Maybe<Scalars['Boolean']['output']>;
    /**
     * A unique index number assigned to the configurable product option.
     * @deprecated Use `uid` instead.
     */
    value_index?: Maybe<Scalars['Int']['output']>;
};
/** Contains all the simple product variants of a configurable product. */
export type ConfigurableVariant = {
    __typename?: 'ConfigurableVariant';
    /** An array of configurable attribute options. */
    attributes?: Maybe<Array<Maybe<ConfigurableAttributeOption>>>;
    /** An array of linked simple products. */
    product?: Maybe<SimpleProduct>;
};
/** A configurable product wish list item. */
export type ConfigurableWishlistItem = WishlistItemInterface & {
    __typename?: 'ConfigurableWishlistItem';
    /** The date and time the item was added to the wish list. */
    added_at: Scalars['String']['output'];
    /**
     * The SKU of the simple product corresponding to a set of selected configurable options.
     * @deprecated Use `ConfigurableWishlistItem.configured_variant.sku` instead.
     */
    child_sku: Scalars['String']['output'];
    /** An array of selected configurable options. */
    configurable_options?: Maybe<Array<Maybe<SelectedConfigurableOption>>>;
    /** Product details of the selected variant. The value is null if some options are not configured. */
    configured_variant?: Maybe<ProductInterface>;
    /** Custom options selected for the wish list item. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** The description of the item. */
    description?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `WishlistItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Product details of the wish list item. */
    product?: Maybe<ProductInterface>;
    /** The quantity of this wish list item. */
    quantity: Scalars['Float']['output'];
};
/** Contains details about a customer email address to confirm. */
export type ConfirmEmailInput = {
    /** The key to confirm the email address. */
    confirmation_key: Scalars['String']['input'];
    /** The email address to be confirmed. */
    email: Scalars['String']['input'];
};
/** List of account confirmation statuses. */
export declare enum ConfirmationStatusEnum {
    /** Account confirmation not required */
    AccountConfirmationNotRequired = "ACCOUNT_CONFIRMATION_NOT_REQUIRED",
    /** Account confirmed */
    AccountConfirmed = "ACCOUNT_CONFIRMED"
}
export type ContactUsInput = {
    /** The shopper's comment to the merchant. */
    comment: Scalars['String']['input'];
    /** The email address of the shopper. */
    email: Scalars['String']['input'];
    /** The full name of the shopper. */
    name: Scalars['String']['input'];
    /** The shopper's telephone number. */
    telephone?: InputMaybe<Scalars['String']['input']>;
};
/** Contains the status of the request. */
export type ContactUsOutput = {
    __typename?: 'ContactUsOutput';
    /** Indicates whether the request was successful. */
    status: Scalars['Boolean']['output'];
};
/** Contains the source and target wish lists after copying products. */
export type CopyProductsBetweenWishlistsOutput = {
    __typename?: 'CopyProductsBetweenWishlistsOutput';
    /** The destination wish list containing the copied products. */
    destination_wishlist: Wishlist;
    /** The wish list that the products were copied from. */
    source_wishlist: Wishlist;
    /** An array of errors encountered while copying products in a wish list. */
    user_errors: Array<Maybe<WishListUserInputError>>;
};
export type Country = {
    __typename?: 'Country';
    /** An array of regions within a particular country. */
    available_regions?: Maybe<Array<Maybe<Region>>>;
    /** The name of the country in English. */
    full_name_english?: Maybe<Scalars['String']['output']>;
    /** The name of the country in the current locale. */
    full_name_locale?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `Country` object. */
    id?: Maybe<Scalars['String']['output']>;
    /** The three-letter abbreviation of the country, such as USA. */
    three_letter_abbreviation?: Maybe<Scalars['String']['output']>;
    /** The two-letter abbreviation of the country, such as US. */
    two_letter_abbreviation?: Maybe<Scalars['String']['output']>;
};
/** The list of country codes. */
export declare enum CountryCodeEnum {
    /** Andorra */
    Ad = "AD",
    /** United Arab Emirates */
    Ae = "AE",
    /** Afghanistan */
    Af = "AF",
    /** Antigua & Barbuda */
    Ag = "AG",
    /** Anguilla */
    Ai = "AI",
    /** Albania */
    Al = "AL",
    /** Armenia */
    Am = "AM",
    /** Netherlands Antilles */
    An = "AN",
    /** Angola */
    Ao = "AO",
    /** Antarctica */
    Aq = "AQ",
    /** Argentina */
    Ar = "AR",
    /** American Samoa */
    As = "AS",
    /** Austria */
    At = "AT",
    /** Australia */
    Au = "AU",
    /** Aruba */
    Aw = "AW",
    /** Åland Islands */
    Ax = "AX",
    /** Azerbaijan */
    Az = "AZ",
    /** Bosnia & Herzegovina */
    Ba = "BA",
    /** Barbados */
    Bb = "BB",
    /** Bangladesh */
    Bd = "BD",
    /** Belgium */
    Be = "BE",
    /** Burkina Faso */
    Bf = "BF",
    /** Bulgaria */
    Bg = "BG",
    /** Bahrain */
    Bh = "BH",
    /** Burundi */
    Bi = "BI",
    /** Benin */
    Bj = "BJ",
    /** St. Barthélemy */
    Bl = "BL",
    /** Bermuda */
    Bm = "BM",
    /** Brunei */
    Bn = "BN",
    /** Bolivia */
    Bo = "BO",
    /** Brazil */
    Br = "BR",
    /** Bahamas */
    Bs = "BS",
    /** Bhutan */
    Bt = "BT",
    /** Bouvet Island */
    Bv = "BV",
    /** Botswana */
    Bw = "BW",
    /** Belarus */
    By = "BY",
    /** Belize */
    Bz = "BZ",
    /** Canada */
    Ca = "CA",
    /** Cocos (Keeling) Islands */
    Cc = "CC",
    /** Congo-Kinshasa */
    Cd = "CD",
    /** Central African Republic */
    Cf = "CF",
    /** Congo-Brazzaville */
    Cg = "CG",
    /** Switzerland */
    Ch = "CH",
    /** Côte d’Ivoire */
    Ci = "CI",
    /** Cook Islands */
    Ck = "CK",
    /** Chile */
    Cl = "CL",
    /** Cameroon */
    Cm = "CM",
    /** China */
    Cn = "CN",
    /** Colombia */
    Co = "CO",
    /** Costa Rica */
    Cr = "CR",
    /** Cuba */
    Cu = "CU",
    /** Cape Verde */
    Cv = "CV",
    /** Christmas Island */
    Cx = "CX",
    /** Cyprus */
    Cy = "CY",
    /** Czech Republic */
    Cz = "CZ",
    /** Germany */
    De = "DE",
    /** Djibouti */
    Dj = "DJ",
    /** Denmark */
    Dk = "DK",
    /** Dominica */
    Dm = "DM",
    /** Dominican Republic */
    Do = "DO",
    /** Algeria */
    Dz = "DZ",
    /** Ecuador */
    Ec = "EC",
    /** Estonia */
    Ee = "EE",
    /** Egypt */
    Eg = "EG",
    /** Western Sahara */
    Eh = "EH",
    /** Eritrea */
    Er = "ER",
    /** Spain */
    Es = "ES",
    /** Ethiopia */
    Et = "ET",
    /** Finland */
    Fi = "FI",
    /** Fiji */
    Fj = "FJ",
    /** Falkland Islands */
    Fk = "FK",
    /** Micronesia */
    Fm = "FM",
    /** Faroe Islands */
    Fo = "FO",
    /** France */
    Fr = "FR",
    /** Gabon */
    Ga = "GA",
    /** United Kingdom */
    Gb = "GB",
    /** Grenada */
    Gd = "GD",
    /** Georgia */
    Ge = "GE",
    /** French Guiana */
    Gf = "GF",
    /** Guernsey */
    Gg = "GG",
    /** Ghana */
    Gh = "GH",
    /** Gibraltar */
    Gi = "GI",
    /** Greenland */
    Gl = "GL",
    /** Gambia */
    Gm = "GM",
    /** Guinea */
    Gn = "GN",
    /** Guadeloupe */
    Gp = "GP",
    /** Equatorial Guinea */
    Gq = "GQ",
    /** Greece */
    Gr = "GR",
    /** South Georgia & South Sandwich Islands */
    Gs = "GS",
    /** Guatemala */
    Gt = "GT",
    /** Guam */
    Gu = "GU",
    /** Guinea-Bissau */
    Gw = "GW",
    /** Guyana */
    Gy = "GY",
    /** Hong Kong SAR China */
    Hk = "HK",
    /** Heard &amp; McDonald Islands */
    Hm = "HM",
    /** Honduras */
    Hn = "HN",
    /** Croatia */
    Hr = "HR",
    /** Haiti */
    Ht = "HT",
    /** Hungary */
    Hu = "HU",
    /** Indonesia */
    Id = "ID",
    /** Ireland */
    Ie = "IE",
    /** Israel */
    Il = "IL",
    /** Isle of Man */
    Im = "IM",
    /** India */
    In = "IN",
    /** British Indian Ocean Territory */
    Io = "IO",
    /** Iraq */
    Iq = "IQ",
    /** Iran */
    Ir = "IR",
    /** Iceland */
    Is = "IS",
    /** Italy */
    It = "IT",
    /** Jersey */
    Je = "JE",
    /** Jamaica */
    Jm = "JM",
    /** Jordan */
    Jo = "JO",
    /** Japan */
    Jp = "JP",
    /** Kenya */
    Ke = "KE",
    /** Kyrgyzstan */
    Kg = "KG",
    /** Cambodia */
    Kh = "KH",
    /** Kiribati */
    Ki = "KI",
    /** Comoros */
    Km = "KM",
    /** St. Kitts & Nevis */
    Kn = "KN",
    /** North Korea */
    Kp = "KP",
    /** South Korea */
    Kr = "KR",
    /** Kuwait */
    Kw = "KW",
    /** Cayman Islands */
    Ky = "KY",
    /** Kazakhstan */
    Kz = "KZ",
    /** Laos */
    La = "LA",
    /** Lebanon */
    Lb = "LB",
    /** St. Lucia */
    Lc = "LC",
    /** Liechtenstein */
    Li = "LI",
    /** Sri Lanka */
    Lk = "LK",
    /** Liberia */
    Lr = "LR",
    /** Lesotho */
    Ls = "LS",
    /** Lithuania */
    Lt = "LT",
    /** Luxembourg */
    Lu = "LU",
    /** Latvia */
    Lv = "LV",
    /** Libya */
    Ly = "LY",
    /** Morocco */
    Ma = "MA",
    /** Monaco */
    Mc = "MC",
    /** Moldova */
    Md = "MD",
    /** Montenegro */
    Me = "ME",
    /** St. Martin */
    Mf = "MF",
    /** Madagascar */
    Mg = "MG",
    /** Marshall Islands */
    Mh = "MH",
    /** Macedonia */
    Mk = "MK",
    /** Mali */
    Ml = "ML",
    /** Myanmar (Burma) */
    Mm = "MM",
    /** Mongolia */
    Mn = "MN",
    /** Macau SAR China */
    Mo = "MO",
    /** Northern Mariana Islands */
    Mp = "MP",
    /** Martinique */
    Mq = "MQ",
    /** Mauritania */
    Mr = "MR",
    /** Montserrat */
    Ms = "MS",
    /** Malta */
    Mt = "MT",
    /** Mauritius */
    Mu = "MU",
    /** Maldives */
    Mv = "MV",
    /** Malawi */
    Mw = "MW",
    /** Mexico */
    Mx = "MX",
    /** Malaysia */
    My = "MY",
    /** Mozambique */
    Mz = "MZ",
    /** Namibia */
    Na = "NA",
    /** New Caledonia */
    Nc = "NC",
    /** Niger */
    Ne = "NE",
    /** Norfolk Island */
    Nf = "NF",
    /** Nigeria */
    Ng = "NG",
    /** Nicaragua */
    Ni = "NI",
    /** Netherlands */
    Nl = "NL",
    /** Norway */
    No = "NO",
    /** Nepal */
    Np = "NP",
    /** Nauru */
    Nr = "NR",
    /** Niue */
    Nu = "NU",
    /** New Zealand */
    Nz = "NZ",
    /** Oman */
    Om = "OM",
    /** Panama */
    Pa = "PA",
    /** Peru */
    Pe = "PE",
    /** French Polynesia */
    Pf = "PF",
    /** Papua New Guinea */
    Pg = "PG",
    /** Philippines */
    Ph = "PH",
    /** Pakistan */
    Pk = "PK",
    /** Poland */
    Pl = "PL",
    /** St. Pierre & Miquelon */
    Pm = "PM",
    /** Pitcairn Islands */
    Pn = "PN",
    /** Palestinian Territories */
    Ps = "PS",
    /** Portugal */
    Pt = "PT",
    /** Palau */
    Pw = "PW",
    /** Paraguay */
    Py = "PY",
    /** Qatar */
    Qa = "QA",
    /** Réunion */
    Re = "RE",
    /** Romania */
    Ro = "RO",
    /** Serbia */
    Rs = "RS",
    /** Russia */
    Ru = "RU",
    /** Rwanda */
    Rw = "RW",
    /** Saudi Arabia */
    Sa = "SA",
    /** Solomon Islands */
    Sb = "SB",
    /** Seychelles */
    Sc = "SC",
    /** Sudan */
    Sd = "SD",
    /** Sweden */
    Se = "SE",
    /** Singapore */
    Sg = "SG",
    /** St. Helena */
    Sh = "SH",
    /** Slovenia */
    Si = "SI",
    /** Svalbard & Jan Mayen */
    Sj = "SJ",
    /** Slovakia */
    Sk = "SK",
    /** Sierra Leone */
    Sl = "SL",
    /** San Marino */
    Sm = "SM",
    /** Senegal */
    Sn = "SN",
    /** Somalia */
    So = "SO",
    /** Suriname */
    Sr = "SR",
    /** São Tomé & Príncipe */
    St = "ST",
    /** El Salvador */
    Sv = "SV",
    /** Syria */
    Sy = "SY",
    /** Eswatini */
    Sz = "SZ",
    /** Turks & Caicos Islands */
    Tc = "TC",
    /** Chad */
    Td = "TD",
    /** French Southern Territories */
    Tf = "TF",
    /** Togo */
    Tg = "TG",
    /** Thailand */
    Th = "TH",
    /** Tajikistan */
    Tj = "TJ",
    /** Tokelau */
    Tk = "TK",
    /** Timor-Leste */
    Tl = "TL",
    /** Turkmenistan */
    Tm = "TM",
    /** Tunisia */
    Tn = "TN",
    /** Tonga */
    To = "TO",
    /** Turkey */
    Tr = "TR",
    /** Trinidad & Tobago */
    Tt = "TT",
    /** Tuvalu */
    Tv = "TV",
    /** Taiwan */
    Tw = "TW",
    /** Tanzania */
    Tz = "TZ",
    /** Ukraine */
    Ua = "UA",
    /** Uganda */
    Ug = "UG",
    /** U.S. Outlying Islands */
    Um = "UM",
    /** United States */
    Us = "US",
    /** Uruguay */
    Uy = "UY",
    /** Uzbekistan */
    Uz = "UZ",
    /** Vatican City */
    Va = "VA",
    /** St. Vincent & Grenadines */
    Vc = "VC",
    /** Venezuela */
    Ve = "VE",
    /** British Virgin Islands */
    Vg = "VG",
    /** U.S. Virgin Islands */
    Vi = "VI",
    /** Vietnam */
    Vn = "VN",
    /** Vanuatu */
    Vu = "VU",
    /** Wallis & Futuna */
    Wf = "WF",
    /** Samoa */
    Ws = "WS",
    /** Yemen */
    Ye = "YE",
    /** Mayotte */
    Yt = "YT",
    /** South Africa */
    Za = "ZA",
    /** Zambia */
    Zm = "ZM",
    /** Zimbabwe */
    Zw = "ZW"
}
/** Contains an array of product IDs to use for creating a compare list. */
export type CreateCompareListInput = {
    /** An array of product IDs to add to the compare list. */
    products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};
/** Defines a new gift registry. */
export type CreateGiftRegistryInput = {
    /** Additional attributes specified as a code-value pair. */
    dynamic_attributes?: InputMaybe<Array<InputMaybe<GiftRegistryDynamicAttributeInput>>>;
    /** The name of the event. */
    event_name: Scalars['String']['input'];
    /** The ID of the selected event type. */
    gift_registry_type_uid: Scalars['ID']['input'];
    /** A message describing the event. */
    message: Scalars['String']['input'];
    /** Indicates whether the registry is PRIVATE or PUBLIC. */
    privacy_settings: GiftRegistryPrivacySettings;
    /** The list of people who receive notifications about the registry. */
    registrants: Array<InputMaybe<AddGiftRegistryRegistrantInput>>;
    /** The shipping address for all gift registry items. */
    shipping_address?: InputMaybe<GiftRegistryShippingAddressInput>;
    /** Indicates whether the registry is ACTIVE or INACTIVE. */
    status: GiftRegistryStatus;
};
/** Contains the results of a request to create a gift registry. */
export type CreateGiftRegistryOutput = {
    __typename?: 'CreateGiftRegistryOutput';
    /** The newly-created gift registry. */
    gift_registry?: Maybe<GiftRegistry>;
};
export type CreateGuestCartInput = {
    /** Optional client-generated ID */
    cart_uid?: InputMaybe<Scalars['ID']['input']>;
};
export type CreateGuestCartOutput = {
    __typename?: 'CreateGuestCartOutput';
    /** The newly created cart. */
    cart?: Maybe<Cart>;
};
/** Contains the secure information used to authorize transaction. Applies to Payflow Pro and Payments Pro payment methods. */
export type CreatePayflowProTokenOutput = {
    __typename?: 'CreatePayflowProTokenOutput';
    /** The RESPMSG returned by PayPal. If the `result` is `0`, then `response_message` is `Approved`. */
    response_message: Scalars['String']['output'];
    /** A non-zero value if any errors occurred. */
    result: Scalars['Int']['output'];
    /** The RESULT returned by PayPal. A value of `0` indicates the transaction was approved. */
    result_code: Scalars['Int']['output'];
    /** A secure token generated by PayPal. */
    secure_token: Scalars['String']['output'];
    /** A secure token ID generated by PayPal. */
    secure_token_id: Scalars['String']['output'];
};
/** Contains payment order details that are used while processing the payment order */
export type CreatePaymentOrderInput = {
    /** The customer cart ID */
    cartId: Scalars['String']['input'];
    /** Defines the origin location for that payment request */
    location: PaymentLocation;
    /** The code for the payment method used in the order */
    methodCode: Scalars['String']['input'];
    /** The identifiable payment source for the payment method */
    paymentSource: Scalars['String']['input'];
    /** Indicates whether the payment information should be vaulted */
    vaultIntent?: InputMaybe<Scalars['Boolean']['input']>;
};
/** Contains payment order details that are used while processing the payment order */
export type CreatePaymentOrderOutput = {
    __typename?: 'CreatePaymentOrderOutput';
    /** The amount of the payment order */
    amount?: Maybe<Scalars['Float']['output']>;
    /** The currency of the payment order */
    currency_code?: Maybe<Scalars['String']['output']>;
    /** PayPal order ID */
    id?: Maybe<Scalars['String']['output']>;
    /** The order ID generated by Payment Services */
    mp_order_id?: Maybe<Scalars['String']['output']>;
    /** The status of the payment order */
    status?: Maybe<Scalars['String']['output']>;
};
/** Defines a new product review. */
export type CreateProductReviewInput = {
    /** The customer's nickname. Defaults to the customer name, if logged in. */
    nickname: Scalars['String']['input'];
    /** The ratings details by category. For example, Price: 5 stars, Quality: 4 stars, etc. */
    ratings: Array<InputMaybe<ProductReviewRatingInput>>;
    /** The SKU of the reviewed product. */
    sku: Scalars['String']['input'];
    /** The summary (title) of the review. */
    summary: Scalars['String']['input'];
    /** The review text. */
    text: Scalars['String']['input'];
};
/** Contains the completed product review. */
export type CreateProductReviewOutput = {
    __typename?: 'CreateProductReviewOutput';
    /** Product review details. */
    review: ProductReview;
};
/** Defines the name and visibility of a new wish list. */
export type CreateWishlistInput = {
    /** The name of the new wish list. */
    name: Scalars['String']['input'];
    /** Indicates whether the wish list is public or private. */
    visibility: WishlistVisibilityEnum;
};
/** Contains the wish list. */
export type CreateWishlistOutput = {
    __typename?: 'CreateWishlistOutput';
    /** The newly-created wish list */
    wishlist: Wishlist;
};
/** Required fields for Payflow Pro and Payments Pro credit card payments. */
export type CreditCardDetailsInput = {
    /** The credit card expiration month. */
    cc_exp_month: Scalars['Int']['input'];
    /** The credit card expiration year. */
    cc_exp_year: Scalars['Int']['input'];
    /** The last 4 digits of the credit card. */
    cc_last_4: Scalars['Int']['input'];
    /** The credit card type. */
    cc_type: Scalars['String']['input'];
};
/** Contains credit memo details. */
export type CreditMemo = {
    __typename?: 'CreditMemo';
    /** Comments on the credit memo. */
    comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
    /** The unique ID for a `CreditMemo` object. */
    id: Scalars['ID']['output'];
    /** An array containing details about refunded items. */
    items?: Maybe<Array<Maybe<CreditMemoItemInterface>>>;
    /** The sequential credit memo number. */
    number: Scalars['String']['output'];
    /** Details about the total refunded amount. */
    total?: Maybe<CreditMemoTotal>;
};
export type CreditMemoItem = CreditMemoItemInterface & {
    __typename?: 'CreditMemoItem';
    /** Details about the final discount amount for the base product, including discounts on options. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** The unique ID for a `CreditMemoItemInterface` object. */
    id: Scalars['ID']['output'];
    /** The order item the credit memo is applied to. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product, including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of refunded items. */
    quantity_refunded?: Maybe<Scalars['Float']['output']>;
};
/** Credit memo item details. */
export type CreditMemoItemInterface = {
    /** Details about the final discount amount for the base product, including discounts on options. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** The unique ID for a `CreditMemoItemInterface` object. */
    id: Scalars['ID']['output'];
    /** The order item the credit memo is applied to. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product, including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of refunded items. */
    quantity_refunded?: Maybe<Scalars['Float']['output']>;
};
/** Contains credit memo price details. */
export type CreditMemoTotal = {
    __typename?: 'CreditMemoTotal';
    /** An adjustment manually applied to the order. */
    adjustment: Money;
    /** The final base grand total amount in the base currency. */
    base_grand_total: Money;
    /** The applied discounts to the credit memo. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** The final total amount, including shipping, discounts, and taxes. */
    grand_total: Money;
    /** Details about the shipping and handling costs for the credit memo. */
    shipping_handling?: Maybe<ShippingHandling>;
    /** The subtotal of the invoice, excluding shipping, discounts, and taxes. */
    subtotal: Money;
    /** The credit memo tax details. */
    taxes?: Maybe<Array<Maybe<TaxItem>>>;
    /** The shipping amount for the credit memo. */
    total_shipping: Money;
    /** The amount of tax applied to the credit memo. */
    total_tax: Money;
};
export type Currency = {
    __typename?: 'Currency';
    /** An array of three-letter currency codes accepted by the store, such as USD and EUR. */
    available_currency_codes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** The base currency set for the store, such as USD. */
    base_currency_code?: Maybe<Scalars['String']['output']>;
    /** The symbol for the specified base currency, such as $. */
    base_currency_symbol?: Maybe<Scalars['String']['output']>;
    /** @deprecated Symbol was missed. Use `default_display_currency_code`. */
    default_display_currecy_code?: Maybe<Scalars['String']['output']>;
    /** @deprecated Symbol was missed. Use `default_display_currency_code`. */
    default_display_currecy_symbol?: Maybe<Scalars['String']['output']>;
    /** The currency that is displayed by default, such as USD. */
    default_display_currency_code?: Maybe<Scalars['String']['output']>;
    /** The currency symbol that is displayed by default, such as $. */
    default_display_currency_symbol?: Maybe<Scalars['String']['output']>;
    /** An array of exchange rates for currencies defined in the store. */
    exchange_rates?: Maybe<Array<Maybe<ExchangeRate>>>;
};
/** The list of available currency codes. */
export declare enum CurrencyEnum {
    Aed = "AED",
    Afn = "AFN",
    All = "ALL",
    Amd = "AMD",
    Ang = "ANG",
    Aoa = "AOA",
    Ars = "ARS",
    Aud = "AUD",
    Awg = "AWG",
    Azm = "AZM",
    Azn = "AZN",
    Bam = "BAM",
    Bbd = "BBD",
    Bdt = "BDT",
    Bgn = "BGN",
    Bhd = "BHD",
    Bif = "BIF",
    Bmd = "BMD",
    Bnd = "BND",
    Bob = "BOB",
    Brl = "BRL",
    Bsd = "BSD",
    Btn = "BTN",
    Buk = "BUK",
    Bwp = "BWP",
    Byn = "BYN",
    Bzd = "BZD",
    Cad = "CAD",
    Cdf = "CDF",
    Che = "CHE",
    Chf = "CHF",
    Chw = "CHW",
    Clp = "CLP",
    Cny = "CNY",
    Cop = "COP",
    Crc = "CRC",
    Cup = "CUP",
    Cve = "CVE",
    Czk = "CZK",
    Djf = "DJF",
    Dkk = "DKK",
    Dop = "DOP",
    Dzd = "DZD",
    Eek = "EEK",
    Egp = "EGP",
    Ern = "ERN",
    Etb = "ETB",
    Eur = "EUR",
    Fjd = "FJD",
    Fkp = "FKP",
    Gbp = "GBP",
    Gek = "GEK",
    Gel = "GEL",
    Ghs = "GHS",
    Gip = "GIP",
    Gmd = "GMD",
    Gnf = "GNF",
    Gqe = "GQE",
    Gtq = "GTQ",
    Gyd = "GYD",
    Hkd = "HKD",
    Hnl = "HNL",
    Hrk = "HRK",
    Htg = "HTG",
    Huf = "HUF",
    Idr = "IDR",
    Ils = "ILS",
    Inr = "INR",
    Iqd = "IQD",
    Irr = "IRR",
    Isk = "ISK",
    Jmd = "JMD",
    Jod = "JOD",
    Jpy = "JPY",
    Kes = "KES",
    Kgs = "KGS",
    Khr = "KHR",
    Kmf = "KMF",
    Kpw = "KPW",
    Krw = "KRW",
    Kwd = "KWD",
    Kyd = "KYD",
    Kzt = "KZT",
    Lak = "LAK",
    Lbp = "LBP",
    Lkr = "LKR",
    Lrd = "LRD",
    Lsl = "LSL",
    Lsm = "LSM",
    Ltl = "LTL",
    Lvl = "LVL",
    Lyd = "LYD",
    Mad = "MAD",
    Mdl = "MDL",
    Mga = "MGA",
    Mkd = "MKD",
    Mmk = "MMK",
    Mnt = "MNT",
    Mop = "MOP",
    Mro = "MRO",
    Mur = "MUR",
    Mvr = "MVR",
    Mwk = "MWK",
    Mxn = "MXN",
    Myr = "MYR",
    Mzn = "MZN",
    Nad = "NAD",
    Ngn = "NGN",
    Nic = "NIC",
    Nok = "NOK",
    Npr = "NPR",
    Nzd = "NZD",
    Omr = "OMR",
    Pab = "PAB",
    Pen = "PEN",
    Pgk = "PGK",
    Php = "PHP",
    Pkr = "PKR",
    Pln = "PLN",
    Pyg = "PYG",
    Qar = "QAR",
    Rhd = "RHD",
    Rol = "ROL",
    Ron = "RON",
    Rsd = "RSD",
    Rub = "RUB",
    Rwf = "RWF",
    Sar = "SAR",
    Sbd = "SBD",
    Scr = "SCR",
    Sdg = "SDG",
    Sek = "SEK",
    Sgd = "SGD",
    Shp = "SHP",
    Skk = "SKK",
    Sll = "SLL",
    Sos = "SOS",
    Srd = "SRD",
    Std = "STD",
    Svc = "SVC",
    Syp = "SYP",
    Szl = "SZL",
    Thb = "THB",
    Tjs = "TJS",
    Tmm = "TMM",
    Tnd = "TND",
    Top = "TOP",
    Trl = "TRL",
    Try = "TRY",
    Ttd = "TTD",
    Twd = "TWD",
    Tzs = "TZS",
    Uah = "UAH",
    Ugx = "UGX",
    Usd = "USD",
    Uyu = "UYU",
    Uzs = "UZS",
    Veb = "VEB",
    Vef = "VEF",
    Vnd = "VND",
    Vuv = "VUV",
    Wst = "WST",
    Xcd = "XCD",
    Xof = "XOF",
    Xpf = "XPF",
    Yer = "YER",
    Ytl = "YTL",
    Zar = "ZAR",
    Zmk = "ZMK",
    Zwd = "ZWD"
}
/** Defines an array of custom attributes. */
export type CustomAttributeMetadata = {
    __typename?: 'CustomAttributeMetadata';
    /** An array of attributes. */
    items?: Maybe<Array<Maybe<Attribute>>>;
};
/** An interface containing fields that define the EAV attribute. */
export type CustomAttributeMetadataInterface = {
    /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
    code: Scalars['ID']['output'];
    /** Default attribute value. */
    default_value?: Maybe<Scalars['String']['output']>;
    /** The type of entity that defines the attribute. */
    entity_type: AttributeEntityTypeEnum;
    /** The frontend class of the attribute. */
    frontend_class?: Maybe<Scalars['String']['output']>;
    /** The frontend input type of the attribute. */
    frontend_input?: Maybe<AttributeFrontendInputEnum>;
    /** Whether the attribute value is required. */
    is_required: Scalars['Boolean']['output'];
    /** Whether the attribute value must be unique. */
    is_unique: Scalars['Boolean']['output'];
    /** The label assigned to the attribute. */
    label?: Maybe<Scalars['String']['output']>;
    /** Attribute options. */
    options: Array<Maybe<CustomAttributeOptionInterface>>;
};
export type CustomAttributeOptionInterface = {
    /** Is the option value default. */
    is_default: Scalars['Boolean']['output'];
    /** The label assigned to the attribute option. */
    label: Scalars['String']['output'];
    /** The attribute option value. */
    value: Scalars['String']['output'];
};
/** Defines the customer name, addresses, and other details. */
export type Customer = {
    __typename?: 'Customer';
    /** An array containing the customer's shipping and billing addresses. */
    addresses?: Maybe<Array<Maybe<CustomerAddress>>>;
    /** Indicates whether the customer has enabled remote shopping assistance. */
    allow_remote_shopping_assistance: Scalars['Boolean']['output'];
    /** The contents of the customer's compare list. */
    compare_list?: Maybe<CompareList>;
    /** The customer's confirmation status. */
    confirmation_status: ConfirmationStatusEnum;
    /** Timestamp indicating when the account was created. */
    created_at?: Maybe<Scalars['String']['output']>;
    /** Customer's custom attributes. */
    custom_attributes?: Maybe<Array<Maybe<AttributeValueInterface>>>;
    /** The customer's date of birth. */
    date_of_birth?: Maybe<Scalars['String']['output']>;
    /** The ID assigned to the billing address. */
    default_billing?: Maybe<Scalars['String']['output']>;
    /** The ID assigned to the shipping address. */
    default_shipping?: Maybe<Scalars['String']['output']>;
    /**
     * The customer's date of birth.
     * @deprecated Use `date_of_birth` instead.
     */
    dob?: Maybe<Scalars['String']['output']>;
    /** The customer's email address. Required. */
    email?: Maybe<Scalars['String']['output']>;
    /** The customer's first name. */
    firstname?: Maybe<Scalars['String']['output']>;
    /** The customer's gender (Male - 1, Female - 2). */
    gender?: Maybe<Scalars['Int']['output']>;
    /** Details about all of the customer's gift registries. */
    gift_registries?: Maybe<Array<Maybe<GiftRegistry>>>;
    /** Details about a specific gift registry. */
    gift_registry?: Maybe<GiftRegistry>;
    /** @deprecated Customer group should not be exposed in the storefront scenarios. */
    group_id?: Maybe<Scalars['Int']['output']>;
    /**
     * The ID assigned to the customer.
     * @deprecated `id` is not needed as part of `Customer`, because on the server side, it can be identified based on the customer token used for authentication. There is no need to know customer ID on the client side.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether the customer is subscribed to the company's newsletter. */
    is_subscribed?: Maybe<Scalars['Boolean']['output']>;
    /** The customer's family name. */
    lastname?: Maybe<Scalars['String']['output']>;
    /** The customer's middle name. */
    middlename?: Maybe<Scalars['String']['output']>;
    orders?: Maybe<CustomerOrders>;
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']['output']>;
    /** Details about the specified return request from the unique ID for a `Return` object. */
    return?: Maybe<Return>;
    /** Information about the customer's return requests. */
    returns?: Maybe<Returns>;
    /** Contains the customer's product reviews. */
    reviews: ProductReviews;
    /** Customer reward points details. */
    reward_points?: Maybe<RewardPoints>;
    /** Store credit information applied for the logged in customer. */
    store_credit?: Maybe<CustomerStoreCredit>;
    /** A value such as Sr., Jr., or III. */
    suffix?: Maybe<Scalars['String']['output']>;
    /** The customer's Value-added tax (VAT) number (for corporate customers). */
    taxvat?: Maybe<Scalars['String']['output']>;
    /**
     * Return a customer's wish lists.
     * @deprecated Use `Customer.wishlists` or `Customer.wishlist_v2` instead.
     */
    wishlist: Wishlist;
    /** Retrieve the wish list identified by the unique ID for a `Wishlist` object. */
    wishlist_v2?: Maybe<Wishlist>;
    /** An array of wishlists. In Magento Open Source, customers are limited to one wish list. The number of wish lists is configurable for Adobe Commerce. */
    wishlists: Array<Maybe<Wishlist>>;
};
/** Defines the customer name, addresses, and other details. */
export type CustomerCustom_AttributesArgs = {
    attributeCodes?: InputMaybe<Array<Scalars['ID']['input']>>;
};
/** Defines the customer name, addresses, and other details. */
export type CustomerGift_RegistryArgs = {
    giftRegistryUid: Scalars['ID']['input'];
};
/** Defines the customer name, addresses, and other details. */
export type CustomerOrdersArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    filter?: InputMaybe<CustomerOrdersFilterInput>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
    scope?: InputMaybe<ScopeTypeEnum>;
    sort?: InputMaybe<CustomerOrderSortInput>;
};
/** Defines the customer name, addresses, and other details. */
export type CustomerReturnArgs = {
    uid: Scalars['ID']['input'];
};
/** Defines the customer name, addresses, and other details. */
export type CustomerReturnsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** Defines the customer name, addresses, and other details. */
export type CustomerReviewsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** Defines the customer name, addresses, and other details. */
export type CustomerWishlist_V2Args = {
    id: Scalars['ID']['input'];
};
/** Defines the customer name, addresses, and other details. */
export type CustomerWishlistsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** Contains detailed information about a customer's billing or shipping address. */
export type CustomerAddress = {
    __typename?: 'CustomerAddress';
    /** The customer's city or town. */
    city?: Maybe<Scalars['String']['output']>;
    /** The customer's company. */
    company?: Maybe<Scalars['String']['output']>;
    /** The customer's country. */
    country_code?: Maybe<CountryCodeEnum>;
    /**
     * The customer's country.
     * @deprecated Use `country_code` instead.
     */
    country_id?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use custom_attributesV2 instead. */
    custom_attributes?: Maybe<Array<Maybe<CustomerAddressAttribute>>>;
    /** Custom attributes assigned to the customer address. */
    custom_attributesV2: Array<Maybe<AttributeValueInterface>>;
    /**
     * The customer ID
     * @deprecated `customer_id` is not needed as part of `CustomerAddress`. The `id` is a unique identifier for the addresses.
     */
    customer_id?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether the address is the customer's default billing address. */
    default_billing?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether the address is the customer's default shipping address. */
    default_shipping?: Maybe<Scalars['Boolean']['output']>;
    /** Contains any extension attributes for the address. */
    extension_attributes?: Maybe<Array<Maybe<CustomerAddressAttribute>>>;
    /** The customer's fax number. */
    fax?: Maybe<Scalars['String']['output']>;
    /** The first name of the person associated with the shipping/billing address. */
    firstname?: Maybe<Scalars['String']['output']>;
    /** The ID of a `CustomerAddress` object. */
    id?: Maybe<Scalars['Int']['output']>;
    /** The family name of the person associated with the shipping/billing address. */
    lastname?: Maybe<Scalars['String']['output']>;
    /** The middle name of the person associated with the shipping/billing address. */
    middlename?: Maybe<Scalars['String']['output']>;
    /** The customer's ZIP or postal code. */
    postcode?: Maybe<Scalars['String']['output']>;
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']['output']>;
    /** An object containing the region name, region code, and region ID. */
    region?: Maybe<CustomerAddressRegion>;
    /** The unique ID for a pre-defined region. */
    region_id?: Maybe<Scalars['Int']['output']>;
    /** An array of strings that define the street number and name. */
    street?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** A value such as Sr., Jr., or III. */
    suffix?: Maybe<Scalars['String']['output']>;
    /** The customer's telephone number. */
    telephone?: Maybe<Scalars['String']['output']>;
    /** The customer's Value-added tax (VAT) number (for corporate customers). */
    vat_id?: Maybe<Scalars['String']['output']>;
};
/** Contains detailed information about a customer's billing or shipping address. */
export type CustomerAddressCustom_AttributesV2Args = {
    attributeCodes?: InputMaybe<Array<Scalars['ID']['input']>>;
};
/** Specifies the attribute code and value of a customer address attribute. */
export type CustomerAddressAttribute = {
    __typename?: 'CustomerAddressAttribute';
    /** The name assigned to the customer address attribute. */
    attribute_code?: Maybe<Scalars['String']['output']>;
    /** The value assigned to the customer address attribute. */
    value?: Maybe<Scalars['String']['output']>;
};
/** Specifies the attribute code and value of a customer attribute. */
export type CustomerAddressAttributeInput = {
    /** The name assigned to the attribute. */
    attribute_code: Scalars['String']['input'];
    /** The value assigned to the attribute. */
    value: Scalars['String']['input'];
};
/** Contains details about a billing or shipping address. */
export type CustomerAddressInput = {
    /** The customer's city or town. */
    city?: InputMaybe<Scalars['String']['input']>;
    /** The customer's company. */
    company?: InputMaybe<Scalars['String']['input']>;
    /** The two-letter code representing the customer's country. */
    country_code?: InputMaybe<CountryCodeEnum>;
    /** Deprecated: use `country_code` instead. */
    country_id?: InputMaybe<CountryCodeEnum>;
    /** Deprecated. Use custom_attributesV2 instead. */
    custom_attributes?: InputMaybe<Array<InputMaybe<CustomerAddressAttributeInput>>>;
    /** Custom attributes assigned to the customer address. */
    custom_attributesV2?: InputMaybe<Array<InputMaybe<AttributeValueInput>>>;
    /** Indicates whether the address is the default billing address. */
    default_billing?: InputMaybe<Scalars['Boolean']['input']>;
    /** Indicates whether the address is the default shipping address. */
    default_shipping?: InputMaybe<Scalars['Boolean']['input']>;
    /** The customer's fax number. */
    fax?: InputMaybe<Scalars['String']['input']>;
    /** The first name of the person associated with the billing/shipping address. */
    firstname?: InputMaybe<Scalars['String']['input']>;
    /** The family name of the person associated with the billing/shipping address. */
    lastname?: InputMaybe<Scalars['String']['input']>;
    /** The middle name of the person associated with the billing/shipping address. */
    middlename?: InputMaybe<Scalars['String']['input']>;
    /** The customer's ZIP or postal code. */
    postcode?: InputMaybe<Scalars['String']['input']>;
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: InputMaybe<Scalars['String']['input']>;
    /** An object containing the region name, region code, and region ID. */
    region?: InputMaybe<CustomerAddressRegionInput>;
    /** An array of strings that define the street number and name. */
    street?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    /** A value such as Sr., Jr., or III. */
    suffix?: InputMaybe<Scalars['String']['input']>;
    /** The customer's telephone number. */
    telephone?: InputMaybe<Scalars['String']['input']>;
    /** The customer's Tax/VAT number (for corporate customers). */
    vat_id?: InputMaybe<Scalars['String']['input']>;
};
/** Defines the customer's state or province. */
export type CustomerAddressRegion = {
    __typename?: 'CustomerAddressRegion';
    /** The state or province name. */
    region?: Maybe<Scalars['String']['output']>;
    /** The address region code. */
    region_code?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a pre-defined region. */
    region_id?: Maybe<Scalars['Int']['output']>;
};
/** Defines the customer's state or province. */
export type CustomerAddressRegionInput = {
    /** The state or province name. */
    region?: InputMaybe<Scalars['String']['input']>;
    /** The address region code. */
    region_code?: InputMaybe<Scalars['String']['input']>;
    /** The unique ID for a pre-defined region. */
    region_id?: InputMaybe<Scalars['Int']['input']>;
};
/** Customer attribute metadata. */
export type CustomerAttributeMetadata = CustomAttributeMetadataInterface & {
    __typename?: 'CustomerAttributeMetadata';
    /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
    code: Scalars['ID']['output'];
    /** Default attribute value. */
    default_value?: Maybe<Scalars['String']['output']>;
    /** The type of entity that defines the attribute. */
    entity_type: AttributeEntityTypeEnum;
    /** The frontend class of the attribute. */
    frontend_class?: Maybe<Scalars['String']['output']>;
    /** The frontend input type of the attribute. */
    frontend_input?: Maybe<AttributeFrontendInputEnum>;
    /** The template used for the input of the attribute (e.g., 'date'). */
    input_filter?: Maybe<InputFilterEnum>;
    /** Whether the attribute value is required. */
    is_required: Scalars['Boolean']['output'];
    /** Whether the attribute value must be unique. */
    is_unique: Scalars['Boolean']['output'];
    /** The label assigned to the attribute. */
    label?: Maybe<Scalars['String']['output']>;
    /** The number of lines of the attribute value. */
    multiline_count?: Maybe<Scalars['Int']['output']>;
    /** Attribute options. */
    options: Array<Maybe<CustomAttributeOptionInterface>>;
    /** The position of the attribute in the form. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The validation rules of the attribute value. */
    validate_rules?: Maybe<Array<Maybe<ValidationRule>>>;
};
/** An input object for creating a customer. */
export type CustomerCreateInput = {
    /** Indicates whether the customer has enabled remote shopping assistance. */
    allow_remote_shopping_assistance?: InputMaybe<Scalars['Boolean']['input']>;
    /** The customer's custom attributes. */
    custom_attributes?: InputMaybe<Array<InputMaybe<AttributeValueInput>>>;
    /** The customer's date of birth. */
    date_of_birth?: InputMaybe<Scalars['String']['input']>;
    /** Deprecated: Use `date_of_birth` instead. */
    dob?: InputMaybe<Scalars['String']['input']>;
    /** The customer's email address. */
    email: Scalars['String']['input'];
    /** The customer's first name. */
    firstname: Scalars['String']['input'];
    /** The customer's gender (Male - 1, Female - 2). */
    gender?: InputMaybe<Scalars['Int']['input']>;
    /** Indicates whether the customer is subscribed to the company's newsletter. */
    is_subscribed?: InputMaybe<Scalars['Boolean']['input']>;
    /** The customer's family name. */
    lastname: Scalars['String']['input'];
    /** The customer's middle name. */
    middlename?: InputMaybe<Scalars['String']['input']>;
    /** The customer's password. */
    password?: InputMaybe<Scalars['String']['input']>;
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: InputMaybe<Scalars['String']['input']>;
    /** A value such as Sr., Jr., or III. */
    suffix?: InputMaybe<Scalars['String']['input']>;
    /** The customer's Tax/VAT number (for corporate customers). */
    taxvat?: InputMaybe<Scalars['String']['input']>;
};
/** Contains details about a single downloadable product. */
export type CustomerDownloadableProduct = {
    __typename?: 'CustomerDownloadableProduct';
    /** The date and time the purchase was made. */
    date?: Maybe<Scalars['String']['output']>;
    /** The fully qualified URL to the download file. */
    download_url?: Maybe<Scalars['String']['output']>;
    /** The unique ID assigned to the item. */
    order_increment_id?: Maybe<Scalars['String']['output']>;
    /** The remaining number of times the customer can download the product. */
    remaining_downloads?: Maybe<Scalars['String']['output']>;
    /** Indicates when the product becomes available for download. Options are `Pending` and `Invoiced`. */
    status?: Maybe<Scalars['String']['output']>;
};
/** Contains a list of downloadable products. */
export type CustomerDownloadableProducts = {
    __typename?: 'CustomerDownloadableProducts';
    /** An array of purchased downloadable items. */
    items?: Maybe<Array<Maybe<CustomerDownloadableProduct>>>;
};
/** An input object that assigns or updates customer attributes. */
export type CustomerInput = {
    /** The customer's date of birth. */
    date_of_birth?: InputMaybe<Scalars['String']['input']>;
    /** Deprecated: Use `date_of_birth` instead. */
    dob?: InputMaybe<Scalars['String']['input']>;
    /** The customer's email address. Required when creating a customer. */
    email?: InputMaybe<Scalars['String']['input']>;
    /** The customer's first name. */
    firstname?: InputMaybe<Scalars['String']['input']>;
    /** The customer's gender (Male - 1, Female - 2). */
    gender?: InputMaybe<Scalars['Int']['input']>;
    /** Indicates whether the customer is subscribed to the company's newsletter. */
    is_subscribed?: InputMaybe<Scalars['Boolean']['input']>;
    /** The customer's family name. */
    lastname?: InputMaybe<Scalars['String']['input']>;
    /** The customer's middle name. */
    middlename?: InputMaybe<Scalars['String']['input']>;
    /** The customer's password. */
    password?: InputMaybe<Scalars['String']['input']>;
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: InputMaybe<Scalars['String']['input']>;
    /** A value such as Sr., Jr., or III. */
    suffix?: InputMaybe<Scalars['String']['input']>;
    /** The customer's Tax/VAT number (for corporate customers). */
    taxvat?: InputMaybe<Scalars['String']['input']>;
};
/** Contains details about each of the customer's orders. */
export type CustomerOrder = {
    __typename?: 'CustomerOrder';
    /** Coupons applied to the order. */
    applied_coupons: Array<Maybe<AppliedCoupon>>;
    /** The billing address for the order. */
    billing_address?: Maybe<OrderAddress>;
    /** The shipping carrier for the order delivery. */
    carrier?: Maybe<Scalars['String']['output']>;
    /** Comments about the order. */
    comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
    /** @deprecated Use the `order_date` field instead. */
    created_at?: Maybe<Scalars['String']['output']>;
    /** A list of credit memos. */
    credit_memos?: Maybe<Array<Maybe<CreditMemo>>>;
    /** Order customer email. */
    email?: Maybe<Scalars['String']['output']>;
    /** The entered gift message for the order */
    gift_message?: Maybe<GiftMessage>;
    /** Indicates whether the customer requested a gift receipt for the order. */
    gift_receipt_included: Scalars['Boolean']['output'];
    /** The selected gift wrapping for the order. */
    gift_wrapping?: Maybe<GiftWrapping>;
    /** @deprecated Use the `totals.grand_total` field instead. */
    grand_total?: Maybe<Scalars['Float']['output']>;
    /** The unique ID for a `CustomerOrder` object. */
    id: Scalars['ID']['output'];
    /** @deprecated Use the `id` field instead. */
    increment_id?: Maybe<Scalars['String']['output']>;
    /** A list of invoices for the order. */
    invoices: Array<Maybe<Invoice>>;
    is_virtual: Scalars['Boolean']['output'];
    /** An array containing the items purchased in this order. */
    items?: Maybe<Array<Maybe<OrderItemInterface>>>;
    /** A list of order items eligible to be in a return request. */
    items_eligible_for_return?: Maybe<Array<Maybe<OrderItemInterface>>>;
    /** The order number. */
    number: Scalars['String']['output'];
    /** The date the order was placed. */
    order_date: Scalars['String']['output'];
    /** @deprecated Use the `number` field instead. */
    order_number: Scalars['String']['output'];
    /** Payment details for the order. */
    payment_methods?: Maybe<Array<Maybe<OrderPaymentMethod>>>;
    /** Indicates whether the customer requested a printed card for the order. */
    printed_card_included: Scalars['Boolean']['output'];
    /** Return requests associated with this order. */
    returns?: Maybe<Returns>;
    /** A list of shipments for the order. */
    shipments?: Maybe<Array<Maybe<OrderShipment>>>;
    /** The shipping address for the order. */
    shipping_address?: Maybe<OrderAddress>;
    /** The delivery method for the order. */
    shipping_method?: Maybe<Scalars['String']['output']>;
    /** The current status of the order. */
    status: Scalars['String']['output'];
    /** The token that can be used to retrieve the order using order query. */
    token: Scalars['String']['output'];
    /** Details about the calculated totals for this order. */
    total?: Maybe<OrderTotal>;
};
/** Contains details about each of the customer's orders. */
export type CustomerOrderReturnsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** CustomerOrderSortInput specifies the field to use for sorting search results and indicates whether the results are sorted in ascending or descending order. */
export type CustomerOrderSortInput = {
    /** This enumeration indicates whether to return results in ascending or descending order */
    sort_direction: SortEnum;
    /** Specifies the field to use for sorting */
    sort_field: CustomerOrderSortableField;
};
/** Specifies the field to use for sorting */
export declare enum CustomerOrderSortableField {
    /** Sorts customer orders by created_at field */
    CreatedAt = "CREATED_AT",
    /** Sorts customer orders by number */
    Number = "NUMBER"
}
/** The collection of orders that match the conditions defined in the filter. */
export type CustomerOrders = {
    __typename?: 'CustomerOrders';
    /** An array of customer orders. */
    items: Array<Maybe<CustomerOrder>>;
    /** Contains pagination metadata. */
    page_info?: Maybe<SearchResultPageInfo>;
    /** The total count of customer orders. */
    total_count?: Maybe<Scalars['Int']['output']>;
};
/** Identifies the filter to use for filtering orders. */
export type CustomerOrdersFilterInput = {
    /** Filters by order number. */
    number?: InputMaybe<FilterStringTypeInput>;
};
/** Contains details about a newly-created or updated customer. */
export type CustomerOutput = {
    __typename?: 'CustomerOutput';
    /** Customer details after creating or updating a customer. */
    customer: Customer;
};
/** Contains payment tokens stored in the customer's vault. */
export type CustomerPaymentTokens = {
    __typename?: 'CustomerPaymentTokens';
    /** An array of payment tokens. */
    items: Array<Maybe<PaymentToken>>;
};
/** Contains store credit information with balance and history. */
export type CustomerStoreCredit = {
    __typename?: 'CustomerStoreCredit';
    /** Contains the customer's store credit balance history. If the history or store credit feature is disabled, then a null value will be returned. */
    balance_history?: Maybe<CustomerStoreCreditHistory>;
    /** The current balance of store credit. */
    current_balance?: Maybe<Money>;
    /** Indicates whether store credits are enabled. If the feature is disabled, then the balance will not be returned. */
    enabled?: Maybe<Scalars['Boolean']['output']>;
};
/** Contains store credit information with balance and history. */
export type CustomerStoreCreditBalance_HistoryArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** Lists changes to the amount of store credit available to the customer. */
export type CustomerStoreCreditHistory = {
    __typename?: 'CustomerStoreCreditHistory';
    /** An array containing information about changes to the store credit available to the customer. */
    items?: Maybe<Array<Maybe<CustomerStoreCreditHistoryItem>>>;
    /** Metadata for pagination rendering. */
    page_info?: Maybe<SearchResultPageInfo>;
    /** The number of items returned. */
    total_count?: Maybe<Scalars['Int']['output']>;
};
/** Contains store credit history information. */
export type CustomerStoreCreditHistoryItem = {
    __typename?: 'CustomerStoreCreditHistoryItem';
    /** The action that was made on the store credit. */
    action?: Maybe<Scalars['String']['output']>;
    /** The store credit available to the customer as a result of this action.  */
    actual_balance?: Maybe<Money>;
    /** The amount added to or subtracted from the store credit as a result of this action. */
    balance_change?: Maybe<Money>;
    /** The date and time when the store credit change was made. */
    date_time_changed?: Maybe<Scalars['String']['output']>;
};
/** Contains a customer authorization token. */
export type CustomerToken = {
    __typename?: 'CustomerToken';
    /** The customer authorization token. */
    token?: Maybe<Scalars['String']['output']>;
};
/** An input object for updating a customer. */
export type CustomerUpdateInput = {
    /** Indicates whether the customer has enabled remote shopping assistance. */
    allow_remote_shopping_assistance?: InputMaybe<Scalars['Boolean']['input']>;
    /** The customer's custom attributes. */
    custom_attributes?: InputMaybe<Array<InputMaybe<AttributeValueInput>>>;
    /** The customer's date of birth. */
    date_of_birth?: InputMaybe<Scalars['String']['input']>;
    /** Deprecated: Use `date_of_birth` instead. */
    dob?: InputMaybe<Scalars['String']['input']>;
    /** The customer's first name. */
    firstname?: InputMaybe<Scalars['String']['input']>;
    /** The customer's gender (Male - 1, Female - 2). */
    gender?: InputMaybe<Scalars['Int']['input']>;
    /** Indicates whether the customer is subscribed to the company's newsletter. */
    is_subscribed?: InputMaybe<Scalars['Boolean']['input']>;
    /** The customer's family name. */
    lastname?: InputMaybe<Scalars['String']['input']>;
    /** The customer's middle name. */
    middlename?: InputMaybe<Scalars['String']['input']>;
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: InputMaybe<Scalars['String']['input']>;
    /** A value such as Sr., Jr., or III. */
    suffix?: InputMaybe<Scalars['String']['input']>;
    /** The customer's Tax/VAT number (for corporate customers). */
    taxvat?: InputMaybe<Scalars['String']['input']>;
};
/** Contains information about a text area that is defined as part of a customizable option. */
export type CustomizableAreaOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableAreaOption';
    /**
     * Option ID.
     * @deprecated Use `uid` instead
     */
    option_id?: Maybe<Scalars['Int']['output']>;
    /** The Stock Keeping Unit of the base product. */
    product_sku?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']['output']>;
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableOptionInterface` object. */
    uid: Scalars['ID']['output'];
    /** An object that defines a text area. */
    value?: Maybe<CustomizableAreaValue>;
};
/** Defines the price and sku of a product whose page contains a customized text area. */
export type CustomizableAreaValue = {
    __typename?: 'CustomizableAreaValue';
    /** The maximum number of characters that can be entered for this customizable option. */
    max_characters?: Maybe<Scalars['Int']['output']>;
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']['output']>;
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>;
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableAreaValue` object. */
    uid: Scalars['ID']['output'];
};
/** Contains information about a set of checkbox values that are defined as part of a customizable option. */
export type CustomizableCheckboxOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableCheckboxOption';
    /**
     * Option ID.
     * @deprecated Use `uid` instead
     */
    option_id?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']['output']>;
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableOptionInterface` object. */
    uid: Scalars['ID']['output'];
    /** An array that defines a set of checkbox values. */
    value?: Maybe<Array<Maybe<CustomizableCheckboxValue>>>;
};
/** Defines the price and sku of a product whose page contains a customized set of checkbox values. */
export type CustomizableCheckboxValue = {
    __typename?: 'CustomizableCheckboxValue';
    /** The ID assigned to the value. */
    option_type_id?: Maybe<Scalars['Int']['output']>;
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']['output']>;
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>;
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The order in which the checkbox value is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableCheckboxValue` object. */
    uid: Scalars['ID']['output'];
};
/** Contains information about a date picker that is defined as part of a customizable option. */
export type CustomizableDateOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableDateOption';
    /**
     * Option ID.
     * @deprecated Use `uid` instead
     */
    option_id?: Maybe<Scalars['Int']['output']>;
    /** The Stock Keeping Unit of the base product. */
    product_sku?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']['output']>;
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableOptionInterface` object. */
    uid: Scalars['ID']['output'];
    /** An object that defines a date field in a customizable option. */
    value?: Maybe<CustomizableDateValue>;
};
/** Defines the customizable date type. */
export declare enum CustomizableDateTypeEnum {
    Date = "DATE",
    DateTime = "DATE_TIME",
    Time = "TIME"
}
/** Defines the price and sku of a product whose page contains a customized date picker. */
export type CustomizableDateValue = {
    __typename?: 'CustomizableDateValue';
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']['output']>;
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>;
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']['output']>;
    /** DATE, DATE_TIME or TIME */
    type?: Maybe<CustomizableDateTypeEnum>;
    /** The unique ID for a `CustomizableDateValue` object. */
    uid: Scalars['ID']['output'];
};
/** Contains information about a drop down menu that is defined as part of a customizable option. */
export type CustomizableDropDownOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableDropDownOption';
    /**
     * Option ID.
     * @deprecated Use `uid` instead
     */
    option_id?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']['output']>;
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableOptionInterface` object. */
    uid: Scalars['ID']['output'];
    /** An array that defines the set of options for a drop down menu. */
    value?: Maybe<Array<Maybe<CustomizableDropDownValue>>>;
};
/** Defines the price and sku of a product whose page contains a customized drop down menu. */
export type CustomizableDropDownValue = {
    __typename?: 'CustomizableDropDownValue';
    /** The ID assigned to the value. */
    option_type_id?: Maybe<Scalars['Int']['output']>;
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']['output']>;
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>;
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableDropDownValue` object. */
    uid: Scalars['ID']['output'];
};
/** Contains information about a text field that is defined as part of a customizable option. */
export type CustomizableFieldOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableFieldOption';
    /**
     * Option ID.
     * @deprecated Use `uid` instead
     */
    option_id?: Maybe<Scalars['Int']['output']>;
    /** The Stock Keeping Unit of the base product. */
    product_sku?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']['output']>;
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableOptionInterface` object. */
    uid: Scalars['ID']['output'];
    /** An object that defines a text field. */
    value?: Maybe<CustomizableFieldValue>;
};
/** Defines the price and sku of a product whose page contains a customized text field. */
export type CustomizableFieldValue = {
    __typename?: 'CustomizableFieldValue';
    /** The maximum number of characters that can be entered for this customizable option. */
    max_characters?: Maybe<Scalars['Int']['output']>;
    /** The price of the custom value. */
    price?: Maybe<Scalars['Float']['output']>;
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>;
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableFieldValue` object. */
    uid: Scalars['ID']['output'];
};
/** Contains information about a file picker that is defined as part of a customizable option. */
export type CustomizableFileOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableFileOption';
    /**
     * Option ID.
     * @deprecated Use `uid` instead
     */
    option_id?: Maybe<Scalars['Int']['output']>;
    /** The Stock Keeping Unit of the base product. */
    product_sku?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']['output']>;
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableOptionInterface` object. */
    uid: Scalars['ID']['output'];
    /** An object that defines a file value. */
    value?: Maybe<CustomizableFileValue>;
};
/** Defines the price and sku of a product whose page contains a customized file picker. */
export type CustomizableFileValue = {
    __typename?: 'CustomizableFileValue';
    /** The file extension to accept. */
    file_extension?: Maybe<Scalars['String']['output']>;
    /** The maximum width of an image. */
    image_size_x?: Maybe<Scalars['Int']['output']>;
    /** The maximum height of an image. */
    image_size_y?: Maybe<Scalars['Int']['output']>;
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']['output']>;
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>;
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableFileValue` object. */
    uid: Scalars['ID']['output'];
};
/** Contains information about a multiselect that is defined as part of a customizable option. */
export type CustomizableMultipleOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableMultipleOption';
    /**
     * Option ID.
     * @deprecated Use `uid` instead
     */
    option_id?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']['output']>;
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableOptionInterface` object. */
    uid: Scalars['ID']['output'];
    /** An array that defines the set of options for a multiselect. */
    value?: Maybe<Array<Maybe<CustomizableMultipleValue>>>;
};
/** Defines the price and sku of a product whose page contains a customized multiselect. */
export type CustomizableMultipleValue = {
    __typename?: 'CustomizableMultipleValue';
    /** The ID assigned to the value. */
    option_type_id?: Maybe<Scalars['Int']['output']>;
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']['output']>;
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>;
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableMultipleValue` object. */
    uid: Scalars['ID']['output'];
};
/** Defines a customizable option. */
export type CustomizableOptionInput = {
    /** The customizable option ID of the product. */
    id?: InputMaybe<Scalars['Int']['input']>;
    /** The unique ID for a `CartItemInterface` object. */
    uid?: InputMaybe<Scalars['ID']['input']>;
    /** The string value of the option. */
    value_string: Scalars['String']['input'];
};
/** Contains basic information about a customizable option. It can be implemented by several types of configurable options. */
export type CustomizableOptionInterface = {
    /**
     * Option ID.
     * @deprecated Use `uid` instead
     */
    option_id?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']['output']>;
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableOptionInterface` object. */
    uid: Scalars['ID']['output'];
};
/** Contains information about customizable product options. */
export type CustomizableProductInterface = {
    /** An array of options for a customizable product. */
    options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
};
/** Contains information about a set of radio buttons that are defined as part of a customizable option. */
export type CustomizableRadioOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableRadioOption';
    /**
     * Option ID.
     * @deprecated Use `uid` instead
     */
    option_id?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']['output']>;
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableOptionInterface` object. */
    uid: Scalars['ID']['output'];
    /** An array that defines a set of radio buttons. */
    value?: Maybe<Array<Maybe<CustomizableRadioValue>>>;
};
/** Defines the price and sku of a product whose page contains a customized set of radio buttons. */
export type CustomizableRadioValue = {
    __typename?: 'CustomizableRadioValue';
    /** The ID assigned to the value. */
    option_type_id?: Maybe<Scalars['Int']['output']>;
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']['output']>;
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>;
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The order in which the radio button is displayed. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name for this option. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `CustomizableRadioValue` object. */
    uid: Scalars['ID']['output'];
};
/** Contains the results of the request to delete a compare list. */
export type DeleteCompareListOutput = {
    __typename?: 'DeleteCompareListOutput';
    /** Indicates whether the compare list was successfully deleted. */
    result: Scalars['Boolean']['output'];
};
/** Indicates whether the request succeeded and returns the remaining customer payment tokens. */
export type DeletePaymentTokenOutput = {
    __typename?: 'DeletePaymentTokenOutput';
    /** A container for the customer's remaining payment tokens. */
    customerPaymentTokens?: Maybe<CustomerPaymentTokens>;
    /** Indicates whether the request succeeded. */
    result: Scalars['Boolean']['output'];
};
export type DeleteV1CartsGuestcartsCartIdGiftCardsGiftCardCode_Response = Boolean_Container | Error_Response;
export type DeleteV1GuestcartsCartIdCoupons_Response = Boolean_Container | Error_Response;
export type DeleteV1GuestcartsCartIdItemsItemId_Response = Boolean_Container | Error_Response;
/** Contains the status of the request to delete a wish list and an array of the customer's remaining wish lists. */
export type DeleteWishlistOutput = {
    __typename?: 'DeleteWishlistOutput';
    /** Indicates whether the wish list was deleted. */
    status: Scalars['Boolean']['output'];
    /** A list of undeleted wish lists. */
    wishlists: Array<Maybe<Wishlist>>;
};
/** Defines an individual discount. A discount can be applied to the cart as a whole or to an item, shipping. */
export type Discount = {
    __typename?: 'Discount';
    /** The amount of the discount. */
    amount: Money;
    /** The type of the entity the discount is applied to. */
    applied_to: CartDiscountType;
    /** The coupon related to the discount. */
    coupon?: Maybe<AppliedCoupon>;
    /** A description of the discount. */
    label: Scalars['String']['output'];
};
/** An implementation for downloadable product cart items. */
export type DownloadableCartItem = CartItemInterface & {
    __typename?: 'DownloadableCartItem';
    /** An array containing the customizable options the shopper selected. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** An array of errors encountered while loading the cart item */
    errors?: Maybe<Array<Maybe<CartItemError>>>;
    /** @deprecated Use `uid` instead. */
    id: Scalars['String']['output'];
    /** True if requested quantity is less than available stock, false otherwise. */
    is_available: Scalars['Boolean']['output'];
    /** An array containing information about the links for the downloadable product added to the cart. */
    links?: Maybe<Array<Maybe<DownloadableProductLinks>>>;
    /** Message to display when the product is not available with this selected option. */
    not_available_message?: Maybe<Scalars['String']['output']>;
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<CartItemPrices>;
    /** Details about an item in the cart. */
    product: ProductInterface;
    /** The quantity of this item in the cart. */
    quantity: Scalars['Float']['output'];
    /** An array containing information about samples of the selected downloadable product. */
    samples?: Maybe<Array<Maybe<DownloadableProductSamples>>>;
    /** The unique ID for a `CartItemInterface` object. */
    uid: Scalars['ID']['output'];
};
/** Defines downloadable product options for `CreditMemoItemInterface`. */
export type DownloadableCreditMemoItem = CreditMemoItemInterface & {
    __typename?: 'DownloadableCreditMemoItem';
    /** Details about the final discount amount for the base product, including discounts on options. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** A list of downloadable links that are refunded from the downloadable product. */
    downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>;
    /** The unique ID for a `CreditMemoItemInterface` object. */
    id: Scalars['ID']['output'];
    /** The order item the credit memo is applied to. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product, including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of refunded items. */
    quantity_refunded?: Maybe<Scalars['Float']['output']>;
};
export declare enum DownloadableFileTypeEnum {
    /** @deprecated `sample_url` serves to get the downloadable sample */
    File = "FILE",
    /** @deprecated `sample_url` serves to get the downloadable sample */
    Url = "URL"
}
/** Defines downloadable product options for `InvoiceItemInterface`. */
export type DownloadableInvoiceItem = InvoiceItemInterface & {
    __typename?: 'DownloadableInvoiceItem';
    /** Information about the final discount amount for the base product, including discounts on options. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** A list of downloadable links that are invoiced from the downloadable product. */
    downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>;
    /** The unique ID for an `InvoiceItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Details about an individual order item. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of invoiced items. */
    quantity_invoiced?: Maybe<Scalars['Float']['output']>;
};
/** Defines characteristics of the links for downloadable product. */
export type DownloadableItemsLinks = {
    __typename?: 'DownloadableItemsLinks';
    /** A number indicating the sort order. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name of the link. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `DownloadableItemsLinks` object. */
    uid: Scalars['ID']['output'];
};
/** Defines downloadable product options for `OrderItemInterface`. */
export type DownloadableOrderItem = OrderItemInterface & {
    __typename?: 'DownloadableOrderItem';
    /** The final discount information for the product. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** A list of downloadable links that are ordered from the downloadable product. */
    downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>;
    /** Indicates whether the order item is eligible to be in a return request. */
    eligible_for_return?: Maybe<Scalars['Boolean']['output']>;
    /** The entered option for the base product, such as a logo or image. */
    entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
    /** The selected gift message for the order item */
    gift_message?: Maybe<GiftMessage>;
    /** The selected gift wrapping for the order item. */
    gift_wrapping?: Maybe<GiftWrapping>;
    /** The unique ID for an `OrderItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<OrderItemPrices>;
    /** The ProductInterface object, which contains details about the base product */
    product?: Maybe<ProductInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price of the base product, including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The type of product, such as simple, configurable, etc. */
    product_type?: Maybe<Scalars['String']['output']>;
    /** URL key of the base product. */
    product_url_key?: Maybe<Scalars['String']['output']>;
    /** The number of canceled items. */
    quantity_canceled?: Maybe<Scalars['Float']['output']>;
    /** The number of invoiced items. */
    quantity_invoiced?: Maybe<Scalars['Float']['output']>;
    /** The number of units ordered for this item. */
    quantity_ordered?: Maybe<Scalars['Float']['output']>;
    /** The number of refunded items. */
    quantity_refunded?: Maybe<Scalars['Float']['output']>;
    /** The number of returned items. */
    quantity_returned?: Maybe<Scalars['Float']['output']>;
    /** The number of shipped items. */
    quantity_shipped?: Maybe<Scalars['Float']['output']>;
    /** The selected options for the base product, such as color or size. */
    selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
    /** The status of the order item. */
    status?: Maybe<Scalars['String']['output']>;
};
/** Defines a product that the shopper downloads. */
export type DownloadableProduct = CustomizableProductInterface & ProductInterface & RoutableInterface & {
    __typename?: 'DownloadableProduct';
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_announcement_date?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_brand?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_custom_engraving_text?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_detailed_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_pagebuilder_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_gemstone_addon?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_recyclable_material?: Maybe<Scalars['Int']['output']>;
    /**
     * The attribute set assigned to the product.
     * @deprecated The field should not be used on the storefront.
     */
    attribute_set_id?: Maybe<Scalars['Int']['output']>;
    /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
    canonical_url?: Maybe<Scalars['String']['output']>;
    /** The categories assigned to a product. */
    categories?: Maybe<Array<Maybe<CategoryInterface>>>;
    /** @deprecated Use the `custom_attributes` field instead. */
    color?: Maybe<Scalars['Int']['output']>;
    /** The product's country of origin. */
    country_of_manufacture?: Maybe<Scalars['String']['output']>;
    /**
     * Timestamp indicating when the product was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: Maybe<Scalars['String']['output']>;
    /** An array of cross-sell products. */
    crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** Product custom attributes. */
    custom_attributesV2?: Maybe<ProductCustomAttributes>;
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: Maybe<ComplexTextValue>;
    /** @deprecated Use the `custom_attributes` field instead. */
    description_extra?: Maybe<Scalars['String']['output']>;
    /** An array containing information about the links for this downloadable product. */
    downloadable_product_links?: Maybe<Array<Maybe<DownloadableProductLinks>>>;
    /** An array containing information about samples of this downloadable product. */
    downloadable_product_samples?: Maybe<Array<Maybe<DownloadableProductSamples>>>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_color?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_material?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_size?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_style?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    format?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    has_video?: Maybe<Scalars['Int']['output']>;
    /**
     * The ID number assigned to the product.
     * @deprecated Use the `uid` field instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** The relative path to the main image on the product page. */
    image?: Maybe<ProductImage>;
    /** Indicates whether the product can be returned. */
    is_returnable?: Maybe<Scalars['String']['output']>;
    /** A value of 1 indicates that each link in the array must be purchased separately. */
    links_purchased_separately?: Maybe<Scalars['Int']['output']>;
    /** The heading above the list of downloadable products. */
    links_title?: Maybe<Scalars['String']['output']>;
    /**
     * A number representing the product's manufacturer.
     * @deprecated Use the `custom_attributes` field instead.
     */
    manufacturer?: Maybe<Scalars['Int']['output']>;
    /** An array of media gallery objects. */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use `media_gallery` instead.
     */
    media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: Maybe<Scalars['String']['output']>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: Maybe<Scalars['String']['output']>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: Maybe<Scalars['String']['output']>;
    /** The product name. Customers use this name to identify the product. */
    name?: Maybe<Scalars['String']['output']>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    new_from_date?: Maybe<Scalars['String']['output']>;
    /** The end date for new product listings. */
    new_to_date?: Maybe<Scalars['String']['output']>;
    /** Product stock only x left count */
    only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
    /** An array of options for a customizable product. */
    options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: Maybe<Scalars['String']['output']>;
    /**
     * Indicates the price of an item.
     * @deprecated Use `price_range` for product price information.
     */
    price?: Maybe<ProductPrices>;
    /** The range of prices for the product */
    price_range: PriceRange;
    /** An array of `TierPrice` objects. */
    price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
    /** An array of `ProductLinks` objects. */
    product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
    /** The average of all the ratings given to the product. */
    rating_summary: Scalars['Float']['output'];
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirect_code: Scalars['Int']['output'];
    /** An array of related products. */
    related_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** The total count of all the reviews given to the product. */
    review_count: Scalars['Int']['output'];
    /** The list of products reviews. */
    reviews: ProductReviews;
    /** A short description of the product. Its use depends on the theme. */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: Maybe<ProductImage>;
    /**
     * The beginning date that a product has a special price.
     * @deprecated The field should not be used on the storefront.
     */
    special_from_date?: Maybe<Scalars['String']['output']>;
    /** The discounted price of the product. */
    special_price?: Maybe<Scalars['Float']['output']>;
    /** The end date for a product with a special price. */
    special_to_date?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the product is staged for a future campaign. */
    staged: Scalars['Boolean']['output'];
    /** Stock status of the product */
    stock_status?: Maybe<ProductStockStatus>;
    /** The file name of a swatch image. */
    swatch_image?: Maybe<Scalars['String']['output']>;
    /** The relative path to the product's thumbnail image. */
    thumbnail?: Maybe<ProductImage>;
    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_price?: Maybe<Scalars['Float']['output']>;
    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use `__typename` instead.
     */
    type_id?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `ProductInterface` object. */
    uid: Scalars['ID']['output'];
    /**
     * Timestamp indicating when the product was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** An array of up-sell products. */
    upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The part of the URL that identifies the product */
    url_key?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use product's `canonical_url` or url rewrites instead */
    url_path?: Maybe<Scalars['String']['output']>;
    /** URL rewrites list */
    url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
    /** The part of the product URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    video_file?: Maybe<Scalars['String']['output']>;
    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Maybe<Array<Maybe<Website>>>;
};
/** Defines a product that the shopper downloads. */
export type DownloadableProductCustom_AttributesV2Args = {
    filters?: InputMaybe<AttributeFilterInput>;
};
/** Defines a product that the shopper downloads. */
export type DownloadableProductReviewsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** Defines a single downloadable product. */
export type DownloadableProductCartItemInput = {
    /** The ID and value of the option. */
    customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
    /** The quantity and SKU of the downloadable product. */
    data: CartItemInput;
    /** An array of objects containing the link_id of the downloadable product link. */
    downloadable_product_links?: InputMaybe<Array<InputMaybe<DownloadableProductLinksInput>>>;
};
/** Defines characteristics of a downloadable product. */
export type DownloadableProductLinks = {
    __typename?: 'DownloadableProductLinks';
    /** @deprecated This information should not be exposed on frontend. */
    id?: Maybe<Scalars['Int']['output']>;
    /** @deprecated This information should not be exposed on frontend. */
    is_shareable?: Maybe<Scalars['Boolean']['output']>;
    /** @deprecated `sample_url` serves to get the downloadable sample */
    link_type?: Maybe<DownloadableFileTypeEnum>;
    /** @deprecated This information should not be exposed on frontend. */
    number_of_downloads?: Maybe<Scalars['Int']['output']>;
    /** The price of the downloadable product. */
    price?: Maybe<Scalars['Float']['output']>;
    /** @deprecated `sample_url` serves to get the downloadable sample */
    sample_file?: Maybe<Scalars['String']['output']>;
    /** @deprecated `sample_url` serves to get the downloadable sample */
    sample_type?: Maybe<DownloadableFileTypeEnum>;
    /** The full URL to the downloadable sample. */
    sample_url?: Maybe<Scalars['String']['output']>;
    /** A number indicating the sort order. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name of the link. */
    title?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `DownloadableProductLinks` object. */
    uid: Scalars['ID']['output'];
};
/** Contains the link ID for the downloadable product. */
export type DownloadableProductLinksInput = {
    /** The unique ID of the downloadable product link. */
    link_id: Scalars['Int']['input'];
};
/** Defines characteristics of a downloadable product. */
export type DownloadableProductSamples = {
    __typename?: 'DownloadableProductSamples';
    /** @deprecated This information should not be exposed on frontend. */
    id?: Maybe<Scalars['Int']['output']>;
    /** @deprecated `sample_url` serves to get the downloadable sample */
    sample_file?: Maybe<Scalars['String']['output']>;
    /** @deprecated `sample_url` serves to get the downloadable sample */
    sample_type?: Maybe<DownloadableFileTypeEnum>;
    /** The full URL to the downloadable sample. */
    sample_url?: Maybe<Scalars['String']['output']>;
    /** A number indicating the sort order. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The display name of the sample. */
    title?: Maybe<Scalars['String']['output']>;
};
/** A downloadable product wish list item. */
export type DownloadableWishlistItem = WishlistItemInterface & {
    __typename?: 'DownloadableWishlistItem';
    /** The date and time the item was added to the wish list. */
    added_at: Scalars['String']['output'];
    /** Custom options selected for the wish list item. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** The description of the item. */
    description?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `WishlistItemInterface` object. */
    id: Scalars['ID']['output'];
    /** An array containing information about the selected links. */
    links_v2?: Maybe<Array<Maybe<DownloadableProductLinks>>>;
    /** Product details of the wish list item. */
    product?: Maybe<ProductInterface>;
    /** The quantity of this wish list item. */
    quantity: Scalars['Float']['output'];
    /** An array containing information about the selected samples. */
    samples?: Maybe<Array<Maybe<DownloadableProductSamples>>>;
};
/** Contains a single dynamic block. */
export type DynamicBlock = {
    __typename?: 'DynamicBlock';
    /** The renderable HTML code of the dynamic block. */
    content: ComplexTextValue;
    /** The unique ID of a `DynamicBlock` object. */
    uid: Scalars['ID']['output'];
};
/** Indicates the locations the dynamic block can be placed. If this field is not specified, the query returns all locations. */
export declare enum DynamicBlockLocationEnum {
    Content = "CONTENT",
    Footer = "FOOTER",
    Header = "HEADER",
    Left = "LEFT",
    Right = "RIGHT"
}
/** Indicates the selected Dynamic Blocks Rotator inline widget. */
export declare enum DynamicBlockTypeEnum {
    CartPriceRuleRelated = "CART_PRICE_RULE_RELATED",
    CatalogPriceRuleRelated = "CATALOG_PRICE_RULE_RELATED",
    Specified = "SPECIFIED"
}
/** Contains an array of dynamic blocks. */
export type DynamicBlocks = {
    __typename?: 'DynamicBlocks';
    /** An array containing individual dynamic blocks. */
    items: Array<Maybe<DynamicBlock>>;
    /** Metadata for pagination rendering. */
    page_info?: Maybe<SearchResultPageInfo>;
    /** The number of returned dynamic blocks. */
    total_count: Scalars['Int']['output'];
};
/** Defines the dynamic block filter. The filter can identify the block type, location and IDs to return. */
export type DynamicBlocksFilterInput = {
    /** An array of dynamic block UIDs to filter on. */
    dynamic_block_uids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    /** An array indicating the locations the dynamic block can be placed. */
    locations?: InputMaybe<Array<InputMaybe<DynamicBlockLocationEnum>>>;
    /** A value indicating the type of dynamic block to filter on. */
    type: DynamicBlockTypeEnum;
};
/** Contains details about a custom text attribute that the buyer entered. */
export type EnteredCustomAttributeInput = {
    /** A string that identifies the entered custom attribute. */
    attribute_code: Scalars['String']['input'];
    /** The text or other entered value. */
    value: Scalars['String']['input'];
};
/** Defines a customer-entered option. */
export type EnteredOptionInput = {
    /** The unique ID for a `CustomizableOptionInterface` object, such as a `CustomizableFieldOption`, `CustomizableFileOption`, or `CustomizableAreaOption` object. */
    uid: Scalars['ID']['input'];
    /** Text the customer entered. */
    value: Scalars['String']['input'];
};
/** Contains the `uid`, `relative_url`, and `type` attributes. */
export type EntityUrl = {
    __typename?: 'EntityUrl';
    /** @deprecated Use `relative_url` instead. */
    canonical_url?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `ProductInterface`, `CategoryInterface`, `CmsPage`, or similar object associated with the specified URL. This could be a product, category, or CMS page UID. */
    entity_uid?: Maybe<Scalars['ID']['output']>;
    /**
     * The ID assigned to the object associated with the specified url. This could be a product ID, category ID, or page ID.
     * @deprecated Use `entity_uid` instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirectCode?: Maybe<Scalars['Int']['output']>;
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
};
export type ErrorInterface = {
    /** The returned error message. */
    message: Scalars['String']['output'];
};
/** Contains details about an address. */
export type EstimateAddressInput = {
    /** The two-letter code representing the customer's country. */
    country_code: CountryCodeEnum;
    /** The customer's ZIP or postal code. */
    postcode?: InputMaybe<Scalars['String']['input']>;
    /** An object containing the region name, region code, and region ID. */
    region?: InputMaybe<CustomerAddressRegionInput>;
};
export type EstimateTotalsInput = {
    /** Customer's address to estimate totals. */
    address: EstimateAddressInput;
    /** The unique ID of the cart to query. */
    cart_id: Scalars['String']['input'];
    /** Selected shipping method to estimate totals. */
    shipping_method?: InputMaybe<ShippingMethodInput>;
};
/** Estimate totals output. */
export type EstimateTotalsOutput = {
    __typename?: 'EstimateTotalsOutput';
    /** Cart after totals estimation */
    cart?: Maybe<Cart>;
};
/** Lists the exchange rate. */
export type ExchangeRate = {
    __typename?: 'ExchangeRate';
    /** Specifies the store’s default currency to exchange to. */
    currency_to?: Maybe<Scalars['String']['output']>;
    /** The exchange rate for the store’s default currency. */
    rate?: Maybe<Scalars['Float']['output']>;
};
/** Defines a filter that matches the input exactly. */
export type FilterEqualTypeInput = {
    /** Use this attribute to exactly match the specified string. For example, to filter on a specific category ID, specify a value such as `5`. */
    eq?: InputMaybe<Scalars['String']['input']>;
    /** Use this attribute to filter on an array of values. For example, to filter on category IDs 4, 5, and 6, specify a value of `["4", "5", "6"]`. */
    in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};
export declare enum FilterMatchTypeEnum {
    Full = "FULL",
    Partial = "PARTIAL"
}
/** Defines a filter that performs a fuzzy search. */
export type FilterMatchTypeInput = {
    /** Use this attribute to fuzzy match the specified string. For example, to filter on a specific SKU, specify a value such as `24-MB01`. */
    match?: InputMaybe<Scalars['String']['input']>;
    /** Filter match type for fine-tuned results. Possible values FULL or PARTIAL. If match_type is not provided, returned results will default to FULL match. */
    match_type?: InputMaybe<FilterMatchTypeEnum>;
};
/** Defines a filter that matches a range of values, such as prices or dates. */
export type FilterRangeTypeInput = {
    /** Use this attribute to specify the lowest possible value in the range. */
    from?: InputMaybe<Scalars['String']['input']>;
    /** Use this attribute to specify the highest possible value in the range. */
    to?: InputMaybe<Scalars['String']['input']>;
};
/** Defines a filter for an input string. */
export type FilterStringTypeInput = {
    /** Filters items that are exactly the same as the specified string. */
    eq?: InputMaybe<Scalars['String']['input']>;
    /** Filters items that are exactly the same as entries specified in an array of strings. */
    in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    /** Defines a filter that performs a fuzzy search using the specified string. */
    match?: InputMaybe<Scalars['String']['input']>;
};
/** Defines the comparison operators that can be used in a filter. */
export type FilterTypeInput = {
    /** Equals. */
    eq?: InputMaybe<Scalars['String']['input']>;
    finset?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    /** From. Must be used with the `to` field. */
    from?: InputMaybe<Scalars['String']['input']>;
    /** Greater than. */
    gt?: InputMaybe<Scalars['String']['input']>;
    /** Greater than or equal to. */
    gteq?: InputMaybe<Scalars['String']['input']>;
    /** In. The value can contain a set of comma-separated values. */
    in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    /** Like. The specified value can contain % (percent signs) to allow matching of 0 or more characters. */
    like?: InputMaybe<Scalars['String']['input']>;
    /** Less than. */
    lt?: InputMaybe<Scalars['String']['input']>;
    /** Less than or equal to. */
    lteq?: InputMaybe<Scalars['String']['input']>;
    /** More than or equal to. */
    moreq?: InputMaybe<Scalars['String']['input']>;
    /** Not equal to. */
    neq?: InputMaybe<Scalars['String']['input']>;
    /** Not in. The value can contain a set of comma-separated values. */
    nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    /** Not null. */
    notnull?: InputMaybe<Scalars['String']['input']>;
    /** Is null. */
    null?: InputMaybe<Scalars['String']['input']>;
    /** To. Must be used with the `from` field. */
    to?: InputMaybe<Scalars['String']['input']>;
};
/** A single FPT that can be applied to a product price. */
export type FixedProductTax = {
    __typename?: 'FixedProductTax';
    /** The amount of the Fixed Product Tax. */
    amount?: Maybe<Money>;
    /** The display label assigned to the Fixed Product Tax. */
    label?: Maybe<Scalars['String']['output']>;
};
/** Lists display settings for the Fixed Product Tax. */
export declare enum FixedProductTaxDisplaySettings {
    /** The displayed price does not include the FPT amount. The values of `ProductPrice.fixed_product_taxes` and the price including the FPT are displayed separately. This value corresponds to 'Excluding FPT, Including FPT description and final price.' */
    ExcludeFptAndIncludeWithDetails = "EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS",
    /** The displayed price does not include the FPT amount. The values from `ProductPrice.fixed_product_taxes` are not displayed. This value corresponds to 'Excluding FPT'. */
    ExcludeFptWithoutDetails = "EXCLUDE_FPT_WITHOUT_DETAILS",
    /** The FPT feature is not enabled. You can omit `ProductPrice.fixed_product_taxes` from your query. */
    FptDisabled = "FPT_DISABLED",
    /** The displayed price includes the FPT amount without displaying the `ProductPrice.fixed_product_taxes` values. This value corresponds to 'Including FPT only'. */
    IncludeFptWithoutDetails = "INCLUDE_FPT_WITHOUT_DETAILS",
    /** The displayed price includes the FPT amount while displaying the values of `ProductPrice.fixed_product_taxes` separately. This value corresponds to 'Including FPT and FPT description'. */
    IncludeFptWithDetails = "INCLUDE_FPT_WITH_DETAILS"
}
export type Float_Container = {
    __typename?: 'Float_container';
    Float?: Maybe<Scalars['Float']['output']>;
};
/** Identifies which customer requires remote shopping assistance. */
export type GenerateCustomerTokenAsAdminInput = {
    /** The email address of the customer requesting remote shopping assistance. */
    customer_email: Scalars['String']['input'];
};
/** Contains the generated customer token. */
export type GenerateCustomerTokenAsAdminOutput = {
    __typename?: 'GenerateCustomerTokenAsAdminOutput';
    /** The generated customer token. */
    customer_token: Scalars['String']['output'];
};
/** Gets the payment SDK URLs and values */
export type GetPaymentSdkOutput = {
    __typename?: 'GetPaymentSDKOutput';
    /** The payment SDK parameters */
    sdkParams?: Maybe<Array<Maybe<PaymentSdkParamsItem>>>;
};
export type GetV1ApplepayAuth_Response = Error_Response | Pay_Pal_Braintree_Data_Auth_Data_Interface;
export type GetV1CartsGuestcartsCartIdCheckGiftCardGiftCardCode_Response = Float_Container | Error_Response;
export type GetV1CustomersCustomerIdPasswordResetLinkTokenResetPasswordLinkToken_Response = Boolean_Container | Error_Response;
export type GetV1DirectoryCountriesCountryId_Response = Directory_Data_Country_Information_Interface2 | Error_Response;
export type GetV1DirectoryCountries_Response = Directory_Data_Country_Information_Interface | Error_Response;
export type GetV1DirectoryCurrency_Response = Directory_Data_Currency_Information_Interface | Error_Response;
export type GetV1GuestcartsCartIdBillingaddress_Response = Error_Response | Quote_Data_Address_Interface;
export type GetV1GuestcartsCartIdCoupons_Response = String_Container | Error_Response;
export type GetV1GuestcartsCartIdGiftmessageItemId_Response = Error_Response | Gift_Message_Data_Message_Interface;
export type GetV1GuestcartsCartIdGiftmessage_Response = Error_Response | Gift_Message_Data_Message_Interface;
export type GetV1GuestcartsCartIdItems_Response = Error_Response | Quote_Data_Cart_Item_Interface2;
export type GetV1GuestcartsCartIdPaymentinformation_Response = Checkout_Data_Payment_Details_Interface | Error_Response;
export type GetV1GuestcartsCartIdPaymentmethods_Response = Error_Response | Quote_Data_Payment_Method_Interface;
export type GetV1GuestcartsCartIdPaymentorderId_Response = Error_Response | Payment_Services_Paypal_Data_Payment_Order_Details_Interface;
export type GetV1GuestcartsCartIdSelectedpaymentmethod_Response = Error_Response | Quote_Data_Payment_Interface;
export type GetV1GuestcartsCartIdShippingmethods_Response = Error_Response | Quote_Data_Shipping_Method_Interface;
export type GetV1GuestcartsCartIdTotals_Response = Error_Response | Quote_Data_Totals_Interface;
export type GetV1GuestcartsCartId_Response = Error_Response | Quote_Data_Cart_Interface;
export type GetV1InventoryInstorepickupPickuplocations_Response = Error_Response | Inventory_In_Store_Pickup_Api_Data_Search_Result_Interface;
export type GetV1PaymentsconfigApplepayLocation_Response = Error_Response | Payment_Services_Paypal_Data_Payment_Config_Apple_Pay_Interface;
export type GetV1PaymentsconfigGooglepayLocation_Response = Error_Response | Payment_Services_Paypal_Data_Payment_Config_Google_Pay_Interface;
export type GetV1PaymentsconfigHostedfieldsLocation_Response = Error_Response | Payment_Services_Paypal_Data_Payment_Config_Hosted_Fields_Interface;
export type GetV1PaymentsconfigLocation_Response = Error_Response | Payment_Services_Paypal_Payment_Config_Response_Interface;
export type GetV1PaymentsconfigSmartbuttonsLocation_Response = Error_Response | Payment_Services_Paypal_Data_Payment_Config_Smart_Buttons_Interface;
export type GetV1PaymentssdkLocationMethodCode_Response = Error_Response | Payment_Services_Paypal_Data_Payment_Sdk_Params_Interface2;
export type GetV1PaymentssdkLocation_Response = Error_Response | Payment_Services_Paypal_Data_Payment_Sdk_Params_Interface;
export type GetV1Productsrenderinfo_Response = Catalog_Data_Product_Render_Search_Results_Interface | Error_Response;
export type GetV1Search_Response = Error_Response | Framework_Search_Search_Result_Interface;
export type GetV1TfaTfatproviderstoactivate_Response = Error_Response | Two_Factor_Auth_Provider_Interface2;
export type GetV1TfaTfatuserproviders_Response = Error_Response | Two_Factor_Auth_Provider_Interface;
/** Contains details about the gift card account. */
export type GiftCardAccount = {
    __typename?: 'GiftCardAccount';
    /** The balance remaining on the gift card. */
    balance?: Maybe<Money>;
    /** The gift card account code. */
    code?: Maybe<Scalars['String']['output']>;
    /** The expiration date of the gift card. */
    expiration_date?: Maybe<Scalars['String']['output']>;
};
/** Contains the gift card code. */
export type GiftCardAccountInput = {
    /** The applied gift card code. */
    gift_card_code: Scalars['String']['input'];
};
/** Contains the value of a gift card, the website that generated the card, and related information. */
export type GiftCardAmounts = {
    __typename?: 'GiftCardAmounts';
    /** An internal attribute ID. */
    attribute_id?: Maybe<Scalars['Int']['output']>;
    /** The unique ID for a `GiftCardAmounts` object. */
    uid: Scalars['ID']['output'];
    /** The value of the gift card. */
    value?: Maybe<Scalars['Float']['output']>;
    /**
     * An ID that is assigned to each unique gift card amount.
     * @deprecated Use `uid` instead
     */
    value_id?: Maybe<Scalars['Int']['output']>;
    /** The ID of the website that generated the gift card. */
    website_id?: Maybe<Scalars['Int']['output']>;
    /** The value of the gift card. */
    website_value?: Maybe<Scalars['Float']['output']>;
};
/** Contains details about a gift card that has been added to a cart. */
export type GiftCardCartItem = CartItemInterface & {
    __typename?: 'GiftCardCartItem';
    /** The amount and currency of the gift card. */
    amount: Money;
    /** An array of customizations applied to the gift card. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** An array of errors encountered while loading the cart item */
    errors?: Maybe<Array<Maybe<CartItemError>>>;
    /** @deprecated Use `uid` instead. */
    id: Scalars['String']['output'];
    /** True if requested quantity is less than available stock, false otherwise. */
    is_available: Scalars['Boolean']['output'];
    /** The message from the sender to the recipient. */
    message?: Maybe<Scalars['String']['output']>;
    /** Message to display when the product is not available with this selected option. */
    not_available_message?: Maybe<Scalars['String']['output']>;
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<CartItemPrices>;
    /** Details about an item in the cart. */
    product: ProductInterface;
    /** The quantity of this item in the cart. */
    quantity: Scalars['Float']['output'];
    /** The email address of the person receiving the gift card. */
    recipient_email?: Maybe<Scalars['String']['output']>;
    /** The name of the person receiving the gift card. */
    recipient_name: Scalars['String']['output'];
    /** The email address of the sender. */
    sender_email?: Maybe<Scalars['String']['output']>;
    /** The name of the sender. */
    sender_name: Scalars['String']['output'];
    /** The unique ID for a `CartItemInterface` object. */
    uid: Scalars['ID']['output'];
};
export type GiftCardCreditMemoItem = CreditMemoItemInterface & {
    __typename?: 'GiftCardCreditMemoItem';
    /** Details about the final discount amount for the base product, including discounts on options. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** Selected gift card properties for a credit memo item. */
    gift_card?: Maybe<GiftCardItem>;
    /** The unique ID for a `CreditMemoItemInterface` object. */
    id: Scalars['ID']['output'];
    /** The order item the credit memo is applied to. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product, including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of refunded items. */
    quantity_refunded?: Maybe<Scalars['Float']['output']>;
};
export type GiftCardInvoiceItem = InvoiceItemInterface & {
    __typename?: 'GiftCardInvoiceItem';
    /** Information about the final discount amount for the base product, including discounts on options. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** Selected gift card properties for an invoice item. */
    gift_card?: Maybe<GiftCardItem>;
    /** The unique ID for an `InvoiceItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Details about an individual order item. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of invoiced items. */
    quantity_invoiced?: Maybe<Scalars['Float']['output']>;
};
/** Contains details about a gift card. */
export type GiftCardItem = {
    __typename?: 'GiftCardItem';
    /** The message from the sender to the recipient. */
    message?: Maybe<Scalars['String']['output']>;
    /** The email address of the receiver of a virtual gift card. */
    recipient_email?: Maybe<Scalars['String']['output']>;
    /** The name of the receiver of a physical or virtual gift card. */
    recipient_name?: Maybe<Scalars['String']['output']>;
    /** The email address of the sender of a virtual gift card. */
    sender_email?: Maybe<Scalars['String']['output']>;
    /** The name of the sender of a physical or virtual gift card. */
    sender_name?: Maybe<Scalars['String']['output']>;
};
/** Contains details about the sender, recipient, and amount of a gift card. */
export type GiftCardOptions = {
    __typename?: 'GiftCardOptions';
    /** The amount and currency of the gift card. */
    amount?: Maybe<Money>;
    /** The custom amount and currency of the gift card. */
    custom_giftcard_amount?: Maybe<Money>;
    /** The message from the sender to the recipient. */
    message?: Maybe<Scalars['String']['output']>;
    /** The email address of the person receiving the gift card. */
    recipient_email?: Maybe<Scalars['String']['output']>;
    /** The name of the person receiving the gift card. */
    recipient_name?: Maybe<Scalars['String']['output']>;
    /** The email address of the sender. */
    sender_email?: Maybe<Scalars['String']['output']>;
    /** The name of the sender. */
    sender_name?: Maybe<Scalars['String']['output']>;
};
export type GiftCardOrderItem = OrderItemInterface & {
    __typename?: 'GiftCardOrderItem';
    /** The final discount information for the product. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** Indicates whether the order item is eligible to be in a return request. */
    eligible_for_return?: Maybe<Scalars['Boolean']['output']>;
    /** The entered option for the base product, such as a logo or image. */
    entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
    /** Selected gift card properties for an order item. */
    gift_card?: Maybe<GiftCardItem>;
    /** The selected gift message for the order item */
    gift_message?: Maybe<GiftMessage>;
    /** The selected gift wrapping for the order item. */
    gift_wrapping?: Maybe<GiftWrapping>;
    /** The unique ID for an `OrderItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<OrderItemPrices>;
    /** The ProductInterface object, which contains details about the base product */
    product?: Maybe<ProductInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price of the base product, including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The type of product, such as simple, configurable, etc. */
    product_type?: Maybe<Scalars['String']['output']>;
    /** URL key of the base product. */
    product_url_key?: Maybe<Scalars['String']['output']>;
    /** The number of canceled items. */
    quantity_canceled?: Maybe<Scalars['Float']['output']>;
    /** The number of invoiced items. */
    quantity_invoiced?: Maybe<Scalars['Float']['output']>;
    /** The number of units ordered for this item. */
    quantity_ordered?: Maybe<Scalars['Float']['output']>;
    /** The number of refunded items. */
    quantity_refunded?: Maybe<Scalars['Float']['output']>;
    /** The number of returned items. */
    quantity_returned?: Maybe<Scalars['Float']['output']>;
    /** The number of shipped items. */
    quantity_shipped?: Maybe<Scalars['Float']['output']>;
    /** The selected options for the base product, such as color or size. */
    selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
    /** The status of the order item. */
    status?: Maybe<Scalars['String']['output']>;
};
/** Defines properties of a gift card. */
export type GiftCardProduct = CustomizableProductInterface & PhysicalProductInterface & ProductInterface & RoutableInterface & {
    __typename?: 'GiftCardProduct';
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_announcement_date?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_brand?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_custom_engraving_text?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_detailed_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_pagebuilder_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_gemstone_addon?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_recyclable_material?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether the customer can provide a message to accompany the gift card. */
    allow_message?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether shoppers have the ability to set the value of the gift card. */
    allow_open_amount?: Maybe<Scalars['Boolean']['output']>;
    /**
     * The attribute set assigned to the product.
     * @deprecated The field should not be used on the storefront.
     */
    attribute_set_id?: Maybe<Scalars['Int']['output']>;
    /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
    canonical_url?: Maybe<Scalars['String']['output']>;
    /** The categories assigned to a product. */
    categories?: Maybe<Array<Maybe<CategoryInterface>>>;
    /** @deprecated Use the `custom_attributes` field instead. */
    color?: Maybe<Scalars['Int']['output']>;
    /** The product's country of origin. */
    country_of_manufacture?: Maybe<Scalars['String']['output']>;
    /**
     * Timestamp indicating when the product was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: Maybe<Scalars['String']['output']>;
    /** An array of cross-sell products. */
    crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** Product custom attributes. */
    custom_attributesV2?: Maybe<ProductCustomAttributes>;
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: Maybe<ComplexTextValue>;
    /** @deprecated Use the `custom_attributes` field instead. */
    description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_color?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_material?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_size?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_style?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    format?: Maybe<Scalars['Int']['output']>;
    /** An array of customizable gift card options. */
    gift_card_options: Array<Maybe<CustomizableOptionInterface>>;
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<Scalars['String']['output']>;
    /** An array that contains information about the values and ID of a gift card. */
    giftcard_amounts?: Maybe<Array<Maybe<GiftCardAmounts>>>;
    /** An enumeration that specifies the type of gift card. */
    giftcard_type?: Maybe<GiftCardTypeEnum>;
    /** @deprecated Use the `custom_attributes` field instead. */
    has_video?: Maybe<Scalars['Int']['output']>;
    /**
     * The ID number assigned to the product.
     * @deprecated Use the `uid` field instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** The relative path to the main image on the product page. */
    image?: Maybe<ProductImage>;
    /** Indicates whether the customer can redeem the value on the card for cash. */
    is_redeemable?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether the product can be returned. */
    is_returnable?: Maybe<Scalars['String']['output']>;
    /** The number of days after purchase until the gift card expires. A null value means there is no limit. */
    lifetime?: Maybe<Scalars['Int']['output']>;
    /**
     * A number representing the product's manufacturer.
     * @deprecated Use the `custom_attributes` field instead.
     */
    manufacturer?: Maybe<Scalars['Int']['output']>;
    /** An array of media gallery objects. */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use `media_gallery` instead.
     */
    media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
    /** The maximum number of characters the gift message can contain. */
    message_max_length?: Maybe<Scalars['Int']['output']>;
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: Maybe<Scalars['String']['output']>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: Maybe<Scalars['String']['output']>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: Maybe<Scalars['String']['output']>;
    /** The product name. Customers use this name to identify the product. */
    name?: Maybe<Scalars['String']['output']>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    new_from_date?: Maybe<Scalars['String']['output']>;
    /** The end date for new product listings. */
    new_to_date?: Maybe<Scalars['String']['output']>;
    /** Product stock only x left count */
    only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
    /** The maximum acceptable value of an open amount gift card. */
    open_amount_max?: Maybe<Scalars['Float']['output']>;
    /** The minimum acceptable value of an open amount gift card. */
    open_amount_min?: Maybe<Scalars['Float']['output']>;
    /** An array of options for a customizable product. */
    options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: Maybe<Scalars['String']['output']>;
    /**
     * Indicates the price of an item.
     * @deprecated Use `price_range` for product price information.
     */
    price?: Maybe<ProductPrices>;
    /** The range of prices for the product */
    price_range: PriceRange;
    /** An array of `TierPrice` objects. */
    price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
    /** An array of `ProductLinks` objects. */
    product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
    /** The average of all the ratings given to the product. */
    rating_summary: Scalars['Float']['output'];
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirect_code: Scalars['Int']['output'];
    /** An array of related products. */
    related_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** The total count of all the reviews given to the product. */
    review_count: Scalars['Int']['output'];
    /** The list of products reviews. */
    reviews: ProductReviews;
    /** A short description of the product. Its use depends on the theme. */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: Maybe<ProductImage>;
    /**
     * The beginning date that a product has a special price.
     * @deprecated The field should not be used on the storefront.
     */
    special_from_date?: Maybe<Scalars['String']['output']>;
    /** The discounted price of the product. */
    special_price?: Maybe<Scalars['Float']['output']>;
    /** The end date for a product with a special price. */
    special_to_date?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the product is staged for a future campaign. */
    staged: Scalars['Boolean']['output'];
    /** Stock status of the product */
    stock_status?: Maybe<ProductStockStatus>;
    /** The file name of a swatch image. */
    swatch_image?: Maybe<Scalars['String']['output']>;
    /** The relative path to the product's thumbnail image. */
    thumbnail?: Maybe<ProductImage>;
    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_price?: Maybe<Scalars['Float']['output']>;
    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use `__typename` instead.
     */
    type_id?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `ProductInterface` object. */
    uid: Scalars['ID']['output'];
    /**
     * Timestamp indicating when the product was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** An array of up-sell products. */
    upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The part of the URL that identifies the product */
    url_key?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use product's `canonical_url` or url rewrites instead */
    url_path?: Maybe<Scalars['String']['output']>;
    /** URL rewrites list */
    url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
    /** The part of the product URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    video_file?: Maybe<Scalars['String']['output']>;
    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Maybe<Array<Maybe<Website>>>;
    /** The weight of the item, in units defined by the store. */
    weight?: Maybe<Scalars['Float']['output']>;
};
/** Defines properties of a gift card. */
export type GiftCardProductCustom_AttributesV2Args = {
    filters?: InputMaybe<AttributeFilterInput>;
};
/** Defines properties of a gift card. */
export type GiftCardProductReviewsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
export type GiftCardShipmentItem = ShipmentItemInterface & {
    __typename?: 'GiftCardShipmentItem';
    /** Selected gift card properties for a shipment item. */
    gift_card?: Maybe<GiftCardItem>;
    /** The unique ID for a `ShipmentItemInterface` object. */
    id: Scalars['ID']['output'];
    /** The order item associated with the shipment item. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of shipped items. */
    quantity_shipped: Scalars['Float']['output'];
};
/** Specifies the gift card type. */
export declare enum GiftCardTypeEnum {
    Combined = "COMBINED",
    Physical = "PHYSICAL",
    Virtual = "VIRTUAL"
}
/** A single gift card added to a wish list. */
export type GiftCardWishlistItem = WishlistItemInterface & {
    __typename?: 'GiftCardWishlistItem';
    /** The date and time the item was added to the wish list. */
    added_at: Scalars['String']['output'];
    /** Custom options selected for the wish list item. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** The description of the item. */
    description?: Maybe<Scalars['String']['output']>;
    /** Details about a gift card. */
    gift_card_options: GiftCardOptions;
    /** The unique ID for a `WishlistItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Product details of the wish list item. */
    product?: Maybe<ProductInterface>;
    /** The quantity of this wish list item. */
    quantity: Scalars['Float']['output'];
};
/** Contains the text of a gift message, its sender, and recipient */
export type GiftMessage = {
    __typename?: 'GiftMessage';
    /** Sender name */
    from: Scalars['String']['output'];
    /** Gift message text */
    message: Scalars['String']['output'];
    /** Recipient name */
    to: Scalars['String']['output'];
};
/** Defines a gift message. */
export type GiftMessageInput = {
    /** The name of the sender. */
    from: Scalars['String']['input'];
    /** The text of the gift message. */
    message: Scalars['String']['input'];
    /** The name of the recepient. */
    to: Scalars['String']['input'];
};
/** Contains prices for gift wrapping options. */
export type GiftOptionsPrices = {
    __typename?: 'GiftOptionsPrices';
    /** Price of the gift wrapping for all individual order items. */
    gift_wrapping_for_items?: Maybe<Money>;
    /** Price of the gift wrapping for the whole order. */
    gift_wrapping_for_order?: Maybe<Money>;
    /** Price for the printed card. */
    printed_card?: Maybe<Money>;
};
/** Contains details about a gift registry. */
export type GiftRegistry = {
    __typename?: 'GiftRegistry';
    /** The date on which the gift registry was created. Only the registry owner can access this attribute. */
    created_at: Scalars['String']['output'];
    /** An array of attributes that define elements of the gift registry. Each attribute is specified as a code-value pair. */
    dynamic_attributes?: Maybe<Array<Maybe<GiftRegistryDynamicAttribute>>>;
    /** The name of the event. */
    event_name: Scalars['String']['output'];
    /** An array of products added to the gift registry. */
    items?: Maybe<Array<Maybe<GiftRegistryItemInterface>>>;
    /** The message text the customer entered to describe the event. */
    message: Scalars['String']['output'];
    /** The customer who created the gift registry. */
    owner_name: Scalars['String']['output'];
    /** An enum that states whether the gift registry is PRIVATE or PUBLIC. Only the registry owner can access this attribute. */
    privacy_settings: GiftRegistryPrivacySettings;
    /** Contains details about each registrant for the event. */
    registrants?: Maybe<Array<Maybe<GiftRegistryRegistrant>>>;
    /** Contains the customer's shipping address. Only the registry owner can access this attribute. */
    shipping_address?: Maybe<CustomerAddress>;
    /** An enum that states whether the gift registry is ACTIVE or INACTIVE. Only the registry owner can access this attribute. */
    status: GiftRegistryStatus;
    /** The type of gift registry. */
    type?: Maybe<GiftRegistryType>;
    /** The unique ID assigned to the gift registry. */
    uid: Scalars['ID']['output'];
};
export type GiftRegistryDynamicAttribute = GiftRegistryDynamicAttributeInterface & {
    __typename?: 'GiftRegistryDynamicAttribute';
    /** The internal ID of the dynamic attribute. */
    code: Scalars['ID']['output'];
    /** Indicates which group the dynamic attribute is a member of. */
    group: GiftRegistryDynamicAttributeGroup;
    /** The display name of the dynamic attribute. */
    label: Scalars['String']['output'];
    /** A corresponding value for the code. */
    value: Scalars['String']['output'];
};
/** Defines the group type of a gift registry dynamic attribute. */
export declare enum GiftRegistryDynamicAttributeGroup {
    DetailedInformation = "DETAILED_INFORMATION",
    EventInformation = "EVENT_INFORMATION",
    GeneralInformation = "GENERAL_INFORMATION",
    PrivacySettings = "PRIVACY_SETTINGS",
    Registrant = "REGISTRANT",
    ShippingAddress = "SHIPPING_ADDRESS"
}
/** Defines a dynamic attribute. */
export type GiftRegistryDynamicAttributeInput = {
    /** A unique key for an additional attribute of the event. */
    code: Scalars['ID']['input'];
    /** A string that describes a dynamic attribute. */
    value: Scalars['String']['input'];
};
export type GiftRegistryDynamicAttributeInterface = {
    /** The internal ID of the dynamic attribute. */
    code: Scalars['ID']['output'];
    /** The display name of the dynamic attribute. */
    label: Scalars['String']['output'];
    /** A corresponding value for the code. */
    value: Scalars['String']['output'];
};
export type GiftRegistryDynamicAttributeMetadata = GiftRegistryDynamicAttributeMetadataInterface & {
    __typename?: 'GiftRegistryDynamicAttributeMetadata';
    /** Indicates which group the dynamic attribute a member of. */
    attribute_group: Scalars['String']['output'];
    /** The internal ID of the dynamic attribute. */
    code: Scalars['ID']['output'];
    /** The selected input type for this dynamic attribute. The value can be one of several static or custom types. */
    input_type: Scalars['String']['output'];
    /** Indicates whether the dynamic attribute is required. */
    is_required: Scalars['Boolean']['output'];
    /** The display name of the dynamic attribute. */
    label: Scalars['String']['output'];
    /** The order in which to display the dynamic attribute. */
    sort_order?: Maybe<Scalars['Int']['output']>;
};
export type GiftRegistryDynamicAttributeMetadataInterface = {
    /** Indicates which group the dynamic attribute a member of. */
    attribute_group: Scalars['String']['output'];
    /** The internal ID of the dynamic attribute. */
    code: Scalars['ID']['output'];
    /** The selected input type for this dynamic attribute. The value can be one of several static or custom types. */
    input_type: Scalars['String']['output'];
    /** Indicates whether the dynamic attribute is required. */
    is_required: Scalars['Boolean']['output'];
    /** The display name of the dynamic attribute. */
    label: Scalars['String']['output'];
    /** The order in which to display the dynamic attribute. */
    sort_order?: Maybe<Scalars['Int']['output']>;
};
export type GiftRegistryItem = GiftRegistryItemInterface & {
    __typename?: 'GiftRegistryItem';
    /** The date the product was added to the gift registry. */
    created_at: Scalars['String']['output'];
    /** A brief message about the gift registry item. */
    note?: Maybe<Scalars['String']['output']>;
    /** Details about the gift registry item. */
    product?: Maybe<ProductInterface>;
    /** The requested quantity of the product. */
    quantity: Scalars['Float']['output'];
    /** The fulfilled quantity of the product. */
    quantity_fulfilled: Scalars['Float']['output'];
    /** The unique ID of a gift registry item. */
    uid: Scalars['ID']['output'];
};
export type GiftRegistryItemInterface = {
    /** The date the product was added to the gift registry. */
    created_at: Scalars['String']['output'];
    /** A brief message about the gift registry item. */
    note?: Maybe<Scalars['String']['output']>;
    /** Details about the gift registry item. */
    product?: Maybe<ProductInterface>;
    /** The requested quantity of the product. */
    quantity: Scalars['Float']['output'];
    /** The fulfilled quantity of the product. */
    quantity_fulfilled: Scalars['Float']['output'];
    /** The unique ID of a gift registry item. */
    uid: Scalars['ID']['output'];
};
/** Contains the status and any errors that encountered with the customer's gift register item. */
export type GiftRegistryItemUserErrorInterface = {
    /** Indicates whether the attempt to move the cart items to the gift registry was successful. */
    status: Scalars['Boolean']['output'];
    /** An array of errors encountered while moving items from the cart to the gift registry. */
    user_errors: Array<Maybe<GiftRegistryItemsUserError>>;
};
/** Contains error information. */
export type GiftRegistryItemUserErrors = GiftRegistryItemUserErrorInterface & {
    __typename?: 'GiftRegistryItemUserErrors';
    /** Indicates whether the attempt to move the cart items to the gift registry was successful. */
    status: Scalars['Boolean']['output'];
    /** An array of errors encountered while moving items from the cart to the gift registry. */
    user_errors: Array<Maybe<GiftRegistryItemsUserError>>;
};
/** Contains details about an error that occurred when processing a gift registry item. */
export type GiftRegistryItemsUserError = {
    __typename?: 'GiftRegistryItemsUserError';
    /** An error code that describes the error encountered. */
    code: GiftRegistryItemsUserErrorType;
    /** The unique ID of the gift registry item containing an error. */
    gift_registry_item_uid?: Maybe<Scalars['ID']['output']>;
    /** The unique ID of the `GiftRegistry` object containing an error. */
    gift_registry_uid?: Maybe<Scalars['ID']['output']>;
    /** A localized error message. */
    message: Scalars['String']['output'];
    /** The unique ID of the product containing an error. */
    product_uid?: Maybe<Scalars['ID']['output']>;
};
/** Defines the error type. */
export declare enum GiftRegistryItemsUserErrorType {
    /** Used for exceptions like EntityNotFound. */
    NotFound = "NOT_FOUND",
    /** Used for handling out of stock products. */
    OutOfStock = "OUT_OF_STOCK",
    /** Used for other exceptions, such as database connection failures. */
    Undefined = "UNDEFINED"
}
/** Contains details about the gift registry. */
export type GiftRegistryOutput = GiftRegistryOutputInterface & {
    __typename?: 'GiftRegistryOutput';
    /** The gift registry. */
    gift_registry?: Maybe<GiftRegistry>;
};
/** Contains the customer's gift registry. */
export type GiftRegistryOutputInterface = {
    /** The gift registry. */
    gift_registry?: Maybe<GiftRegistry>;
};
/** Defines the privacy setting of the gift registry. */
export declare enum GiftRegistryPrivacySettings {
    Private = "PRIVATE",
    Public = "PUBLIC"
}
/** Contains details about a registrant. */
export type GiftRegistryRegistrant = {
    __typename?: 'GiftRegistryRegistrant';
    /** An array of dynamic attributes assigned to the registrant. */
    dynamic_attributes?: Maybe<Array<Maybe<GiftRegistryRegistrantDynamicAttribute>>>;
    /** The email address of the registrant. Only the registry owner can access this attribute. */
    email: Scalars['String']['output'];
    /** The first name of the registrant. */
    firstname: Scalars['String']['output'];
    /** The last name of the registrant. */
    lastname: Scalars['String']['output'];
    /** The unique ID assigned to the registrant. */
    uid: Scalars['ID']['output'];
};
export type GiftRegistryRegistrantDynamicAttribute = GiftRegistryDynamicAttributeInterface & {
    __typename?: 'GiftRegistryRegistrantDynamicAttribute';
    /** The internal ID of the dynamic attribute. */
    code: Scalars['ID']['output'];
    /** The display name of the dynamic attribute. */
    label: Scalars['String']['output'];
    /** A corresponding value for the code. */
    value: Scalars['String']['output'];
};
/** Contains the results of a gift registry search. */
export type GiftRegistrySearchResult = {
    __typename?: 'GiftRegistrySearchResult';
    /** The date of the event. */
    event_date?: Maybe<Scalars['String']['output']>;
    /** The title given to the event. */
    event_title: Scalars['String']['output'];
    /** The URL key of the gift registry. */
    gift_registry_uid: Scalars['ID']['output'];
    /** The location of the event. */
    location?: Maybe<Scalars['String']['output']>;
    /** The name of the gift registry owner. */
    name: Scalars['String']['output'];
    /** The type of event being held. */
    type?: Maybe<Scalars['String']['output']>;
};
/** Defines a shipping address for a gift registry. Specify either `address_data` or the `address_id`. If both are provided, validation will fail. */
export type GiftRegistryShippingAddressInput = {
    /** Defines the shipping address for this gift registry. */
    address_data?: InputMaybe<CustomerAddressInput>;
    /** The ID assigned to this customer address. */
    address_id?: InputMaybe<Scalars['ID']['input']>;
};
/** Defines the status of the gift registry. */
export declare enum GiftRegistryStatus {
    Active = "ACTIVE",
    Inactive = "INACTIVE"
}
/** Contains details about a gift registry type. */
export type GiftRegistryType = {
    __typename?: 'GiftRegistryType';
    /** An array of attributes that define elements of the gift registry. Each attribute is specified as a code-value pair. */
    dynamic_attributes_metadata?: Maybe<Array<Maybe<GiftRegistryDynamicAttributeMetadataInterface>>>;
    /** The label assigned to the gift registry type on the Admin. */
    label: Scalars['String']['output'];
    /** The unique ID assigned to the gift registry type. */
    uid: Scalars['ID']['output'];
};
/** Contains details about the selected or available gift wrapping options. */
export type GiftWrapping = {
    __typename?: 'GiftWrapping';
    /** The name of the gift wrapping design. */
    design: Scalars['String']['output'];
    /**
     * The unique ID for a `GiftWrapping` object.
     * @deprecated Use `uid` instead
     */
    id: Scalars['ID']['output'];
    /** The preview image for a gift wrapping option. */
    image?: Maybe<GiftWrappingImage>;
    /** The gift wrapping price. */
    price: Money;
    /** The unique ID for a `GiftWrapping` object. */
    uid: Scalars['ID']['output'];
};
/** Points to an image associated with a gift wrapping option. */
export type GiftWrappingImage = {
    __typename?: 'GiftWrappingImage';
    /** The gift wrapping preview image label. */
    label: Scalars['String']['output'];
    /** The gift wrapping preview image URL. */
    url: Scalars['String']['output'];
};
export type GooglePayButtonStyles = {
    __typename?: 'GooglePayButtonStyles';
    /** The button color */
    color?: Maybe<Scalars['String']['output']>;
    /** The button height in pixels */
    height?: Maybe<Scalars['Int']['output']>;
    /** The button type */
    type?: Maybe<Scalars['String']['output']>;
};
export type GooglePayConfig = PaymentConfigItem & {
    __typename?: 'GooglePayConfig';
    /** The styles for the GooglePay Button configuration */
    button_styles?: Maybe<GooglePayButtonStyles>;
    /** The payment method code as defined in the payment gateway */
    code?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the payment method is displayed */
    is_visible?: Maybe<Scalars['Boolean']['output']>;
    /** Defines the payment intent (Authorize or Capture */
    payment_intent?: Maybe<Scalars['String']['output']>;
    /** The payment source for the payment method */
    payment_source?: Maybe<Scalars['String']['output']>;
    /** The PayPal parameters required to load the JS SDK */
    sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
    /** The relative order the payment method is displayed on the checkout page */
    sort_order?: Maybe<Scalars['String']['output']>;
    /** The name displayed for the payment method */
    title?: Maybe<Scalars['String']['output']>;
};
/** Google Pay inputs */
export type GooglePayMethodInput = {
    /** The payment source for the payment method */
    payment_source?: InputMaybe<Scalars['String']['input']>;
    /** The payment services order ID */
    payments_order_id?: InputMaybe<Scalars['String']['input']>;
    /** PayPal order ID */
    paypal_order_id?: InputMaybe<Scalars['String']['input']>;
};
/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProduct = PhysicalProductInterface & ProductInterface & RoutableInterface & {
    __typename?: 'GroupedProduct';
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_announcement_date?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_brand?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_custom_engraving_text?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_detailed_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_pagebuilder_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_gemstone_addon?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_recyclable_material?: Maybe<Scalars['Int']['output']>;
    /**
     * The attribute set assigned to the product.
     * @deprecated The field should not be used on the storefront.
     */
    attribute_set_id?: Maybe<Scalars['Int']['output']>;
    /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
    canonical_url?: Maybe<Scalars['String']['output']>;
    /** The categories assigned to a product. */
    categories?: Maybe<Array<Maybe<CategoryInterface>>>;
    /** @deprecated Use the `custom_attributes` field instead. */
    color?: Maybe<Scalars['Int']['output']>;
    /** The product's country of origin. */
    country_of_manufacture?: Maybe<Scalars['String']['output']>;
    /**
     * Timestamp indicating when the product was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: Maybe<Scalars['String']['output']>;
    /** An array of cross-sell products. */
    crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** Product custom attributes. */
    custom_attributesV2?: Maybe<ProductCustomAttributes>;
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: Maybe<ComplexTextValue>;
    /** @deprecated Use the `custom_attributes` field instead. */
    description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_color?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_material?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_size?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_style?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    format?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    has_video?: Maybe<Scalars['Int']['output']>;
    /**
     * The ID number assigned to the product.
     * @deprecated Use the `uid` field instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** The relative path to the main image on the product page. */
    image?: Maybe<ProductImage>;
    /** Indicates whether the product can be returned. */
    is_returnable?: Maybe<Scalars['String']['output']>;
    /** An array containing grouped product items. */
    items?: Maybe<Array<Maybe<GroupedProductItem>>>;
    /**
     * A number representing the product's manufacturer.
     * @deprecated Use the `custom_attributes` field instead.
     */
    manufacturer?: Maybe<Scalars['Int']['output']>;
    /** An array of media gallery objects. */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use `media_gallery` instead.
     */
    media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: Maybe<Scalars['String']['output']>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: Maybe<Scalars['String']['output']>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: Maybe<Scalars['String']['output']>;
    /** The product name. Customers use this name to identify the product. */
    name?: Maybe<Scalars['String']['output']>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    new_from_date?: Maybe<Scalars['String']['output']>;
    /** The end date for new product listings. */
    new_to_date?: Maybe<Scalars['String']['output']>;
    /** Product stock only x left count */
    only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: Maybe<Scalars['String']['output']>;
    /**
     * Indicates the price of an item.
     * @deprecated Use `price_range` for product price information.
     */
    price?: Maybe<ProductPrices>;
    /** The range of prices for the product */
    price_range: PriceRange;
    /** An array of `TierPrice` objects. */
    price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
    /** An array of `ProductLinks` objects. */
    product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
    /** The average of all the ratings given to the product. */
    rating_summary: Scalars['Float']['output'];
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirect_code: Scalars['Int']['output'];
    /** An array of related products. */
    related_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** The total count of all the reviews given to the product. */
    review_count: Scalars['Int']['output'];
    /** The list of products reviews. */
    reviews: ProductReviews;
    /** A short description of the product. Its use depends on the theme. */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: Maybe<ProductImage>;
    /**
     * The beginning date that a product has a special price.
     * @deprecated The field should not be used on the storefront.
     */
    special_from_date?: Maybe<Scalars['String']['output']>;
    /** The discounted price of the product. */
    special_price?: Maybe<Scalars['Float']['output']>;
    /** The end date for a product with a special price. */
    special_to_date?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the product is staged for a future campaign. */
    staged: Scalars['Boolean']['output'];
    /** Stock status of the product */
    stock_status?: Maybe<ProductStockStatus>;
    /** The file name of a swatch image. */
    swatch_image?: Maybe<Scalars['String']['output']>;
    /** The relative path to the product's thumbnail image. */
    thumbnail?: Maybe<ProductImage>;
    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_price?: Maybe<Scalars['Float']['output']>;
    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use `__typename` instead.
     */
    type_id?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `ProductInterface` object. */
    uid: Scalars['ID']['output'];
    /**
     * Timestamp indicating when the product was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** An array of up-sell products. */
    upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The part of the URL that identifies the product */
    url_key?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use product's `canonical_url` or url rewrites instead */
    url_path?: Maybe<Scalars['String']['output']>;
    /** URL rewrites list */
    url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
    /** The part of the product URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    video_file?: Maybe<Scalars['String']['output']>;
    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Maybe<Array<Maybe<Website>>>;
    /** The weight of the item, in units defined by the store. */
    weight?: Maybe<Scalars['Float']['output']>;
};
/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProductCustom_AttributesV2Args = {
    filters?: InputMaybe<AttributeFilterInput>;
};
/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProductReviewsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** Contains information about an individual grouped product item. */
export type GroupedProductItem = {
    __typename?: 'GroupedProductItem';
    /** The relative position of this item compared to the other group items. */
    position?: Maybe<Scalars['Int']['output']>;
    /** Details about this product option. */
    product?: Maybe<ProductInterface>;
    /** The quantity of this grouped product item. */
    qty?: Maybe<Scalars['Float']['output']>;
};
/** A grouped product wish list item. */
export type GroupedProductWishlistItem = WishlistItemInterface & {
    __typename?: 'GroupedProductWishlistItem';
    /** The date and time the item was added to the wish list. */
    added_at: Scalars['String']['output'];
    /** Custom options selected for the wish list item. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** The description of the item. */
    description?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `WishlistItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Product details of the wish list item. */
    product?: Maybe<ProductInterface>;
    /** The quantity of this wish list item. */
    quantity: Scalars['Float']['output'];
};
export type HostedFieldsConfig = PaymentConfigItem & {
    __typename?: 'HostedFieldsConfig';
    /** Vault payment method code */
    cc_vault_code?: Maybe<Scalars['String']['output']>;
    /** The payment method code as defined in the payment gateway */
    code?: Maybe<Scalars['String']['output']>;
    /** Card vault enabled */
    is_vault_enabled?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether the payment method is displayed */
    is_visible?: Maybe<Scalars['Boolean']['output']>;
    /** Defines the payment intent (Authorize or Capture */
    payment_intent?: Maybe<Scalars['String']['output']>;
    /** The payment source for the payment method */
    payment_source?: Maybe<Scalars['String']['output']>;
    /** Card and bin details required */
    requires_card_details?: Maybe<Scalars['Boolean']['output']>;
    /** The PayPal parameters required to load the JS SDK */
    sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
    /** The relative order the payment method is displayed on the checkout page */
    sort_order?: Maybe<Scalars['String']['output']>;
    /** 3DS mode */
    three_ds?: Maybe<Scalars['Boolean']['output']>;
    /** The name displayed for the payment method */
    title?: Maybe<Scalars['String']['output']>;
};
/** Hosted Fields payment inputs */
export type HostedFieldsInput = {
    /** Card bin number */
    cardBin?: InputMaybe<Scalars['String']['input']>;
    /** Expiration month of the card */
    cardExpiryMonth?: InputMaybe<Scalars['String']['input']>;
    /** Expiration year of the card */
    cardExpiryYear?: InputMaybe<Scalars['String']['input']>;
    /** Last four digits of the card */
    cardLast4?: InputMaybe<Scalars['String']['input']>;
    /** Name on the card */
    holderName?: InputMaybe<Scalars['String']['input']>;
    /** Indicates whether details about the shopper's credit/debit card should be tokenized for later usage. Required only if Vault is enabled for the Payment Services payment integration. */
    is_active_payment_token_enabler?: InputMaybe<Scalars['Boolean']['input']>;
    /** The payment source for the payment method */
    payment_source?: InputMaybe<Scalars['String']['input']>;
    /** The payment services order ID */
    payments_order_id?: InputMaybe<Scalars['String']['input']>;
    /** PayPal order ID */
    paypal_order_id?: InputMaybe<Scalars['String']['input']>;
};
/** Contains a set of relative URLs that PayPal uses in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Payments Pro Hosted Solution payment method. */
export type HostedProInput = {
    /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. For example, if the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
    cancel_url: Scalars['String']['input'];
    /** The relative URL of the final confirmation page that PayPal redirects to upon payment success. For example, if the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
    return_url: Scalars['String']['input'];
};
/** Contains the secure URL used for the Payments Pro Hosted Solution payment method. */
export type HostedProUrl = {
    __typename?: 'HostedProUrl';
    /** The secure URL generated by PayPal. */
    secure_form_url?: Maybe<Scalars['String']['output']>;
};
/** Contains the required input to request the secure URL for Payments Pro Hosted Solution payment. */
export type HostedProUrlInput = {
    /** The unique ID that identifies the shopper's cart. */
    cart_id: Scalars['String']['input'];
};
/** Contains target path parameters. */
export type HttpQueryParameter = {
    __typename?: 'HttpQueryParameter';
    /** A parameter name. */
    name?: Maybe<Scalars['String']['output']>;
    /** A parameter value. */
    value?: Maybe<Scalars['String']['output']>;
};
export type ImageSwatchData = SwatchDataInterface & {
    __typename?: 'ImageSwatchData';
    /** The URL assigned to the thumbnail of the swatch image. */
    thumbnail?: Maybe<Scalars['String']['output']>;
    /** The value can be represented as color (HEX code), image link, or text. */
    value?: Maybe<Scalars['String']['output']>;
};
/** List of templates/filters applied to customer attribute input. */
export declare enum InputFilterEnum {
    /** Forces attribute input to follow the date format. */
    Date = "DATE",
    /** Escape HTML Entities. */
    Escapehtml = "ESCAPEHTML",
    /** There are no templates or filters to be applied. */
    None = "NONE",
    /** Strip HTML Tags. */
    Striptags = "STRIPTAGS",
    /** Strip whitespace (or other characters) from the beginning and end of the input. */
    Trim = "TRIM"
}
export type Int_Container = {
    __typename?: 'Int_container';
    Int?: Maybe<Scalars['Int']['output']>;
};
/** Contains an error message when an internal error occurred. */
export type InternalError = ErrorInterface & {
    __typename?: 'InternalError';
    /** The returned error message. */
    message: Scalars['String']['output'];
};
/** Contains invoice details. */
export type Invoice = {
    __typename?: 'Invoice';
    /** Comments on the invoice. */
    comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
    /** The unique ID for a `Invoice` object. */
    id: Scalars['ID']['output'];
    /** Invoiced product details. */
    items?: Maybe<Array<Maybe<InvoiceItemInterface>>>;
    /** Sequential invoice number. */
    number: Scalars['String']['output'];
    /** Invoice total amount details. */
    total?: Maybe<InvoiceTotal>;
};
export type InvoiceItem = InvoiceItemInterface & {
    __typename?: 'InvoiceItem';
    /** Information about the final discount amount for the base product, including discounts on options. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** The unique ID for an `InvoiceItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Details about an individual order item. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of invoiced items. */
    quantity_invoiced?: Maybe<Scalars['Float']['output']>;
};
/** Contains detailes about invoiced items. */
export type InvoiceItemInterface = {
    /** Information about the final discount amount for the base product, including discounts on options. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** The unique ID for an `InvoiceItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Details about an individual order item. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of invoiced items. */
    quantity_invoiced?: Maybe<Scalars['Float']['output']>;
};
/** Contains price details from an invoice. */
export type InvoiceTotal = {
    __typename?: 'InvoiceTotal';
    /** The final base grand total amount in the base currency. */
    base_grand_total: Money;
    /** The applied discounts to the invoice. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** The final total amount, including shipping, discounts, and taxes. */
    grand_total: Money;
    /** Details about the shipping and handling costs for the invoice. */
    shipping_handling?: Maybe<ShippingHandling>;
    /** The subtotal of the invoice, excluding shipping, discounts, and taxes. */
    subtotal: Money;
    /** The invoice tax details. */
    taxes?: Maybe<Array<Maybe<TaxItem>>>;
    /** The shipping amount for the invoice. */
    total_shipping: Money;
    /** The amount of tax applied to the invoice. */
    total_tax: Money;
};
/** Contains the result of the `isEmailAvailable` query. */
export type IsEmailAvailableOutput = {
    __typename?: 'IsEmailAvailableOutput';
    /** Indicates whether the specified email address can be used to create a customer. */
    is_email_available?: Maybe<Scalars['Boolean']['output']>;
};
/** A list of options of the selected bundle product. */
export type ItemSelectedBundleOption = {
    __typename?: 'ItemSelectedBundleOption';
    /**
     * The unique ID for a `ItemSelectedBundleOption` object.
     * @deprecated Use `uid` instead.
     */
    id: Scalars['ID']['output'];
    /** The label of the option. */
    label: Scalars['String']['output'];
    /** The unique ID for a `ItemSelectedBundleOption` object. */
    uid: Scalars['ID']['output'];
    /** A list of products that represent the values of the parent option. */
    values?: Maybe<Array<Maybe<ItemSelectedBundleOptionValue>>>;
};
/** A list of values for the selected bundle product. */
export type ItemSelectedBundleOptionValue = {
    __typename?: 'ItemSelectedBundleOptionValue';
    /**
     * The unique ID for a `ItemSelectedBundleOptionValue` object.
     * @deprecated Use `uid` instead.
     */
    id: Scalars['ID']['output'];
    /** The price of the child bundle product. */
    price: Money;
    /** The name of the child bundle product. */
    product_name: Scalars['String']['output'];
    /** The SKU of the child bundle product. */
    product_sku: Scalars['String']['output'];
    /** The number of this bundle product that were ordered. */
    quantity: Scalars['Float']['output'];
    /** The unique ID for a `ItemSelectedBundleOptionValue` object. */
    uid: Scalars['ID']['output'];
};
/** Contains a key-value pair. */
export type KeyValue = {
    __typename?: 'KeyValue';
    /** The name part of the key/value pair. */
    name?: Maybe<Scalars['String']['output']>;
    /** The value part of the key/value pair. */
    value?: Maybe<Scalars['String']['output']>;
};
/** Contains information for rendering layered navigation. */
export type LayerFilter = {
    __typename?: 'LayerFilter';
    /**
     * An array of filter items.
     * @deprecated Use `Aggregation.options` instead.
     */
    filter_items?: Maybe<Array<Maybe<LayerFilterItemInterface>>>;
    /**
     * The count of filter items in filter group.
     * @deprecated Use `Aggregation.count` instead.
     */
    filter_items_count?: Maybe<Scalars['Int']['output']>;
    /**
     * The name of a layered navigation filter.
     * @deprecated Use `Aggregation.label` instead.
     */
    name?: Maybe<Scalars['String']['output']>;
    /**
     * The request variable name for a filter query.
     * @deprecated Use `Aggregation.attribute_code` instead.
     */
    request_var?: Maybe<Scalars['String']['output']>;
};
export type LayerFilterItem = LayerFilterItemInterface & {
    __typename?: 'LayerFilterItem';
    /**
     * The count of items per filter.
     * @deprecated Use `AggregationOption.count` instead.
     */
    items_count?: Maybe<Scalars['Int']['output']>;
    /**
     * The label for a filter.
     * @deprecated Use `AggregationOption.label` instead.
     */
    label?: Maybe<Scalars['String']['output']>;
    /**
     * The value of a filter request variable to be used in query.
     * @deprecated Use `AggregationOption.value` instead.
     */
    value_string?: Maybe<Scalars['String']['output']>;
};
export type LayerFilterItemInterface = {
    /**
     * The count of items per filter.
     * @deprecated Use `AggregationOption.count` instead.
     */
    items_count?: Maybe<Scalars['Int']['output']>;
    /**
     * The label for a filter.
     * @deprecated Use `AggregationOption.label` instead.
     */
    label?: Maybe<Scalars['String']['output']>;
    /**
     * The value of a filter request variable to be used in query.
     * @deprecated Use `AggregationOption.value` instead.
     */
    value_string?: Maybe<Scalars['String']['output']>;
};
/** Defines characteristics about images and videos associated with a specific product. */
export type MediaGalleryEntry = {
    __typename?: 'MediaGalleryEntry';
    /** Details about the content of the media gallery item. */
    content?: Maybe<ProductMediaGalleryEntriesContent>;
    /** Indicates whether the image is hidden from view. */
    disabled?: Maybe<Scalars['Boolean']['output']>;
    /** The path of the image on the server. */
    file?: Maybe<Scalars['String']['output']>;
    /**
     * The identifier assigned to the object.
     * @deprecated Use `uid` instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** The alt text displayed on the storefront when the user points to the image. */
    label?: Maybe<Scalars['String']['output']>;
    /** Either `image` or `video`. */
    media_type?: Maybe<Scalars['String']['output']>;
    /** The media item's position after it has been sorted. */
    position?: Maybe<Scalars['Int']['output']>;
    /** Array of image types. It can have the following values: image, small_image, thumbnail. */
    types?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** The unique ID for a `MediaGalleryEntry` object. */
    uid: Scalars['ID']['output'];
    /** Details about the content of a video item. */
    video_content?: Maybe<ProductMediaGalleryEntriesVideoContent>;
};
/** Contains basic information about a product image or video. */
export type MediaGalleryInterface = {
    /** Indicates whether the image is hidden from view. */
    disabled?: Maybe<Scalars['Boolean']['output']>;
    /** The label of the product image or video. */
    label?: Maybe<Scalars['String']['output']>;
    /** The media item's position after it has been sorted. */
    position?: Maybe<Scalars['Int']['output']>;
    /** The URL of the product image or video. */
    url?: Maybe<Scalars['String']['output']>;
};
export type MessageStyleLogo = {
    __typename?: 'MessageStyleLogo';
    /** The type of logo for the PayPal Pay Later messaging */
    type?: Maybe<Scalars['String']['output']>;
};
export type MessageStyles = {
    __typename?: 'MessageStyles';
    /** The message layout */
    layout?: Maybe<Scalars['String']['output']>;
    /** The message logo */
    logo?: Maybe<MessageStyleLogo>;
};
/** Defines a monetary value, including a numeric value and a currency code. */
export type Money = {
    __typename?: 'Money';
    /** A three-letter currency code, such as USD or EUR. */
    currency?: Maybe<CurrencyEnum>;
    /** A number expressing a monetary value. */
    value?: Maybe<Scalars['Float']['output']>;
};
/** Contains the customer's gift registry and any errors encountered. */
export type MoveCartItemsToGiftRegistryOutput = GiftRegistryItemUserErrorInterface & GiftRegistryOutputInterface & {
    __typename?: 'MoveCartItemsToGiftRegistryOutput';
    /** The gift registry. */
    gift_registry?: Maybe<GiftRegistry>;
    /** Indicates whether the attempt to move the cart items to the gift registry was successful. */
    status: Scalars['Boolean']['output'];
    /** An array of errors encountered while moving items from the cart to the gift registry. */
    user_errors: Array<Maybe<GiftRegistryItemsUserError>>;
};
/** Contains the source and target wish lists after moving products. */
export type MoveProductsBetweenWishlistsOutput = {
    __typename?: 'MoveProductsBetweenWishlistsOutput';
    /** The destination wish list after receiving products moved from the source wish list. */
    destination_wishlist: Wishlist;
    /** The source wish list after moving products from it. */
    source_wishlist: Wishlist;
    /** An array of errors encountered while moving products to a wish list. */
    user_errors: Array<Maybe<WishListUserInputError>>;
};
export type Mutation = {
    __typename?: 'Mutation';
    /** Remove GiftCard Account entity. */
    DeleteV1CartsGuestcartsCartIdGiftCardsGiftCardCode?: Maybe<DeleteV1CartsGuestcartsCartIdGiftCardsGiftCardCode_Response>;
    /** Delete a coupon from a specified cart. */
    DeleteV1GuestcartsCartIdCoupons?: Maybe<DeleteV1GuestcartsCartIdCoupons_Response>;
    /** Remove the specified item from the specified cart. */
    DeleteV1GuestcartsCartIdItemsItemId?: Maybe<DeleteV1GuestcartsCartIdItemsItemId_Response>;
    /** Add gift card to the cart. */
    PostV1CartsGuestcartsCartIdGiftCards?: Maybe<PostV1CartsGuestcartsCartIdGiftCards_Response>;
    /** Create customer account. Perform necessary business operations like sending email. */
    PostV1Customers?: Maybe<PostV1Customers_Response>;
    /** Check if given email is associated with a customer account in given website. */
    PostV1CustomersIsEmailAvailable?: Maybe<PostV1CustomersIsEmailAvailable_Response>;
    /** Reset customer password. */
    PostV1CustomersResetPassword?: Maybe<PostV1CustomersResetPassword_Response>;
    /** Enable an customer or guest user to create an empty cart and quote for an anonymous customer. */
    PostV1Guestcarts?: Maybe<PostV1Guestcarts_Response>;
    /** Assign a specified billing address to a specified cart. */
    PostV1GuestcartsCartIdBillingaddress?: Maybe<PostV1GuestcartsCartIdBillingaddress_Response>;
    /** Estimate shipping by address and return list of available shipping methods */
    PostV1GuestcartsCartIdEstimateshippingmethods?: Maybe<Array<Maybe<PostV1GuestcartsCartIdEstimateshippingmethods_Response>>>;
    /** Set the gift message for an entire order. */
    PostV1GuestcartsCartIdGiftmessage?: Maybe<PostV1GuestcartsCartIdGiftmessage_Response>;
    /** Set the gift message for a specified item in a specified shopping cart. */
    PostV1GuestcartsCartIdGiftmessageItemId?: Maybe<PostV1GuestcartsCartIdGiftmessageItemId_Response>;
    /** Add/update the specified cart item. */
    PostV1GuestcartsCartIdItems?: Maybe<PostV1GuestcartsCartIdItems_Response>;
    /** Set payment information and place order for a specified cart. */
    PostV1GuestcartsCartIdPaymentinformation?: Maybe<PostV1GuestcartsCartIdPaymentinformation_Response>;
    /** Create a payment order for guest customer */
    PostV1GuestcartsCartIdPaymentorder?: Maybe<PostV1GuestcartsCartIdPaymentorder_Response>;
    /** Sync payment order for guest customer */
    PostV1GuestcartsCartIdPaymentorderId?: Maybe<PostV1GuestcartsCartIdPaymentorderId_Response>;
    /** Set payment information for a specified cart. */
    PostV1GuestcartsCartIdSetpaymentinformation?: Maybe<PostV1GuestcartsCartIdSetpaymentinformation_Response>;
    PostV1GuestcartsCartIdShippinginformation?: Maybe<PostV1GuestcartsCartIdShippinginformation_Response>;
    /** Calculate quote totals based on address and shipping method. */
    PostV1GuestcartsCartIdTotalsinformation?: Maybe<PostV1GuestcartsCartIdTotalsinformation_Response>;
    /** Estimate shipping */
    PostV1GuestgiftregistryCartIdEstimateshippingmethods?: Maybe<Array<Maybe<PostV1GuestgiftregistryCartIdEstimateshippingmethods_Response>>>;
    /** Create access token for admin given the admin credentials. */
    PostV1IntegrationAdminToken?: Maybe<PostV1IntegrationAdminToken_Response>;
    /** Create access token for admin given the customer credentials. */
    PostV1IntegrationCustomerToken?: Maybe<PostV1IntegrationCustomerToken_Response>;
    /** Activate the provider and get an admin token */
    PostV1TfaProviderAuthyActivate?: Maybe<Error_Response>;
    /** Get an admin token using authy 2fa */
    PostV1TfaProviderAuthyAuthenticate?: Maybe<PostV1TfaProviderAuthyAuthenticate_Response>;
    /** Authenticate using the present one touch response and get an admin token */
    PostV1TfaProviderAuthyAuthenticateonetouch?: Maybe<PostV1TfaProviderAuthyAuthenticateonetouch_Response>;
    /** Get the information required to configure google */
    PostV1TfaProviderAuthyConfigure?: Maybe<PostV1TfaProviderAuthyConfigure_Response>;
    /** Send a one time password to a device using authy */
    PostV1TfaProviderAuthySendtokenVia?: Maybe<Error_Response>;
    /** Activate the provider and get an admin token */
    PostV1TfaProviderDuo_securityActivate?: Maybe<Error_Response>;
    /** Authenticate and get an admin token */
    PostV1TfaProviderDuo_securityAuthenticate?: Maybe<PostV1TfaProviderDuo_SecurityAuthenticate_Response>;
    /** Get the information required to configure duo */
    PostV1TfaProviderDuo_securityConfigure?: Maybe<PostV1TfaProviderDuo_SecurityConfigure_Response>;
    /** Get the information required to configure duo */
    PostV1TfaProviderDuo_securityGetauthenticationdata?: Maybe<PostV1TfaProviderDuo_SecurityGetauthenticationdata_Response>;
    /** Activate the provider and get an admin token */
    PostV1TfaProviderGoogleActivate?: Maybe<Error_Response>;
    /** Get an admin token by authenticating using google */
    PostV1TfaProviderGoogleAuthenticate?: Maybe<PostV1TfaProviderGoogleAuthenticate_Response>;
    /** Get the information required to configure google */
    PostV1TfaProviderGoogleConfigure?: Maybe<PostV1TfaProviderGoogleConfigure_Response>;
    /** Activate the provider and get a token */
    PostV1TfaProviderU2fkeyActivate?: Maybe<Error_Response>;
    /** Get the information to initiate a WebAuthn registration ceremony */
    PostV1TfaProviderU2fkeyAuthenticationchallenge?: Maybe<PostV1TfaProviderU2fkeyAuthenticationchallenge_Response>;
    /** Get the information to initiate a WebAuthn registration ceremony */
    PostV1TfaProviderU2fkeyConfigure?: Maybe<PostV1TfaProviderU2fkeyConfigure_Response>;
    /** Authenticate with the provider and get a token */
    PostV1TfaProviderU2fkeyVerify?: Maybe<PostV1TfaProviderU2fkeyVerify_Response>;
    /** Send an email to the customer with a password reset link. */
    PutV1CustomersPassword?: Maybe<PutV1CustomersPassword_Response>;
    /** Set shipping/billing methods and additional data for cart and collect totals for guest. */
    PutV1GuestcartsCartIdCollecttotals?: Maybe<PutV1GuestcartsCartIdCollecttotals_Response>;
    /** Add a coupon by code to a specified cart. */
    PutV1GuestcartsCartIdCouponsCouponCode?: Maybe<PutV1GuestcartsCartIdCouponsCouponCode_Response>;
    /** Add/update the specified cart item. */
    PutV1GuestcartsCartIdItemsItemId?: Maybe<PutV1GuestcartsCartIdItemsItemId_Response>;
    /** Place an order for a specified cart. */
    PutV1GuestcartsCartIdOrder?: Maybe<PutV1GuestcartsCartIdOrder_Response>;
    /** Add a specified payment method to a specified shopping cart. */
    PutV1GuestcartsCartIdSelectedpaymentmethod?: Maybe<PutV1GuestcartsCartIdSelectedpaymentmethod_Response>;
    /** Add one or more bundle products to the specified cart. We recommend using `addProductsToCart` instead. */
    addBundleProductsToCart?: Maybe<AddBundleProductsToCartOutput>;
    /** Add one or more configurable products to the specified cart. We recommend using `addProductsToCart` instead. */
    addConfigurableProductsToCart?: Maybe<AddConfigurableProductsToCartOutput>;
    /** Add one or more downloadable products to the specified cart. We recommend using `addProductsToCart` instead. */
    addDownloadableProductsToCart?: Maybe<AddDownloadableProductsToCartOutput>;
    /** Add registrants to the specified gift registry. */
    addGiftRegistryRegistrants?: Maybe<AddGiftRegistryRegistrantsOutput>;
    /** Add any type of product to the cart. */
    addProductsToCart?: Maybe<AddProductsToCartOutput>;
    /** Add products to the specified compare list. */
    addProductsToCompareList?: Maybe<CompareList>;
    /** Add one or more products to the specified wish list. This mutation supports all product types. */
    addProductsToWishlist?: Maybe<AddProductsToWishlistOutput>;
    /** Add a comment to an existing return. */
    addReturnComment?: Maybe<AddReturnCommentOutput>;
    /** Add tracking information to the return. */
    addReturnTracking?: Maybe<AddReturnTrackingOutput>;
    /** Add one or more simple products to the specified cart. We recommend using `addProductsToCart` instead. */
    addSimpleProductsToCart?: Maybe<AddSimpleProductsToCartOutput>;
    /** Add one or more virtual products to the specified cart. We recommend using `addProductsToCart` instead. */
    addVirtualProductsToCart?: Maybe<AddVirtualProductsToCartOutput>;
    /** Add items in the specified wishlist to the customer's cart. */
    addWishlistItemsToCart?: Maybe<AddWishlistItemsToCartOutput>;
    /** Apply a pre-defined coupon code to the specified cart. */
    applyCouponToCart?: Maybe<ApplyCouponToCartOutput>;
    /** Apply a pre-defined coupon code to the specified cart. */
    applyCouponsToCart?: Maybe<ApplyCouponToCartOutput>;
    /** Apply a pre-defined gift card code to the specified cart. */
    applyGiftCardToCart?: Maybe<ApplyGiftCardToCartOutput>;
    /** Apply all available points, up to the cart total. Partial redemption is not available. */
    applyRewardPointsToCart?: Maybe<ApplyRewardPointsToCartOutput>;
    /** Apply store credit to the specified cart. */
    applyStoreCreditToCart?: Maybe<ApplyStoreCreditToCartOutput>;
    /** Assign the specified compare list to the logged in customer. */
    assignCompareListToCustomer?: Maybe<AssignCompareListToCustomerOutput>;
    /** Assign a logged-in customer to the specified guest shopping cart. */
    assignCustomerToGuestCart: Cart;
    /** Cancel the specified customer order. */
    cancelOrder?: Maybe<CancelOrderOutput>;
    /** Change the password for the logged-in customer. */
    changeCustomerPassword?: Maybe<Customer>;
    /** Remove all items from the specified cart. */
    clearCart: ClearCartOutput;
    /** Confirms the email address for a customer. */
    confirmEmail?: Maybe<CustomerOutput>;
    /** Send a 'Contact Us' email to the merchant. */
    contactUs?: Maybe<ContactUsOutput>;
    /** Copy products from one wish list to another. The original wish list is unchanged. */
    copyProductsBetweenWishlists?: Maybe<CopyProductsBetweenWishlistsOutput>;
    /** Creates Client Token for Braintree Javascript SDK initialization. */
    createBraintreeClientToken: Scalars['String']['output'];
    /** Creates Client Token for Braintree PayPal Javascript SDK initialization. */
    createBraintreePayPalClientToken: Scalars['String']['output'];
    /** Creates Client Token for Braintree PayPal Vault Javascript SDK initialization. */
    createBraintreePayPalVaultClientToken: Scalars['String']['output'];
    /** Create a new compare list. The compare list is saved for logged in customers. */
    createCompareList?: Maybe<CompareList>;
    /** Use `createCustomerV2` instead. */
    createCustomer?: Maybe<CustomerOutput>;
    /** Create a billing or shipping address for a customer or guest. */
    createCustomerAddress?: Maybe<CustomerAddress>;
    /** Create a customer account. */
    createCustomerV2?: Maybe<CustomerOutput>;
    /**
     * Create an empty shopping cart for a guest or logged in user
     * @deprecated Use `Mutation.createGuestCart` or `Query.customerCart` for logged in customer
     */
    createEmptyCart?: Maybe<Scalars['String']['output']>;
    /** Create a gift registry on behalf of the customer. */
    createGiftRegistry?: Maybe<CreateGiftRegistryOutput>;
    /** Create a new shopping cart */
    createGuestCart?: Maybe<CreateGuestCartOutput>;
    /** Initiate a transaction and receive a token. Use this mutation for Payflow Pro and Payments Pro payment methods */
    createPayflowProToken?: Maybe<CreatePayflowProTokenOutput>;
    /** Creates a payment order for further payment processing */
    createPaymentOrder?: Maybe<CreatePaymentOrderOutput>;
    /** Initiate an Express Checkout transaction and receive a token. Use this mutation for Express Checkout and Payments Standard payment methods. */
    createPaypalExpressToken?: Maybe<PaypalExpressTokenOutput>;
    /** Create a product review for the specified product. */
    createProductReview: CreateProductReviewOutput;
    /** Create a new wish list. */
    createWishlist?: Maybe<CreateWishlistOutput>;
    /** Delete the specified compare list. */
    deleteCompareList?: Maybe<DeleteCompareListOutput>;
    /** Delete customer account */
    deleteCustomer?: Maybe<Scalars['Boolean']['output']>;
    /** Delete the billing or shipping address of a customer. */
    deleteCustomerAddress?: Maybe<Scalars['Boolean']['output']>;
    /** Delete a customer's payment token. */
    deletePaymentToken?: Maybe<DeletePaymentTokenOutput>;
    /** Delete the specified wish list. You cannot delete the customer's default (first) wish list. */
    deleteWishlist?: Maybe<DeleteWishlistOutput>;
    /** Estimate shipping method(s) for cart based on address */
    estimateShippingMethods?: Maybe<Array<Maybe<AvailableShippingMethod>>>;
    /** Estimate totals for cart based on the address */
    estimateTotals: EstimateTotalsOutput;
    /** Generate a token for specified customer. */
    generateCustomerToken?: Maybe<CustomerToken>;
    /** Request a customer token so that an administrator can perform remote shopping assistance. */
    generateCustomerTokenAsAdmin?: Maybe<GenerateCustomerTokenAsAdminOutput>;
    /** Handle a payment response and save the payment in Quote. Use this mutation for Payflow Pro and Payments Pro payment methods. */
    handlePayflowProResponse?: Maybe<PayflowProResponseOutput>;
    /** Transfer the contents of a guest cart into the cart of a logged-in customer. */
    mergeCarts: Cart;
    /** Move all items from the cart to a gift registry. */
    moveCartItemsToGiftRegistry?: Maybe<MoveCartItemsToGiftRegistryOutput>;
    /** Move products from one wish list to another. */
    moveProductsBetweenWishlists?: Maybe<MoveProductsBetweenWishlistsOutput>;
    /** Convert the quote into an order. */
    placeOrder?: Maybe<PlaceOrderOutput>;
    /** Redeem a gift card for store credit. */
    redeemGiftCardBalanceAsStoreCredit?: Maybe<GiftCardAccount>;
    /** Remove a previously-applied coupon from the cart. The cart must contain at least one item in order to remove the coupon. */
    removeCouponFromCart?: Maybe<RemoveCouponFromCartOutput>;
    /** Remove a previously-applied coupon from the cart. The cart must contain at least one item in order to remove the coupon. */
    removeCouponsFromCart?: Maybe<RemoveCouponFromCartOutput>;
    /** Removes a gift card from the cart. */
    removeGiftCardFromCart?: Maybe<RemoveGiftCardFromCartOutput>;
    /** Delete the specified gift registry. */
    removeGiftRegistry?: Maybe<RemoveGiftRegistryOutput>;
    /** Delete the specified items from a gift registry. */
    removeGiftRegistryItems?: Maybe<RemoveGiftRegistryItemsOutput>;
    /** Removes registrants from a gift registry. */
    removeGiftRegistryRegistrants?: Maybe<RemoveGiftRegistryRegistrantsOutput>;
    /** Delete the entire quantity of a specified item from the cart. If you remove all items from the cart, the cart continues to exist. */
    removeItemFromCart?: Maybe<RemoveItemFromCartOutput>;
    /** Remove products from the specified compare list. */
    removeProductsFromCompareList?: Maybe<CompareList>;
    /** Remove one or more products from the specified wish list. */
    removeProductsFromWishlist?: Maybe<RemoveProductsFromWishlistOutput>;
    /** Remove a tracked shipment from a return. */
    removeReturnTracking?: Maybe<RemoveReturnTrackingOutput>;
    /** Cancel the application of reward points to the cart. */
    removeRewardPointsFromCart?: Maybe<RemoveRewardPointsFromCartOutput>;
    /** Remove store credit that has been applied to the specified cart. */
    removeStoreCreditFromCart?: Maybe<RemoveStoreCreditFromCartOutput>;
    /** Add all products from a customer's previous order to the cart. */
    reorderItems?: Maybe<ReorderItemsOutput>;
    /** Request an email with a reset password token for the registered customer identified by the specified email. */
    requestPasswordResetEmail?: Maybe<Scalars['Boolean']['output']>;
    /** Initiates a buyer's request to return items for replacement or refund. */
    requestReturn?: Maybe<RequestReturnOutput>;
    /** Resends the confirmation email to a customer. */
    resendConfirmationEmail?: Maybe<Scalars['Boolean']['output']>;
    /** Reset a customer's password using the reset password token that the customer received in an email after requesting it using `requestPasswordResetEmail`. */
    resetPassword?: Maybe<Scalars['Boolean']['output']>;
    /** Revoke the customer token. */
    revokeCustomerToken?: Maybe<RevokeCustomerTokenOutput>;
    /** Send a message on behalf of a customer to the specified email addresses. */
    sendEmailToFriend?: Maybe<SendEmailToFriendOutput>;
    /** Set the billing address on a specific cart. */
    setBillingAddressOnCart?: Maybe<SetBillingAddressOnCartOutput>;
    /** Set gift options, including gift messages, gift wrapping, gift receipts, and printed cards. */
    setGiftOptionsOnCart?: Maybe<SetGiftOptionsOnCartOutput>;
    /** Assign the email address of a guest to the cart. */
    setGuestEmailOnCart?: Maybe<SetGuestEmailOnCartOutput>;
    /**
     * Set the cart payment method and convert the cart into an order.
     * @deprecated Should use setPaymentMethodOnCart and placeOrder mutations in single request.
     */
    setPaymentMethodAndPlaceOrder?: Maybe<PlaceOrderOutput>;
    /** Apply a payment method to the cart. */
    setPaymentMethodOnCart?: Maybe<SetPaymentMethodOnCartOutput>;
    /** Set one or more shipping addresses on a specific cart. */
    setShippingAddressesOnCart?: Maybe<SetShippingAddressesOnCartOutput>;
    /** Set one or more delivery methods on a cart. */
    setShippingMethodsOnCart?: Maybe<SetShippingMethodsOnCartOutput>;
    /** Send an email about the gift registry to a list of invitees. */
    shareGiftRegistry?: Maybe<ShareGiftRegistryOutput>;
    /** Subscribe the specified email to the store's newsletter. */
    subscribeEmailToNewsletter?: Maybe<SubscribeEmailToNewsletterOutput>;
    /** Synchronizes the payment order details for further payment processing */
    syncPaymentOrder?: Maybe<Scalars['Boolean']['output']>;
    /** Modify items in the cart. */
    updateCartItems?: Maybe<UpdateCartItemsOutput>;
    /** Use `updateCustomerV2` instead. */
    updateCustomer?: Maybe<CustomerOutput>;
    /** Update the billing or shipping address of a customer or guest. */
    updateCustomerAddress?: Maybe<CustomerAddress>;
    /** Change the email address for the logged-in customer. */
    updateCustomerEmail?: Maybe<CustomerOutput>;
    /** Update the customer's personal information. */
    updateCustomerV2?: Maybe<CustomerOutput>;
    /** Update the specified gift registry. */
    updateGiftRegistry?: Maybe<UpdateGiftRegistryOutput>;
    /** Update the specified items in the gift registry. */
    updateGiftRegistryItems?: Maybe<UpdateGiftRegistryItemsOutput>;
    /** Modify the properties of one or more gift registry registrants. */
    updateGiftRegistryRegistrants?: Maybe<UpdateGiftRegistryRegistrantsOutput>;
    /** Update one or more products in the specified wish list. */
    updateProductsInWishlist?: Maybe<UpdateProductsInWishlistOutput>;
    /** Change the name and visibility of the specified wish list. */
    updateWishlist?: Maybe<UpdateWishlistOutput>;
};
export type MutationDeleteV1CartsGuestcartsCartIdGiftCardsGiftCardCodeArgs = {
    cartId: Scalars['String']['input'];
    giftCardCode: Scalars['String']['input'];
};
export type MutationDeleteV1GuestcartsCartIdCouponsArgs = {
    cartId: Scalars['String']['input'];
};
export type MutationDeleteV1GuestcartsCartIdItemsItemIdArgs = {
    cartId: Scalars['String']['input'];
    itemId: Scalars['Int']['input'];
};
export type MutationPostV1CartsGuestcartsCartIdGiftCardsArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1CartsGuestcartsCartIdGiftCards_Request_Input>;
};
export type MutationPostV1CustomersArgs = {
    input?: InputMaybe<PostV1Customers_Request_Input>;
};
export type MutationPostV1CustomersIsEmailAvailableArgs = {
    input?: InputMaybe<PostV1CustomersIsEmailAvailable_Request_Input>;
};
export type MutationPostV1CustomersResetPasswordArgs = {
    input?: InputMaybe<PostV1CustomersResetPassword_Request_Input>;
};
export type MutationPostV1GuestcartsCartIdBillingaddressArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1GuestcartsCartIdBillingaddress_Request_Input>;
};
export type MutationPostV1GuestcartsCartIdEstimateshippingmethodsArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1GuestcartsCartIdEstimateshippingmethods_Request_Input>;
};
export type MutationPostV1GuestcartsCartIdGiftmessageArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1GuestcartsCartIdGiftmessage_Request_Input>;
};
export type MutationPostV1GuestcartsCartIdGiftmessageItemIdArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1GuestcartsCartIdGiftmessageItemId_Request_Input>;
    itemId: Scalars['Int']['input'];
};
export type MutationPostV1GuestcartsCartIdItemsArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1GuestcartsCartIdItems_Request_Input>;
};
export type MutationPostV1GuestcartsCartIdPaymentinformationArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1GuestcartsCartIdPaymentinformation_Request_Input>;
};
export type MutationPostV1GuestcartsCartIdPaymentorderArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1GuestcartsCartIdPaymentorder_Request_Input>;
};
export type MutationPostV1GuestcartsCartIdPaymentorderIdArgs = {
    cartId: Scalars['String']['input'];
    id: Scalars['String']['input'];
};
export type MutationPostV1GuestcartsCartIdSetpaymentinformationArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1GuestcartsCartIdSetpaymentinformation_Request_Input>;
};
export type MutationPostV1GuestcartsCartIdShippinginformationArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1GuestcartsCartIdShippinginformation_Request_Input>;
};
export type MutationPostV1GuestcartsCartIdTotalsinformationArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1GuestcartsCartIdTotalsinformation_Request_Input>;
};
export type MutationPostV1GuestgiftregistryCartIdEstimateshippingmethodsArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PostV1GuestgiftregistryCartIdEstimateshippingmethods_Request_Input>;
};
export type MutationPostV1IntegrationAdminTokenArgs = {
    input?: InputMaybe<PostV1IntegrationAdminToken_Request_Input>;
};
export type MutationPostV1IntegrationCustomerTokenArgs = {
    input?: InputMaybe<PostV1IntegrationCustomerToken_Request_Input>;
};
export type MutationPostV1TfaProviderAuthyActivateArgs = {
    input?: InputMaybe<PostV1TfaProviderAuthyActivate_Request_Input>;
};
export type MutationPostV1TfaProviderAuthyAuthenticateArgs = {
    input?: InputMaybe<PostV1TfaProviderAuthyAuthenticate_Request_Input>;
};
export type MutationPostV1TfaProviderAuthyAuthenticateonetouchArgs = {
    input?: InputMaybe<PostV1TfaProviderAuthyAuthenticateonetouch_Request_Input>;
};
export type MutationPostV1TfaProviderAuthyConfigureArgs = {
    input?: InputMaybe<PostV1TfaProviderAuthyConfigure_Request_Input>;
};
export type MutationPostV1TfaProviderAuthySendtokenViaArgs = {
    input?: InputMaybe<PostV1TfaProviderAuthySendtokenVia_Request_Input>;
    via: Scalars['String']['input'];
};
export type MutationPostV1TfaProviderDuo_SecurityActivateArgs = {
    input?: InputMaybe<PostV1TfaProviderDuo_SecurityActivate_Request_Input>;
};
export type MutationPostV1TfaProviderDuo_SecurityAuthenticateArgs = {
    input?: InputMaybe<PostV1TfaProviderDuo_SecurityAuthenticate_Request_Input>;
};
export type MutationPostV1TfaProviderDuo_SecurityConfigureArgs = {
    input?: InputMaybe<PostV1TfaProviderDuo_SecurityConfigure_Request_Input>;
};
export type MutationPostV1TfaProviderDuo_SecurityGetauthenticationdataArgs = {
    input?: InputMaybe<PostV1TfaProviderDuo_SecurityGetauthenticationdata_Request_Input>;
};
export type MutationPostV1TfaProviderGoogleActivateArgs = {
    input?: InputMaybe<PostV1TfaProviderGoogleActivate_Request_Input>;
};
export type MutationPostV1TfaProviderGoogleAuthenticateArgs = {
    input?: InputMaybe<PostV1TfaProviderGoogleAuthenticate_Request_Input>;
};
export type MutationPostV1TfaProviderGoogleConfigureArgs = {
    input?: InputMaybe<PostV1TfaProviderGoogleConfigure_Request_Input>;
};
export type MutationPostV1TfaProviderU2fkeyActivateArgs = {
    input?: InputMaybe<PostV1TfaProviderU2fkeyActivate_Request_Input>;
};
export type MutationPostV1TfaProviderU2fkeyAuthenticationchallengeArgs = {
    input?: InputMaybe<PostV1TfaProviderU2fkeyAuthenticationchallenge_Request_Input>;
};
export type MutationPostV1TfaProviderU2fkeyConfigureArgs = {
    input?: InputMaybe<PostV1TfaProviderU2fkeyConfigure_Request_Input>;
};
export type MutationPostV1TfaProviderU2fkeyVerifyArgs = {
    input?: InputMaybe<PostV1TfaProviderU2fkeyVerify_Request_Input>;
};
export type MutationPutV1CustomersPasswordArgs = {
    input?: InputMaybe<PutV1CustomersPassword_Request_Input>;
};
export type MutationPutV1GuestcartsCartIdCollecttotalsArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PutV1GuestcartsCartIdCollecttotals_Request_Input>;
};
export type MutationPutV1GuestcartsCartIdCouponsCouponCodeArgs = {
    cartId: Scalars['String']['input'];
    couponCode: Scalars['String']['input'];
};
export type MutationPutV1GuestcartsCartIdItemsItemIdArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PutV1GuestcartsCartIdItemsItemId_Request_Input>;
    itemId: Scalars['String']['input'];
};
export type MutationPutV1GuestcartsCartIdOrderArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PutV1GuestcartsCartIdOrder_Request_Input>;
};
export type MutationPutV1GuestcartsCartIdSelectedpaymentmethodArgs = {
    cartId: Scalars['String']['input'];
    input?: InputMaybe<PutV1GuestcartsCartIdSelectedpaymentmethod_Request_Input>;
};
export type MutationAddBundleProductsToCartArgs = {
    input?: InputMaybe<AddBundleProductsToCartInput>;
};
export type MutationAddConfigurableProductsToCartArgs = {
    input?: InputMaybe<AddConfigurableProductsToCartInput>;
};
export type MutationAddDownloadableProductsToCartArgs = {
    input?: InputMaybe<AddDownloadableProductsToCartInput>;
};
export type MutationAddGiftRegistryRegistrantsArgs = {
    giftRegistryUid: Scalars['ID']['input'];
    registrants: Array<AddGiftRegistryRegistrantInput>;
};
export type MutationAddProductsToCartArgs = {
    cartId: Scalars['String']['input'];
    cartItems: Array<CartItemInput>;
};
export type MutationAddProductsToCompareListArgs = {
    input?: InputMaybe<AddProductsToCompareListInput>;
};
export type MutationAddProductsToWishlistArgs = {
    wishlistId: Scalars['ID']['input'];
    wishlistItems: Array<WishlistItemInput>;
};
export type MutationAddReturnCommentArgs = {
    input: AddReturnCommentInput;
};
export type MutationAddReturnTrackingArgs = {
    input: AddReturnTrackingInput;
};
export type MutationAddSimpleProductsToCartArgs = {
    input?: InputMaybe<AddSimpleProductsToCartInput>;
};
export type MutationAddVirtualProductsToCartArgs = {
    input?: InputMaybe<AddVirtualProductsToCartInput>;
};
export type MutationAddWishlistItemsToCartArgs = {
    wishlistId: Scalars['ID']['input'];
    wishlistItemIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};
export type MutationApplyCouponToCartArgs = {
    input?: InputMaybe<ApplyCouponToCartInput>;
};
export type MutationApplyCouponsToCartArgs = {
    input?: InputMaybe<ApplyCouponsToCartInput>;
};
export type MutationApplyGiftCardToCartArgs = {
    input?: InputMaybe<ApplyGiftCardToCartInput>;
};
export type MutationApplyRewardPointsToCartArgs = {
    cartId: Scalars['ID']['input'];
};
export type MutationApplyStoreCreditToCartArgs = {
    input: ApplyStoreCreditToCartInput;
};
export type MutationAssignCompareListToCustomerArgs = {
    uid: Scalars['ID']['input'];
};
export type MutationAssignCustomerToGuestCartArgs = {
    cart_id: Scalars['String']['input'];
};
export type MutationCancelOrderArgs = {
    input: CancelOrderInput;
};
export type MutationChangeCustomerPasswordArgs = {
    currentPassword: Scalars['String']['input'];
    newPassword: Scalars['String']['input'];
};
export type MutationClearCartArgs = {
    input: ClearCartInput;
};
export type MutationConfirmEmailArgs = {
    input: ConfirmEmailInput;
};
export type MutationContactUsArgs = {
    input: ContactUsInput;
};
export type MutationCopyProductsBetweenWishlistsArgs = {
    destinationWishlistUid: Scalars['ID']['input'];
    sourceWishlistUid: Scalars['ID']['input'];
    wishlistItems: Array<WishlistItemCopyInput>;
};
export type MutationCreateBraintreePayPalVaultClientTokenArgs = {
    input?: InputMaybe<BraintreeVaultInput>;
};
export type MutationCreateCompareListArgs = {
    input?: InputMaybe<CreateCompareListInput>;
};
export type MutationCreateCustomerArgs = {
    input: CustomerInput;
};
export type MutationCreateCustomerAddressArgs = {
    input: CustomerAddressInput;
};
export type MutationCreateCustomerV2Args = {
    input: CustomerCreateInput;
};
export type MutationCreateEmptyCartArgs = {
    input?: InputMaybe<CreateEmptyCartInput>;
};
export type MutationCreateGiftRegistryArgs = {
    giftRegistry: CreateGiftRegistryInput;
};
export type MutationCreateGuestCartArgs = {
    input?: InputMaybe<CreateGuestCartInput>;
};
export type MutationCreatePayflowProTokenArgs = {
    input: PayflowProTokenInput;
};
export type MutationCreatePaymentOrderArgs = {
    input: CreatePaymentOrderInput;
};
export type MutationCreatePaypalExpressTokenArgs = {
    input: PaypalExpressTokenInput;
};
export type MutationCreateProductReviewArgs = {
    input: CreateProductReviewInput;
};
export type MutationCreateWishlistArgs = {
    input: CreateWishlistInput;
};
export type MutationDeleteCompareListArgs = {
    uid: Scalars['ID']['input'];
};
export type MutationDeleteCustomerAddressArgs = {
    id: Scalars['Int']['input'];
};
export type MutationDeletePaymentTokenArgs = {
    public_hash: Scalars['String']['input'];
};
export type MutationDeleteWishlistArgs = {
    wishlistId: Scalars['ID']['input'];
};
export type MutationEstimateShippingMethodsArgs = {
    input: EstimateTotalsInput;
};
export type MutationEstimateTotalsArgs = {
    input: EstimateTotalsInput;
};
export type MutationGenerateCustomerTokenArgs = {
    email: Scalars['String']['input'];
    password: Scalars['String']['input'];
};
export type MutationGenerateCustomerTokenAsAdminArgs = {
    input: GenerateCustomerTokenAsAdminInput;
};
export type MutationHandlePayflowProResponseArgs = {
    input: PayflowProResponseInput;
};
export type MutationMergeCartsArgs = {
    destination_cart_id?: InputMaybe<Scalars['String']['input']>;
    source_cart_id: Scalars['String']['input'];
};
export type MutationMoveCartItemsToGiftRegistryArgs = {
    cartUid: Scalars['ID']['input'];
    giftRegistryUid: Scalars['ID']['input'];
};
export type MutationMoveProductsBetweenWishlistsArgs = {
    destinationWishlistUid: Scalars['ID']['input'];
    sourceWishlistUid: Scalars['ID']['input'];
    wishlistItems: Array<WishlistItemMoveInput>;
};
export type MutationPlaceOrderArgs = {
    input?: InputMaybe<PlaceOrderInput>;
};
export type MutationRedeemGiftCardBalanceAsStoreCreditArgs = {
    input: GiftCardAccountInput;
};
export type MutationRemoveCouponFromCartArgs = {
    input?: InputMaybe<RemoveCouponFromCartInput>;
};
export type MutationRemoveCouponsFromCartArgs = {
    input?: InputMaybe<RemoveCouponsFromCartInput>;
};
export type MutationRemoveGiftCardFromCartArgs = {
    input?: InputMaybe<RemoveGiftCardFromCartInput>;
};
export type MutationRemoveGiftRegistryArgs = {
    giftRegistryUid: Scalars['ID']['input'];
};
export type MutationRemoveGiftRegistryItemsArgs = {
    giftRegistryUid: Scalars['ID']['input'];
    itemsUid: Array<Scalars['ID']['input']>;
};
export type MutationRemoveGiftRegistryRegistrantsArgs = {
    giftRegistryUid: Scalars['ID']['input'];
    registrantsUid: Array<Scalars['ID']['input']>;
};
export type MutationRemoveItemFromCartArgs = {
    input?: InputMaybe<RemoveItemFromCartInput>;
};
export type MutationRemoveProductsFromCompareListArgs = {
    input?: InputMaybe<RemoveProductsFromCompareListInput>;
};
export type MutationRemoveProductsFromWishlistArgs = {
    wishlistId: Scalars['ID']['input'];
    wishlistItemsIds: Array<Scalars['ID']['input']>;
};
export type MutationRemoveReturnTrackingArgs = {
    input: RemoveReturnTrackingInput;
};
export type MutationRemoveRewardPointsFromCartArgs = {
    cartId: Scalars['ID']['input'];
};
export type MutationRemoveStoreCreditFromCartArgs = {
    input: RemoveStoreCreditFromCartInput;
};
export type MutationReorderItemsArgs = {
    orderNumber: Scalars['String']['input'];
};
export type MutationRequestPasswordResetEmailArgs = {
    email: Scalars['String']['input'];
};
export type MutationRequestReturnArgs = {
    input: RequestReturnInput;
};
export type MutationResendConfirmationEmailArgs = {
    email: Scalars['String']['input'];
};
export type MutationResetPasswordArgs = {
    email: Scalars['String']['input'];
    newPassword: Scalars['String']['input'];
    resetPasswordToken: Scalars['String']['input'];
};
export type MutationSendEmailToFriendArgs = {
    input?: InputMaybe<SendEmailToFriendInput>;
};
export type MutationSetBillingAddressOnCartArgs = {
    input?: InputMaybe<SetBillingAddressOnCartInput>;
};
export type MutationSetGiftOptionsOnCartArgs = {
    input?: InputMaybe<SetGiftOptionsOnCartInput>;
};
export type MutationSetGuestEmailOnCartArgs = {
    input?: InputMaybe<SetGuestEmailOnCartInput>;
};
export type MutationSetPaymentMethodAndPlaceOrderArgs = {
    input?: InputMaybe<SetPaymentMethodAndPlaceOrderInput>;
};
export type MutationSetPaymentMethodOnCartArgs = {
    input?: InputMaybe<SetPaymentMethodOnCartInput>;
};
export type MutationSetShippingAddressesOnCartArgs = {
    input?: InputMaybe<SetShippingAddressesOnCartInput>;
};
export type MutationSetShippingMethodsOnCartArgs = {
    input?: InputMaybe<SetShippingMethodsOnCartInput>;
};
export type MutationShareGiftRegistryArgs = {
    giftRegistryUid: Scalars['ID']['input'];
    invitees: Array<ShareGiftRegistryInviteeInput>;
    sender: ShareGiftRegistrySenderInput;
};
export type MutationSubscribeEmailToNewsletterArgs = {
    email: Scalars['String']['input'];
};
export type MutationSyncPaymentOrderArgs = {
    input?: InputMaybe<SyncPaymentOrderInput>;
};
export type MutationUpdateCartItemsArgs = {
    input?: InputMaybe<UpdateCartItemsInput>;
};
export type MutationUpdateCustomerArgs = {
    input: CustomerInput;
};
export type MutationUpdateCustomerAddressArgs = {
    id: Scalars['Int']['input'];
    input?: InputMaybe<CustomerAddressInput>;
};
export type MutationUpdateCustomerEmailArgs = {
    email: Scalars['String']['input'];
    password: Scalars['String']['input'];
};
export type MutationUpdateCustomerV2Args = {
    input: CustomerUpdateInput;
};
export type MutationUpdateGiftRegistryArgs = {
    giftRegistry: UpdateGiftRegistryInput;
    giftRegistryUid: Scalars['ID']['input'];
};
export type MutationUpdateGiftRegistryItemsArgs = {
    giftRegistryUid: Scalars['ID']['input'];
    items: Array<UpdateGiftRegistryItemInput>;
};
export type MutationUpdateGiftRegistryRegistrantsArgs = {
    giftRegistryUid: Scalars['ID']['input'];
    registrants: Array<UpdateGiftRegistryRegistrantInput>;
};
export type MutationUpdateProductsInWishlistArgs = {
    wishlistId: Scalars['ID']['input'];
    wishlistItems: Array<WishlistItemUpdateInput>;
};
export type MutationUpdateWishlistArgs = {
    name?: InputMaybe<Scalars['String']['input']>;
    visibility?: InputMaybe<WishlistVisibilityEnum>;
    wishlistId: Scalars['ID']['input'];
};
/** Contains an error message when an invalid UID was specified. */
export type NoSuchEntityUidError = ErrorInterface & {
    __typename?: 'NoSuchEntityUidError';
    /** The returned error message. */
    message: Scalars['String']['output'];
    /** The specified invalid unique ID of an object. */
    uid: Scalars['ID']['output'];
};
/** Contains the order ID. */
export type Order = {
    __typename?: 'Order';
    /** @deprecated Use `order_number` instead. */
    order_id?: Maybe<Scalars['String']['output']>;
    /** The unique ID for an `Order` object. */
    order_number: Scalars['String']['output'];
};
/** Contains detailed information about an order's billing and shipping addresses. */
export type OrderAddress = {
    __typename?: 'OrderAddress';
    /** The city or town. */
    city: Scalars['String']['output'];
    /** The customer's company. */
    company?: Maybe<Scalars['String']['output']>;
    /** The customer's country. */
    country_code?: Maybe<CountryCodeEnum>;
    /** Custom attributes assigned to the customer address. */
    custom_attributesV2: Array<Maybe<AttributeValueInterface>>;
    /** The fax number. */
    fax?: Maybe<Scalars['String']['output']>;
    /** The first name of the person associated with the shipping/billing address. */
    firstname: Scalars['String']['output'];
    /** The family name of the person associated with the shipping/billing address. */
    lastname: Scalars['String']['output'];
    /** The middle name of the person associated with the shipping/billing address. */
    middlename?: Maybe<Scalars['String']['output']>;
    /** The customer's ZIP or postal code. */
    postcode?: Maybe<Scalars['String']['output']>;
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']['output']>;
    /** The state or province name. */
    region?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `Region` object of a pre-defined region. */
    region_id?: Maybe<Scalars['ID']['output']>;
    /** An array of strings that define the street number and name. */
    street: Array<Maybe<Scalars['String']['output']>>;
    /** A value such as Sr., Jr., or III. */
    suffix?: Maybe<Scalars['String']['output']>;
    /** The telephone number. */
    telephone?: Maybe<Scalars['String']['output']>;
    /** The customer's Value-added tax (VAT) number (for corporate customers). */
    vat_id?: Maybe<Scalars['String']['output']>;
};
/** Contains detailed information about an order's billing and shipping addresses. */
export type OrderAddressCustom_AttributesV2Args = {
    attributeCodes?: InputMaybe<Array<Scalars['ID']['input']>>;
};
/** Input to retrieve an order based on details. */
export type OrderInformationInput = {
    /** Order billing address email. */
    email: Scalars['String']['input'];
    /** Order number. */
    number: Scalars['String']['input'];
    /** Order billing address postcode. */
    postcode: Scalars['String']['input'];
};
export type OrderItem = OrderItemInterface & {
    __typename?: 'OrderItem';
    /** The final discount information for the product. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** Indicates whether the order item is eligible to be in a return request. */
    eligible_for_return?: Maybe<Scalars['Boolean']['output']>;
    /** The entered option for the base product, such as a logo or image. */
    entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
    /** The selected gift message for the order item */
    gift_message?: Maybe<GiftMessage>;
    /** The selected gift wrapping for the order item. */
    gift_wrapping?: Maybe<GiftWrapping>;
    /** The unique ID for an `OrderItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<OrderItemPrices>;
    /** The ProductInterface object, which contains details about the base product */
    product?: Maybe<ProductInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price of the base product, including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The type of product, such as simple, configurable, etc. */
    product_type?: Maybe<Scalars['String']['output']>;
    /** URL key of the base product. */
    product_url_key?: Maybe<Scalars['String']['output']>;
    /** The number of canceled items. */
    quantity_canceled?: Maybe<Scalars['Float']['output']>;
    /** The number of invoiced items. */
    quantity_invoiced?: Maybe<Scalars['Float']['output']>;
    /** The number of units ordered for this item. */
    quantity_ordered?: Maybe<Scalars['Float']['output']>;
    /** The number of refunded items. */
    quantity_refunded?: Maybe<Scalars['Float']['output']>;
    /** The number of returned items. */
    quantity_returned?: Maybe<Scalars['Float']['output']>;
    /** The number of shipped items. */
    quantity_shipped?: Maybe<Scalars['Float']['output']>;
    /** The selected options for the base product, such as color or size. */
    selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
    /** The status of the order item. */
    status?: Maybe<Scalars['String']['output']>;
};
/** Order item details. */
export type OrderItemInterface = {
    /** The final discount information for the product. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** Indicates whether the order item is eligible to be in a return request. */
    eligible_for_return?: Maybe<Scalars['Boolean']['output']>;
    /** The entered option for the base product, such as a logo or image. */
    entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
    /** The selected gift message for the order item */
    gift_message?: Maybe<GiftMessage>;
    /** The selected gift wrapping for the order item. */
    gift_wrapping?: Maybe<GiftWrapping>;
    /** The unique ID for an `OrderItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<OrderItemPrices>;
    /** The ProductInterface object, which contains details about the base product */
    product?: Maybe<ProductInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price of the base product, including selected options. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The type of product, such as simple, configurable, etc. */
    product_type?: Maybe<Scalars['String']['output']>;
    /** URL key of the base product. */
    product_url_key?: Maybe<Scalars['String']['output']>;
    /** The number of canceled items. */
    quantity_canceled?: Maybe<Scalars['Float']['output']>;
    /** The number of invoiced items. */
    quantity_invoiced?: Maybe<Scalars['Float']['output']>;
    /** The number of units ordered for this item. */
    quantity_ordered?: Maybe<Scalars['Float']['output']>;
    /** The number of refunded items. */
    quantity_refunded?: Maybe<Scalars['Float']['output']>;
    /** The number of returned items. */
    quantity_returned?: Maybe<Scalars['Float']['output']>;
    /** The number of shipped items. */
    quantity_shipped?: Maybe<Scalars['Float']['output']>;
    /** The selected options for the base product, such as color or size. */
    selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
    /** The status of the order item. */
    status?: Maybe<Scalars['String']['output']>;
};
/** Represents order item options like selected or entered. */
export type OrderItemOption = {
    __typename?: 'OrderItemOption';
    /** The name of the option. */
    label: Scalars['String']['output'];
    /** The value of the option. */
    value: Scalars['String']['output'];
};
export type OrderItemPrices = {
    __typename?: 'OrderItemPrices';
    /** An array of discounts to be applied to the cart item. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** The original price of the item. */
    original_price?: Maybe<Money>;
    /** The original price of the item including tax. */
    original_price_including_tax?: Maybe<Money>;
    /** The value of the original price multiplied by the quantity of the item. */
    original_row_total: Money;
    /** The value of the original price multiplied by the quantity of the item including tax. */
    original_row_total_including_tax: Money;
    /** The price of the item before any discounts were applied. The price that might include tax, depending on the configured display settings for cart. */
    price: Money;
    /** The price of the item before any discounts were applied. The price that might include tax, depending on the configured display settings for cart. */
    price_including_tax: Money;
    /** The value of the price multiplied by the quantity of the item. */
    row_total: Money;
    /** The value of `row_total` plus the tax applied to the item. */
    row_total_including_tax: Money;
    /** The total of all discounts applied to the item. */
    total_item_discount: Money;
};
/** Contains details about the payment method used to pay for the order. */
export type OrderPaymentMethod = {
    __typename?: 'OrderPaymentMethod';
    /** Additional data per payment method type. */
    additional_data?: Maybe<Array<Maybe<KeyValue>>>;
    /** The label that describes the payment method. */
    name: Scalars['String']['output'];
    /** The payment method code that indicates how the order was paid for. */
    type: Scalars['String']['output'];
};
/** Contains order shipment details. */
export type OrderShipment = {
    __typename?: 'OrderShipment';
    /** Comments added to the shipment. */
    comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
    /** The unique ID for a `OrderShipment` object. */
    id: Scalars['ID']['output'];
    /** An array of items included in the shipment. */
    items?: Maybe<Array<Maybe<ShipmentItemInterface>>>;
    /** The sequential credit shipment number. */
    number: Scalars['String']['output'];
    /** An array of shipment tracking details. */
    tracking?: Maybe<Array<Maybe<ShipmentTracking>>>;
};
/** Input to retrieve an order based on token. */
export type OrderTokenInput = {
    /** Order token. */
    token: Scalars['String']['input'];
};
/** Contains details about the sales total amounts used to calculate the final price. */
export type OrderTotal = {
    __typename?: 'OrderTotal';
    /** The final base grand total amount in the base currency. */
    base_grand_total: Money;
    /** The applied discounts to the order. */
    discounts?: Maybe<Array<Maybe<Discount>>>;
    /** The final total amount, including shipping, discounts, and taxes. */
    grand_total: Money;
    /** Details about the shipping and handling costs for the order. */
    shipping_handling?: Maybe<ShippingHandling>;
    /** The subtotal of the order, excluding shipping, discounts, and taxes. */
    subtotal: Money;
    /** The order tax details. */
    taxes?: Maybe<Array<Maybe<TaxItem>>>;
    /** The gift card balance applied to the order. */
    total_giftcard?: Maybe<Money>;
    /** The shipping amount for the order. */
    total_shipping: Money;
    /** The amount of tax applied to the order. */
    total_tax: Money;
};
/** Contains required input for Payflow Express Checkout payments. */
export type PayflowExpressInput = {
    /** The unique ID of the PayPal user. */
    payer_id: Scalars['String']['input'];
    /** The token returned by the createPaypalExpressToken mutation. */
    token: Scalars['String']['input'];
};
/** A set of relative URLs that PayPal uses in response to various actions during the authorization process. Adobe Commerce prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Payflow Link and Payments Advanced payment methods. */
export type PayflowLinkInput = {
    /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
    cancel_url: Scalars['String']['input'];
    /** The relative URL of the transaction error page that PayPal redirects to upon payment error. If the full URL to this page is https://www.example.com/paypal/action/error.html, the relative URL is paypal/action/error.html. */
    error_url: Scalars['String']['input'];
    /** The relative URL of the order confirmation page that PayPal redirects to when the payment is successful and additional confirmation is not needed. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
    return_url: Scalars['String']['input'];
};
/** Indicates the mode for payment. Applies to the Payflow Link and Payments Advanced payment methods. */
export declare enum PayflowLinkMode {
    Live = "LIVE",
    Test = "TEST"
}
/** Contains information used to generate PayPal iframe for transaction. Applies to Payflow Link and Payments Advanced payment methods. */
export type PayflowLinkToken = {
    __typename?: 'PayflowLinkToken';
    /** The mode for the Payflow transaction. */
    mode?: Maybe<PayflowLinkMode>;
    /** The PayPal URL used for requesting a Payflow form. */
    paypal_url?: Maybe<Scalars['String']['output']>;
    /** The secure token generated by PayPal. */
    secure_token?: Maybe<Scalars['String']['output']>;
    /** The secure token ID generated by PayPal. */
    secure_token_id?: Maybe<Scalars['String']['output']>;
};
/** Contains information required to fetch payment token information for the Payflow Link and Payments Advanced payment methods. */
export type PayflowLinkTokenInput = {
    /** The unique ID that identifies the customer's cart. */
    cart_id: Scalars['String']['input'];
};
/** Contains input for the Payflow Pro and Payments Pro payment methods. */
export type PayflowProInput = {
    /** Required input for credit card related information. */
    cc_details: CreditCardDetailsInput;
    /** Indicates whether details about the shopper's credit/debit card should be tokenized for later usage. Required only if Vault is enabled for the PayPal Payflow Pro payment integration. */
    is_active_payment_token_enabler?: InputMaybe<Scalars['Boolean']['input']>;
};
/** Input required to complete payment. Applies to Payflow Pro and Payments Pro payment methods. */
export type PayflowProResponseInput = {
    /** The unique ID that identifies the shopper's cart. */
    cart_id: Scalars['String']['input'];
    /** The payload returned from PayPal. */
    paypal_payload: Scalars['String']['input'];
};
export type PayflowProResponseOutput = {
    __typename?: 'PayflowProResponseOutput';
    /** The cart with the updated selected payment method. */
    cart: Cart;
};
/** Contains the secure information used to authorize transaction. Applies to Payflow Pro and Payments Pro payment methods. */
export type PayflowProToken = {
    __typename?: 'PayflowProToken';
    /** The RESPMSG returned by PayPal. If the `result` is `0`, then `response_message` is `Approved`. */
    response_message: Scalars['String']['output'];
    /** A non-zero value if any errors occurred. */
    result: Scalars['Int']['output'];
    /** The RESULT returned by PayPal. A value of `0` indicates the transaction was approved. */
    result_code: Scalars['Int']['output'];
    /** A secure token generated by PayPal. */
    secure_token: Scalars['String']['output'];
    /** A secure token ID generated by PayPal. */
    secure_token_id: Scalars['String']['output'];
};
/** Contains input required to fetch payment token information for the Payflow Pro and Payments Pro payment methods. */
export type PayflowProTokenInput = {
    /** The unique ID that identifies the shopper's cart. */
    cart_id: Scalars['String']['input'];
    /** A set of relative URLs that PayPal uses for callback. */
    urls: PayflowProUrlInput;
};
/** Contains a set of relative URLs that PayPal uses in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for the Payflow Pro and Payment Pro payment methods. */
export type PayflowProUrlInput = {
    /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
    cancel_url: Scalars['String']['input'];
    /** The relative URL of the transaction error page that PayPal redirects to upon payment error. If the full URL to this page is https://www.example.com/paypal/action/error.html, the relative URL is paypal/action/error.html. */
    error_url: Scalars['String']['input'];
    /** The relative URL of the final confirmation page that PayPal redirects to upon payment success. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
    return_url: Scalars['String']['input'];
};
export type PaymentCommonConfig = PaymentConfigItem & {
    __typename?: 'PaymentCommonConfig';
    /** The payment method code as defined in the payment gateway */
    code?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the payment method is displayed */
    is_visible?: Maybe<Scalars['Boolean']['output']>;
    /** Defines the payment intent (Authorize or Capture */
    payment_intent?: Maybe<Scalars['String']['output']>;
    /** The PayPal parameters required to load the JS SDK */
    sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
    /** The relative order the payment method is displayed on the checkout page */
    sort_order?: Maybe<Scalars['String']['output']>;
    /** The name displayed for the payment method */
    title?: Maybe<Scalars['String']['output']>;
};
/** Contains payment fields that are common to all types of payment methods. */
export type PaymentConfigItem = {
    /** The payment method code as defined in the payment gateway */
    code?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the payment method is displayed */
    is_visible?: Maybe<Scalars['Boolean']['output']>;
    /** Defines the payment intent (Authorize or Capture */
    payment_intent?: Maybe<Scalars['String']['output']>;
    /** The PayPal parameters required to load the JS SDK */
    sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
    /** The relative order the payment method is displayed on the checkout page */
    sort_order?: Maybe<Scalars['String']['output']>;
    /** The name displayed for the payment method */
    title?: Maybe<Scalars['String']['output']>;
};
/** Retrieves the payment configuration for a given location */
export type PaymentConfigOutput = {
    __typename?: 'PaymentConfigOutput';
    /** ApplePay payment method configuration */
    apple_pay?: Maybe<ApplePayConfig>;
    /** GooglePay payment method configuration */
    google_pay?: Maybe<GooglePayConfig>;
    /** Hosted fields payment method configuration */
    hosted_fields?: Maybe<HostedFieldsConfig>;
    /** Smart Buttons payment method configuration */
    smart_buttons?: Maybe<SmartButtonsConfig>;
};
/** Defines the origin location for that payment request */
export declare enum PaymentLocation {
    Admin = "ADMIN",
    Cart = "CART",
    Checkout = "CHECKOUT",
    Minicart = "MINICART",
    ProductDetail = "PRODUCT_DETAIL"
}
/** Defines the payment method. */
export type PaymentMethodInput = {
    braintree?: InputMaybe<BraintreeInput>;
    braintree_ach_direct_debit?: InputMaybe<BraintreeInput>;
    braintree_ach_direct_debit_vault?: InputMaybe<BraintreeVaultInput>;
    braintree_applepay_vault?: InputMaybe<BraintreeVaultInput>;
    braintree_cc_vault?: InputMaybe<BraintreeCcVaultInput>;
    braintree_googlepay_vault?: InputMaybe<BraintreeVaultInput>;
    braintree_paypal?: InputMaybe<BraintreeInput>;
    braintree_paypal_vault?: InputMaybe<BraintreeVaultInput>;
    /** The internal name for the payment method. */
    code: Scalars['String']['input'];
    /** Required input for PayPal Hosted pro payments. */
    hosted_pro?: InputMaybe<HostedProInput>;
    /** Required input for Payflow Express Checkout payments. */
    payflow_express?: InputMaybe<PayflowExpressInput>;
    /** Required input for PayPal Payflow Link and Payments Advanced payments. */
    payflow_link?: InputMaybe<PayflowLinkInput>;
    /** Required input for PayPal Payflow Pro and Payment Pro payments. */
    payflowpro?: InputMaybe<PayflowProInput>;
    /** Required input for PayPal Payflow Pro vault payments. */
    payflowpro_cc_vault?: InputMaybe<VaultTokenInput>;
    /** Required input for Apple Pay button */
    payment_services_paypal_apple_pay?: InputMaybe<ApplePayMethodInput>;
    /** Required input for Google Pay button */
    payment_services_paypal_google_pay?: InputMaybe<GooglePayMethodInput>;
    /** Required input for Hosted Fields */
    payment_services_paypal_hosted_fields?: InputMaybe<HostedFieldsInput>;
    /** Required input for Smart buttons */
    payment_services_paypal_smart_buttons?: InputMaybe<SmartButtonMethodInput>;
    /** Required input for vault */
    payment_services_paypal_vault?: InputMaybe<VaultMethodInput>;
    /** Required input for Express Checkout and Payments Standard payments. */
    paypal_express?: InputMaybe<PaypalExpressInput>;
    /** The purchase order number. Optional for most payment methods. */
    purchase_order_number?: InputMaybe<Scalars['String']['input']>;
};
/** Contains the payment order details */
export type PaymentOrderOutput = {
    __typename?: 'PaymentOrderOutput';
    /** PayPal order ID */
    id?: Maybe<Scalars['String']['output']>;
    /** The order ID generated by Payment Services */
    mp_order_id?: Maybe<Scalars['String']['output']>;
    /** Details about the card used on the order */
    payment_source_details?: Maybe<PaymentSourceDetails>;
    /** The status of the payment order */
    status?: Maybe<Scalars['String']['output']>;
};
export type PaymentSdkParamsItem = {
    __typename?: 'PaymentSDKParamsItem';
    /** The payment method code used in the order */
    code?: Maybe<Scalars['String']['output']>;
    /** The payment SDK parameters */
    params?: Maybe<Array<Maybe<SdkParams>>>;
};
export type PaymentSourceDetails = {
    __typename?: 'PaymentSourceDetails';
    /** Details about the card used on the order */
    card?: Maybe<Card>;
};
/** The stored payment method available to the customer. */
export type PaymentToken = {
    __typename?: 'PaymentToken';
    /** A description of the stored account details. */
    details?: Maybe<Scalars['String']['output']>;
    /** The payment method code associated with the token. */
    payment_method_code: Scalars['String']['output'];
    /** The public hash of the token. */
    public_hash: Scalars['String']['output'];
    /** Specifies the payment token type. */
    type: PaymentTokenTypeEnum;
};
/** The list of available payment token types. */
export declare enum PaymentTokenTypeEnum {
    /** phpcs:ignore Magento2.GraphQL.ValidArgumentName */
    Account = "account",
    /** phpcs:ignore Magento2.GraphQL.ValidArgumentName */
    Card = "card"
}
/** Contains required input for Express Checkout and Payments Standard payments. */
export type PaypalExpressInput = {
    /** The unique ID of the PayPal user. */
    payer_id: Scalars['String']['input'];
    /** The token returned by the `createPaypalExpressToken` mutation. */
    token: Scalars['String']['input'];
};
/** Deprecated. Use `PaypalExpressTokenOutput` instead. */
export type PaypalExpressToken = {
    __typename?: 'PaypalExpressToken';
    /**
     * A set of URLs that allow the buyer to authorize payment and adjust checkout details.
     * @deprecated Use `PaypalExpressTokenOutput.paypal_urls` instead.
     */
    paypal_urls?: Maybe<PaypalExpressUrlList>;
    /**
     * The token returned by PayPal.
     * @deprecated Use `PaypalExpressTokenOutput.token` instead.
     */
    token?: Maybe<Scalars['String']['output']>;
};
/** Defines the attributes required to receive a payment token for Express Checkout and Payments Standard payment methods. */
export type PaypalExpressTokenInput = {
    /** The unique ID that identifies the customer's cart. */
    cart_id: Scalars['String']['input'];
    /** The payment method code. */
    code: Scalars['String']['input'];
    /** Indicates whether the buyer selected the quick checkout button. The default value is false. */
    express_button?: InputMaybe<Scalars['Boolean']['input']>;
    /** A set of relative URLs that PayPal uses in response to various actions during the authorization process. */
    urls: PaypalExpressUrlsInput;
    /** Indicates whether the buyer clicked the PayPal credit button. The default value is false. */
    use_paypal_credit?: InputMaybe<Scalars['Boolean']['input']>;
};
/** Contains the token returned by PayPal and a set of URLs that allow the buyer to authorize payment and adjust checkout details. Applies to Express Checkout and Payments Standard payment methods. */
export type PaypalExpressTokenOutput = {
    __typename?: 'PaypalExpressTokenOutput';
    /** A set of URLs that allow the buyer to authorize payment and adjust checkout details. */
    paypal_urls?: Maybe<PaypalExpressUrlList>;
    /** The token returned by PayPal. */
    token?: Maybe<Scalars['String']['output']>;
};
/** Contains a set of URLs that allow the buyer to authorize payment and adjust checkout details for Express Checkout and Payments Standard transactions. */
export type PaypalExpressUrlList = {
    __typename?: 'PaypalExpressUrlList';
    /** The PayPal URL that allows the buyer to edit their checkout details. */
    edit?: Maybe<Scalars['String']['output']>;
    /** The URL to the PayPal login page. */
    start?: Maybe<Scalars['String']['output']>;
};
/** Contains a set of relative URLs that PayPal uses in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Express Checkout and Payments Standard payment methods. */
export type PaypalExpressUrlsInput = {
    /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
    cancel_url: Scalars['String']['input'];
    /** The relative URL of the page that PayPal redirects to when the payment has been put on hold for additional review. This condition mostly applies to ACH transactions, and is not applicable to most PayPal solutions. If the full URL to this page is https://www.example.com/paypal/action/success_pending.html, the relative URL is paypal/action/success_pending.html. */
    pending_url?: InputMaybe<Scalars['String']['input']>;
    /** The relative URL of the final confirmation page that PayPal redirects to upon payment success. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
    return_url: Scalars['String']['input'];
    /** The relative URL of the order confirmation page that PayPal redirects to when the payment is successful and additional confirmation is not needed. Not applicable to most PayPal solutions. If the full URL to this page is https://www.example.com/paypal/action/success.html, the relative URL is paypal/action/success.html. */
    success_url?: InputMaybe<Scalars['String']['input']>;
};
/** Contains attributes specific to tangible products. */
export type PhysicalProductInterface = {
    /** The weight of the item, in units defined by the store. */
    weight?: Maybe<Scalars['Float']['output']>;
};
/** Defines Pickup Location information. */
export type PickupLocation = {
    __typename?: 'PickupLocation';
    city?: Maybe<Scalars['String']['output']>;
    contact_name?: Maybe<Scalars['String']['output']>;
    country_id?: Maybe<Scalars['String']['output']>;
    description?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    fax?: Maybe<Scalars['String']['output']>;
    latitude?: Maybe<Scalars['Float']['output']>;
    longitude?: Maybe<Scalars['Float']['output']>;
    name?: Maybe<Scalars['String']['output']>;
    phone?: Maybe<Scalars['String']['output']>;
    pickup_location_code?: Maybe<Scalars['String']['output']>;
    postcode?: Maybe<Scalars['String']['output']>;
    region?: Maybe<Scalars['String']['output']>;
    region_id?: Maybe<Scalars['Int']['output']>;
    street?: Maybe<Scalars['String']['output']>;
};
/** PickupLocationFilterInput defines the list of attributes and filters for the search. */
export type PickupLocationFilterInput = {
    /** Filter by city. */
    city?: InputMaybe<FilterTypeInput>;
    /** Filter by country. */
    country_id?: InputMaybe<FilterTypeInput>;
    /** Filter by pickup location name. */
    name?: InputMaybe<FilterTypeInput>;
    /** Filter by pickup location code. */
    pickup_location_code?: InputMaybe<FilterTypeInput>;
    /** Filter by postcode. */
    postcode?: InputMaybe<FilterTypeInput>;
    /** Filter by region. */
    region?: InputMaybe<FilterTypeInput>;
    /** Filter by region id. */
    region_id?: InputMaybe<FilterTypeInput>;
    /** Filter by street. */
    street?: InputMaybe<FilterTypeInput>;
};
/** PickupLocationSortInput specifies attribute to use for sorting search results and indicates whether the results are sorted in ascending or descending order. */
export type PickupLocationSortInput = {
    /** City where pickup location is placed. */
    city?: InputMaybe<SortEnum>;
    /** Name of the contact person. */
    contact_name?: InputMaybe<SortEnum>;
    /** Id of the country in two letters. */
    country_id?: InputMaybe<SortEnum>;
    /** Description of the pickup location. */
    description?: InputMaybe<SortEnum>;
    /** Distance to the address, requested by distance filter. Applicable only with distance filter. If distance sort order is present, all other sort orders will be ignored. */
    distance?: InputMaybe<SortEnum>;
    /** Contact email of the pickup location. */
    email?: InputMaybe<SortEnum>;
    /** Contact fax of the pickup location. */
    fax?: InputMaybe<SortEnum>;
    /** Geographic latitude where pickup location is placed. */
    latitude?: InputMaybe<SortEnum>;
    /** Geographic longitude where pickup location is placed. */
    longitude?: InputMaybe<SortEnum>;
    /** The pickup location name. Customer use this to identify the pickup location. */
    name?: InputMaybe<SortEnum>;
    /** Contact phone number of the pickup location. */
    phone?: InputMaybe<SortEnum>;
    /** A code assigned to pickup location to identify the source. */
    pickup_location_code?: InputMaybe<SortEnum>;
    /** Postcode where pickup location is placed. */
    postcode?: InputMaybe<SortEnum>;
    /** Name of the region. */
    region?: InputMaybe<SortEnum>;
    /** Id of the region. */
    region_id?: InputMaybe<SortEnum>;
    /** Street where pickup location is placed. */
    street?: InputMaybe<SortEnum>;
};
/** Top level object returned in a pickup locations search. */
export type PickupLocations = {
    __typename?: 'PickupLocations';
    /** An array of pickup locations that match the specific search request. */
    items?: Maybe<Array<Maybe<PickupLocation>>>;
    /** An object that includes the page_info and currentPage values specified in the query. */
    page_info?: Maybe<SearchResultPageInfo>;
    /** The number of products returned. */
    total_count?: Maybe<Scalars['Int']['output']>;
};
/** An error encountered while placing an order. */
export type PlaceOrderError = {
    __typename?: 'PlaceOrderError';
    /** An error code that is specific to place order. */
    code: PlaceOrderErrorCodes;
    /** A localized error message. */
    message: Scalars['String']['output'];
};
export declare enum PlaceOrderErrorCodes {
    CartNotActive = "CART_NOT_ACTIVE",
    CartNotFound = "CART_NOT_FOUND",
    GuestEmailMissing = "GUEST_EMAIL_MISSING",
    UnableToPlaceOrder = "UNABLE_TO_PLACE_ORDER",
    Undefined = "UNDEFINED"
}
/** Specifies the quote to be converted to an order. */
export type PlaceOrderInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
};
/** Contains the results of the request to place an order. */
export type PlaceOrderOutput = {
    __typename?: 'PlaceOrderOutput';
    /** An array of place order errors. */
    errors: Array<Maybe<PlaceOrderError>>;
    /**
     * The ID of the order.
     * @deprecated Use `orderV2` instead.
     */
    order?: Maybe<Order>;
    /** Full order information. */
    orderV2?: Maybe<CustomerOrder>;
};
export type PostV1CartsGuestcartsCartIdGiftCards_Request_Input = {
    giftCardAccountData: Gift_Card_Account_Data_Gift_Card_Account_Interface_Input;
};
export type PostV1CartsGuestcartsCartIdGiftCards_Response = Boolean_Container | Error_Response;
export type PostV1CustomersIsEmailAvailable_Request_Input = {
    customerEmail: Scalars['String']['input'];
    /** If not set, will use the current websiteId */
    websiteId?: InputMaybe<Scalars['Int']['input']>;
};
export type PostV1CustomersIsEmailAvailable_Response = Boolean_Container | Error_Response;
export type PostV1CustomersResetPassword_Request_Input = {
    /** If empty value given then the customer will be matched by the RP token. */
    email: Scalars['String']['input'];
    newPassword: Scalars['String']['input'];
    resetToken: Scalars['String']['input'];
};
export type PostV1CustomersResetPassword_Response = Boolean_Container | Error_Response;
export type PostV1Customers_Request_Input = {
    customer: Customer_Data_Customer_Interface_Input;
    password?: InputMaybe<Scalars['String']['input']>;
    redirectUrl?: InputMaybe<Scalars['String']['input']>;
};
export type PostV1Customers_Response = Customer_Data_Customer_Interface | Error_Response;
export type PostV1GuestcartsCartIdBillingaddress_Request_Input = {
    address: Quote_Data_Address_Interface_Input;
    useForShipping?: InputMaybe<Scalars['Boolean']['input']>;
};
export type PostV1GuestcartsCartIdBillingaddress_Response = Int_Container | Error_Response;
export type PostV1GuestcartsCartIdEstimateshippingmethods_Request_Input = {
    address: Quote_Data_Address_Interface_Input;
};
export type PostV1GuestcartsCartIdEstimateshippingmethods_Response = Error_Response | Quote_Data_Shipping_Method_Interface2;
export type PostV1GuestcartsCartIdGiftmessageItemId_Request_Input = {
    giftMessage: Gift_Message_Data_Message_Interface_Input;
};
export type PostV1GuestcartsCartIdGiftmessageItemId_Response = Boolean_Container | Error_Response;
export type PostV1GuestcartsCartIdGiftmessage_Request_Input = {
    giftMessage: Gift_Message_Data_Message_Interface_Input;
};
export type PostV1GuestcartsCartIdGiftmessage_Response = Boolean_Container | Error_Response;
export type PostV1GuestcartsCartIdItems_Request_Input = {
    cartItem: Quote_Data_Cart_Item_Interface_Input;
};
export type PostV1GuestcartsCartIdItems_Response = Error_Response | Quote_Data_Cart_Item_Interface;
export type PostV1GuestcartsCartIdPaymentinformation_Request_Input = {
    billingAddress?: InputMaybe<Quote_Data_Address_Interface_Input>;
    email: Scalars['String']['input'];
    paymentMethod: Quote_Data_Payment_Interface_Input;
};
export type PostV1GuestcartsCartIdPaymentinformation_Response = Int_Container | Error_Response;
export type PostV1GuestcartsCartIdPaymentorderId_Response = Boolean_Container | Error_Response;
export type PostV1GuestcartsCartIdPaymentorder_Request_Input = {
    location: Scalars['String']['input'];
    methodCode: Scalars['String']['input'];
    paymentSource: Scalars['String']['input'];
    vaultIntent?: InputMaybe<Scalars['Boolean']['input']>;
};
export type PostV1GuestcartsCartIdPaymentorder_Response = Error_Response | Payment_Services_Paypal_Data_Payment_Order_Interface;
export type PostV1GuestcartsCartIdSetpaymentinformation_Request_Input = {
    billingAddress?: InputMaybe<Quote_Data_Address_Interface_Input>;
    email: Scalars['String']['input'];
    paymentMethod: Quote_Data_Payment_Interface_Input;
};
export type PostV1GuestcartsCartIdSetpaymentinformation_Response = Int_Container | Error_Response;
export type PostV1GuestcartsCartIdShippinginformation_Request_Input = {
    addressInformation: Checkout_Data_Shipping_Information_Interface_Input;
};
export type PostV1GuestcartsCartIdShippinginformation_Response = Checkout_Data_Payment_Details_Interface | Error_Response;
export type PostV1GuestcartsCartIdTotalsinformation_Request_Input = {
    addressInformation: Checkout_Data_Totals_Information_Interface_Input;
};
export type PostV1GuestcartsCartIdTotalsinformation_Response = Error_Response | Quote_Data_Totals_Interface;
export type PostV1Guestcarts_Response = String_Container | Error_Response;
export type PostV1GuestgiftregistryCartIdEstimateshippingmethods_Request_Input = {
    /** The estimate registry id */
    registryId: Scalars['Int']['input'];
};
export type PostV1GuestgiftregistryCartIdEstimateshippingmethods_Response = Error_Response | Quote_Data_Shipping_Method_Interface3;
export type PostV1IntegrationAdminToken_Request_Input = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};
export type PostV1IntegrationAdminToken_Response = String_Container | Error_Response;
export type PostV1IntegrationCustomerToken_Request_Input = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};
export type PostV1IntegrationCustomerToken_Response = String_Container | Error_Response;
export type PostV1TfaProviderAuthyActivate_Request_Input = {
    otp: Scalars['String']['input'];
    tfaToken: Scalars['String']['input'];
};
export type PostV1TfaProviderAuthyAuthenticate_Request_Input = {
    otp: Scalars['String']['input'];
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};
export type PostV1TfaProviderAuthyAuthenticate_Response = String_Container | Error_Response;
export type PostV1TfaProviderAuthyAuthenticateonetouch_Request_Input = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};
export type PostV1TfaProviderAuthyAuthenticateonetouch_Response = String_Container | Error_Response;
export type PostV1TfaProviderAuthyConfigure_Request_Input = {
    deviceData: Two_Factor_Auth_Data_Authy_Device_Interface_Input;
    tfaToken: Scalars['String']['input'];
};
export type PostV1TfaProviderAuthyConfigure_Response = Error_Response | Two_Factor_Auth_Data_Authy_Registration_Prompt_Response_Interface;
export type PostV1TfaProviderAuthySendtokenVia_Request_Input = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};
export type PostV1TfaProviderDuo_SecurityActivate_Request_Input = {
    signatureResponse: Scalars['String']['input'];
    tfaToken: Scalars['String']['input'];
};
export type PostV1TfaProviderDuo_SecurityAuthenticate_Request_Input = {
    password: Scalars['String']['input'];
    signatureResponse: Scalars['String']['input'];
    username: Scalars['String']['input'];
};
export type PostV1TfaProviderDuo_SecurityAuthenticate_Response = String_Container | Error_Response;
export type PostV1TfaProviderDuo_SecurityConfigure_Request_Input = {
    tfaToken: Scalars['String']['input'];
};
export type PostV1TfaProviderDuo_SecurityConfigure_Response = Error_Response | Two_Factor_Auth_Data_Duo_Data_Interface;
export type PostV1TfaProviderDuo_SecurityGetauthenticationdata_Request_Input = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};
export type PostV1TfaProviderDuo_SecurityGetauthenticationdata_Response = Error_Response | Two_Factor_Auth_Data_Duo_Data_Interface;
export type PostV1TfaProviderGoogleActivate_Request_Input = {
    otp: Scalars['String']['input'];
    tfaToken: Scalars['String']['input'];
};
export type PostV1TfaProviderGoogleAuthenticate_Request_Input = {
    otp: Scalars['String']['input'];
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};
export type PostV1TfaProviderGoogleAuthenticate_Response = String_Container | Error_Response;
export type PostV1TfaProviderGoogleConfigure_Request_Input = {
    tfaToken: Scalars['String']['input'];
};
export type PostV1TfaProviderGoogleConfigure_Response = Error_Response | Two_Factor_Auth_Data_Google_Configure_Interface;
export type PostV1TfaProviderU2fkeyActivate_Request_Input = {
    publicKeyCredentialJson: Scalars['String']['input'];
    tfaToken: Scalars['String']['input'];
};
export type PostV1TfaProviderU2fkeyAuthenticationchallenge_Request_Input = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};
export type PostV1TfaProviderU2fkeyAuthenticationchallenge_Response = Error_Response | Two_Factor_Auth_Data_U2f_Web_Authn_Request_Interface;
export type PostV1TfaProviderU2fkeyConfigure_Request_Input = {
    tfaToken: Scalars['String']['input'];
};
export type PostV1TfaProviderU2fkeyConfigure_Response = Error_Response | Two_Factor_Auth_Data_U2f_Web_Authn_Request_Interface;
export type PostV1TfaProviderU2fkeyVerify_Request_Input = {
    password: Scalars['String']['input'];
    publicKeyCredentialJson: Scalars['String']['input'];
    username: Scalars['String']['input'];
};
export type PostV1TfaProviderU2fkeyVerify_Response = String_Container | Error_Response;
/** Deprecated. Use `ProductPrice` instead. Defines the price of a product as well as any tax-related adjustments. */
export type Price = {
    __typename?: 'Price';
    /**
     * An array that provides information about tax, weee, or weee_tax adjustments.
     * @deprecated Use `ProductPrice` instead.
     */
    adjustments?: Maybe<Array<Maybe<PriceAdjustment>>>;
    /**
     * The price of a product plus a three-letter currency code.
     * @deprecated Use `ProductPrice` instead.
     */
    amount?: Maybe<Money>;
};
/** Deprecated. Taxes will be included or excluded in the price. Defines the amount of money to apply as an adjustment, the type of adjustment to apply, and whether the item is included or excluded from the adjustment. */
export type PriceAdjustment = {
    __typename?: 'PriceAdjustment';
    /** The amount of the price adjustment and its currency code. */
    amount?: Maybe<Money>;
    /**
     * Indicates whether the adjustment involves tax, weee, or weee_tax.
     * @deprecated `PriceAdjustment` is deprecated.
     */
    code?: Maybe<PriceAdjustmentCodesEnum>;
    /**
     * Indicates whether the entity described by the code attribute is included or excluded from the adjustment.
     * @deprecated `PriceAdjustment` is deprecated.
     */
    description?: Maybe<PriceAdjustmentDescriptionEnum>;
};
/** `PriceAdjustment.code` is deprecated. */
export declare enum PriceAdjustmentCodesEnum {
    /** @deprecated `PriceAdjustmentCodesEnum` is deprecated. Tax is included or excluded in the price. Tax is not shown separately in Catalog. */
    Tax = "TAX",
    /** @deprecated WEEE code is deprecated. Use `fixed_product_taxes.label` instead. */
    Weee = "WEEE",
    /** @deprecated Use `fixed_product_taxes` instead.  Tax is included or excluded in price. The tax is not shown separtely in Catalog. */
    WeeeTax = "WEEE_TAX"
}
/** `PriceAdjustmentDescriptionEnum` is deprecated. States whether a price adjustment is included or excluded. */
export declare enum PriceAdjustmentDescriptionEnum {
    Excluded = "EXCLUDED",
    Included = "INCLUDED"
}
/** Can be used to retrieve the main price details in case of bundle product */
export type PriceDetails = {
    __typename?: 'PriceDetails';
    /** The percentage of discount applied to the main product price */
    discount_percentage?: Maybe<Scalars['Float']['output']>;
    /** The final price after applying the discount to the main product */
    main_final_price?: Maybe<Scalars['Float']['output']>;
    /** The regular price of the main product */
    main_price?: Maybe<Scalars['Float']['output']>;
};
/** Contains the price range for a product. If the product has a single price, the minimum and maximum price will be the same. */
export type PriceRange = {
    __typename?: 'PriceRange';
    /** The highest possible price for the product. */
    maximum_price?: Maybe<ProductPrice>;
    /** The lowest possible price for the product. */
    minimum_price: ProductPrice;
};
/** Defines the price type. */
export declare enum PriceTypeEnum {
    Dynamic = "DYNAMIC",
    Fixed = "FIXED",
    Percent = "PERCENT"
}
/** Defines whether a bundle product's price is displayed as the lowest possible value or as a range. */
export declare enum PriceViewEnum {
    AsLowAs = "AS_LOW_AS",
    PriceRange = "PRICE_RANGE"
}
/** Contains a product attribute code and value. */
export type ProductAttribute = {
    __typename?: 'ProductAttribute';
    /** The unique identifier for a product attribute code. */
    code: Scalars['String']['output'];
    /** The display value of the attribute. */
    value: Scalars['String']['output'];
};
/** Defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for. */
export type ProductAttributeFilterInput = {
    /** Attribute label: Brand */
    accessory_brand?: InputMaybe<FilterEqualTypeInput>;
    /** Attribute label: Gemstone Addon */
    accessory_gemstone_addon?: InputMaybe<FilterEqualTypeInput>;
    /** Attribute label: Recyclable Material */
    accessory_recyclable_material?: InputMaybe<FilterEqualTypeInput>;
    /** Deprecated: use `category_uid` to filter product by category ID. */
    category_id?: InputMaybe<FilterEqualTypeInput>;
    /** Filter product by the unique ID for a `CategoryInterface` object. */
    category_uid?: InputMaybe<FilterEqualTypeInput>;
    /** Filter product by category URL path. */
    category_url_path?: InputMaybe<FilterEqualTypeInput>;
    /** Attribute label: Description */
    description?: InputMaybe<FilterMatchTypeInput>;
    /** Attribute label: Color */
    fashion_color?: InputMaybe<FilterEqualTypeInput>;
    /** Attribute label: Material */
    fashion_material?: InputMaybe<FilterEqualTypeInput>;
    /** Attribute label: Size */
    fashion_size?: InputMaybe<FilterEqualTypeInput>;
    /** Attribute label: Style */
    fashion_style?: InputMaybe<FilterEqualTypeInput>;
    /** Attribute label: Format */
    format?: InputMaybe<FilterEqualTypeInput>;
    /** Attribute label: Has Video */
    has_video?: InputMaybe<FilterEqualTypeInput>;
    /** Attribute label: Product Name */
    name?: InputMaybe<FilterMatchTypeInput>;
    /** Attribute label: Price */
    price?: InputMaybe<FilterRangeTypeInput>;
    /** Attribute label: Short Description */
    short_description?: InputMaybe<FilterMatchTypeInput>;
    /** Attribute label: SKU */
    sku?: InputMaybe<FilterEqualTypeInput>;
    /** The part of the URL that identifies the product */
    url_key?: InputMaybe<FilterEqualTypeInput>;
};
/** Specifies the attribute to use for sorting search results and indicates whether the results are sorted in ascending or descending order. It's possible to sort products using searchable attributes with enabled 'Use in Filter Options' option */
export type ProductAttributeSortInput = {
    /** Attribute label: Brand */
    accessory_brand?: InputMaybe<SortEnum>;
    /** Attribute label: Product Name */
    name?: InputMaybe<SortEnum>;
    /** Sort by the position assigned to each product. */
    position?: InputMaybe<SortEnum>;
    /** Attribute label: Price */
    price?: InputMaybe<SortEnum>;
    /** Sort by the search relevance score (default). */
    relevance?: InputMaybe<SortEnum>;
};
/** Product custom attributes */
export type ProductCustomAttributes = {
    __typename?: 'ProductCustomAttributes';
    /** Errors when retrieving custom attributes metadata. */
    errors: Array<Maybe<AttributeMetadataError>>;
    /** Requested custom attributes */
    items: Array<Maybe<AttributeValueInterface>>;
};
/** Contains the discount applied to a product price. */
export type ProductDiscount = {
    __typename?: 'ProductDiscount';
    /** The actual value of the discount. */
    amount_off?: Maybe<Scalars['Float']['output']>;
    /** The discount expressed a percentage. */
    percent_off?: Maybe<Scalars['Float']['output']>;
};
/** ProductFilterInput is deprecated, use @ProductAttributeFilterInput instead. ProductFilterInput defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for. */
export type ProductFilterInput = {
    /** The category ID the product belongs to. */
    category_id?: InputMaybe<FilterTypeInput>;
    /** The product's country of origin. */
    country_of_manufacture?: InputMaybe<FilterTypeInput>;
    /** The timestamp indicating when the product was created. */
    created_at?: InputMaybe<FilterTypeInput>;
    /** The name of a custom layout. */
    custom_layout?: InputMaybe<FilterTypeInput>;
    /** XML code that is applied as a layout update to the product page. */
    custom_layout_update?: InputMaybe<FilterTypeInput>;
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: InputMaybe<FilterTypeInput>;
    /** Indicates whether a gift message is available. */
    gift_message_available?: InputMaybe<FilterTypeInput>;
    /** Indicates whether additional attributes have been created for the product. */
    has_options?: InputMaybe<FilterTypeInput>;
    /** The relative path to the main image on the product page. */
    image?: InputMaybe<FilterTypeInput>;
    /** The label assigned to a product image. */
    image_label?: InputMaybe<FilterTypeInput>;
    /** Indicates whether the product can be returned. */
    is_returnable?: InputMaybe<FilterTypeInput>;
    /** A number representing the product's manufacturer. */
    manufacturer?: InputMaybe<FilterTypeInput>;
    /** The numeric maximal price of the product. Do not include the currency code. */
    max_price?: InputMaybe<FilterTypeInput>;
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: InputMaybe<FilterTypeInput>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: InputMaybe<FilterTypeInput>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: InputMaybe<FilterTypeInput>;
    /** The numeric minimal price of the product. Do not include the currency code. */
    min_price?: InputMaybe<FilterTypeInput>;
    /** The product name. Customers use this name to identify the product. */
    name?: InputMaybe<FilterTypeInput>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    news_from_date?: InputMaybe<FilterTypeInput>;
    /** The end date for new product listings. */
    news_to_date?: InputMaybe<FilterTypeInput>;
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: InputMaybe<FilterTypeInput>;
    /** The keyword required to perform a logical OR comparison. */
    or?: InputMaybe<ProductFilterInput>;
    /** The price of an item. */
    price?: InputMaybe<FilterTypeInput>;
    /** Indicates whether the product has required options. */
    required_options?: InputMaybe<FilterTypeInput>;
    /** A short description of the product. Its use depends on the theme. */
    short_description?: InputMaybe<FilterTypeInput>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: InputMaybe<FilterTypeInput>;
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: InputMaybe<FilterTypeInput>;
    /** The label assigned to a product's small image. */
    small_image_label?: InputMaybe<FilterTypeInput>;
    /** The beginning date that a product has a special price. */
    special_from_date?: InputMaybe<FilterTypeInput>;
    /** The discounted price of the product. Do not include the currency code. */
    special_price?: InputMaybe<FilterTypeInput>;
    /** The end date that a product has a special price. */
    special_to_date?: InputMaybe<FilterTypeInput>;
    /** The file name of a swatch image. */
    swatch_image?: InputMaybe<FilterTypeInput>;
    /** The relative path to the product's thumbnail image. */
    thumbnail?: InputMaybe<FilterTypeInput>;
    /** The label assigned to a product's thumbnail image. */
    thumbnail_label?: InputMaybe<FilterTypeInput>;
    /** The price when tier pricing is in effect and the items purchased threshold has been reached. */
    tier_price?: InputMaybe<FilterTypeInput>;
    /** The timestamp indicating when the product was updated. */
    updated_at?: InputMaybe<FilterTypeInput>;
    /** The part of the URL that identifies the product */
    url_key?: InputMaybe<FilterTypeInput>;
    url_path?: InputMaybe<FilterTypeInput>;
    /** The weight of the item, in units defined by the store. */
    weight?: InputMaybe<FilterTypeInput>;
};
/** Contains product image information, including the image URL and label. */
export type ProductImage = MediaGalleryInterface & {
    __typename?: 'ProductImage';
    /** Indicates whether the image is hidden from view. */
    disabled?: Maybe<Scalars['Boolean']['output']>;
    /** The label of the product image or video. */
    label?: Maybe<Scalars['String']['output']>;
    /** The media item's position after it has been sorted. */
    position?: Maybe<Scalars['Int']['output']>;
    /** The URL of the product image or video. */
    url?: Maybe<Scalars['String']['output']>;
};
export declare enum ProductImageThumbnail {
    /** Use thumbnail of product as image. */
    Itself = "ITSELF",
    /** Use thumbnail of product's parent as image. */
    Parent = "PARENT"
}
/** Product Information used for Pickup Locations search. */
export type ProductInfoInput = {
    /** Product SKU. */
    sku: Scalars['String']['input'];
};
/** Contains fields that are common to all types of products. */
export type ProductInterface = {
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_announcement_date?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_brand?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_custom_engraving_text?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_detailed_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_pagebuilder_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_gemstone_addon?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_recyclable_material?: Maybe<Scalars['Int']['output']>;
    /**
     * The attribute set assigned to the product.
     * @deprecated The field should not be used on the storefront.
     */
    attribute_set_id?: Maybe<Scalars['Int']['output']>;
    /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
    canonical_url?: Maybe<Scalars['String']['output']>;
    /** The categories assigned to a product. */
    categories?: Maybe<Array<Maybe<CategoryInterface>>>;
    /** @deprecated Use the `custom_attributes` field instead. */
    color?: Maybe<Scalars['Int']['output']>;
    /** The product's country of origin. */
    country_of_manufacture?: Maybe<Scalars['String']['output']>;
    /**
     * Timestamp indicating when the product was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: Maybe<Scalars['String']['output']>;
    /** An array of cross-sell products. */
    crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** Product custom attributes. */
    custom_attributesV2?: Maybe<ProductCustomAttributes>;
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: Maybe<ComplexTextValue>;
    /** @deprecated Use the `custom_attributes` field instead. */
    description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_color?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_material?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_size?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_style?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    format?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    has_video?: Maybe<Scalars['Int']['output']>;
    /**
     * The ID number assigned to the product.
     * @deprecated Use the `uid` field instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** The relative path to the main image on the product page. */
    image?: Maybe<ProductImage>;
    /** Indicates whether the product can be returned. */
    is_returnable?: Maybe<Scalars['String']['output']>;
    /**
     * A number representing the product's manufacturer.
     * @deprecated Use the `custom_attributes` field instead.
     */
    manufacturer?: Maybe<Scalars['Int']['output']>;
    /** An array of media gallery objects. */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use `media_gallery` instead.
     */
    media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: Maybe<Scalars['String']['output']>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: Maybe<Scalars['String']['output']>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: Maybe<Scalars['String']['output']>;
    /** The product name. Customers use this name to identify the product. */
    name?: Maybe<Scalars['String']['output']>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    new_from_date?: Maybe<Scalars['String']['output']>;
    /** The end date for new product listings. */
    new_to_date?: Maybe<Scalars['String']['output']>;
    /** Product stock only x left count */
    only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: Maybe<Scalars['String']['output']>;
    /**
     * Indicates the price of an item.
     * @deprecated Use `price_range` for product price information.
     */
    price?: Maybe<ProductPrices>;
    /** The range of prices for the product */
    price_range: PriceRange;
    /** An array of `TierPrice` objects. */
    price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
    /** An array of `ProductLinks` objects. */
    product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
    /** The average of all the ratings given to the product. */
    rating_summary: Scalars['Float']['output'];
    /** An array of related products. */
    related_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The total count of all the reviews given to the product. */
    review_count: Scalars['Int']['output'];
    /** The list of products reviews. */
    reviews: ProductReviews;
    /** A short description of the product. Its use depends on the theme. */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: Maybe<ProductImage>;
    /**
     * The beginning date that a product has a special price.
     * @deprecated The field should not be used on the storefront.
     */
    special_from_date?: Maybe<Scalars['String']['output']>;
    /** The discounted price of the product. */
    special_price?: Maybe<Scalars['Float']['output']>;
    /** The end date for a product with a special price. */
    special_to_date?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the product is staged for a future campaign. */
    staged: Scalars['Boolean']['output'];
    /** Stock status of the product */
    stock_status?: Maybe<ProductStockStatus>;
    /** The file name of a swatch image. */
    swatch_image?: Maybe<Scalars['String']['output']>;
    /** The relative path to the product's thumbnail image. */
    thumbnail?: Maybe<ProductImage>;
    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_price?: Maybe<Scalars['Float']['output']>;
    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use `__typename` instead.
     */
    type_id?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `ProductInterface` object. */
    uid: Scalars['ID']['output'];
    /**
     * Timestamp indicating when the product was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** An array of up-sell products. */
    upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The part of the URL that identifies the product */
    url_key?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use product's `canonical_url` or url rewrites instead */
    url_path?: Maybe<Scalars['String']['output']>;
    /** URL rewrites list */
    url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
    /** The part of the product URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    video_file?: Maybe<Scalars['String']['output']>;
    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Maybe<Array<Maybe<Website>>>;
};
/** Contains fields that are common to all types of products. */
export type ProductInterfaceCustom_AttributesV2Args = {
    filters?: InputMaybe<AttributeFilterInput>;
};
/** Contains fields that are common to all types of products. */
export type ProductInterfaceReviewsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** An implementation of `ProductLinksInterface`. */
export type ProductLinks = ProductLinksInterface & {
    __typename?: 'ProductLinks';
    /** One of related, associated, upsell, or crosssell. */
    link_type?: Maybe<Scalars['String']['output']>;
    /** The SKU of the linked product. */
    linked_product_sku?: Maybe<Scalars['String']['output']>;
    /** The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable). */
    linked_product_type?: Maybe<Scalars['String']['output']>;
    /** The position within the list of product links. */
    position?: Maybe<Scalars['Int']['output']>;
    /** The identifier of the linked product. */
    sku?: Maybe<Scalars['String']['output']>;
};
/** Contains information about linked products, including the link type and product type of each item. */
export type ProductLinksInterface = {
    /** One of related, associated, upsell, or crosssell. */
    link_type?: Maybe<Scalars['String']['output']>;
    /** The SKU of the linked product. */
    linked_product_sku?: Maybe<Scalars['String']['output']>;
    /** The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable). */
    linked_product_type?: Maybe<Scalars['String']['output']>;
    /** The position within the list of product links. */
    position?: Maybe<Scalars['Int']['output']>;
    /** The identifier of the linked product. */
    sku?: Maybe<Scalars['String']['output']>;
};
/** Contains an image in base64 format and basic information about the image. */
export type ProductMediaGalleryEntriesContent = {
    __typename?: 'ProductMediaGalleryEntriesContent';
    /** The image in base64 format. */
    base64_encoded_data?: Maybe<Scalars['String']['output']>;
    /** The file name of the image. */
    name?: Maybe<Scalars['String']['output']>;
    /** The MIME type of the file, such as image/png. */
    type?: Maybe<Scalars['String']['output']>;
};
/** Contains a link to a video file and basic information about the video. */
export type ProductMediaGalleryEntriesVideoContent = {
    __typename?: 'ProductMediaGalleryEntriesVideoContent';
    /** Must be external-video. */
    media_type?: Maybe<Scalars['String']['output']>;
    /** A description of the video. */
    video_description?: Maybe<Scalars['String']['output']>;
    /** Optional data about the video. */
    video_metadata?: Maybe<Scalars['String']['output']>;
    /** Describes the video source. */
    video_provider?: Maybe<Scalars['String']['output']>;
    /** The title of the video. */
    video_title?: Maybe<Scalars['String']['output']>;
    /** The URL to the video. */
    video_url?: Maybe<Scalars['String']['output']>;
};
/** Represents a product price. */
export type ProductPrice = {
    __typename?: 'ProductPrice';
    /** The price discount. Represents the difference between the regular and final price. */
    discount?: Maybe<ProductDiscount>;
    /** The final price of the product after applying discounts. */
    final_price: Money;
    /** An array of the multiple Fixed Product Taxes that can be applied to a product price. */
    fixed_product_taxes?: Maybe<Array<Maybe<FixedProductTax>>>;
    /** The regular price of the product. */
    regular_price: Money;
};
/** Deprecated. Use `PriceRange` instead. Contains the regular price of an item, as well as its minimum and maximum prices. Only composite products, which include bundle, configurable, and grouped products, can contain a minimum and maximum price. */
export type ProductPrices = {
    __typename?: 'ProductPrices';
    /**
     * The highest possible final price for all the options defined within a composite product. If you are specifying a price range, this would be the `to` value.
     * @deprecated Use `PriceRange.maximum_price` instead.
     */
    maximalPrice?: Maybe<Price>;
    /**
     * The lowest possible final price for all the options defined within a composite product. If you are specifying a price range, this would be the `from` value.
     * @deprecated Use `PriceRange.minimum_price` instead.
     */
    minimalPrice?: Maybe<Price>;
    /**
     * The base price of a product.
     * @deprecated Use `regular_price` from `PriceRange.minimum_price` or `PriceRange.maximum_price` instead.
     */
    regularPrice?: Maybe<Price>;
};
/** Contains details of a product review. */
export type ProductReview = {
    __typename?: 'ProductReview';
    /** The average of all ratings for this product. */
    average_rating: Scalars['Float']['output'];
    /** The date the review was created. */
    created_at: Scalars['String']['output'];
    /** The customer's nickname. Defaults to the customer name, if logged in. */
    nickname: Scalars['String']['output'];
    /** The reviewed product. */
    product: ProductInterface;
    /** An array of ratings by rating category, such as quality, price, and value. */
    ratings_breakdown: Array<Maybe<ProductReviewRating>>;
    /** The summary (title) of the review. */
    summary: Scalars['String']['output'];
    /** The review text. */
    text: Scalars['String']['output'];
};
/** Contains data about a single aspect of a product review. */
export type ProductReviewRating = {
    __typename?: 'ProductReviewRating';
    /** The label assigned to an aspect of a product that is being rated, such as quality or price. */
    name: Scalars['String']['output'];
    /** The rating value given by customer. By default, possible values range from 1 to 5. */
    value: Scalars['String']['output'];
};
/** Contains the reviewer's rating for a single aspect of a review. */
export type ProductReviewRatingInput = {
    /** An encoded rating ID. */
    id: Scalars['String']['input'];
    /** An encoded rating value ID. */
    value_id: Scalars['String']['input'];
};
/** Contains details about a single aspect of a product review. */
export type ProductReviewRatingMetadata = {
    __typename?: 'ProductReviewRatingMetadata';
    /** An encoded rating ID. */
    id: Scalars['String']['output'];
    /** The label assigned to an aspect of a product that is being rated, such as quality or price. */
    name: Scalars['String']['output'];
    /** List of product review ratings sorted by position. */
    values: Array<Maybe<ProductReviewRatingValueMetadata>>;
};
/** Contains details about a single value in a product review. */
export type ProductReviewRatingValueMetadata = {
    __typename?: 'ProductReviewRatingValueMetadata';
    /** A ratings scale, such as the number of stars awarded. */
    value: Scalars['String']['output'];
    /** An encoded rating value ID. */
    value_id: Scalars['String']['output'];
};
/** Contains an array of metadata about each aspect of a product review. */
export type ProductReviewRatingsMetadata = {
    __typename?: 'ProductReviewRatingsMetadata';
    /** An array of product reviews sorted by position. */
    items: Array<Maybe<ProductReviewRatingMetadata>>;
};
/** Contains an array of product reviews. */
export type ProductReviews = {
    __typename?: 'ProductReviews';
    /** An array of product reviews. */
    items: Array<Maybe<ProductReview>>;
    /** Metadata for pagination rendering. */
    page_info: SearchResultPageInfo;
};
/** Deprecated. Use `ProductAttributeSortInput` instead. Specifies the attribute to use for sorting search results and indicates whether the results are sorted in ascending or descending order. */
export type ProductSortInput = {
    /** The product's country of origin. */
    country_of_manufacture?: InputMaybe<SortEnum>;
    /** The timestamp indicating when the product was created. */
    created_at?: InputMaybe<SortEnum>;
    /** The name of a custom layout. */
    custom_layout?: InputMaybe<SortEnum>;
    /** XML code that is applied as a layout update to the product page. */
    custom_layout_update?: InputMaybe<SortEnum>;
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: InputMaybe<SortEnum>;
    /** Indicates whether a gift message is available. */
    gift_message_available?: InputMaybe<SortEnum>;
    /** Indicates whether additional attributes have been created for the product. */
    has_options?: InputMaybe<SortEnum>;
    /** The relative path to the main image on the product page. */
    image?: InputMaybe<SortEnum>;
    /** The label assigned to a product image. */
    image_label?: InputMaybe<SortEnum>;
    /** Indicates whether the product can be returned. */
    is_returnable?: InputMaybe<SortEnum>;
    /** A number representing the product's manufacturer. */
    manufacturer?: InputMaybe<SortEnum>;
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: InputMaybe<SortEnum>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: InputMaybe<SortEnum>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: InputMaybe<SortEnum>;
    /** The product name. Customers use this name to identify the product. */
    name?: InputMaybe<SortEnum>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    news_from_date?: InputMaybe<SortEnum>;
    /** The end date for new product listings. */
    news_to_date?: InputMaybe<SortEnum>;
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: InputMaybe<SortEnum>;
    /** The price of the item. */
    price?: InputMaybe<SortEnum>;
    /** Indicates whether the product has required options. */
    required_options?: InputMaybe<SortEnum>;
    /** A short description of the product. Its use depends on the theme. */
    short_description?: InputMaybe<SortEnum>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: InputMaybe<SortEnum>;
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: InputMaybe<SortEnum>;
    /** The label assigned to a product's small image. */
    small_image_label?: InputMaybe<SortEnum>;
    /** The beginning date that a product has a special price. */
    special_from_date?: InputMaybe<SortEnum>;
    /** The discounted price of the product. */
    special_price?: InputMaybe<SortEnum>;
    /** The end date that a product has a special price. */
    special_to_date?: InputMaybe<SortEnum>;
    /** Indicates the criteria to sort swatches. */
    swatch_image?: InputMaybe<SortEnum>;
    /** The relative path to the product's thumbnail image. */
    thumbnail?: InputMaybe<SortEnum>;
    /** The label assigned to a product's thumbnail image. */
    thumbnail_label?: InputMaybe<SortEnum>;
    /** The price when tier pricing is in effect and the items purchased threshold has been reached. */
    tier_price?: InputMaybe<SortEnum>;
    /** The timestamp indicating when the product was updated. */
    updated_at?: InputMaybe<SortEnum>;
    /** The part of the URL that identifies the product */
    url_key?: InputMaybe<SortEnum>;
    url_path?: InputMaybe<SortEnum>;
    /** The weight of the item, in units defined by the store. */
    weight?: InputMaybe<SortEnum>;
};
/** This enumeration states whether a product stock status is in stock or out of stock */
export declare enum ProductStockStatus {
    InStock = "IN_STOCK",
    OutOfStock = "OUT_OF_STOCK"
}
/** Deprecated. Use `TierPrice` instead. Defines a tier price, which is a quantity discount offered to a specific customer group. */
export type ProductTierPrices = {
    __typename?: 'ProductTierPrices';
    /**
     * The ID of the customer group.
     * @deprecated Not relevant for the storefront.
     */
    customer_group_id?: Maybe<Scalars['String']['output']>;
    /**
     * The percentage discount of the item.
     * @deprecated Use `TierPrice.discount` instead.
     */
    percentage_value?: Maybe<Scalars['Float']['output']>;
    /**
     * The number of items that must be purchased to qualify for tier pricing.
     * @deprecated Use `TierPrice.quantity` instead.
     */
    qty?: Maybe<Scalars['Float']['output']>;
    /**
     * The price of the fixed price item.
     * @deprecated Use `TierPrice.final_price` instead.
     */
    value?: Maybe<Scalars['Float']['output']>;
    /**
     * The ID assigned to the website.
     * @deprecated Not relevant for the storefront.
     */
    website_id?: Maybe<Scalars['Float']['output']>;
};
/** Contains information about a product video. */
export type ProductVideo = MediaGalleryInterface & {
    __typename?: 'ProductVideo';
    /** Indicates whether the image is hidden from view. */
    disabled?: Maybe<Scalars['Boolean']['output']>;
    /** The label of the product image or video. */
    label?: Maybe<Scalars['String']['output']>;
    /** The media item's position after it has been sorted. */
    position?: Maybe<Scalars['Int']['output']>;
    /** The URL of the product image or video. */
    url?: Maybe<Scalars['String']['output']>;
    /** Contains a `ProductMediaGalleryEntriesVideoContent` object. */
    video_content?: Maybe<ProductMediaGalleryEntriesVideoContent>;
};
/** Contains the results of a `products` query. */
export type Products = {
    __typename?: 'Products';
    /** A bucket that contains the attribute code and label for each filterable option. */
    aggregations?: Maybe<Array<Maybe<Aggregation>>>;
    /**
     * Layered navigation filters array.
     * @deprecated Use `aggregations` instead.
     */
    filters?: Maybe<Array<Maybe<LayerFilter>>>;
    /** An array of products that match the specified search criteria. */
    items?: Maybe<Array<Maybe<ProductInterface>>>;
    /** An object that includes the page_info and currentPage values specified in the query. */
    page_info?: Maybe<SearchResultPageInfo>;
    /** An object that includes the default sort field and all available sort fields. */
    sort_fields?: Maybe<SortFields>;
    /** An array of search suggestions for case when search query have no results. */
    suggestions?: Maybe<Array<Maybe<SearchSuggestion>>>;
    /** The number of products that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
    total_count?: Maybe<Scalars['Int']['output']>;
};
/** Contains the results of a `products` query. */
export type ProductsAggregationsArgs = {
    filter?: InputMaybe<AggregationsFilterInput>;
};
export type PutV1CustomersPassword_Request_Input = {
    email: Scalars['String']['input'];
    template: Scalars['String']['input'];
    websiteId?: InputMaybe<Scalars['Int']['input']>;
};
export type PutV1CustomersPassword_Response = Boolean_Container | Error_Response;
export type PutV1GuestcartsCartIdCollecttotals_Request_Input = {
    additionalData?: InputMaybe<Quote_Data_Totals_Additional_Data_Interface_Input>;
    paymentMethod: Quote_Data_Payment_Interface_Input;
    /** The carrier code. */
    shippingCarrierCode?: InputMaybe<Scalars['String']['input']>;
    /** The shipping method code. */
    shippingMethodCode?: InputMaybe<Scalars['String']['input']>;
};
export type PutV1GuestcartsCartIdCollecttotals_Response = Error_Response | Quote_Data_Totals_Interface;
export type PutV1GuestcartsCartIdCouponsCouponCode_Response = Boolean_Container | Error_Response;
export type PutV1GuestcartsCartIdItemsItemId_Request_Input = {
    cartItem: Quote_Data_Cart_Item_Interface_Input;
};
export type PutV1GuestcartsCartIdItemsItemId_Response = Error_Response | Quote_Data_Cart_Item_Interface;
export type PutV1GuestcartsCartIdOrder_Request_Input = {
    paymentMethod?: InputMaybe<Quote_Data_Payment_Interface_Input>;
};
export type PutV1GuestcartsCartIdOrder_Response = Int_Container | Error_Response;
export type PutV1GuestcartsCartIdSelectedpaymentmethod_Request_Input = {
    method: Quote_Data_Payment_Interface_Input;
};
export type PutV1GuestcartsCartIdSelectedpaymentmethod_Response = Int_Container | Error_Response;
export type Query = {
    __typename?: 'Query';
    /** Returns details required to be able to submit a payment with apple pay. */
    GetV1ApplepayAuth?: Maybe<GetV1ApplepayAuth_Response>;
    /** Check gift card balance if added to the cart. */
    GetV1CartsGuestcartsCartIdCheckGiftCardGiftCardCode?: Maybe<GetV1CartsGuestcartsCartIdCheckGiftCardGiftCardCode_Response>;
    /** Check if password reset token is valid. */
    GetV1CustomersCustomerIdPasswordResetLinkTokenResetPasswordLinkToken?: Maybe<GetV1CustomersCustomerIdPasswordResetLinkTokenResetPasswordLinkToken_Response>;
    /** Get all countries and regions information for the store. */
    GetV1DirectoryCountries?: Maybe<Array<Maybe<GetV1DirectoryCountries_Response>>>;
    /** Get country and region information for the store. */
    GetV1DirectoryCountriesCountryId?: Maybe<GetV1DirectoryCountriesCountryId_Response>;
    /** Get currency information for the store. */
    GetV1DirectoryCurrency?: Maybe<GetV1DirectoryCurrency_Response>;
    /** Enable a guest user to return information for a specified cart. */
    GetV1GuestcartsCartId?: Maybe<GetV1GuestcartsCartId_Response>;
    /** Return the billing address for a specified quote. */
    GetV1GuestcartsCartIdBillingaddress?: Maybe<GetV1GuestcartsCartIdBillingaddress_Response>;
    /** Return information for a coupon in a specified cart. */
    GetV1GuestcartsCartIdCoupons?: Maybe<GetV1GuestcartsCartIdCoupons_Response>;
    /** Return the gift message for a specified order. */
    GetV1GuestcartsCartIdGiftmessage?: Maybe<GetV1GuestcartsCartIdGiftmessage_Response>;
    /** Return the gift message for a specified item in a specified shopping cart. */
    GetV1GuestcartsCartIdGiftmessageItemId?: Maybe<GetV1GuestcartsCartIdGiftmessageItemId_Response>;
    /** List items that are assigned to a specified cart. */
    GetV1GuestcartsCartIdItems?: Maybe<Array<Maybe<GetV1GuestcartsCartIdItems_Response>>>;
    /** Get payment information */
    GetV1GuestcartsCartIdPaymentinformation?: Maybe<GetV1GuestcartsCartIdPaymentinformation_Response>;
    /** List available payment methods for a specified shopping cart. This call returns an array of objects, but detailed information about each object’s attributes might not be included.  See https://developer.adobe.com/commerce/webapi/rest/attributes#GuestPaymentMethodManagementInterface to determine which call to use to get detailed information about all attributes for an object. */
    GetV1GuestcartsCartIdPaymentmethods?: Maybe<Array<Maybe<GetV1GuestcartsCartIdPaymentmethods_Response>>>;
    /** Get payment order for guest customer */
    GetV1GuestcartsCartIdPaymentorderId?: Maybe<GetV1GuestcartsCartIdPaymentorderId_Response>;
    /** Return the payment method for a specified shopping cart. */
    GetV1GuestcartsCartIdSelectedpaymentmethod?: Maybe<GetV1GuestcartsCartIdSelectedpaymentmethod_Response>;
    /** List applicable shipping methods for a specified quote. */
    GetV1GuestcartsCartIdShippingmethods?: Maybe<Array<Maybe<GetV1GuestcartsCartIdShippingmethods_Response>>>;
    /** Return quote totals data for a specified cart. */
    GetV1GuestcartsCartIdTotals?: Maybe<GetV1GuestcartsCartIdTotals_Response>;
    /** Get Pickup Locations according to the results of filtration by Search Request. */
    GetV1InventoryInstorepickupPickuplocations?: Maybe<GetV1InventoryInstorepickupPickuplocations_Response>;
    /** Get Apple Pay Config. */
    GetV1PaymentsconfigApplepayLocation?: Maybe<GetV1PaymentsconfigApplepayLocation_Response>;
    /** Get Google Pay Config. */
    GetV1PaymentsconfigGooglepayLocation?: Maybe<GetV1PaymentsconfigGooglepayLocation_Response>;
    /** Get Hosted Fields Config. */
    GetV1PaymentsconfigHostedfieldsLocation?: Maybe<GetV1PaymentsconfigHostedfieldsLocation_Response>;
    /** Get Config. */
    GetV1PaymentsconfigLocation?: Maybe<GetV1PaymentsconfigLocation_Response>;
    /** Get Smart Buttons Config. */
    GetV1PaymentsconfigSmartbuttonsLocation?: Maybe<GetV1PaymentsconfigSmartbuttonsLocation_Response>;
    /** Get payment sdk url by location */
    GetV1PaymentssdkLocation?: Maybe<Array<Maybe<GetV1PaymentssdkLocation_Response>>>;
    /** Get payment sdk url by location and methodCode */
    GetV1PaymentssdkLocationMethodCode?: Maybe<GetV1PaymentssdkLocationMethodCode_Response>;
    /** Collect and retrieve the list of product render info. This info contains raw prices and formatted prices, product name, stock status, store_id, etc. */
    GetV1Productsrenderinfo?: Maybe<GetV1Productsrenderinfo_Response>;
    /** Make Full Text Search and return found Documents */
    GetV1Search?: Maybe<GetV1Search_Response>;
    /** Get the providers that the user still needs to configure */
    GetV1TfaTfatproviderstoactivate?: Maybe<Array<Maybe<GetV1TfaTfatproviderstoactivate_Response>>>;
    /** Get the providers that the user is able to use for 2fa */
    GetV1TfaTfatuserproviders?: Maybe<Array<Maybe<GetV1TfaTfatuserproviders_Response>>>;
    /** Retrieve EAV attributes associated to a frontend form. Use countries query provided by DirectoryGraphQl module to retrieve region_id and country_id attribute options. */
    attributesForm: AttributesFormOutput;
    /** Returns a list of attributes metadata for a given entity type. */
    attributesList?: Maybe<AttributesMetadataOutput>;
    /** Get a list of available store views and their config information. */
    availableStores?: Maybe<Array<Maybe<StoreConfig>>>;
    /** Return information about the specified shopping cart. */
    cart?: Maybe<Cart>;
    /** Return a list of categories that match the specified filter. */
    categories?: Maybe<CategoryResult>;
    /**
     * Search for categories that match the criteria specified in the `search` and `filter` attributes.
     * @deprecated Use `categories` instead.
     */
    category?: Maybe<CategoryTree>;
    /**
     * Return an array of categories based on the specified filters.
     * @deprecated Use `categories` instead.
     */
    categoryList?: Maybe<Array<Maybe<CategoryTree>>>;
    /** Return Terms and Conditions configuration information. */
    checkoutAgreements?: Maybe<Array<Maybe<CheckoutAgreement>>>;
    /** Return information about CMS blocks. */
    cmsBlocks?: Maybe<CmsBlocks>;
    /** Return details about a CMS page. */
    cmsPage?: Maybe<CmsPage>;
    /** Return products that have been added to the specified compare list. */
    compareList?: Maybe<CompareList>;
    /** The countries query provides information for all countries. */
    countries?: Maybe<Array<Maybe<Country>>>;
    /** The countries query provides information for a single country. */
    country?: Maybe<Country>;
    /** Return information about the store's currency. */
    currency?: Maybe<Currency>;
    /**
     * Return the attribute type, given an attribute code and entity type.
     * @deprecated Use `customAttributeMetadataV2` query instead.
     */
    customAttributeMetadata?: Maybe<CustomAttributeMetadata>;
    /** Retrieve EAV attributes metadata. */
    customAttributeMetadataV2: AttributesMetadataOutput;
    /** Return detailed information about a customer account. */
    customer?: Maybe<Customer>;
    /** Return information about the customer's shopping cart. */
    customerCart: Cart;
    /** Return a list of downloadable products the customer has purchased. */
    customerDownloadableProducts?: Maybe<CustomerDownloadableProducts>;
    /** @deprecated Use the `customer` query instead. */
    customerOrders?: Maybe<CustomerOrders>;
    /** Return a list of customer payment tokens stored in the vault. */
    customerPaymentTokens?: Maybe<CustomerPaymentTokens>;
    /** Return a list of dynamic blocks filtered by type, location, or UIDs. */
    dynamicBlocks: DynamicBlocks;
    /** Retrieve the secure PayPal URL for a Payments Pro Hosted Solution transaction. */
    getHostedProUrl?: Maybe<HostedProUrl>;
    /** Retrieve payment credentials for a transaction. Use this query for Payflow Link and Payments Advanced payment methods. */
    getPayflowLinkToken?: Maybe<PayflowLinkToken>;
    /** Retrieves the payment configuration for a given location */
    getPaymentConfig?: Maybe<PaymentConfigOutput>;
    /** Retrieves the payment details for the order */
    getPaymentOrder?: Maybe<PaymentOrderOutput>;
    /** Gets the payment SDK urls and values */
    getPaymentSDK?: Maybe<GetPaymentSdkOutput>;
    /** Return details about a specific gift card. */
    giftCardAccount?: Maybe<GiftCardAccount>;
    /** Return the specified gift registry. Some details will not be available to guests. */
    giftRegistry?: Maybe<GiftRegistry>;
    /** Search for gift registries by specifying a registrant email address. */
    giftRegistryEmailSearch?: Maybe<Array<Maybe<GiftRegistrySearchResult>>>;
    /** Search for gift registries by specifying a registry URL key. */
    giftRegistryIdSearch?: Maybe<Array<Maybe<GiftRegistrySearchResult>>>;
    /** Search for gift registries by specifying the registrant name and registry type ID. */
    giftRegistryTypeSearch?: Maybe<Array<Maybe<GiftRegistrySearchResult>>>;
    /** Get a list of available gift registry types. */
    giftRegistryTypes?: Maybe<Array<Maybe<GiftRegistryType>>>;
    /** Retrieve guest order details based on number, email and postcode. */
    guestOrder: CustomerOrder;
    /** Retrieve guest order details based on token. */
    guestOrderByToken: CustomerOrder;
    /** Check whether the specified email has already been used to create a customer account. */
    isEmailAvailable?: Maybe<IsEmailAvailableOutput>;
    /** The pickup locations query searches for locations that match the search request requirements. */
    pickupLocations?: Maybe<PickupLocations>;
    /** Return the active ratings attributes and the values each rating can have. */
    productReviewRatingsMetadata: ProductReviewRatingsMetadata;
    /** Search for products that match the criteria specified in the `search` and `filter` attributes. */
    products?: Maybe<Products>;
    recaptchaFormConfig?: Maybe<ReCaptchaConfigOutput>;
    /** Returns details about Google reCAPTCHA V3-Invisible configuration. */
    recaptchaV3Config?: Maybe<ReCaptchaConfigurationV3>;
    /** Return the full details for a specified product, category, or CMS page. */
    route?: Maybe<RoutableInterface>;
    /** Return details about the store's configuration. */
    storeConfig?: Maybe<StoreConfig>;
    /**
     * Return the relative URL for a specified product, category or CMS page.
     * @deprecated Use the `route` query instead.
     */
    urlResolver?: Maybe<EntityUrl>;
    /**
     * Return the contents of a customer's wish list.
     * @deprecated Moved under `Customer.wishlist`.
     */
    wishlist?: Maybe<WishlistOutput>;
};
export type QueryGetV1CartsGuestcartsCartIdCheckGiftCardGiftCardCodeArgs = {
    cartId: Scalars['String']['input'];
    giftCardCode: Scalars['String']['input'];
};
export type QueryGetV1CustomersCustomerIdPasswordResetLinkTokenResetPasswordLinkTokenArgs = {
    customerId: Scalars['Int']['input'];
    resetPasswordLinkToken: Scalars['String']['input'];
};
export type QueryGetV1DirectoryCountriesCountryIdArgs = {
    countryId: Scalars['String']['input'];
};
export type QueryGetV1GuestcartsCartIdArgs = {
    cartId: Scalars['String']['input'];
};
export type QueryGetV1GuestcartsCartIdBillingaddressArgs = {
    cartId: Scalars['String']['input'];
};
export type QueryGetV1GuestcartsCartIdCouponsArgs = {
    cartId: Scalars['String']['input'];
};
export type QueryGetV1GuestcartsCartIdGiftmessageArgs = {
    cartId: Scalars['String']['input'];
};
export type QueryGetV1GuestcartsCartIdGiftmessageItemIdArgs = {
    cartId: Scalars['String']['input'];
    itemId: Scalars['Int']['input'];
};
export type QueryGetV1GuestcartsCartIdItemsArgs = {
    cartId: Scalars['String']['input'];
};
export type QueryGetV1GuestcartsCartIdPaymentinformationArgs = {
    cartId: Scalars['String']['input'];
};
export type QueryGetV1GuestcartsCartIdPaymentmethodsArgs = {
    cartId: Scalars['String']['input'];
};
export type QueryGetV1GuestcartsCartIdPaymentorderIdArgs = {
    cartId: Scalars['String']['input'];
    id: Scalars['String']['input'];
};
export type QueryGetV1GuestcartsCartIdSelectedpaymentmethodArgs = {
    cartId: Scalars['String']['input'];
};
export type QueryGetV1GuestcartsCartIdShippingmethodsArgs = {
    cartId: Scalars['String']['input'];
};
export type QueryGetV1GuestcartsCartIdTotalsArgs = {
    cartId: Scalars['String']['input'];
};
export type QueryGetV1InventoryInstorepickupPickuplocationsArgs = {
    searchRequest_LEFT_SQUARE_BRACE_area_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_radius_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['Int']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_area_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_searchTerm_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_currentPage_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['Int']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_extensionAttributes_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_productsInfo_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_sku_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_city_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_conditionType_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_city_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_value_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_country_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_conditionType_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_country_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_value_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_name_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_conditionType_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_name_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_value_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_pickupLocationCode_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_conditionType_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_pickupLocationCode_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_value_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_postcode_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_conditionType_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_postcode_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_value_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_regionId_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_conditionType_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_regionId_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_value_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_region_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_conditionType_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_region_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_value_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_street_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_conditionType_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_street_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_value_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_pageSize_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['Int']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_scopeCode_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_scopeType_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_sort_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_direction_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchRequest_LEFT_SQUARE_BRACE_sort_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_field_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
};
export type QueryGetV1PaymentsconfigApplepayLocationArgs = {
    location: Scalars['String']['input'];
};
export type QueryGetV1PaymentsconfigGooglepayLocationArgs = {
    location: Scalars['String']['input'];
};
export type QueryGetV1PaymentsconfigHostedfieldsLocationArgs = {
    location: Scalars['String']['input'];
};
export type QueryGetV1PaymentsconfigLocationArgs = {
    location: Scalars['String']['input'];
};
export type QueryGetV1PaymentsconfigSmartbuttonsLocationArgs = {
    location: Scalars['String']['input'];
};
export type QueryGetV1PaymentssdkLocationArgs = {
    location: Scalars['String']['input'];
};
export type QueryGetV1PaymentssdkLocationMethodCodeArgs = {
    location: Scalars['String']['input'];
    methodCode: Scalars['String']['input'];
};
export type QueryGetV1ProductsrenderinfoArgs = {
    currencyCode: Scalars['String']['input'];
    searchCriteria_LEFT_SQUARE_BRACE_currentPage_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['Int']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_filterGroups_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_conditionType_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_filterGroups_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_field_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_filterGroups_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_value_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_pageSize_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['Int']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_sortOrders_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_direction_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_sortOrders_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_field_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    storeId: Scalars['Int']['input'];
};
export type QueryGetV1SearchArgs = {
    searchCriteria_LEFT_SQUARE_BRACE_currentPage_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['Int']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_filterGroups_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_conditionType_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_filterGroups_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_field_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_filterGroups_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_filters_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_value_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_pageSize_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['Int']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_requestName_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_sortOrders_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_direction_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
    searchCriteria_LEFT_SQUARE_BRACE_sortOrders_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_0_RIGHT_SQUARE_BRACE__LEFT_SQUARE_BRACE_field_RIGHT_SQUARE_BRACE_?: InputMaybe<Scalars['String']['input']>;
};
export type QueryGetV1TfaTfatproviderstoactivateArgs = {
    tfaToken: Scalars['String']['input'];
};
export type QueryGetV1TfaTfatuserprovidersArgs = {
    tfaToken: Scalars['String']['input'];
};
export type QueryAttributesFormArgs = {
    formCode: Scalars['String']['input'];
};
export type QueryAttributesListArgs = {
    entityType: AttributeEntityTypeEnum;
    filters?: InputMaybe<AttributeFilterInput>;
};
export type QueryAvailableStoresArgs = {
    useCurrentGroup?: InputMaybe<Scalars['Boolean']['input']>;
};
export type QueryCartArgs = {
    cart_id: Scalars['String']['input'];
};
export type QueryCategoriesArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    filters?: InputMaybe<CategoryFilterInput>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
export type QueryCategoryArgs = {
    id?: InputMaybe<Scalars['Int']['input']>;
};
export type QueryCategoryListArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    filters?: InputMaybe<CategoryFilterInput>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
export type QueryCmsBlocksArgs = {
    identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};
export type QueryCmsPageArgs = {
    id?: InputMaybe<Scalars['Int']['input']>;
    identifier?: InputMaybe<Scalars['String']['input']>;
};
export type QueryCompareListArgs = {
    uid: Scalars['ID']['input'];
};
export type QueryCountryArgs = {
    id?: InputMaybe<Scalars['String']['input']>;
};
export type QueryCustomAttributeMetadataArgs = {
    attributes: Array<AttributeInput>;
};
export type QueryCustomAttributeMetadataV2Args = {
    attributes?: InputMaybe<Array<AttributeInput>>;
};
export type QueryDynamicBlocksArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    input?: InputMaybe<DynamicBlocksFilterInput>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
export type QueryGetHostedProUrlArgs = {
    input: HostedProUrlInput;
};
export type QueryGetPayflowLinkTokenArgs = {
    input: PayflowLinkTokenInput;
};
export type QueryGetPaymentConfigArgs = {
    location: PaymentLocation;
};
export type QueryGetPaymentOrderArgs = {
    cartId: Scalars['String']['input'];
    id: Scalars['String']['input'];
};
export type QueryGetPaymentSdkArgs = {
    location: PaymentLocation;
};
export type QueryGiftCardAccountArgs = {
    input: GiftCardAccountInput;
};
export type QueryGiftRegistryArgs = {
    giftRegistryUid: Scalars['ID']['input'];
};
export type QueryGiftRegistryEmailSearchArgs = {
    email: Scalars['String']['input'];
};
export type QueryGiftRegistryIdSearchArgs = {
    giftRegistryUid: Scalars['ID']['input'];
};
export type QueryGiftRegistryTypeSearchArgs = {
    firstName: Scalars['String']['input'];
    giftRegistryTypeUid?: InputMaybe<Scalars['ID']['input']>;
    lastName: Scalars['String']['input'];
};
export type QueryGuestOrderArgs = {
    input: OrderInformationInput;
};
export type QueryGuestOrderByTokenArgs = {
    input: OrderTokenInput;
};
export type QueryIsEmailAvailableArgs = {
    email: Scalars['String']['input'];
};
export type QueryPickupLocationsArgs = {
    area?: InputMaybe<AreaInput>;
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    filters?: InputMaybe<PickupLocationFilterInput>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
    productsInfo?: InputMaybe<Array<InputMaybe<ProductInfoInput>>>;
    sort?: InputMaybe<PickupLocationSortInput>;
};
export type QueryProductsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    filter?: InputMaybe<ProductAttributeFilterInput>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
    search?: InputMaybe<Scalars['String']['input']>;
    sort?: InputMaybe<ProductAttributeSortInput>;
};
export type QueryRecaptchaFormConfigArgs = {
    formType: ReCaptchaFormEnum;
};
export type QueryRouteArgs = {
    url: Scalars['String']['input'];
};
export type QueryUrlResolverArgs = {
    url: Scalars['String']['input'];
};
/** Specifies the field to use for sorting quote items */
export type QuoteItemsSortInput = {
    /** Specifies the quote items field to sort by */
    field: SortQuoteItemsEnum;
    /** Specifies the order of quote items' sorting */
    order: SortEnum;
};
export type ReCaptchaConfigOutput = {
    __typename?: 'ReCaptchaConfigOutput';
    /** Configuration details for reCaptcha type */
    configurations?: Maybe<ReCaptchaConfiguration>;
    /** Indicates whether reCaptcha type is enabled */
    is_enabled: Scalars['Boolean']['output'];
};
/** Contains reCAPTCHA form configuration details. */
export type ReCaptchaConfiguration = {
    __typename?: 'ReCaptchaConfiguration';
    /** The position of the invisible reCAPTCHA badge on each page. */
    badge_position?: Maybe<Scalars['String']['output']>;
    /** A two-character code that specifies the language that is used for Google reCAPTCHA text and messaging. */
    language_code?: Maybe<Scalars['String']['output']>;
    /** The minimum score that identifies a user interaction as a potential risk. */
    minimum_score?: Maybe<Scalars['Float']['output']>;
    re_captcha_type: ReCaptchaTypeEmum;
    /** The message that appears when reCaptcha fails. */
    technical_failure_message: Scalars['String']['output'];
    /** Theme to be used to render reCaptcha. */
    theme: Scalars['String']['output'];
    /** The message that appears to the user if validation fails. */
    validation_failure_message: Scalars['String']['output'];
    /** The website key generated when the Google reCAPTCHA account was registered. */
    website_key: Scalars['String']['output'];
};
/** Contains reCAPTCHA V3-Invisible configuration details. */
export type ReCaptchaConfigurationV3 = {
    __typename?: 'ReCaptchaConfigurationV3';
    /** The position of the invisible reCAPTCHA badge on each page. */
    badge_position: Scalars['String']['output'];
    /** The message that appears to the user if validation fails. */
    failure_message: Scalars['String']['output'];
    /** A list of forms on the storefront that have been configured to use reCAPTCHA V3. */
    forms: Array<Maybe<ReCaptchaFormEnum>>;
    /** Return whether recaptcha is enabled or not */
    is_enabled: Scalars['Boolean']['output'];
    /** A two-character code that specifies the language that is used for Google reCAPTCHA text and messaging. */
    language_code?: Maybe<Scalars['String']['output']>;
    /** The minimum score that identifies a user interaction as a potential risk. */
    minimum_score: Scalars['Float']['output'];
    /** The website key generated when the Google reCAPTCHA account was registered. */
    website_key: Scalars['String']['output'];
};
export declare enum ReCaptchaFormEnum {
    Braintree = "BRAINTREE",
    Contact = "CONTACT",
    CustomerCreate = "CUSTOMER_CREATE",
    CustomerEdit = "CUSTOMER_EDIT",
    CustomerForgotPassword = "CUSTOMER_FORGOT_PASSWORD",
    CustomerLogin = "CUSTOMER_LOGIN",
    Newsletter = "NEWSLETTER",
    PlaceOrder = "PLACE_ORDER",
    ProductReview = "PRODUCT_REVIEW",
    Sendfriend = "SENDFRIEND"
}
export declare enum ReCaptchaTypeEmum {
    Invisible = "INVISIBLE",
    Recaptcha = "RECAPTCHA",
    RecaptchaV3 = "RECAPTCHA_V3"
}
export type Region = {
    __typename?: 'Region';
    /** The two-letter code for the region, such as TX for Texas. */
    code?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `Region` object. */
    id?: Maybe<Scalars['Int']['output']>;
    /** The name of the region, such as Texas. */
    name?: Maybe<Scalars['String']['output']>;
};
/** Specifies the cart from which to remove a coupon. */
export type RemoveCouponFromCartInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
};
/** Contains details about the cart after removing a coupon. */
export type RemoveCouponFromCartOutput = {
    __typename?: 'RemoveCouponFromCartOutput';
    /** The cart after removing a coupon. */
    cart?: Maybe<Cart>;
};
/** Remove coupons from the cart. */
export type RemoveCouponsFromCartInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** An array of coupon codes to be removed from the quote. If coupon_codes is empty all coupons will be removed from the quote. */
    coupon_codes: Array<InputMaybe<Scalars['String']['input']>>;
};
/** Defines the input required to run the `removeGiftCardFromCart` mutation. */
export type RemoveGiftCardFromCartInput = {
    /** The unique ID that identifies the customer's cart. */
    cart_id: Scalars['String']['input'];
    /** The gift card code to be removed to the cart. */
    gift_card_code: Scalars['String']['input'];
};
/** Defines the possible output for the `removeGiftCardFromCart` mutation. */
export type RemoveGiftCardFromCartOutput = {
    __typename?: 'RemoveGiftCardFromCartOutput';
    /** The contents of the specified shopping cart. */
    cart: Cart;
};
/** Contains the results of a request to remove an item from a gift registry. */
export type RemoveGiftRegistryItemsOutput = {
    __typename?: 'RemoveGiftRegistryItemsOutput';
    /** The gift registry after removing items. */
    gift_registry?: Maybe<GiftRegistry>;
};
/** Contains the results of a request to delete a gift registry. */
export type RemoveGiftRegistryOutput = {
    __typename?: 'RemoveGiftRegistryOutput';
    /** Indicates whether the gift registry was successfully deleted. */
    success: Scalars['Boolean']['output'];
};
/** Contains the results of a request to delete a registrant. */
export type RemoveGiftRegistryRegistrantsOutput = {
    __typename?: 'RemoveGiftRegistryRegistrantsOutput';
    /** The gift registry after deleting registrants. */
    gift_registry?: Maybe<GiftRegistry>;
};
/** Specifies which items to remove from the cart. */
export type RemoveItemFromCartInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** Deprecated. Use `cart_item_uid` instead. */
    cart_item_id?: InputMaybe<Scalars['Int']['input']>;
    /** Required field. The unique ID for a `CartItemInterface` object. */
    cart_item_uid?: InputMaybe<Scalars['ID']['input']>;
};
/** Contains details about the cart after removing an item. */
export type RemoveItemFromCartOutput = {
    __typename?: 'RemoveItemFromCartOutput';
    /** The cart after removing an item. */
    cart: Cart;
};
/** Defines which products to remove from a compare list. */
export type RemoveProductsFromCompareListInput = {
    /** An array of product IDs to remove from the compare list. */
    products: Array<InputMaybe<Scalars['ID']['input']>>;
    /** The unique identifier of the compare list to modify. */
    uid: Scalars['ID']['input'];
};
/** Contains the customer's wish list and any errors encountered. */
export type RemoveProductsFromWishlistOutput = {
    __typename?: 'RemoveProductsFromWishlistOutput';
    /** An array of errors encountered while deleting products from a wish list. */
    user_errors: Array<Maybe<WishListUserInputError>>;
    /** Contains the wish list with after items were successfully deleted. */
    wishlist: Wishlist;
};
/** Defines the tracking information to delete. */
export type RemoveReturnTrackingInput = {
    /** The unique ID for a `ReturnShippingTracking` object. */
    return_shipping_tracking_uid: Scalars['ID']['input'];
};
/** Contains the response after deleting tracking information. */
export type RemoveReturnTrackingOutput = {
    __typename?: 'RemoveReturnTrackingOutput';
    /** Contains details about the modified return. */
    return?: Maybe<Return>;
};
/** Contains the customer cart. */
export type RemoveRewardPointsFromCartOutput = {
    __typename?: 'RemoveRewardPointsFromCartOutput';
    /** The customer cart after reward points are removed. */
    cart: Cart;
};
/** Defines the input required to run the `removeStoreCreditFromCart` mutation. */
export type RemoveStoreCreditFromCartInput = {
    /** The unique ID that identifies the customer's cart. */
    cart_id: Scalars['String']['input'];
};
/** Defines the possible output for the `removeStoreCreditFromCart` mutation. */
export type RemoveStoreCreditFromCartOutput = {
    __typename?: 'RemoveStoreCreditFromCartOutput';
    /** The contents of the specified shopping cart. */
    cart: Cart;
};
/** Contains the cart and any errors after adding products. */
export type ReorderItemsOutput = {
    __typename?: 'ReorderItemsOutput';
    /** Detailed information about the customer's cart. */
    cart: Cart;
    /** An array of reordering errors. */
    userInputErrors: Array<Maybe<CheckoutUserInputError>>;
};
/** Contains information needed to start a return request. */
export type RequestReturnInput = {
    /** Text the buyer entered that describes the reason for the refund request. */
    comment_text?: InputMaybe<Scalars['String']['input']>;
    /** The email address the buyer enters to receive notifications about the status of the return. */
    contact_email?: InputMaybe<Scalars['String']['input']>;
    /** An array of items to be returned. */
    items: Array<InputMaybe<RequestReturnItemInput>>;
    /** The unique ID for a `Order` object. */
    order_uid: Scalars['ID']['input'];
};
/** Contains details about an item to be returned. */
export type RequestReturnItemInput = {
    /** Details about a custom attribute that was entered. */
    entered_custom_attributes?: InputMaybe<Array<InputMaybe<EnteredCustomAttributeInput>>>;
    /** The unique ID for a `OrderItemInterface` object. */
    order_item_uid: Scalars['ID']['input'];
    /** The quantity of the item to be returned. */
    quantity_to_return: Scalars['Float']['input'];
    /** An array of selected custom option IDs associated with the item to be returned. For example, the IDs for the selected color and size of a configurable product. */
    selected_custom_attributes?: InputMaybe<Array<InputMaybe<SelectedCustomAttributeInput>>>;
};
/** Contains the response to a return request. */
export type RequestReturnOutput = {
    __typename?: 'RequestReturnOutput';
    /** Details about a single return request. */
    return?: Maybe<Return>;
    /** An array of return requests. */
    returns?: Maybe<Returns>;
};
/** Contains the response to a return request. */
export type RequestReturnOutputReturnsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** Contains details about a return. */
export type Return = {
    __typename?: 'Return';
    /** A list of shipping carriers available for returns. */
    available_shipping_carriers?: Maybe<Array<Maybe<ReturnShippingCarrier>>>;
    /** A list of comments posted for the return request. */
    comments?: Maybe<Array<Maybe<ReturnComment>>>;
    /** The date the return was requested. */
    created_at: Scalars['String']['output'];
    /** Data from the customer who created the return request. */
    customer: ReturnCustomer;
    /** A list of items being returned. */
    items?: Maybe<Array<Maybe<ReturnItem>>>;
    /** A human-readable return number. */
    number: Scalars['String']['output'];
    /** The order associated with the return. */
    order?: Maybe<CustomerOrder>;
    /** Shipping information for the return. */
    shipping?: Maybe<ReturnShipping>;
    /** The status of the return request. */
    status?: Maybe<ReturnStatus>;
    /** The unique ID for a `Return` object. */
    uid: Scalars['ID']['output'];
};
/** Contains details about a return comment. */
export type ReturnComment = {
    __typename?: 'ReturnComment';
    /** The name or author who posted the comment. */
    author_name: Scalars['String']['output'];
    /** The date and time the comment was posted. */
    created_at: Scalars['String']['output'];
    /** The contents of the comment. */
    text: Scalars['String']['output'];
    /** The unique ID for a `ReturnComment` object. */
    uid: Scalars['ID']['output'];
};
/** Contains details about a `ReturnCustomerAttribute` object. */
export type ReturnCustomAttribute = {
    __typename?: 'ReturnCustomAttribute';
    /** A description of the attribute. */
    label: Scalars['String']['output'];
    /** The unique ID for a `ReturnCustomAttribute` object. */
    uid: Scalars['ID']['output'];
    /** A JSON-encoded value of the attribute. */
    value: Scalars['String']['output'];
};
/** The customer information for the return. */
export type ReturnCustomer = {
    __typename?: 'ReturnCustomer';
    /** The email address of the customer. */
    email: Scalars['String']['output'];
    /** The first name of the customer. */
    firstname?: Maybe<Scalars['String']['output']>;
    /** The last name of the customer. */
    lastname?: Maybe<Scalars['String']['output']>;
};
/** Contains details about a product being returned. */
export type ReturnItem = {
    __typename?: 'ReturnItem';
    /**
     * Return item custom attributes that are visible on the storefront.
     * @deprecated Use custom_attributesV2 instead.
     */
    custom_attributes?: Maybe<Array<Maybe<ReturnCustomAttribute>>>;
    /** Custom attributes that are visible on the storefront. */
    custom_attributesV2?: Maybe<Array<Maybe<AttributeValueInterface>>>;
    /** Provides access to the product being returned, including information about selected and entered options. */
    order_item: OrderItemInterface;
    /** The quantity of the item the merchant authorized to be returned. */
    quantity: Scalars['Float']['output'];
    /** The quantity of the item requested to be returned. */
    request_quantity: Scalars['Float']['output'];
    /** The return status of the item. */
    status: ReturnItemStatus;
    /** The unique ID for a `ReturnItem` object. */
    uid: Scalars['ID']['output'];
};
/** Return Item attribute metadata. */
export type ReturnItemAttributeMetadata = CustomAttributeMetadataInterface & {
    __typename?: 'ReturnItemAttributeMetadata';
    /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
    code: Scalars['ID']['output'];
    /** Default attribute value. */
    default_value?: Maybe<Scalars['String']['output']>;
    /** The type of entity that defines the attribute. */
    entity_type: AttributeEntityTypeEnum;
    /** The frontend class of the attribute. */
    frontend_class?: Maybe<Scalars['String']['output']>;
    /** The frontend input type of the attribute. */
    frontend_input?: Maybe<AttributeFrontendInputEnum>;
    /** The template used for the input of the attribute (e.g., 'date'). */
    input_filter?: Maybe<InputFilterEnum>;
    /** Whether the attribute value is required. */
    is_required: Scalars['Boolean']['output'];
    /** Whether the attribute value must be unique. */
    is_unique: Scalars['Boolean']['output'];
    /** The label assigned to the attribute. */
    label?: Maybe<Scalars['String']['output']>;
    /** The number of lines of the attribute value. */
    multiline_count?: Maybe<Scalars['Int']['output']>;
    /** Attribute options. */
    options: Array<Maybe<CustomAttributeOptionInterface>>;
    /** The position of the attribute in the form. */
    sort_order?: Maybe<Scalars['Int']['output']>;
    /** The validation rules of the attribute value. */
    validate_rules?: Maybe<Array<Maybe<ValidationRule>>>;
};
export declare enum ReturnItemStatus {
    Approved = "APPROVED",
    Authorized = "AUTHORIZED",
    Denied = "DENIED",
    Pending = "PENDING",
    Received = "RECEIVED",
    Rejected = "REJECTED"
}
/** Contains details about the return shipping address. */
export type ReturnShipping = {
    __typename?: 'ReturnShipping';
    /** The merchant-defined return shipping address. */
    address?: Maybe<ReturnShippingAddress>;
    /** The unique ID for a `ReturnShippingTracking` object. If a single UID is specified, the array contains a single tracking record. Otherwise, array contains all tracking information. */
    tracking?: Maybe<Array<Maybe<ReturnShippingTracking>>>;
};
/** Contains details about the return shipping address. */
export type ReturnShippingTrackingArgs = {
    uid?: InputMaybe<Scalars['ID']['input']>;
};
/** Contains details about the shipping address used for receiving returned items. */
export type ReturnShippingAddress = {
    __typename?: 'ReturnShippingAddress';
    /** The city for product returns. */
    city: Scalars['String']['output'];
    /** The merchant's contact person. */
    contact_name?: Maybe<Scalars['String']['output']>;
    /** An object that defines the country for product returns. */
    country: Country;
    /** The postal code for product returns. */
    postcode: Scalars['String']['output'];
    /** An object that defines the state or province for product returns. */
    region: Region;
    /** The street address for product returns. */
    street: Array<Maybe<Scalars['String']['output']>>;
    /** The telephone number for product returns. */
    telephone?: Maybe<Scalars['String']['output']>;
};
/** Contains details about the carrier on a return. */
export type ReturnShippingCarrier = {
    __typename?: 'ReturnShippingCarrier';
    /** A description of the shipping carrier. */
    label: Scalars['String']['output'];
    /** The unique ID for a `ReturnShippingCarrier` object assigned to the shipping carrier. */
    uid: Scalars['ID']['output'];
};
/** Contains shipping and tracking details. */
export type ReturnShippingTracking = {
    __typename?: 'ReturnShippingTracking';
    /** Contains details of a shipping carrier. */
    carrier: ReturnShippingCarrier;
    /** Details about the status of a shipment. */
    status?: Maybe<ReturnShippingTrackingStatus>;
    /** A tracking number assigned by the carrier. */
    tracking_number: Scalars['String']['output'];
    /** The unique ID for a `ReturnShippingTracking` object assigned to the tracking item. */
    uid: Scalars['ID']['output'];
};
/** Contains the status of a shipment. */
export type ReturnShippingTrackingStatus = {
    __typename?: 'ReturnShippingTrackingStatus';
    /** Text that describes the status. */
    text: Scalars['String']['output'];
    /** Indicates whether the status type is informational or an error. */
    type: ReturnShippingTrackingStatusType;
};
export declare enum ReturnShippingTrackingStatusType {
    Error = "ERROR",
    Information = "INFORMATION"
}
export declare enum ReturnStatus {
    Approved = "APPROVED",
    Authorized = "AUTHORIZED",
    Closed = "CLOSED",
    Denied = "DENIED",
    PartiallyApproved = "PARTIALLY_APPROVED",
    PartiallyAuthorized = "PARTIALLY_AUTHORIZED",
    PartiallyReceived = "PARTIALLY_RECEIVED",
    PartiallyRejected = "PARTIALLY_REJECTED",
    Pending = "PENDING",
    ProcessedAndClosed = "PROCESSED_AND_CLOSED",
    Received = "RECEIVED",
    Rejected = "REJECTED"
}
/** Contains a list of customer return requests. */
export type Returns = {
    __typename?: 'Returns';
    /** A list of return requests. */
    items?: Maybe<Array<Maybe<Return>>>;
    /** Pagination metadata. */
    page_info?: Maybe<SearchResultPageInfo>;
    /** The total number of return requests. */
    total_count?: Maybe<Scalars['Int']['output']>;
};
/** Contains the result of a request to revoke a customer token. */
export type RevokeCustomerTokenOutput = {
    __typename?: 'RevokeCustomerTokenOutput';
    /** The result of a request to revoke a customer token. */
    result: Scalars['Boolean']['output'];
};
/** Contains details about a customer's reward points. */
export type RewardPoints = {
    __typename?: 'RewardPoints';
    /** The current balance of reward points. */
    balance?: Maybe<RewardPointsAmount>;
    /** The balance history of reward points. If the ability for customers to view the balance history has been disabled in the Admin, this field will be set to null. */
    balance_history?: Maybe<Array<Maybe<RewardPointsBalanceHistoryItem>>>;
    /** The current exchange rates for reward points. */
    exchange_rates?: Maybe<RewardPointsExchangeRates>;
    /** The subscription status of emails related to reward points. */
    subscription_status?: Maybe<RewardPointsSubscriptionStatus>;
};
export type RewardPointsAmount = {
    __typename?: 'RewardPointsAmount';
    /** The reward points amount in store currency. */
    money: Money;
    /** The reward points amount in points. */
    points: Scalars['Float']['output'];
};
/** Contain details about the reward points transaction. */
export type RewardPointsBalanceHistoryItem = {
    __typename?: 'RewardPointsBalanceHistoryItem';
    /** The award points balance after the completion of the transaction. */
    balance?: Maybe<RewardPointsAmount>;
    /** The reason the balance changed. */
    change_reason: Scalars['String']['output'];
    /** The date of the transaction. */
    date: Scalars['String']['output'];
    /** The number of points added or deducted in the transaction. */
    points_change: Scalars['Float']['output'];
};
/** Lists the reward points exchange rates. The values depend on the customer group. */
export type RewardPointsExchangeRates = {
    __typename?: 'RewardPointsExchangeRates';
    /** How many points are earned for a given amount spent. */
    earning?: Maybe<RewardPointsRate>;
    /** How many points must be redeemed to get a given amount of currency discount at the checkout. */
    redemption?: Maybe<RewardPointsRate>;
};
/** Contains details about customer's reward points rate. */
export type RewardPointsRate = {
    __typename?: 'RewardPointsRate';
    /** The money value for the exchange rate. For earnings, this is the amount spent to earn the specified points. For redemption, this is the amount of money the number of points represents. */
    currency_amount: Scalars['Float']['output'];
    /** The number of points for an exchange rate. For earnings, this is the number of points earned. For redemption, this is the number of points needed for redemption. */
    points: Scalars['Float']['output'];
};
/** Indicates whether the customer subscribes to reward points emails. */
export type RewardPointsSubscriptionStatus = {
    __typename?: 'RewardPointsSubscriptionStatus';
    /** Indicates whether the customer subscribes to 'Reward points balance updates' emails. */
    balance_updates: RewardPointsSubscriptionStatusesEnum;
    /** Indicates whether the customer subscribes to 'Reward points expiration notifications' emails. */
    points_expiration_notifications: RewardPointsSubscriptionStatusesEnum;
};
export declare enum RewardPointsSubscriptionStatusesEnum {
    NotSubscribed = "NOT_SUBSCRIBED",
    Subscribed = "SUBSCRIBED"
}
/** Routable entities serve as the model for a rendered page. */
export type RoutableInterface = {
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirect_code: Scalars['Int']['output'];
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
};
/** Default implementation of RoutableInterface. This type is returned when the URL is not linked to an entity. */
export type RoutableUrl = RoutableInterface & {
    __typename?: 'RoutableUrl';
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirect_code: Scalars['Int']['output'];
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
};
/** Defines the name and value of a SDK parameter */
export type SdkParams = {
    __typename?: 'SDKParams';
    /** The name of the SDK parameter */
    name?: Maybe<Scalars['String']['output']>;
    /** The value of the SDK parameter */
    value?: Maybe<Scalars['String']['output']>;
};
/** Contains details about a comment. */
export type SalesCommentItem = {
    __typename?: 'SalesCommentItem';
    /** The text of the message. */
    message: Scalars['String']['output'];
    /** The timestamp of the comment. */
    timestamp: Scalars['String']['output'];
};
export type SalesItemInterface = {
    __typename?: 'SalesItemInterface';
    /** The entered gift message for the order item */
    gift_message?: Maybe<GiftMessage>;
};
/** This enumeration defines the scope type for customer orders. */
export declare enum ScopeTypeEnum {
    Global = "GLOBAL",
    Store = "STORE",
    Website = "WEBSITE"
}
/** Provides navigation for the query response. */
export type SearchResultPageInfo = {
    __typename?: 'SearchResultPageInfo';
    /** The specific page to return. */
    current_page?: Maybe<Scalars['Int']['output']>;
    /** The maximum number of items to return per page of results. */
    page_size?: Maybe<Scalars['Int']['output']>;
    /** The total number of pages in the response. */
    total_pages?: Maybe<Scalars['Int']['output']>;
};
/** A string that contains search suggestion */
export type SearchSuggestion = {
    __typename?: 'SearchSuggestion';
    /** The search suggestion of existing product. */
    search: Scalars['String']['output'];
};
/** Contains details about a selected bundle option. */
export type SelectedBundleOption = {
    __typename?: 'SelectedBundleOption';
    /** @deprecated Use `uid` instead */
    id: Scalars['Int']['output'];
    /** The display name of the selected bundle product option. */
    label: Scalars['String']['output'];
    /** The type of selected bundle product option. */
    type: Scalars['String']['output'];
    /** The unique ID for a `SelectedBundleOption` object */
    uid: Scalars['ID']['output'];
    /** An array of selected bundle option values. */
    values: Array<Maybe<SelectedBundleOptionValue>>;
};
/** Contains details about a value for a selected bundle option. */
export type SelectedBundleOptionValue = {
    __typename?: 'SelectedBundleOptionValue';
    /** Use `uid` instead */
    id: Scalars['Int']['output'];
    /** The display name of the value for the selected bundle product option. */
    label: Scalars['String']['output'];
    /** The original price of the value for the selected bundle product option. */
    original_price: Money;
    /** The price of the value for the selected bundle product option. */
    price: Scalars['Float']['output'];
    /** The price of the value for the selected bundle product option. */
    priceV2: Money;
    /** The quantity of the value for the selected bundle product option. */
    quantity: Scalars['Float']['output'];
    /** The unique ID for a `SelectedBundleOptionValue` object */
    uid: Scalars['ID']['output'];
};
/** Contains details about a selected configurable option. */
export type SelectedConfigurableOption = {
    __typename?: 'SelectedConfigurableOption';
    /** The unique ID for a `ConfigurableProductOptions` object. */
    configurable_product_option_uid: Scalars['ID']['output'];
    /** The unique ID for a `ConfigurableProductOptionsValues` object. */
    configurable_product_option_value_uid: Scalars['ID']['output'];
    /** @deprecated Use `SelectedConfigurableOption.configurable_product_option_uid` instead. */
    id: Scalars['Int']['output'];
    /** The display text for the option. */
    option_label: Scalars['String']['output'];
    /** @deprecated Use `SelectedConfigurableOption.configurable_product_option_value_uid` instead. */
    value_id: Scalars['Int']['output'];
    /** The display name of the selected configurable option. */
    value_label: Scalars['String']['output'];
};
/** Contains details about an attribute the buyer selected. */
export type SelectedCustomAttributeInput = {
    /** A string that identifies the selected attribute. */
    attribute_code: Scalars['String']['input'];
    /** The unique ID for a `CustomAttribute` object of a selected custom attribute. */
    value: Scalars['ID']['input'];
};
/** Identifies a customized product that has been placed in a cart. */
export type SelectedCustomizableOption = {
    __typename?: 'SelectedCustomizableOption';
    /** The unique ID for a specific `CustomizableOptionInterface` object, such as a `CustomizableFieldOption`, `CustomizableFileOption`, or `CustomizableAreaOption` object. */
    customizable_option_uid: Scalars['ID']['output'];
    /** @deprecated Use `SelectedCustomizableOption.customizable_option_uid` instead. */
    id: Scalars['Int']['output'];
    /** Indicates whether the customizable option is required. */
    is_required: Scalars['Boolean']['output'];
    /** The display name of the selected customizable option. */
    label: Scalars['String']['output'];
    /** A value indicating the order to display this option. */
    sort_order: Scalars['Int']['output'];
    /** The type of `CustomizableOptionInterface` object. */
    type: Scalars['String']['output'];
    /** An array of selectable values. */
    values: Array<Maybe<SelectedCustomizableOptionValue>>;
};
/** Identifies the value of the selected customized option. */
export type SelectedCustomizableOptionValue = {
    __typename?: 'SelectedCustomizableOptionValue';
    /** The unique ID for a value object that corresponds to the object represented by the `customizable_option_uid` attribute. */
    customizable_option_value_uid: Scalars['ID']['output'];
    /** @deprecated Use `SelectedCustomizableOptionValue.customizable_option_value_uid` instead. */
    id: Scalars['Int']['output'];
    /** The display name of the selected value. */
    label: Scalars['String']['output'];
    /** The price of the selected customizable value. */
    price: CartItemSelectedOptionValuePrice;
    /** The text identifying the selected value. */
    value: Scalars['String']['output'];
};
/** Describes the payment method the shopper selected. */
export type SelectedPaymentMethod = {
    __typename?: 'SelectedPaymentMethod';
    /** The payment method code. */
    code: Scalars['String']['output'];
    /** The purchase order number. */
    purchase_order_number?: Maybe<Scalars['String']['output']>;
    /** The payment method title. */
    title: Scalars['String']['output'];
};
/** Contains details about the selected shipping method and carrier. */
export type SelectedShippingMethod = {
    __typename?: 'SelectedShippingMethod';
    /** The cost of shipping using this shipping method. */
    amount: Money;
    /** @deprecated The field should not be used on the storefront. */
    base_amount?: Maybe<Money>;
    /** A string that identifies a commercial carrier or an offline shipping method. */
    carrier_code: Scalars['String']['output'];
    /** The label for the carrier code. */
    carrier_title: Scalars['String']['output'];
    /** A shipping method code associated with a carrier. */
    method_code: Scalars['String']['output'];
    /** The label for the method code. */
    method_title: Scalars['String']['output'];
    /** The cost of shipping using this shipping method, excluding tax. */
    price_excl_tax: Money;
    /** The cost of shipping using this shipping method, including tax. */
    price_incl_tax: Money;
};
/** Defines the referenced product and the email sender and recipients. */
export type SendEmailToFriendInput = {
    /** The ID of the product that the sender is referencing. */
    product_id: Scalars['Int']['input'];
    /** An array containing information about each recipient. */
    recipients: Array<InputMaybe<SendEmailToFriendRecipientInput>>;
    /** Information about the customer and the content of the message. */
    sender: SendEmailToFriendSenderInput;
};
/** Contains information about the sender and recipients. */
export type SendEmailToFriendOutput = {
    __typename?: 'SendEmailToFriendOutput';
    /** An array containing information about each recipient. */
    recipients?: Maybe<Array<Maybe<SendEmailToFriendRecipient>>>;
    /** Information about the customer and the content of the message. */
    sender?: Maybe<SendEmailToFriendSender>;
};
/** An output object that contains information about the recipient. */
export type SendEmailToFriendRecipient = {
    __typename?: 'SendEmailToFriendRecipient';
    /** The email address of the recipient. */
    email: Scalars['String']['output'];
    /** The name of the recipient. */
    name: Scalars['String']['output'];
};
/** Contains details about a recipient. */
export type SendEmailToFriendRecipientInput = {
    /** The email address of the recipient. */
    email: Scalars['String']['input'];
    /** The name of the recipient. */
    name: Scalars['String']['input'];
};
/** An output object that contains information about the sender. */
export type SendEmailToFriendSender = {
    __typename?: 'SendEmailToFriendSender';
    /** The email address of the sender. */
    email: Scalars['String']['output'];
    /** The text of the message to be sent. */
    message: Scalars['String']['output'];
    /** The name of the sender. */
    name: Scalars['String']['output'];
};
/** Contains details about the sender. */
export type SendEmailToFriendSenderInput = {
    /** The email address of the sender. */
    email: Scalars['String']['input'];
    /** The text of the message to be sent. */
    message: Scalars['String']['input'];
    /** The name of the sender. */
    name: Scalars['String']['input'];
};
/** Contains details about the configuration of the Email to a Friend feature. */
export type SendFriendConfiguration = {
    __typename?: 'SendFriendConfiguration';
    /** Indicates whether the Email to a Friend feature is enabled. */
    enabled_for_customers: Scalars['Boolean']['output'];
    /** Indicates whether the Email to a Friend feature is enabled for guests. */
    enabled_for_guests: Scalars['Boolean']['output'];
};
/** Sets the billing address. */
export type SetBillingAddressOnCartInput = {
    /** The billing address. */
    billing_address: BillingAddressInput;
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
};
/** Contains details about the cart after setting the billing address. */
export type SetBillingAddressOnCartOutput = {
    __typename?: 'SetBillingAddressOnCartOutput';
    /** The cart after setting the billing address. */
    cart: Cart;
};
/** Defines the gift options applied to the cart. */
export type SetGiftOptionsOnCartInput = {
    /** The unique ID that identifies the shopper's cart. */
    cart_id: Scalars['String']['input'];
    /** Gift message details for the cart. */
    gift_message?: InputMaybe<GiftMessageInput>;
    /** Whether customer requested gift receipt for the cart. */
    gift_receipt_included: Scalars['Boolean']['input'];
    /** The unique ID for a `GiftWrapping` object to be used for the cart. */
    gift_wrapping_id?: InputMaybe<Scalars['ID']['input']>;
    /** Whether customer requested printed card for the cart. */
    printed_card_included: Scalars['Boolean']['input'];
};
/** Contains the cart after gift options have been applied. */
export type SetGiftOptionsOnCartOutput = {
    __typename?: 'SetGiftOptionsOnCartOutput';
    /** The modified cart object. */
    cart: Cart;
};
/** Defines the guest email and cart. */
export type SetGuestEmailOnCartInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** The email address of the guest. */
    email: Scalars['String']['input'];
};
/** Contains details about the cart after setting the email of a guest. */
export type SetGuestEmailOnCartOutput = {
    __typename?: 'SetGuestEmailOnCartOutput';
    /** The cart after setting the guest email. */
    cart: Cart;
};
/** Applies a payment method to the quote. */
export type SetPaymentMethodAndPlaceOrderInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** The payment method data to apply to the cart. */
    payment_method: PaymentMethodInput;
};
/** Applies a payment method to the cart. */
export type SetPaymentMethodOnCartInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** The payment method data to apply to the cart. */
    payment_method: PaymentMethodInput;
};
/** Contains details about the cart after setting the payment method. */
export type SetPaymentMethodOnCartOutput = {
    __typename?: 'SetPaymentMethodOnCartOutput';
    /** The cart after setting the payment method. */
    cart: Cart;
};
/** Specifies an array of addresses to use for shipping. */
export type SetShippingAddressesOnCartInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** An array of shipping addresses. */
    shipping_addresses: Array<InputMaybe<ShippingAddressInput>>;
};
/** Contains details about the cart after setting the shipping addresses. */
export type SetShippingAddressesOnCartOutput = {
    __typename?: 'SetShippingAddressesOnCartOutput';
    /** The cart after setting the shipping addresses. */
    cart: Cart;
};
/** Applies one or shipping methods to the cart. */
export type SetShippingMethodsOnCartInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** An array of shipping methods. */
    shipping_methods: Array<InputMaybe<ShippingMethodInput>>;
};
/** Contains details about the cart after setting the shipping methods. */
export type SetShippingMethodsOnCartOutput = {
    __typename?: 'SetShippingMethodsOnCartOutput';
    /** The cart after setting the shipping methods. */
    cart: Cart;
};
/** Defines a gift registry invitee. */
export type ShareGiftRegistryInviteeInput = {
    /** The email address of the gift registry invitee. */
    email: Scalars['String']['input'];
    /** The name of the gift registry invitee. */
    name: Scalars['String']['input'];
};
/** Contains the results of a request to share a gift registry. */
export type ShareGiftRegistryOutput = {
    __typename?: 'ShareGiftRegistryOutput';
    /** Indicates whether the gift registry was successfully shared. */
    is_shared: Scalars['Boolean']['output'];
};
/** Defines the sender of an invitation to view a gift registry. */
export type ShareGiftRegistrySenderInput = {
    /** A brief message from the sender. */
    message: Scalars['String']['input'];
    /** The sender of the gift registry invitation. */
    name: Scalars['String']['input'];
};
/** Defines whether bundle items must be shipped together. */
export declare enum ShipBundleItemsEnum {
    Separately = "SEPARATELY",
    Together = "TOGETHER"
}
export type ShipmentItem = ShipmentItemInterface & {
    __typename?: 'ShipmentItem';
    /** The unique ID for a `ShipmentItemInterface` object. */
    id: Scalars['ID']['output'];
    /** The order item associated with the shipment item. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of shipped items. */
    quantity_shipped: Scalars['Float']['output'];
};
/** Order shipment item details. */
export type ShipmentItemInterface = {
    /** The unique ID for a `ShipmentItemInterface` object. */
    id: Scalars['ID']['output'];
    /** The order item associated with the shipment item. */
    order_item?: Maybe<OrderItemInterface>;
    /** The name of the base product. */
    product_name?: Maybe<Scalars['String']['output']>;
    /** The sale price for the base product. */
    product_sale_price: Money;
    /** The SKU of the base product. */
    product_sku: Scalars['String']['output'];
    /** The number of shipped items. */
    quantity_shipped: Scalars['Float']['output'];
};
/** Contains order shipment tracking details. */
export type ShipmentTracking = {
    __typename?: 'ShipmentTracking';
    /** The shipping carrier for the order delivery. */
    carrier: Scalars['String']['output'];
    /** The tracking number of the order shipment. */
    number?: Maybe<Scalars['String']['output']>;
    /** The shipment tracking title. */
    title: Scalars['String']['output'];
};
/** Defines a single shipping address. */
export type ShippingAddressInput = {
    /** Defines a shipping address. */
    address?: InputMaybe<CartAddressInput>;
    /** An ID from the customer's address book that uniquely identifies the address to be used for shipping. */
    customer_address_id?: InputMaybe<Scalars['Int']['input']>;
    /** Text provided by the shopper. */
    customer_notes?: InputMaybe<Scalars['String']['input']>;
    /** The code of Pickup Location which will be used for In-Store Pickup. */
    pickup_location_code?: InputMaybe<Scalars['String']['input']>;
};
/** Contains shipping addresses and methods. */
export type ShippingCartAddress = CartAddressInterface & {
    __typename?: 'ShippingCartAddress';
    /** An array that lists the shipping methods that can be applied to the cart. */
    available_shipping_methods?: Maybe<Array<Maybe<AvailableShippingMethod>>>;
    /** @deprecated Use `cart_items_v2` instead. */
    cart_items?: Maybe<Array<Maybe<CartItemQuantity>>>;
    /** An array that lists the items in the cart. */
    cart_items_v2?: Maybe<Array<Maybe<CartItemInterface>>>;
    /** The city specified for the billing or shipping address. */
    city: Scalars['String']['output'];
    /** The company specified for the billing or shipping address. */
    company?: Maybe<Scalars['String']['output']>;
    /** An object containing the country label and code. */
    country: CartAddressCountry;
    /** The custom attribute values of the billing or shipping address. */
    custom_attributes: Array<Maybe<AttributeValueInterface>>;
    /** Text provided by the shopper. */
    customer_notes?: Maybe<Scalars['String']['output']>;
    /** The customer's fax number. */
    fax?: Maybe<Scalars['String']['output']>;
    /** The first name of the customer or guest. */
    firstname: Scalars['String']['output'];
    /** @deprecated This information should not be exposed on the frontend. */
    items_weight?: Maybe<Scalars['Float']['output']>;
    /** The last name of the customer or guest. */
    lastname: Scalars['String']['output'];
    /** The middle name of the person associated with the billing/shipping address. */
    middlename?: Maybe<Scalars['String']['output']>;
    pickup_location_code?: Maybe<Scalars['String']['output']>;
    /** The ZIP or postal code of the billing or shipping address. */
    postcode?: Maybe<Scalars['String']['output']>;
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']['output']>;
    /** An object containing the region label and code. */
    region?: Maybe<CartAddressRegion>;
    /** An object that describes the selected shipping method. */
    selected_shipping_method?: Maybe<SelectedShippingMethod>;
    /** An array containing the street for the billing or shipping address. */
    street: Array<Maybe<Scalars['String']['output']>>;
    /** A value such as Sr., Jr., or III. */
    suffix?: Maybe<Scalars['String']['output']>;
    /** The telephone number for the billing or shipping address. */
    telephone?: Maybe<Scalars['String']['output']>;
    /** The unique id of the customer address. */
    uid: Scalars['String']['output'];
    /** The VAT company number for billing or shipping address. */
    vat_id?: Maybe<Scalars['String']['output']>;
};
/** Defines an individual shipping discount. This discount can be applied to shipping. */
export type ShippingDiscount = {
    __typename?: 'ShippingDiscount';
    /** The amount of the discount. */
    amount: Money;
};
/** Contains details about shipping and handling costs. */
export type ShippingHandling = {
    __typename?: 'ShippingHandling';
    /** The shipping amount, excluding tax. */
    amount_excluding_tax?: Maybe<Money>;
    /** The shipping amount, including tax. */
    amount_including_tax?: Maybe<Money>;
    /** The applied discounts to the shipping. */
    discounts?: Maybe<Array<Maybe<ShippingDiscount>>>;
    /** Details about taxes applied for shipping. */
    taxes?: Maybe<Array<Maybe<TaxItem>>>;
    /** The total amount for shipping. */
    total_amount: Money;
};
/** Defines the shipping carrier and method. */
export type ShippingMethodInput = {
    /** A string that identifies a commercial carrier or an offline delivery method. */
    carrier_code: Scalars['String']['input'];
    /** A string that indicates which service a commercial carrier will use to ship items. For offline delivery methods, this value is similar to the label displayed on the checkout page. */
    method_code: Scalars['String']['input'];
};
/** An implementation for simple product cart items. */
export type SimpleCartItem = CartItemInterface & {
    __typename?: 'SimpleCartItem';
    /** The list of available gift wrapping options for the cart item. */
    available_gift_wrapping: Array<Maybe<GiftWrapping>>;
    /** An array containing the customizable options the shopper selected. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** An array of errors encountered while loading the cart item */
    errors?: Maybe<Array<Maybe<CartItemError>>>;
    /** The entered gift message for the cart item */
    gift_message?: Maybe<GiftMessage>;
    /** The selected gift wrapping for the cart item. */
    gift_wrapping?: Maybe<GiftWrapping>;
    /** @deprecated Use `uid` instead. */
    id: Scalars['String']['output'];
    /** True if requested quantity is less than available stock, false otherwise. */
    is_available: Scalars['Boolean']['output'];
    /** Message to display when the product is not available with this selected option. */
    not_available_message?: Maybe<Scalars['String']['output']>;
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<CartItemPrices>;
    /** Details about an item in the cart. */
    product: ProductInterface;
    /** The quantity of this item in the cart. */
    quantity: Scalars['Float']['output'];
    /** The unique ID for a `CartItemInterface` object. */
    uid: Scalars['ID']['output'];
};
/** Defines a simple product, which is tangible and is usually sold in single units or in fixed quantities. */
export type SimpleProduct = CustomizableProductInterface & PhysicalProductInterface & ProductInterface & RoutableInterface & {
    __typename?: 'SimpleProduct';
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_announcement_date?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_brand?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_custom_engraving_text?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_detailed_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_pagebuilder_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_gemstone_addon?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_recyclable_material?: Maybe<Scalars['Int']['output']>;
    /**
     * The attribute set assigned to the product.
     * @deprecated The field should not be used on the storefront.
     */
    attribute_set_id?: Maybe<Scalars['Int']['output']>;
    /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
    canonical_url?: Maybe<Scalars['String']['output']>;
    /** The categories assigned to a product. */
    categories?: Maybe<Array<Maybe<CategoryInterface>>>;
    /** @deprecated Use the `custom_attributes` field instead. */
    color?: Maybe<Scalars['Int']['output']>;
    /** The product's country of origin. */
    country_of_manufacture?: Maybe<Scalars['String']['output']>;
    /**
     * Timestamp indicating when the product was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: Maybe<Scalars['String']['output']>;
    /** An array of cross-sell products. */
    crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** Product custom attributes. */
    custom_attributesV2?: Maybe<ProductCustomAttributes>;
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: Maybe<ComplexTextValue>;
    /** @deprecated Use the `custom_attributes` field instead. */
    description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_color?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_material?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_size?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_style?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    format?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    has_video?: Maybe<Scalars['Int']['output']>;
    /**
     * The ID number assigned to the product.
     * @deprecated Use the `uid` field instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** The relative path to the main image on the product page. */
    image?: Maybe<ProductImage>;
    /** Indicates whether the product can be returned. */
    is_returnable?: Maybe<Scalars['String']['output']>;
    /**
     * A number representing the product's manufacturer.
     * @deprecated Use the `custom_attributes` field instead.
     */
    manufacturer?: Maybe<Scalars['Int']['output']>;
    /** An array of media gallery objects. */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use `media_gallery` instead.
     */
    media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: Maybe<Scalars['String']['output']>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: Maybe<Scalars['String']['output']>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: Maybe<Scalars['String']['output']>;
    /** The product name. Customers use this name to identify the product. */
    name?: Maybe<Scalars['String']['output']>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    new_from_date?: Maybe<Scalars['String']['output']>;
    /** The end date for new product listings. */
    new_to_date?: Maybe<Scalars['String']['output']>;
    /** Product stock only x left count */
    only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
    /** An array of options for a customizable product. */
    options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: Maybe<Scalars['String']['output']>;
    /**
     * Indicates the price of an item.
     * @deprecated Use `price_range` for product price information.
     */
    price?: Maybe<ProductPrices>;
    /** The range of prices for the product */
    price_range: PriceRange;
    /** An array of `TierPrice` objects. */
    price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
    /** An array of `ProductLinks` objects. */
    product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
    /** The average of all the ratings given to the product. */
    rating_summary: Scalars['Float']['output'];
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirect_code: Scalars['Int']['output'];
    /** An array of related products. */
    related_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** The total count of all the reviews given to the product. */
    review_count: Scalars['Int']['output'];
    /** The list of products reviews. */
    reviews: ProductReviews;
    /** A short description of the product. Its use depends on the theme. */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: Maybe<ProductImage>;
    /**
     * The beginning date that a product has a special price.
     * @deprecated The field should not be used on the storefront.
     */
    special_from_date?: Maybe<Scalars['String']['output']>;
    /** The discounted price of the product. */
    special_price?: Maybe<Scalars['Float']['output']>;
    /** The end date for a product with a special price. */
    special_to_date?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the product is staged for a future campaign. */
    staged: Scalars['Boolean']['output'];
    /** Stock status of the product */
    stock_status?: Maybe<ProductStockStatus>;
    /** The file name of a swatch image. */
    swatch_image?: Maybe<Scalars['String']['output']>;
    /** The relative path to the product's thumbnail image. */
    thumbnail?: Maybe<ProductImage>;
    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_price?: Maybe<Scalars['Float']['output']>;
    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use `__typename` instead.
     */
    type_id?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `ProductInterface` object. */
    uid: Scalars['ID']['output'];
    /**
     * Timestamp indicating when the product was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** An array of up-sell products. */
    upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The part of the URL that identifies the product */
    url_key?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use product's `canonical_url` or url rewrites instead */
    url_path?: Maybe<Scalars['String']['output']>;
    /** URL rewrites list */
    url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
    /** The part of the product URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    video_file?: Maybe<Scalars['String']['output']>;
    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Maybe<Array<Maybe<Website>>>;
    /** The weight of the item, in units defined by the store. */
    weight?: Maybe<Scalars['Float']['output']>;
};
/** Defines a simple product, which is tangible and is usually sold in single units or in fixed quantities. */
export type SimpleProductCustom_AttributesV2Args = {
    filters?: InputMaybe<AttributeFilterInput>;
};
/** Defines a simple product, which is tangible and is usually sold in single units or in fixed quantities. */
export type SimpleProductReviewsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** Defines a single product to add to the cart. */
export type SimpleProductCartItemInput = {
    /** An array that defines customizable options for the product. */
    customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
    /** An object containing the `sku`, `quantity`, and other relevant information about the product. */
    data: CartItemInput;
};
/** Contains a simple product wish list item. */
export type SimpleWishlistItem = WishlistItemInterface & {
    __typename?: 'SimpleWishlistItem';
    /** The date and time the item was added to the wish list. */
    added_at: Scalars['String']['output'];
    /** Custom options selected for the wish list item. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** The description of the item. */
    description?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `WishlistItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Product details of the wish list item. */
    product?: Maybe<ProductInterface>;
    /** The quantity of this wish list item. */
    quantity: Scalars['Float']['output'];
};
/** Smart button payment inputs */
export type SmartButtonMethodInput = {
    /** The payment source for the payment method */
    payment_source?: InputMaybe<Scalars['String']['input']>;
    /** The payment services order ID */
    payments_order_id?: InputMaybe<Scalars['String']['input']>;
    /** PayPal order ID */
    paypal_order_id?: InputMaybe<Scalars['String']['input']>;
};
export type SmartButtonsConfig = PaymentConfigItem & {
    __typename?: 'SmartButtonsConfig';
    /** The styles for the PayPal Smart Button configuration */
    button_styles?: Maybe<ButtonStyles>;
    /** The payment method code as defined in the payment gateway */
    code?: Maybe<Scalars['String']['output']>;
    /** Indicates whether to display the PayPal Pay Later message */
    display_message?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether to display Venmo */
    display_venmo?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether the payment method is displayed */
    is_visible?: Maybe<Scalars['Boolean']['output']>;
    /** Contains details about the styles for the PayPal Pay Later message */
    message_styles?: Maybe<MessageStyles>;
    /** Defines the payment intent (Authorize or Capture */
    payment_intent?: Maybe<Scalars['String']['output']>;
    /** The PayPal parameters required to load the JS SDK */
    sdk_params?: Maybe<Array<Maybe<SdkParams>>>;
    /** The relative order the payment method is displayed on the checkout page */
    sort_order?: Maybe<Scalars['String']['output']>;
    /** The name displayed for the payment method */
    title?: Maybe<Scalars['String']['output']>;
};
/** Indicates whether to return results in ascending or descending order. */
export declare enum SortEnum {
    Asc = "ASC",
    Desc = "DESC"
}
/** Defines a possible sort field. */
export type SortField = {
    __typename?: 'SortField';
    /** The label of the sort field. */
    label?: Maybe<Scalars['String']['output']>;
    /** The attribute code of the sort field. */
    value?: Maybe<Scalars['String']['output']>;
};
/** Contains a default value for sort fields and all available sort fields. */
export type SortFields = {
    __typename?: 'SortFields';
    /** The default sort field value. */
    default?: Maybe<Scalars['String']['output']>;
    /** An array of possible sort fields. */
    options?: Maybe<Array<Maybe<SortField>>>;
};
/** Specifies the field to use for sorting quote items */
export declare enum SortQuoteItemsEnum {
    BaseDiscountAmount = "BASE_DISCOUNT_AMOUNT",
    BaseDiscountTaxCompensationAmount = "BASE_DISCOUNT_TAX_COMPENSATION_AMOUNT",
    BasePrice = "BASE_PRICE",
    BasePriceIncTax = "BASE_PRICE_INC_TAX",
    BaseRowTotal = "BASE_ROW_TOTAL",
    BaseRowTotalIncTax = "BASE_ROW_TOTAL_INC_TAX",
    BaseTaxAmount = "BASE_TAX_AMOUNT",
    BaseTaxBeforeDiscount = "BASE_TAX_BEFORE_DISCOUNT",
    CreatedAt = "CREATED_AT",
    CustomPrice = "CUSTOM_PRICE",
    Description = "DESCRIPTION",
    DiscountAmount = "DISCOUNT_AMOUNT",
    DiscountPercent = "DISCOUNT_PERCENT",
    DiscountTaxCompensationAmount = "DISCOUNT_TAX_COMPENSATION_AMOUNT",
    FreeShipping = "FREE_SHIPPING",
    ItemId = "ITEM_ID",
    Name = "NAME",
    OriginalCustomPrice = "ORIGINAL_CUSTOM_PRICE",
    Price = "PRICE",
    PriceIncTax = "PRICE_INC_TAX",
    ProductId = "PRODUCT_ID",
    ProductType = "PRODUCT_TYPE",
    Qty = "QTY",
    RowTotal = "ROW_TOTAL",
    RowTotalIncTax = "ROW_TOTAL_INC_TAX",
    RowTotalWithDiscount = "ROW_TOTAL_WITH_DISCOUNT",
    RowWeight = "ROW_WEIGHT",
    Sku = "SKU",
    TaxAmount = "TAX_AMOUNT",
    TaxBeforeDiscount = "TAX_BEFORE_DISCOUNT",
    TaxPercent = "TAX_PERCENT",
    UpdatedAt = "UPDATED_AT",
    Weight = "WEIGHT"
}
/** Contains information about a store's configuration. */
export type StoreConfig = {
    __typename?: 'StoreConfig';
    /** Contains scripts that must be included in the HTML before the closing `<body>` tag. */
    absolute_footer?: Maybe<Scalars['String']['output']>;
    /** Indicates if the gift sender has the option to send a gift receipt. Possible values: 1 (Yes) and 0 (No). */
    allow_gift_receipt?: Maybe<Scalars['String']['output']>;
    /** Indicates whether gift wrapping can be added for the entire order. Possible values: 1 (Yes) and 0 (No). */
    allow_gift_wrapping_on_order?: Maybe<Scalars['String']['output']>;
    /** Indicates whether gift wrapping can be added for individual order items. Possible values: 1 (Yes) and 0 (No). */
    allow_gift_wrapping_on_order_items?: Maybe<Scalars['String']['output']>;
    /** Indicates whether guest users can write product reviews. Possible values: 1 (Yes) and 0 (No). */
    allow_guests_to_write_product_reviews?: Maybe<Scalars['String']['output']>;
    /** The value of the Allow Gift Messages for Order Items option */
    allow_items?: Maybe<Scalars['String']['output']>;
    /** The value of the Allow Gift Messages on Order Level option */
    allow_order?: Maybe<Scalars['String']['output']>;
    /** Indicates if a printed card can accompany an order. Possible values: 1 (Yes) and 0 (No). */
    allow_printed_card?: Maybe<Scalars['String']['output']>;
    /** Indicates whether to enable autocomplete on login and forgot password forms. */
    autocomplete_on_storefront?: Maybe<Scalars['Boolean']['output']>;
    /** The base currency code. */
    base_currency_code?: Maybe<Scalars['String']['output']>;
    /** A fully-qualified URL that is used to create relative links to the `base_url`. */
    base_link_url?: Maybe<Scalars['String']['output']>;
    /** The fully-qualified URL that specifies the location of media files. */
    base_media_url?: Maybe<Scalars['String']['output']>;
    /** The fully-qualified URL that specifies the location of static view files. */
    base_static_url?: Maybe<Scalars['String']['output']>;
    /** The store’s fully-qualified base URL. */
    base_url?: Maybe<Scalars['String']['output']>;
    /** Braintree 3D Secure, should 3D Secure be used for specific countries. */
    braintree_3dsecure_allowspecific?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree 3D Secure, always request 3D Secure flag. */
    braintree_3dsecure_always_request_3ds?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree 3D Secure, the specific countries to use 3D Secure in, to be used if allow specific is status is enabled. */
    braintree_3dsecure_specificcountry?: Maybe<Scalars['String']['output']>;
    /** Braintree 3D Secure, threshold above which 3D Secure should be requested. */
    braintree_3dsecure_threshold_amount?: Maybe<Scalars['String']['output']>;
    /** Braintree 3D Secure enabled/active status. */
    braintree_3dsecure_verify_3dsecure?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree ACH vault status. */
    braintree_ach_direct_debit_vault_active?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree Apple Pay merchant name. */
    braintree_applepay_merchant_name?: Maybe<Scalars['String']['output']>;
    /** Braintree Apple Pay vault status. */
    braintree_applepay_vault_active?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree cc vault status. */
    braintree_cc_vault_active?: Maybe<Scalars['String']['output']>;
    /** Braintree cc vault CVV re-verification enabled status. */
    braintree_cc_vault_cvv?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree environment. */
    braintree_environment?: Maybe<Scalars['String']['output']>;
    /** Braintree Google Pay button color. */
    braintree_googlepay_btn_color?: Maybe<Scalars['String']['output']>;
    /** Braintree Google Pay Card types supported. */
    braintree_googlepay_cctypes?: Maybe<Scalars['String']['output']>;
    /** Braintree Google Pay merchant ID. */
    braintree_googlepay_merchant_id?: Maybe<Scalars['String']['output']>;
    /** Braintree Google Pay vault status. */
    braintree_googlepay_vault_active?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree Local Payment Methods allowed payment methods. */
    braintree_local_payment_allowed_methods?: Maybe<Scalars['String']['output']>;
    /** Braintree Local Payment Methods fallback button text. */
    braintree_local_payment_fallback_button_text?: Maybe<Scalars['String']['output']>;
    /** Braintree Local Payment Methods redirect URL on failed payment. */
    braintree_local_payment_redirect_on_fail?: Maybe<Scalars['String']['output']>;
    /** Braintree Merchant Account ID. */
    braintree_merchant_account_id?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Credit mini-cart & cart button style color. */
    braintree_paypal_button_location_cart_type_credit_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Credit mini-cart & cart button style label. */
    braintree_paypal_button_location_cart_type_credit_label?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Credit mini-cart & cart button style shape. */
    braintree_paypal_button_location_cart_type_credit_shape?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Credit mini-cart & cart button show status. */
    braintree_paypal_button_location_cart_type_credit_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal Pay Later messaging mini-cart & cart style layout. */
    braintree_paypal_button_location_cart_type_messaging_layout?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later messaging mini-cart & cart style logo. */
    braintree_paypal_button_location_cart_type_messaging_logo?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later messaging mini-cart & cart style logo position. */
    braintree_paypal_button_location_cart_type_messaging_logo_position?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later messaging mini-cart & cart show status. */
    braintree_paypal_button_location_cart_type_messaging_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal Pay Later messaging checkout style text color. */
    braintree_paypal_button_location_cart_type_messaging_text_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later mini-cart & cart button style color. */
    braintree_paypal_button_location_cart_type_paylater_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later mini-cart & cart button style label. */
    braintree_paypal_button_location_cart_type_paylater_label?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later mini-cart & cart button style shape. */
    braintree_paypal_button_location_cart_type_paylater_shape?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later mini-cart & cart button show status. */
    braintree_paypal_button_location_cart_type_paylater_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal mini-cart & cart button style color. */
    braintree_paypal_button_location_cart_type_paypal_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal mini-cart & cart button style label. */
    braintree_paypal_button_location_cart_type_paypal_label?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal mini-cart & cart button style shape. */
    braintree_paypal_button_location_cart_type_paypal_shape?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal mini-cart & cart button show. */
    braintree_paypal_button_location_cart_type_paypal_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal Credit checkout button style color. */
    braintree_paypal_button_location_checkout_type_credit_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Credit checkout button style label. */
    braintree_paypal_button_location_checkout_type_credit_label?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Credit checkout button style shape. */
    braintree_paypal_button_location_checkout_type_credit_shape?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Credit checkout button show status. */
    braintree_paypal_button_location_checkout_type_credit_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal Pay Later messaging checkout style layout. */
    braintree_paypal_button_location_checkout_type_messaging_layout?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later messaging checkout style logo. */
    braintree_paypal_button_location_checkout_type_messaging_logo?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later messaging checkout style logo position. */
    braintree_paypal_button_location_checkout_type_messaging_logo_position?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later messaging checkout show status. */
    braintree_paypal_button_location_checkout_type_messaging_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal Pay Later messaging checkout style text color. */
    braintree_paypal_button_location_checkout_type_messaging_text_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later checkout button style color. */
    braintree_paypal_button_location_checkout_type_paylater_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later checkout button style label. */
    braintree_paypal_button_location_checkout_type_paylater_label?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later checkout button style shape. */
    braintree_paypal_button_location_checkout_type_paylater_shape?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later checkout button show status. */
    braintree_paypal_button_location_checkout_type_paylater_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal checkout button style color. */
    braintree_paypal_button_location_checkout_type_paypal_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal checkout button style label. */
    braintree_paypal_button_location_checkout_type_paypal_label?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal checkout button style shape. */
    braintree_paypal_button_location_checkout_type_paypal_shape?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal checkout button show. */
    braintree_paypal_button_location_checkout_type_paypal_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal Credit PDP button style color. */
    braintree_paypal_button_location_productpage_type_credit_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Credit PDP button style label. */
    braintree_paypal_button_location_productpage_type_credit_label?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Credit PDP button style shape. */
    braintree_paypal_button_location_productpage_type_credit_shape?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Credit PDP button show status. */
    braintree_paypal_button_location_productpage_type_credit_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal Pay Later messaging PDP style layout. */
    braintree_paypal_button_location_productpage_type_messaging_layout?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later messaging PDP style logo. */
    braintree_paypal_button_location_productpage_type_messaging_logo?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later messaging PDP style logo position. */
    braintree_paypal_button_location_productpage_type_messaging_logo_position?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later messaging PDP show status. */
    braintree_paypal_button_location_productpage_type_messaging_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal Pay Later messaging PDP style text color. */
    braintree_paypal_button_location_productpage_type_messaging_text_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later PDP button style color. */
    braintree_paypal_button_location_productpage_type_paylater_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later PDP button style label. */
    braintree_paypal_button_location_productpage_type_paylater_label?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later PDP button style shape. */
    braintree_paypal_button_location_productpage_type_paylater_shape?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal Pay Later PDP button show status. */
    braintree_paypal_button_location_productpage_type_paylater_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal PDP button style color. */
    braintree_paypal_button_location_productpage_type_paypal_color?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal PDP button style label. */
    braintree_paypal_button_location_productpage_type_paypal_label?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal PDP button style shape. */
    braintree_paypal_button_location_productpage_type_paypal_shape?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal PDP button show. */
    braintree_paypal_button_location_productpage_type_paypal_show?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal Credit Merchant Name on the FCA Register. */
    braintree_paypal_credit_uk_merchant_name?: Maybe<Scalars['String']['output']>;
    /** Should display Braintree PayPal in mini-cart & cart? */
    braintree_paypal_display_on_shopping_cart?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal merchant's country. */
    braintree_paypal_merchant_country?: Maybe<Scalars['String']['output']>;
    /** Braintree PayPal override for Merchant Name. */
    braintree_paypal_merchant_name_override?: Maybe<Scalars['String']['output']>;
    /** Does Braintree PayPal require the customer's billing address? */
    braintree_paypal_require_billing_address?: Maybe<Scalars['Boolean']['output']>;
    /** Does Braintree PayPal require the order line items? */
    braintree_paypal_send_cart_line_items?: Maybe<Scalars['Boolean']['output']>;
    /** Braintree PayPal vault status. */
    braintree_paypal_vault_active?: Maybe<Scalars['Boolean']['output']>;
    /** Extended Config Data - checkout/cart/delete_quote_after */
    cart_expires_in_days?: Maybe<Scalars['Int']['output']>;
    /** Indicates if gift wrapping prices are displayed on the Shopping Cart page. Possible values: 1 (Yes) and 0 (No). */
    cart_gift_wrapping?: Maybe<Scalars['String']['output']>;
    /** Indicates if printed card prices are displayed on the Shopping Cart page. Possible values: 1 (Yes) and 0 (No). */
    cart_printed_card?: Maybe<Scalars['String']['output']>;
    /** Extended Config Data - checkout/cart_link/use_qty */
    cart_summary_display_quantity?: Maybe<Scalars['Int']['output']>;
    /** The default sort order of the search results list. */
    catalog_default_sort_by?: Maybe<Scalars['String']['output']>;
    /** Corresponds to the 'Display Prices In Product Lists' field in the Admin. It indicates how FPT information is displayed on category pages. */
    category_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>;
    /** The suffix applied to category pages, such as `.htm` or `.html`. */
    category_url_suffix?: Maybe<Scalars['String']['output']>;
    /** Indicates whether only specific countries can use this payment method. */
    check_money_order_enable_for_specific_countries?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether the Check/Money Order payment method is enabled. */
    check_money_order_enabled?: Maybe<Scalars['Boolean']['output']>;
    /** The name of the party to whom the check must be payable. */
    check_money_order_make_check_payable_to?: Maybe<Scalars['String']['output']>;
    /** The maximum order amount required to qualify for the Check/Money Order payment method. */
    check_money_order_max_order_total?: Maybe<Scalars['String']['output']>;
    /** The minimum order amount required to qualify for the Check/Money Order payment method. */
    check_money_order_min_order_total?: Maybe<Scalars['String']['output']>;
    /** The status of new orders placed using the Check/Money Order payment method. */
    check_money_order_new_order_status?: Maybe<Scalars['String']['output']>;
    /** A comma-separated list of specific countries allowed to use the Check/Money Order payment method. */
    check_money_order_payment_from_specific_countries?: Maybe<Scalars['String']['output']>;
    /** The full street address or PO Box where the checks are mailed. */
    check_money_order_send_check_to?: Maybe<Scalars['String']['output']>;
    /** A number indicating the position of the Check/Money Order payment method in the list of available payment methods during checkout. */
    check_money_order_sort_order?: Maybe<Scalars['Int']['output']>;
    /** The title of the Check/Money Order payment method displayed on the storefront. */
    check_money_order_title?: Maybe<Scalars['String']['output']>;
    /** The name of the CMS page that identifies the home page for the store. */
    cms_home_page?: Maybe<Scalars['String']['output']>;
    /** A specific CMS page that displays when cookies are not enabled for the browser. */
    cms_no_cookies?: Maybe<Scalars['String']['output']>;
    /** A specific CMS page that displays when a 404 'Page Not Found' error occurs. */
    cms_no_route?: Maybe<Scalars['String']['output']>;
    /**
     * A code assigned to the store to identify it.
     * @deprecated Use `store_code` instead.
     */
    code?: Maybe<Scalars['String']['output']>;
    /** checkout/cart/configurable_product_image: which image to use for configurable products. */
    configurable_product_image: ProductImageThumbnail;
    /** Indicates whether the `parent` or child (`itself`) thumbnail should be used in the cart for configurable products. */
    configurable_thumbnail_source?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the Contact Us form in enabled. */
    contact_enabled: Scalars['Boolean']['output'];
    /** The copyright statement that appears at the bottom of each page. */
    copyright?: Maybe<Scalars['String']['output']>;
    /** Extended Config Data - general/region/state_required */
    countries_with_required_region?: Maybe<Scalars['String']['output']>;
    /** Indicates if the new accounts need confirmation. */
    create_account_confirmation?: Maybe<Scalars['Boolean']['output']>;
    /** Customer access token lifetime. */
    customer_access_token_lifetime?: Maybe<Scalars['Float']['output']>;
    /** Extended Config Data - general/country/default */
    default_country?: Maybe<Scalars['String']['output']>;
    /** The description that provides a summary of your site for search engine listings. It should not be more than 160 characters in length. */
    default_description?: Maybe<Scalars['String']['output']>;
    /** The default display currency code. */
    default_display_currency_code?: Maybe<Scalars['String']['output']>;
    /** A series of keywords that describe your store, each separated by a comma. */
    default_keywords?: Maybe<Scalars['String']['output']>;
    /** The title that appears at the title bar of each page when viewed in a browser. */
    default_title?: Maybe<Scalars['String']['output']>;
    /** Controls the display of the demo store notice at the top of the page. Options: 0 (No) or 1 (Yes). */
    demonotice?: Maybe<Scalars['Int']['output']>;
    /** Extended Config Data - general/region/display_all */
    display_state_if_optional?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether customers can have multiple wish lists. Possible values: 1 (Yes) and 0 (No). */
    enable_multiple_wishlists?: Maybe<Scalars['String']['output']>;
    /** The landing page that is associated with the base URL. */
    front?: Maybe<Scalars['String']['output']>;
    /** The default number of products per page in Grid View. */
    grid_per_page?: Maybe<Scalars['Int']['output']>;
    /** A list of numbers that define how many products can be displayed in Grid View. */
    grid_per_page_values?: Maybe<Scalars['String']['output']>;
    /** checkout/cart/grouped_product_image: which image to use for grouped products. */
    grouped_product_image: ProductImageThumbnail;
    /** Scripts that must be included in the HTML before the closing `<head>` tag. */
    head_includes?: Maybe<Scalars['String']['output']>;
    /** The small graphic image (favicon) that appears in the address bar and tab of the browser. */
    head_shortcut_icon?: Maybe<Scalars['String']['output']>;
    /** The path to the logo that appears in the header. */
    header_logo_src?: Maybe<Scalars['String']['output']>;
    /**
     * The ID number assigned to the store.
     * @deprecated Use `store_code` instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether the store view has been designated as the default within the store group. */
    is_default_store?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether the store group has been designated as the default within the website. */
    is_default_store_group?: Maybe<Scalars['Boolean']['output']>;
    /** Extended Config Data - checkout/options/guest_checkout */
    is_guest_checkout_enabled?: Maybe<Scalars['Boolean']['output']>;
    /** Extended Config Data - checkout/options/onepage_checkout_enabled */
    is_one_page_checkout_enabled?: Maybe<Scalars['Boolean']['output']>;
    /** The format of the search results list. */
    list_mode?: Maybe<Scalars['String']['output']>;
    /** The default number of products per page in List View. */
    list_per_page?: Maybe<Scalars['Int']['output']>;
    /** A list of numbers that define how many products can be displayed in List View. */
    list_per_page_values?: Maybe<Scalars['String']['output']>;
    /** The store locale. */
    locale?: Maybe<Scalars['String']['output']>;
    /** The Alt text that is associated with the logo. */
    logo_alt?: Maybe<Scalars['String']['output']>;
    /** The height of the logo image, in pixels. */
    logo_height?: Maybe<Scalars['Int']['output']>;
    /** The width of the logo image, in pixels. */
    logo_width?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether reward points functionality is enabled. Possible values: 1 (Enabled) and 0 (Disabled). */
    magento_reward_general_is_enabled?: Maybe<Scalars['String']['output']>;
    /** Indicates whether reward points functionality is enabled on the storefront. Possible values: 1 (Enabled) and 0 (Disabled). */
    magento_reward_general_is_enabled_on_front?: Maybe<Scalars['String']['output']>;
    /** The minimum point balance customers must have before they can redeem them. A null value indicates no minimum. */
    magento_reward_general_min_points_balance?: Maybe<Scalars['String']['output']>;
    /** When enabled, customers can see a detailed history of their reward points. Possible values: 1 (Enabled) and 0 (Disabled). */
    magento_reward_general_publish_history?: Maybe<Scalars['String']['output']>;
    /** The number of points for a referral when an invitee registers on the site. */
    magento_reward_points_invitation_customer?: Maybe<Scalars['String']['output']>;
    /** The maximum number of registration referrals that will qualify for rewards. A null value indicates no limit. */
    magento_reward_points_invitation_customer_limit?: Maybe<Scalars['String']['output']>;
    /** The number of points for a referral, when an invitee places their first order on the site. */
    magento_reward_points_invitation_order?: Maybe<Scalars['String']['output']>;
    /** The number of order conversions that can earn points for the customer who sends the invitation. A null value indicates no limit. */
    magento_reward_points_invitation_order_limit?: Maybe<Scalars['String']['output']>;
    /** The number of points earned by registered customers who subscribe to a newsletter. */
    magento_reward_points_newsletter?: Maybe<Scalars['String']['output']>;
    /** Indicates customers earn points for shopping according to the reward point exchange rate. In Luma, this also controls whether to show a message in the shopping cart about the rewards points earned for the purchase, as well as the customer’s current reward point balance. */
    magento_reward_points_order?: Maybe<Scalars['String']['output']>;
    /** The number of points customer gets for registering. */
    magento_reward_points_register?: Maybe<Scalars['String']['output']>;
    /** The number of points for writing a review. */
    magento_reward_points_review?: Maybe<Scalars['String']['output']>;
    /** The maximum number of reviews that will qualify for the rewards. A null value indicates no limit. */
    magento_reward_points_review_limit?: Maybe<Scalars['String']['output']>;
    /** Indicates whether wishlists are enabled (1) or disabled (0). */
    magento_wishlist_general_is_enabled?: Maybe<Scalars['String']['output']>;
    /** Extended Config Data - checkout/options/max_items_display_count */
    max_items_in_order_summary?: Maybe<Scalars['Int']['output']>;
    /** If multiple wish lists are enabled, the maximum number of wish lists the customer can have. */
    maximum_number_of_wishlists?: Maybe<Scalars['String']['output']>;
    /** Extended Config Data - checkout/sidebar/display */
    minicart_display?: Maybe<Scalars['Boolean']['output']>;
    /** Extended Config Data - checkout/sidebar/count */
    minicart_max_items?: Maybe<Scalars['Int']['output']>;
    /** The minimum number of characters required for a valid password. */
    minimum_password_length?: Maybe<Scalars['String']['output']>;
    /** Indicates whether newsletters are enabled. */
    newsletter_enabled: Scalars['Boolean']['output'];
    /** The default page that displays when a 404 'Page not Found' error occurs. */
    no_route?: Maybe<Scalars['String']['output']>;
    /** Extended Config Data - general/country/optional_zip_countries */
    optional_zip_countries?: Maybe<Scalars['String']['output']>;
    /** Indicates whether orders can be cancelled by customers or not. */
    order_cancellation_enabled: Scalars['Boolean']['output'];
    /** An array containing available cancellation reasons. */
    order_cancellation_reasons: Array<Maybe<CancellationReason>>;
    /** Payflow Pro vault status. */
    payment_payflowpro_cc_vault_active?: Maybe<Scalars['String']['output']>;
    /** The default price of a printed card that accompanies an order. */
    printed_card_price?: Maybe<Scalars['String']['output']>;
    /** Corresponds to the 'Display Prices On Product View Page' field in the Admin. It indicates how FPT information is displayed on product pages. */
    product_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>;
    /** Indicates whether product reviews are enabled. Possible values: 1 (Yes) and 0 (No). */
    product_reviews_enabled?: Maybe<Scalars['String']['output']>;
    /** The suffix applied to product pages, such as `.htm` or `.html`. */
    product_url_suffix?: Maybe<Scalars['String']['output']>;
    /** The number of different character classes (lowercase, uppercase, digits, special characters) required in a password. */
    required_character_classes_number?: Maybe<Scalars['String']['output']>;
    /** Indicates whether RMA is enabled on the storefront. Possible values: enabled/disabled. */
    returns_enabled: Scalars['String']['output'];
    /**
     * The ID of the root category.
     * @deprecated Use `root_category_uid` instead.
     */
    root_category_id?: Maybe<Scalars['Int']['output']>;
    /** The unique ID for a `CategoryInterface` object. */
    root_category_uid?: Maybe<Scalars['ID']['output']>;
    /** Corresponds to the 'Display Prices In Sales Modules' field in the Admin. It indicates how FPT information is displayed on cart, checkout, and order pages. */
    sales_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>;
    /** Indicates if gift wrapping prices are displayed on the Orders page. Possible values: 1 (Yes) and 0 (No). */
    sales_gift_wrapping?: Maybe<Scalars['String']['output']>;
    /** Indicates if printed card prices are displayed on the Orders page. Possible values: 1 (Yes) and 0 (No). */
    sales_printed_card?: Maybe<Scalars['String']['output']>;
    /** A secure fully-qualified URL that is used to create relative links to the `base_url`. */
    secure_base_link_url?: Maybe<Scalars['String']['output']>;
    /** The secure fully-qualified URL that specifies the location of media files. */
    secure_base_media_url?: Maybe<Scalars['String']['output']>;
    /** The secure fully-qualified URL that specifies the location of static view files. */
    secure_base_static_url?: Maybe<Scalars['String']['output']>;
    /** The store’s fully-qualified secure base URL. */
    secure_base_url?: Maybe<Scalars['String']['output']>;
    /** Email to a Friend configuration. */
    send_friend?: Maybe<SendFriendConfiguration>;
    /** Extended Config Data - tax/cart_display/full_summary */
    shopping_cart_display_full_summary?: Maybe<Scalars['Boolean']['output']>;
    /** Extended Config Data - tax/cart_display/grandtotal */
    shopping_cart_display_grand_total?: Maybe<Scalars['Boolean']['output']>;
    /** Extended Config Data - tax/cart_display/price */
    shopping_cart_display_price?: Maybe<Scalars['Int']['output']>;
    /** Extended Config Data - tax/cart_display/shipping */
    shopping_cart_display_shipping?: Maybe<Scalars['Int']['output']>;
    /** Extended Config Data - tax/cart_display/subtotal */
    shopping_cart_display_subtotal?: Maybe<Scalars['Int']['output']>;
    /** Extended Config Data - tax/cart_display/gift_wrapping */
    shopping_cart_display_tax_gift_wrapping?: Maybe<TaxWrappingEnum>;
    /** Extended Config Data - tax/cart_display/zero_tax */
    shopping_cart_display_zero_tax?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether a breadcrumb trail appears on all CMS pages in the catalog. 0 (No) or 1 (Yes). */
    show_cms_breadcrumbs?: Maybe<Scalars['Int']['output']>;
    /** The unique ID of the store view. In the Admin, this is called the Store View Code. When making a GraphQL call, assign this value to the `Store` header to provide the scope. */
    store_code?: Maybe<Scalars['ID']['output']>;
    /** The unique ID assigned to the store group. In the Admin, this is called the Store Name. */
    store_group_code?: Maybe<Scalars['ID']['output']>;
    /** The label assigned to the store group. */
    store_group_name?: Maybe<Scalars['String']['output']>;
    /** The label assigned to the store view. */
    store_name?: Maybe<Scalars['String']['output']>;
    /** The store view sort order. */
    store_sort_order?: Maybe<Scalars['Int']['output']>;
    /** The time zone of the store. */
    timezone?: Maybe<Scalars['String']['output']>;
    /** A prefix that appears before the title to create a two- or three-part title. */
    title_prefix?: Maybe<Scalars['String']['output']>;
    /** The character that separates the category name and subcategory in the browser title bar. */
    title_separator?: Maybe<Scalars['String']['output']>;
    /** A suffix that appears after the title to create a two- or three-part title. */
    title_suffix?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the store code should be used in the URL. */
    use_store_in_url?: Maybe<Scalars['Boolean']['output']>;
    /** The unique ID for the website. */
    website_code?: Maybe<Scalars['ID']['output']>;
    /**
     * The ID number assigned to the website store.
     * @deprecated The field should not be used on the storefront.
     */
    website_id?: Maybe<Scalars['Int']['output']>;
    /** The label assigned to the website. */
    website_name?: Maybe<Scalars['String']['output']>;
    /** The unit of weight. */
    weight_unit?: Maybe<Scalars['String']['output']>;
    /** Text that appears in the header of the page and includes the name of the logged in customer. */
    welcome?: Maybe<Scalars['String']['output']>;
    /** Indicates whether only specific countries can use this payment method. */
    zero_subtotal_enable_for_specific_countries?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether the Zero Subtotal payment method is enabled. */
    zero_subtotal_enabled?: Maybe<Scalars['Boolean']['output']>;
    /** The status of new orders placed using the Zero Subtotal payment method. */
    zero_subtotal_new_order_status?: Maybe<Scalars['String']['output']>;
    /** When the new order status is 'Processing', this can be set to `authorize_capture` to automatically invoice all items that have a zero balance. */
    zero_subtotal_payment_action?: Maybe<Scalars['String']['output']>;
    /** A comma-separated list of specific countries allowed to use the Zero Subtotal payment method. */
    zero_subtotal_payment_from_specific_countries?: Maybe<Scalars['String']['output']>;
    /** A number indicating the position of the Zero Subtotal payment method in the list of available payment methods during checkout. */
    zero_subtotal_sort_order?: Maybe<Scalars['Int']['output']>;
    /** The title of the Zero Subtotal payment method displayed on the storefront. */
    zero_subtotal_title?: Maybe<Scalars['String']['output']>;
};
/** Indicates where an attribute can be displayed. */
export type StorefrontProperties = {
    __typename?: 'StorefrontProperties';
    /** The relative position of the attribute in the layered navigation block. */
    position?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether the attribute is filterable with results, without results, or not at all. */
    use_in_layered_navigation?: Maybe<UseInLayeredNavigationOptions>;
    /** Indicates whether the attribute is displayed in product listings. */
    use_in_product_listing?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether the attribute can be used in layered navigation on search results pages. */
    use_in_search_results_layered_navigation?: Maybe<Scalars['Boolean']['output']>;
    /** Indicates whether the attribute is displayed on product pages. */
    visible_on_catalog_pages?: Maybe<Scalars['Boolean']['output']>;
};
export type String_Container = {
    __typename?: 'String_container';
    String?: Maybe<Scalars['String']['output']>;
};
/** Contains the result of the `subscribeEmailToNewsletter` operation. */
export type SubscribeEmailToNewsletterOutput = {
    __typename?: 'SubscribeEmailToNewsletterOutput';
    /** The status of the subscription request. */
    status?: Maybe<SubscriptionStatusesEnum>;
};
/** Indicates the status of the request. */
export declare enum SubscriptionStatusesEnum {
    NotActive = "NOT_ACTIVE",
    Subscribed = "SUBSCRIBED",
    Unconfirmed = "UNCONFIRMED",
    Unsubscribed = "UNSUBSCRIBED"
}
/** Describes the swatch type and a value. */
export type SwatchData = {
    __typename?: 'SwatchData';
    /** The type of swatch filter item: 1 - text; 2 - image. */
    type?: Maybe<Scalars['String']['output']>;
    /** The value for the swatch item. It could be text or an image link. */
    value?: Maybe<Scalars['String']['output']>;
};
export type SwatchDataInterface = {
    /** The value can be represented as color (HEX code), image link, or text. */
    value?: Maybe<Scalars['String']['output']>;
};
/** Swatch attribute metadata input types. */
export declare enum SwatchInputTypeEnum {
    Boolean = "BOOLEAN",
    Date = "DATE",
    Datetime = "DATETIME",
    Dropdown = "DROPDOWN",
    File = "FILE",
    Gallery = "GALLERY",
    Hidden = "HIDDEN",
    Image = "IMAGE",
    MediaImage = "MEDIA_IMAGE",
    Multiline = "MULTILINE",
    Multiselect = "MULTISELECT",
    Price = "PRICE",
    Select = "SELECT",
    Text = "TEXT",
    Textarea = "TEXTAREA",
    Undefined = "UNDEFINED",
    Visual = "VISUAL",
    Weight = "WEIGHT"
}
export type SwatchLayerFilterItem = LayerFilterItemInterface & SwatchLayerFilterItemInterface & {
    __typename?: 'SwatchLayerFilterItem';
    /**
     * The count of items per filter.
     * @deprecated Use `AggregationOption.count` instead.
     */
    items_count?: Maybe<Scalars['Int']['output']>;
    /**
     * The label for a filter.
     * @deprecated Use `AggregationOption.label` instead.
     */
    label?: Maybe<Scalars['String']['output']>;
    /** Data required to render a swatch filter item. */
    swatch_data?: Maybe<SwatchData>;
    /**
     * The value of a filter request variable to be used in query.
     * @deprecated Use `AggregationOption.value` instead.
     */
    value_string?: Maybe<Scalars['String']['output']>;
};
export type SwatchLayerFilterItemInterface = {
    /** Data required to render a swatch filter item. */
    swatch_data?: Maybe<SwatchData>;
};
/** Synchronizes the payment order details */
export type SyncPaymentOrderInput = {
    /** The customer cart ID */
    cartId: Scalars['String']['input'];
    /** PayPal order ID */
    id: Scalars['String']['input'];
};
/** Contains tax item details. */
export type TaxItem = {
    __typename?: 'TaxItem';
    /** The amount of tax applied to the item. */
    amount: Money;
    /** The rate used to calculate the tax. */
    rate: Scalars['Float']['output'];
    /** A title that describes the tax. */
    title: Scalars['String']['output'];
};
export declare enum TaxWrappingEnum {
    DisplayExcludingTax = "DISPLAY_EXCLUDING_TAX",
    DisplayIncludingTax = "DISPLAY_INCLUDING_TAX",
    DisplayTypeBoth = "DISPLAY_TYPE_BOTH"
}
export type TextSwatchData = SwatchDataInterface & {
    __typename?: 'TextSwatchData';
    /** The value can be represented as color (HEX code), image link, or text. */
    value?: Maybe<Scalars['String']['output']>;
};
/** Defines a price based on the quantity purchased. */
export type TierPrice = {
    __typename?: 'TierPrice';
    /** The price discount that this tier represents. */
    discount?: Maybe<ProductDiscount>;
    /** The price of the product at this tier. */
    final_price?: Maybe<Money>;
    /** The minimum number of items that must be purchased to qualify for this price tier. */
    quantity?: Maybe<Scalars['Float']['output']>;
};
/** Modifies the specified items in the cart. */
export type UpdateCartItemsInput = {
    /** The unique ID of a `Cart` object. */
    cart_id: Scalars['String']['input'];
    /** An array of items to be updated. */
    cart_items: Array<InputMaybe<CartItemUpdateInput>>;
};
/** Contains details about the cart after updating items. */
export type UpdateCartItemsOutput = {
    __typename?: 'UpdateCartItemsOutput';
    /** The cart after updating products. */
    cart: Cart;
};
/** Defines updates to a `GiftRegistry` object. */
export type UpdateGiftRegistryInput = {
    /** Additional attributes specified as a code-value pair. Unspecified dynamic attributes are not changed. */
    dynamic_attributes?: InputMaybe<Array<InputMaybe<GiftRegistryDynamicAttributeInput>>>;
    /** The updated name of the event. */
    event_name?: InputMaybe<Scalars['String']['input']>;
    /** The updated message describing the event. */
    message?: InputMaybe<Scalars['String']['input']>;
    /** Indicates whether the gift registry is PRIVATE or PUBLIC. */
    privacy_settings?: InputMaybe<GiftRegistryPrivacySettings>;
    /** The updated shipping address for all gift registry items. */
    shipping_address?: InputMaybe<GiftRegistryShippingAddressInput>;
    /** Indicates whether the gift registry is ACTIVE or INACTIVE. */
    status?: InputMaybe<GiftRegistryStatus>;
};
/** Defines updates to an item in a gift registry. */
export type UpdateGiftRegistryItemInput = {
    /** The unique ID of a `giftRegistryItem` object. */
    gift_registry_item_uid: Scalars['ID']['input'];
    /** The updated description of the item. */
    note?: InputMaybe<Scalars['String']['input']>;
    /** The updated quantity of the gift registry item. */
    quantity: Scalars['Float']['input'];
};
/** Contains the results of a request to update gift registry items. */
export type UpdateGiftRegistryItemsOutput = {
    __typename?: 'UpdateGiftRegistryItemsOutput';
    /** The gift registry after updating updating items. */
    gift_registry?: Maybe<GiftRegistry>;
};
/** Contains the results of a request to update a gift registry. */
export type UpdateGiftRegistryOutput = {
    __typename?: 'UpdateGiftRegistryOutput';
    /** The updated gift registry. */
    gift_registry?: Maybe<GiftRegistry>;
};
/** Defines updates to an existing registrant. */
export type UpdateGiftRegistryRegistrantInput = {
    /** As a result of the update, only the values of provided attributes will be affected. If the attribute is missing in the request, its value will not be changed. */
    dynamic_attributes?: InputMaybe<Array<InputMaybe<GiftRegistryDynamicAttributeInput>>>;
    /** The updated email address of the registrant. */
    email?: InputMaybe<Scalars['String']['input']>;
    /** The updated first name of the registrant. */
    firstname?: InputMaybe<Scalars['String']['input']>;
    /** The unique ID of a `giftRegistryRegistrant` object. */
    gift_registry_registrant_uid: Scalars['ID']['input'];
    /** The updated last name of the registrant. */
    lastname?: InputMaybe<Scalars['String']['input']>;
};
/** Contains the results a request to update registrants. */
export type UpdateGiftRegistryRegistrantsOutput = {
    __typename?: 'UpdateGiftRegistryRegistrantsOutput';
    /** The gift registry after updating registrants. */
    gift_registry?: Maybe<GiftRegistry>;
};
/** Contains the customer's wish list and any errors encountered. */
export type UpdateProductsInWishlistOutput = {
    __typename?: 'UpdateProductsInWishlistOutput';
    /** An array of errors encountered while updating products in a wish list. */
    user_errors: Array<Maybe<WishListUserInputError>>;
    /** Contains the wish list with all items that were successfully updated. */
    wishlist: Wishlist;
};
/** Contains the name and visibility of an updated wish list. */
export type UpdateWishlistOutput = {
    __typename?: 'UpdateWishlistOutput';
    /** The wish list name. */
    name: Scalars['String']['output'];
    /** The unique ID of a `Wishlist` object. */
    uid: Scalars['ID']['output'];
    /** Indicates whether the wish list is public or private. */
    visibility: WishlistVisibilityEnum;
};
/** Contains URL rewrite details. */
export type UrlRewrite = {
    __typename?: 'UrlRewrite';
    /** An array of request parameters. */
    parameters?: Maybe<Array<Maybe<HttpQueryParameter>>>;
    /** The request URL. */
    url?: Maybe<Scalars['String']['output']>;
};
/** This enumeration defines the entity type. */
export declare enum UrlRewriteEntityTypeEnum {
    Category = "CATEGORY",
    CmsPage = "CMS_PAGE",
    Product = "PRODUCT"
}
/** Defines whether the attribute is filterable in layered navigation. */
export declare enum UseInLayeredNavigationOptions {
    FilterableNoResult = "FILTERABLE_NO_RESULT",
    FilterableWithResults = "FILTERABLE_WITH_RESULTS",
    No = "NO"
}
/** Defines a customer attribute validation rule. */
export type ValidationRule = {
    __typename?: 'ValidationRule';
    /** Validation rule name applied to a customer attribute. */
    name?: Maybe<ValidationRuleEnum>;
    /** Validation rule value. */
    value?: Maybe<Scalars['String']['output']>;
};
/** List of validation rule names applied to a customer attribute. */
export declare enum ValidationRuleEnum {
    DateRangeMax = "DATE_RANGE_MAX",
    DateRangeMin = "DATE_RANGE_MIN",
    FileExtensions = "FILE_EXTENSIONS",
    InputValidation = "INPUT_VALIDATION",
    MaxFileSize = "MAX_FILE_SIZE",
    MaxImageHeight = "MAX_IMAGE_HEIGHT",
    MaxImageWidth = "MAX_IMAGE_WIDTH",
    MaxTextLength = "MAX_TEXT_LENGTH",
    MinTextLength = "MIN_TEXT_LENGTH"
}
/** Vault payment inputs */
export type VaultMethodInput = {
    /** The payment source for the payment method */
    payment_source?: InputMaybe<Scalars['String']['input']>;
    /** The payment services order ID */
    payments_order_id?: InputMaybe<Scalars['String']['input']>;
    /** PayPal order ID */
    paypal_order_id?: InputMaybe<Scalars['String']['input']>;
    /** The public hash of the token. */
    public_hash?: InputMaybe<Scalars['String']['input']>;
};
/** Contains required input for payment methods with Vault support. */
export type VaultTokenInput = {
    /** The public hash of the payment token. */
    public_hash: Scalars['String']['input'];
};
/** An implementation for virtual product cart items. */
export type VirtualCartItem = CartItemInterface & {
    __typename?: 'VirtualCartItem';
    /** An array containing customizable options the shopper selected. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** An array of errors encountered while loading the cart item */
    errors?: Maybe<Array<Maybe<CartItemError>>>;
    /** @deprecated Use `uid` instead. */
    id: Scalars['String']['output'];
    /** True if requested quantity is less than available stock, false otherwise. */
    is_available: Scalars['Boolean']['output'];
    /** Message to display when the product is not available with this selected option. */
    not_available_message?: Maybe<Scalars['String']['output']>;
    /** Contains details about the price of the item, including taxes and discounts. */
    prices?: Maybe<CartItemPrices>;
    /** Details about an item in the cart. */
    product: ProductInterface;
    /** The quantity of this item in the cart. */
    quantity: Scalars['Float']['output'];
    /** The unique ID for a `CartItemInterface` object. */
    uid: Scalars['ID']['output'];
};
/** Defines a virtual product, which is a non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProduct = CustomizableProductInterface & ProductInterface & RoutableInterface & {
    __typename?: 'VirtualProduct';
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_announcement_date?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_brand?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_custom_engraving_text?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_detailed_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_description_pagebuilder_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_gemstone_addon?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    accessory_recyclable_material?: Maybe<Scalars['Int']['output']>;
    /**
     * The attribute set assigned to the product.
     * @deprecated The field should not be used on the storefront.
     */
    attribute_set_id?: Maybe<Scalars['Int']['output']>;
    /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
    canonical_url?: Maybe<Scalars['String']['output']>;
    /** The categories assigned to a product. */
    categories?: Maybe<Array<Maybe<CategoryInterface>>>;
    /** @deprecated Use the `custom_attributes` field instead. */
    color?: Maybe<Scalars['Int']['output']>;
    /** The product's country of origin. */
    country_of_manufacture?: Maybe<Scalars['String']['output']>;
    /**
     * Timestamp indicating when the product was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: Maybe<Scalars['String']['output']>;
    /** An array of cross-sell products. */
    crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** Product custom attributes. */
    custom_attributesV2?: Maybe<ProductCustomAttributes>;
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: Maybe<ComplexTextValue>;
    /** @deprecated Use the `custom_attributes` field instead. */
    description_extra?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_color?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_material?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_size?: Maybe<Scalars['Int']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    fashion_style?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    format?: Maybe<Scalars['Int']['output']>;
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    has_video?: Maybe<Scalars['Int']['output']>;
    /**
     * The ID number assigned to the product.
     * @deprecated Use the `uid` field instead.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /** The relative path to the main image on the product page. */
    image?: Maybe<ProductImage>;
    /** Indicates whether the product can be returned. */
    is_returnable?: Maybe<Scalars['String']['output']>;
    /**
     * A number representing the product's manufacturer.
     * @deprecated Use the `custom_attributes` field instead.
     */
    manufacturer?: Maybe<Scalars['Int']['output']>;
    /** An array of media gallery objects. */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use `media_gallery` instead.
     */
    media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: Maybe<Scalars['String']['output']>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: Maybe<Scalars['String']['output']>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: Maybe<Scalars['String']['output']>;
    /** The product name. Customers use this name to identify the product. */
    name?: Maybe<Scalars['String']['output']>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    new_from_date?: Maybe<Scalars['String']['output']>;
    /** The end date for new product listings. */
    new_to_date?: Maybe<Scalars['String']['output']>;
    /** Product stock only x left count */
    only_x_left_in_stock?: Maybe<Scalars['Float']['output']>;
    /** An array of options for a customizable product. */
    options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: Maybe<Scalars['String']['output']>;
    /**
     * Indicates the price of an item.
     * @deprecated Use `price_range` for product price information.
     */
    price?: Maybe<ProductPrices>;
    /** The range of prices for the product */
    price_range: PriceRange;
    /** An array of `TierPrice` objects. */
    price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
    /** An array of `ProductLinks` objects. */
    product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
    /** The average of all the ratings given to the product. */
    rating_summary: Scalars['Float']['output'];
    /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
    redirect_code: Scalars['Int']['output'];
    /** An array of related products. */
    related_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']['output']>;
    /** The total count of all the reviews given to the product. */
    review_count: Scalars['Int']['output'];
    /** The list of products reviews. */
    reviews: ProductReviews;
    /** A short description of the product. Its use depends on the theme. */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: Maybe<ProductImage>;
    /**
     * The beginning date that a product has a special price.
     * @deprecated The field should not be used on the storefront.
     */
    special_from_date?: Maybe<Scalars['String']['output']>;
    /** The discounted price of the product. */
    special_price?: Maybe<Scalars['Float']['output']>;
    /** The end date for a product with a special price. */
    special_to_date?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the product is staged for a future campaign. */
    staged: Scalars['Boolean']['output'];
    /** Stock status of the product */
    stock_status?: Maybe<ProductStockStatus>;
    /** The file name of a swatch image. */
    swatch_image?: Maybe<Scalars['String']['output']>;
    /** The relative path to the product's thumbnail image. */
    thumbnail?: Maybe<ProductImage>;
    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_price?: Maybe<Scalars['Float']['output']>;
    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use `price_tiers` for product tier price information.
     */
    tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>;
    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use `__typename` instead.
     */
    type_id?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `ProductInterface` object. */
    uid: Scalars['ID']['output'];
    /**
     * Timestamp indicating when the product was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** An array of up-sell products. */
    upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
    /** The part of the URL that identifies the product */
    url_key?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use product's `canonical_url` or url rewrites instead */
    url_path?: Maybe<Scalars['String']['output']>;
    /** URL rewrites list */
    url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
    /** The part of the product URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']['output']>;
    /** @deprecated Use the `custom_attributes` field instead. */
    video_file?: Maybe<Scalars['String']['output']>;
    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Maybe<Array<Maybe<Website>>>;
};
/** Defines a virtual product, which is a non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProductCustom_AttributesV2Args = {
    filters?: InputMaybe<AttributeFilterInput>;
};
/** Defines a virtual product, which is a non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProductReviewsArgs = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** Defines a single product to add to the cart. */
export type VirtualProductCartItemInput = {
    /** An array that defines customizable options for the product. */
    customizable_options?: InputMaybe<Array<InputMaybe<CustomizableOptionInput>>>;
    /** An object containing the `sku`, `quantity`, and other relevant information about the product. */
    data: CartItemInput;
};
/** Contains a virtual product wish list item. */
export type VirtualWishlistItem = WishlistItemInterface & {
    __typename?: 'VirtualWishlistItem';
    /** The date and time the item was added to the wish list. */
    added_at: Scalars['String']['output'];
    /** Custom options selected for the wish list item. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** The description of the item. */
    description?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `WishlistItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Product details of the wish list item. */
    product?: Maybe<ProductInterface>;
    /** The quantity of this wish list item. */
    quantity: Scalars['Float']['output'];
};
/** Deprecated. It should not be used on the storefront. Contains information about a website. */
export type Website = {
    __typename?: 'Website';
    /**
     * A code assigned to the website to identify it.
     * @deprecated The field should not be used on the storefront.
     */
    code?: Maybe<Scalars['String']['output']>;
    /**
     * The default group ID of the website.
     * @deprecated The field should not be used on the storefront.
     */
    default_group_id?: Maybe<Scalars['String']['output']>;
    /**
     * The ID number assigned to the website.
     * @deprecated The field should not be used on the storefront.
     */
    id?: Maybe<Scalars['Int']['output']>;
    /**
     * Indicates whether this is the default website.
     * @deprecated The field should not be used on the storefront.
     */
    is_default?: Maybe<Scalars['Boolean']['output']>;
    /**
     * The website name. Websites use this name to identify it easier.
     * @deprecated The field should not be used on the storefront.
     */
    name?: Maybe<Scalars['String']['output']>;
    /**
     * The attribute to use for sorting websites.
     * @deprecated The field should not be used on the storefront.
     */
    sort_order?: Maybe<Scalars['Int']['output']>;
};
/** An error encountered while performing operations with WishList. */
export type WishListUserInputError = {
    __typename?: 'WishListUserInputError';
    /** A wish list-specific error code. */
    code: WishListUserInputErrorType;
    /** A localized error message. */
    message: Scalars['String']['output'];
};
/** A list of possible error types. */
export declare enum WishListUserInputErrorType {
    ProductNotFound = "PRODUCT_NOT_FOUND",
    Undefined = "UNDEFINED"
}
/** Contains a customer wish list. */
export type Wishlist = {
    __typename?: 'Wishlist';
    /** The unique ID for a `Wishlist` object. */
    id?: Maybe<Scalars['ID']['output']>;
    /** @deprecated Use the `items_v2` field instead. */
    items?: Maybe<Array<Maybe<WishlistItem>>>;
    /** The number of items in the wish list. */
    items_count?: Maybe<Scalars['Int']['output']>;
    /** An array of items in the customer's wish list. */
    items_v2?: Maybe<WishlistItems>;
    /** The name of the wish list. */
    name?: Maybe<Scalars['String']['output']>;
    /** An encrypted code that Magento uses to link to the wish list. */
    sharing_code?: Maybe<Scalars['String']['output']>;
    /** The time of the last modification to the wish list. */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** Indicates whether the wish list is public or private. */
    visibility: WishlistVisibilityEnum;
};
/** Contains a customer wish list. */
export type WishlistItems_V2Args = {
    currentPage?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
};
/** Contains details about errors encountered when a customer added wish list items to the cart. */
export type WishlistCartUserInputError = {
    __typename?: 'WishlistCartUserInputError';
    /** An error code that describes the error encountered. */
    code: WishlistCartUserInputErrorType;
    /** A localized error message. */
    message: Scalars['String']['output'];
    /** The unique ID of the `Wishlist` object containing an error. */
    wishlistId: Scalars['ID']['output'];
    /** The unique ID of the wish list item containing an error. */
    wishlistItemId: Scalars['ID']['output'];
};
/** A list of possible error types. */
export declare enum WishlistCartUserInputErrorType {
    InsufficientStock = "INSUFFICIENT_STOCK",
    NotSalable = "NOT_SALABLE",
    ProductNotFound = "PRODUCT_NOT_FOUND",
    Undefined = "UNDEFINED"
}
/** Contains details about a wish list item. */
export type WishlistItem = {
    __typename?: 'WishlistItem';
    /** The time when the customer added the item to the wish list. */
    added_at?: Maybe<Scalars['String']['output']>;
    /** The customer's comment about this item. */
    description?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `WishlistItem` object. */
    id?: Maybe<Scalars['Int']['output']>;
    /** Details about the wish list item. */
    product?: Maybe<ProductInterface>;
    /** The quantity of this wish list item */
    qty?: Maybe<Scalars['Float']['output']>;
};
/** Specifies the IDs of items to copy and their quantities. */
export type WishlistItemCopyInput = {
    /** The quantity of this item to copy to the destination wish list. This value can't be greater than the quantity in the source wish list. */
    quantity?: InputMaybe<Scalars['Float']['input']>;
    /** The unique ID of the `WishlistItemInterface` object to be copied. */
    wishlist_item_id: Scalars['ID']['input'];
};
/** Defines the items to add to a wish list. */
export type WishlistItemInput = {
    /** An array of options that the customer entered. */
    entered_options?: InputMaybe<Array<InputMaybe<EnteredOptionInput>>>;
    /** For complex product types, the SKU of the parent product. */
    parent_sku?: InputMaybe<Scalars['String']['input']>;
    /** The amount or number of items to add. */
    quantity: Scalars['Float']['input'];
    /** An array of strings corresponding to options the customer selected. */
    selected_options?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    /** The SKU of the product to add. For complex product types, specify the child product SKU. */
    sku: Scalars['String']['input'];
};
/** The interface for wish list items. */
export type WishlistItemInterface = {
    /** The date and time the item was added to the wish list. */
    added_at: Scalars['String']['output'];
    /** Custom options selected for the wish list item. */
    customizable_options: Array<Maybe<SelectedCustomizableOption>>;
    /** The description of the item. */
    description?: Maybe<Scalars['String']['output']>;
    /** The unique ID for a `WishlistItemInterface` object. */
    id: Scalars['ID']['output'];
    /** Product details of the wish list item. */
    product?: Maybe<ProductInterface>;
    /** The quantity of this wish list item. */
    quantity: Scalars['Float']['output'];
};
/** Specifies the IDs of the items to move and their quantities. */
export type WishlistItemMoveInput = {
    /** The quantity of this item to move to the destination wish list. This value can't be greater than the quantity in the source wish list. */
    quantity?: InputMaybe<Scalars['Float']['input']>;
    /** The unique ID of the `WishlistItemInterface` object to be moved. */
    wishlist_item_id: Scalars['ID']['input'];
};
/** Defines updates to items in a wish list. */
export type WishlistItemUpdateInput = {
    /** Customer-entered comments about the item. */
    description?: InputMaybe<Scalars['String']['input']>;
    /** An array of options that the customer entered. */
    entered_options?: InputMaybe<Array<InputMaybe<EnteredOptionInput>>>;
    /** The new amount or number of this item. */
    quantity?: InputMaybe<Scalars['Float']['input']>;
    /** An array of strings corresponding to options the customer selected. */
    selected_options?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    /** The unique ID for a `WishlistItemInterface` object. */
    wishlist_item_id: Scalars['ID']['input'];
};
/** Contains an array of items in a wish list. */
export type WishlistItems = {
    __typename?: 'WishlistItems';
    /** A list of items in the wish list. */
    items: Array<Maybe<WishlistItemInterface>>;
    /** Contains pagination metadata. */
    page_info?: Maybe<SearchResultPageInfo>;
};
/** Deprecated: Use the `Wishlist` type instead. */
export type WishlistOutput = {
    __typename?: 'WishlistOutput';
    /**
     * An array of items in the customer's wish list
     * @deprecated Use the `Wishlist.items` field instead.
     */
    items?: Maybe<Array<Maybe<WishlistItem>>>;
    /**
     * The number of items in the wish list.
     * @deprecated Use the `Wishlist.items_count` field instead.
     */
    items_count?: Maybe<Scalars['Int']['output']>;
    /**
     * When multiple wish lists are enabled, the name the customer assigns to the wishlist.
     * @deprecated This field is related to Commerce functionality and is always `null` in Open Source.
     */
    name?: Maybe<Scalars['String']['output']>;
    /**
     * An encrypted code that links to the wish list.
     * @deprecated Use the `Wishlist.sharing_code` field instead.
     */
    sharing_code?: Maybe<Scalars['String']['output']>;
    /**
     * The time of the last modification to the wish list.
     * @deprecated Use the `Wishlist.updated_at` field instead.
     */
    updated_at?: Maybe<Scalars['String']['output']>;
};
/** Defines the wish list visibility types. */
export declare enum WishlistVisibilityEnum {
    Private = "PRIVATE",
    Public = "PUBLIC"
}
/** Interface BundleOptionInterface */
export type Bundle_Data_Bundle_Option_Interface = {
    __typename?: 'bundle_data_bundle_option_interface';
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Bundle option id. */
    option_id: Scalars['Int']['output'];
    /** Bundle option quantity. */
    option_qty: Scalars['Int']['output'];
    /** Bundle option selection ids. */
    option_selections: Array<Maybe<Scalars['Int']['output']>>;
};
/** Interface BundleOptionInterface */
export type Bundle_Data_Bundle_Option_Interface_Input = {
    extension_attributes?: InputMaybe<Scalars['JSON']['input']>;
    /** Bundle option id. */
    option_id: Scalars['Int']['input'];
    /** Bundle option quantity. */
    option_qty: Scalars['Int']['input'];
    /** Bundle option selection ids. */
    option_selections: Array<InputMaybe<Scalars['Int']['input']>>;
};
/** ExtensionInterface class for @see \Magento\Catalog\Api\Data\CustomOptionInterface */
export type Catalog_Data_Custom_Option_Extension_Interface = {
    __typename?: 'catalog_data_custom_option_extension_interface';
    file_info?: Maybe<Framework_Data_Image_Content_Interface>;
};
/** ExtensionInterface class for @see \Magento\Catalog\Api\Data\CustomOptionInterface */
export type Catalog_Data_Custom_Option_Extension_Interface_Input = {
    file_info?: InputMaybe<Framework_Data_Image_Content_Interface_Input>;
};
/** Interface CustomOptionInterface */
export type Catalog_Data_Custom_Option_Interface = {
    __typename?: 'catalog_data_custom_option_interface';
    extension_attributes?: Maybe<Catalog_Data_Custom_Option_Extension_Interface>;
    /** Option id */
    option_id: Scalars['String']['output'];
    /** Option value */
    option_value: Scalars['String']['output'];
};
/** Interface CustomOptionInterface */
export type Catalog_Data_Custom_Option_Interface_Input = {
    extension_attributes?: InputMaybe<Catalog_Data_Custom_Option_Extension_Interface_Input>;
    /** Option id */
    option_id: Scalars['String']['input'];
    /** Option value */
    option_value: Scalars['String']['input'];
};
/** Button interface. This interface represents all manner of product buttons: add to cart, add to compare, etc... The buttons describes by this interface should have interaction with backend */
export type Catalog_Data_Product_Render_Button_Interface = {
    __typename?: 'catalog_data_product_render_button_interface';
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Post data */
    post_data: Scalars['String']['output'];
    /** Flag whether a product has options or not */
    required_options: Scalars['Boolean']['output'];
    /** Url, needed to add product to cart */
    url: Scalars['String']['output'];
};
/** ExtensionInterface class for @see \Magento\Catalog\Api\Data\ProductRenderInterface */
export type Catalog_Data_Product_Render_Extension_Interface = {
    __typename?: 'catalog_data_product_render_extension_interface';
    review_html?: Maybe<Scalars['String']['output']>;
    wishlist_button?: Maybe<Catalog_Data_Product_Render_Button_Interface>;
};
/** Formatted Price interface. Aggregate formatted html with price representations. E.g.: <span class="price">$9.00</span> Consider currency, rounding and html */
export type Catalog_Data_Product_Render_Formatted_Price_Info_Interface = {
    __typename?: 'catalog_data_product_render_formatted_price_info_interface';
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Html with final price */
    final_price: Scalars['String']['output'];
    /** Max price of a product */
    max_price: Scalars['String']['output'];
    /** Max regular price */
    max_regular_price: Scalars['String']['output'];
    /** The minimal price of the product or variation */
    minimal_price: Scalars['String']['output'];
    /** Minimal regular price */
    minimal_regular_price: Scalars['String']['output'];
    /** Price - is price of product without discounts and special price with taxes and fixed product tax */
    regular_price: Scalars['String']['output'];
    /** Special price */
    special_price: Scalars['String']['output'];
};
/** Product Render image interface. Represents physical characteristics of image, that can be used in product listing or product view */
export type Catalog_Data_Product_Render_Image_Interface = {
    __typename?: 'catalog_data_product_render_image_interface';
    /** Image code */
    code: Scalars['String']['output'];
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Image height */
    height: Scalars['Float']['output'];
    /** Image label */
    label: Scalars['String']['output'];
    /** Resize height */
    resized_height: Scalars['Float']['output'];
    /** Resize width */
    resized_width: Scalars['Float']['output'];
    /** Image url */
    url: Scalars['String']['output'];
    /** Image width in px */
    width: Scalars['Float']['output'];
};
/** Represents Data Object which holds enough information to render product This information is put into part as Add To Cart or Add to Compare Data or Price Data */
export type Catalog_Data_Product_Render_Interface = {
    __typename?: 'catalog_data_product_render_interface';
    add_to_cart_button: Catalog_Data_Product_Render_Button_Interface;
    add_to_compare_button: Catalog_Data_Product_Render_Button_Interface;
    /** Current or desired currency code to product */
    currency_code: Scalars['String']['output'];
    extension_attributes: Catalog_Data_Product_Render_Extension_Interface;
    /** Product identifier */
    id: Scalars['Int']['output'];
    /** Enough information, that needed to render image on front */
    images: Array<Maybe<Catalog_Data_Product_Render_Image_Interface>>;
    /** Information about product saleability (In Stock) */
    is_salable: Scalars['String']['output'];
    /** Product name */
    name: Scalars['String']['output'];
    price_info: Catalog_Data_Product_Render_Price_Info_Interface;
    /** Information about current store id or requested store id */
    store_id: Scalars['Int']['output'];
    /** Product type. Such as bundle, grouped, simple, etc... */
    type: Scalars['String']['output'];
    /** Product url */
    url: Scalars['String']['output'];
};
/** ExtensionInterface class for @see \Magento\Catalog\Api\Data\ProductRender\PriceInfoInterface */
export type Catalog_Data_Product_Render_Price_Info_Extension_Interface = {
    __typename?: 'catalog_data_product_render_price_info_extension_interface';
    msrp?: Maybe<Msrp_Data_Product_Render_Msrp_Price_Info_Interface>;
    /** Price interface. */
    tax_adjustments?: Maybe<Catalog_Data_Product_Render_Price_Info_Interface>;
    weee_adjustment?: Maybe<Scalars['String']['output']>;
    weee_attributes?: Maybe<Array<Maybe<Weee_Data_Product_Render_Weee_Adjustment_Attribute_Interface>>>;
};
/** Price interface. */
export type Catalog_Data_Product_Render_Price_Info_Interface = {
    __typename?: 'catalog_data_product_render_price_info_interface';
    extension_attributes?: Maybe<Catalog_Data_Product_Render_Price_Info_Extension_Interface>;
    /** Final price */
    final_price: Scalars['Float']['output'];
    formatted_prices: Catalog_Data_Product_Render_Formatted_Price_Info_Interface;
    /** Max price of a product */
    max_price: Scalars['Float']['output'];
    /** Max regular price */
    max_regular_price: Scalars['Float']['output'];
    /** Minimal price */
    minimal_price: Scalars['Float']['output'];
    /** Minimal regular price */
    minimal_regular_price: Scalars['Float']['output'];
    /** Regular price */
    regular_price: Scalars['Float']['output'];
    /** Special price */
    special_price: Scalars['Float']['output'];
};
/** Dto that holds render information about products */
export type Catalog_Data_Product_Render_Search_Results_Interface = {
    __typename?: 'catalog_data_product_render_search_results_interface';
    /** List of products rendered information */
    items: Array<Maybe<Catalog_Data_Product_Render_Interface>>;
};
/** Interface PaymentDetailsInterface */
export type Checkout_Data_Payment_Details_Interface = {
    __typename?: 'checkout_data_payment_details_interface';
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    payment_methods: Array<Maybe<Quote_Data_Payment_Method_Interface2>>;
    totals: Quote_Data_Totals_Interface;
};
/** Interface ShippingInformationInterface */
export type Checkout_Data_Shipping_Information_Interface_Input = {
    billing_address?: InputMaybe<Quote_Data_Address_Interface_Input>;
    /** Custom attributes values. */
    custom_attributes?: InputMaybe<Array<InputMaybe<Framework_Attribute_Interface_Input>>>;
    extension_attributes?: InputMaybe<Scalars['JSON']['input']>;
    shipping_address: Quote_Data_Address_Interface_Input;
    /** Carrier code */
    shipping_carrier_code: Scalars['String']['input'];
    /** Shipping method code */
    shipping_method_code: Scalars['String']['input'];
};
/** Interface TotalsInformationInterface */
export type Checkout_Data_Totals_Information_Interface_Input = {
    address: Quote_Data_Address_Interface_Input;
    /** Custom attributes values. */
    custom_attributes?: InputMaybe<Array<InputMaybe<Framework_Attribute_Interface_Input>>>;
    extension_attributes?: InputMaybe<Scalars['JSON']['input']>;
    /** Carrier code */
    shipping_carrier_code?: InputMaybe<Scalars['String']['input']>;
    /** Shipping method code */
    shipping_method_code?: InputMaybe<Scalars['String']['input']>;
};
/** Interface ConfigurableItemOptionValueInterface */
export type Configurable_Product_Data_Configurable_Item_Option_Value_Interface = {
    __typename?: 'configurable_product_data_configurable_item_option_value_interface';
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Option SKU */
    option_id: Scalars['String']['output'];
    /** Item id */
    option_value?: Maybe<Scalars['Int']['output']>;
};
/** Interface ConfigurableItemOptionValueInterface */
export type Configurable_Product_Data_Configurable_Item_Option_Value_Interface_Input = {
    extension_attributes?: InputMaybe<Scalars['JSON']['input']>;
    /** Option SKU */
    option_id: Scalars['String']['input'];
    /** Item id */
    option_value?: InputMaybe<Scalars['Int']['input']>;
};
/** Assigns a specific `cart_id` to the empty cart. */
export type CreateEmptyCartInput = {
    /** The ID to assign to the cart. */
    cart_id?: InputMaybe<Scalars['String']['input']>;
};
/** Customer address interface. */
export type Customer_Data_Address_Interface = {
    __typename?: 'customer_data_address_interface';
    /** City name */
    city?: Maybe<Scalars['String']['output']>;
    /** Company */
    company?: Maybe<Scalars['String']['output']>;
    /** Country code in ISO_3166-2 format */
    country_id?: Maybe<Scalars['String']['output']>;
    /** Custom attributes values. */
    custom_attributes?: Maybe<Array<Maybe<Framework_Attribute_Interface>>>;
    /** Customer ID */
    customer_id?: Maybe<Scalars['Int']['output']>;
    /** If this address is default billing address */
    default_billing?: Maybe<Scalars['Boolean']['output']>;
    /** If this address is default shipping address. */
    default_shipping?: Maybe<Scalars['Boolean']['output']>;
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Fax number */
    fax?: Maybe<Scalars['String']['output']>;
    /** First name */
    firstname?: Maybe<Scalars['String']['output']>;
    /** ID */
    id?: Maybe<Scalars['Int']['output']>;
    /** Last name */
    lastname?: Maybe<Scalars['String']['output']>;
    /** Middle name */
    middlename?: Maybe<Scalars['String']['output']>;
    /** Postcode */
    postcode?: Maybe<Scalars['String']['output']>;
    /** Prefix */
    prefix?: Maybe<Scalars['String']['output']>;
    region?: Maybe<Customer_Data_Region_Interface>;
    /** Region ID */
    region_id?: Maybe<Scalars['Int']['output']>;
    /** Street */
    street?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** Suffix */
    suffix?: Maybe<Scalars['String']['output']>;
    /** Telephone number */
    telephone?: Maybe<Scalars['String']['output']>;
    /** Vat id */
    vat_id?: Maybe<Scalars['String']['output']>;
};
/** Customer address interface. */
export type Customer_Data_Address_Interface_Input = {
    /** City name */
    city?: InputMaybe<Scalars['String']['input']>;
    /** Company */
    company?: InputMaybe<Scalars['String']['input']>;
    /** Country code in ISO_3166-2 format */
    country_id?: InputMaybe<Scalars['String']['input']>;
    /** Custom attributes values. */
    custom_attributes?: InputMaybe<Array<InputMaybe<Framework_Attribute_Interface_Input>>>;
    /** Customer ID */
    customer_id?: InputMaybe<Scalars['Int']['input']>;
    /** If this address is default billing address */
    default_billing?: InputMaybe<Scalars['Boolean']['input']>;
    /** If this address is default shipping address. */
    default_shipping?: InputMaybe<Scalars['Boolean']['input']>;
    extension_attributes?: InputMaybe<Scalars['JSON']['input']>;
    /** Fax number */
    fax?: InputMaybe<Scalars['String']['input']>;
    /** First name */
    firstname?: InputMaybe<Scalars['String']['input']>;
    /** ID */
    id?: InputMaybe<Scalars['Int']['input']>;
    /** Last name */
    lastname?: InputMaybe<Scalars['String']['input']>;
    /** Middle name */
    middlename?: InputMaybe<Scalars['String']['input']>;
    /** Postcode */
    postcode?: InputMaybe<Scalars['String']['input']>;
    /** Prefix */
    prefix?: InputMaybe<Scalars['String']['input']>;
    region?: InputMaybe<Customer_Data_Region_Interface_Input>;
    /** Region ID */
    region_id?: InputMaybe<Scalars['Int']['input']>;
    /** Street */
    street?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    /** Suffix */
    suffix?: InputMaybe<Scalars['String']['input']>;
    /** Telephone number */
    telephone?: InputMaybe<Scalars['String']['input']>;
    /** Vat id */
    vat_id?: InputMaybe<Scalars['String']['input']>;
};
/** ExtensionInterface class for @see \Magento\Customer\Api\Data\CustomerInterface */
export type Customer_Data_Customer_Extension_Interface = {
    __typename?: 'customer_data_customer_extension_interface';
    assistance_allowed?: Maybe<Scalars['Int']['output']>;
    is_subscribed?: Maybe<Scalars['Boolean']['output']>;
};
/** ExtensionInterface class for @see \Magento\Customer\Api\Data\CustomerInterface */
export type Customer_Data_Customer_Extension_Interface_Input = {
    assistance_allowed?: InputMaybe<Scalars['Int']['input']>;
    is_subscribed?: InputMaybe<Scalars['Boolean']['input']>;
};
/** Customer entity interface for API handling. */
export type Customer_Data_Customer_Interface = {
    __typename?: 'customer_data_customer_interface';
    /** Customer addresses. */
    addresses?: Maybe<Array<Maybe<Customer_Data_Address_Interface>>>;
    /** Confirmation */
    confirmation?: Maybe<Scalars['String']['output']>;
    /** Created at time */
    created_at?: Maybe<Scalars['String']['output']>;
    /** Created in area */
    created_in?: Maybe<Scalars['String']['output']>;
    /** Custom attributes values. */
    custom_attributes?: Maybe<Array<Maybe<Framework_Attribute_Interface>>>;
    /** Default billing address id */
    default_billing?: Maybe<Scalars['String']['output']>;
    /** Default shipping address id */
    default_shipping?: Maybe<Scalars['String']['output']>;
    /** Disable auto group change flag. */
    disable_auto_group_change?: Maybe<Scalars['Int']['output']>;
    /** In keeping with current security and privacy best practices, be sure you are aware of any potential legal and security risks associated with the storage of customers’ full date of birth (month, day, year) along with other personal identifiers (e.g., full name) before collecting or processing such data. */
    dob?: Maybe<Scalars['String']['output']>;
    /** Email address */
    email: Scalars['String']['output'];
    extension_attributes?: Maybe<Customer_Data_Customer_Extension_Interface>;
    /** First name */
    firstname: Scalars['String']['output'];
    /** Gender */
    gender?: Maybe<Scalars['Int']['output']>;
    /** Group id */
    group_id?: Maybe<Scalars['Int']['output']>;
    /** Customer id */
    id?: Maybe<Scalars['Int']['output']>;
    /** Last name */
    lastname: Scalars['String']['output'];
    /** Middle name */
    middlename?: Maybe<Scalars['String']['output']>;
    /** Prefix */
    prefix?: Maybe<Scalars['String']['output']>;
    /** Store id */
    store_id?: Maybe<Scalars['Int']['output']>;
    /** Suffix */
    suffix?: Maybe<Scalars['String']['output']>;
    /** Tax Vat */
    taxvat?: Maybe<Scalars['String']['output']>;
    /** Updated at time */
    updated_at?: Maybe<Scalars['String']['output']>;
    /** Website id */
    website_id?: Maybe<Scalars['Int']['output']>;
};
/** Customer entity interface for API handling. */
export type Customer_Data_Customer_Interface_Input = {
    /** Customer addresses. */
    addresses?: InputMaybe<Array<InputMaybe<Customer_Data_Address_Interface_Input>>>;
    /** Confirmation */
    confirmation?: InputMaybe<Scalars['String']['input']>;
    /** Created at time */
    created_at?: InputMaybe<Scalars['String']['input']>;
    /** Created in area */
    created_in?: InputMaybe<Scalars['String']['input']>;
    /** Custom attributes values. */
    custom_attributes?: InputMaybe<Array<InputMaybe<Framework_Attribute_Interface_Input>>>;
    /** Default billing address id */
    default_billing?: InputMaybe<Scalars['String']['input']>;
    /** Default shipping address id */
    default_shipping?: InputMaybe<Scalars['String']['input']>;
    /** Disable auto group change flag. */
    disable_auto_group_change?: InputMaybe<Scalars['Int']['input']>;
    /** In keeping with current security and privacy best practices, be sure you are aware of any potential legal and security risks associated with the storage of customers’ full date of birth (month, day, year) along with other personal identifiers (e.g., full name) before collecting or processing such data. */
    dob?: InputMaybe<Scalars['String']['input']>;
    /** Email address */
    email: Scalars['String']['input'];
    extension_attributes?: InputMaybe<Customer_Data_Customer_Extension_Interface_Input>;
    /** First name */
    firstname: Scalars['String']['input'];
    /** Gender */
    gender?: InputMaybe<Scalars['Int']['input']>;
    /** Group id */
    group_id?: InputMaybe<Scalars['Int']['input']>;
    /** Customer id */
    id?: InputMaybe<Scalars['Int']['input']>;
    /** Last name */
    lastname: Scalars['String']['input'];
    /** Middle name */
    middlename?: InputMaybe<Scalars['String']['input']>;
    /** Prefix */
    prefix?: InputMaybe<Scalars['String']['input']>;
    /** Store id */
    store_id?: InputMaybe<Scalars['Int']['input']>;
    /** Suffix */
    suffix?: InputMaybe<Scalars['String']['input']>;
    /** Tax Vat */
    taxvat?: InputMaybe<Scalars['String']['input']>;
    /** Updated at time */
    updated_at?: InputMaybe<Scalars['String']['input']>;
    /** Website id */
    website_id?: InputMaybe<Scalars['Int']['input']>;
};
/** Customer address region interface. */
export type Customer_Data_Region_Interface = {
    __typename?: 'customer_data_region_interface';
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Region */
    region: Scalars['String']['output'];
    /** Region code */
    region_code: Scalars['String']['output'];
    /** Region id */
    region_id: Scalars['Int']['output'];
};
/** Customer address region interface. */
export type Customer_Data_Region_Interface_Input = {
    extension_attributes?: InputMaybe<Scalars['JSON']['input']>;
    /** Region */
    region: Scalars['String']['input'];
    /** Region code */
    region_code: Scalars['String']['input'];
    /** Region id */
    region_id: Scalars['Int']['input'];
};
/** Country Information interface. */
export type Directory_Data_Country_Information_Interface = {
    __typename?: 'directory_data_country_information_interface';
    /** The available regions for the store. */
    available_regions?: Maybe<Array<Maybe<Directory_Data_Region_Information_Interface>>>;
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** The country full name (in English) for the store. */
    full_name_english: Scalars['String']['output'];
    /** The country full name (in store locale) for the store. */
    full_name_locale: Scalars['String']['output'];
    /** The country id for the store. */
    id: Scalars['String']['output'];
    /** The country 3 letter abbreviation for the store. */
    three_letter_abbreviation: Scalars['String']['output'];
    /** The country 2 letter abbreviation for the store. */
    two_letter_abbreviation: Scalars['String']['output'];
};
/** Country Information interface. */
export type Directory_Data_Country_Information_Interface2 = {
    __typename?: 'directory_data_country_information_interface2';
    /** The available regions for the store. */
    available_regions?: Maybe<Array<Maybe<Directory_Data_Region_Information_Interface>>>;
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** The country full name (in English) for the store. */
    full_name_english: Scalars['String']['output'];
    /** The country full name (in store locale) for the store. */
    full_name_locale: Scalars['String']['output'];
    /** The country id for the store. */
    id: Scalars['String']['output'];
    /** The country 3 letter abbreviation for the store. */
    three_letter_abbreviation: Scalars['String']['output'];
    /** The country 2 letter abbreviation for the store. */
    two_letter_abbreviation: Scalars['String']['output'];
};
/** Currency Information interface. */
export type Directory_Data_Currency_Information_Interface = {
    __typename?: 'directory_data_currency_information_interface';
    /** The list of allowed currency codes for the store. */
    available_currency_codes: Array<Maybe<Scalars['String']['output']>>;
    /** The base currency code for the store. */
    base_currency_code: Scalars['String']['output'];
    /** The currency symbol of the base currency for the store. */
    base_currency_symbol: Scalars['String']['output'];
    /** The default display currency code for the store. */
    default_display_currency_code: Scalars['String']['output'];
    /** The currency symbol of the default display currency for the store. */
    default_display_currency_symbol: Scalars['String']['output'];
    /** The list of exchange rate information for the store. */
    exchange_rates: Array<Maybe<Directory_Data_Exchange_Rate_Interface>>;
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
};
/** Exchange Rate interface. */
export type Directory_Data_Exchange_Rate_Interface = {
    __typename?: 'directory_data_exchange_rate_interface';
    /** The currency code associated with the exchange rate. */
    currency_to: Scalars['String']['output'];
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** The exchange rate for the associated currency and the store's base currency. */
    rate: Scalars['Float']['output'];
};
/** Region Information interface. */
export type Directory_Data_Region_Information_Interface = {
    __typename?: 'directory_data_region_information_interface';
    /** Region code */
    code: Scalars['String']['output'];
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Region id */
    id: Scalars['String']['output'];
    /** Region name */
    name: Scalars['String']['output'];
};
/** Downloadable Option */
export type Downloadable_Data_Downloadable_Option_Interface = {
    __typename?: 'downloadable_data_downloadable_option_interface';
    /** The list of downloadable links */
    downloadable_links: Array<Maybe<Scalars['Int']['output']>>;
};
/** Downloadable Option */
export type Downloadable_Data_Downloadable_Option_Interface_Input = {
    /** The list of downloadable links */
    downloadable_links: Array<InputMaybe<Scalars['Int']['input']>>;
};
/** Error details */
export type Error_Errors_Item = {
    __typename?: 'error_errors_item';
    /** Error message */
    message?: Maybe<Scalars['String']['output']>;
    /** Error parameters list */
    parameters?: Maybe<Array<Maybe<Error_Parameters_Item>>>;
};
/** Error parameters item */
export type Error_Parameters_Item = {
    __typename?: 'error_parameters_item';
    /** Missing or invalid field name */
    fieldName?: Maybe<Scalars['String']['output']>;
    /** Incorrect field value */
    fieldValue?: Maybe<Scalars['String']['output']>;
    /** ACL resource */
    resources?: Maybe<Scalars['String']['output']>;
};
export type Error_Response = {
    __typename?: 'error_response';
    /** Error code */
    code?: Maybe<Scalars['Int']['output']>;
    /** Errors list */
    errors?: Maybe<Array<Maybe<Error_Errors_Item>>>;
    /** Error message */
    message: Scalars['String']['output'];
    /** Error parameters list */
    parameters?: Maybe<Array<Maybe<Error_Parameters_Item>>>;
    /** Stack trace */
    trace?: Maybe<Scalars['String']['output']>;
};
/** Interface for custom attribute value. */
export type Framework_Attribute_Interface = {
    __typename?: 'framework_attribute_interface';
    /** Attribute code */
    attribute_code: Scalars['String']['output'];
    /** Attribute value */
    value: Scalars['String']['output'];
};
/** Interface for custom attribute value. */
export type Framework_Attribute_Interface_Input = {
    /** Attribute code */
    attribute_code: Scalars['String']['input'];
    /** Attribute value */
    value: Scalars['String']['input'];
};
/** Image Content data interface */
export type Framework_Data_Image_Content_Interface = {
    __typename?: 'framework_data_image_content_interface';
    /** Media data (base64 encoded content) */
    base64_encoded_data: Scalars['String']['output'];
    /** Image name */
    name: Scalars['String']['output'];
    /** MIME type */
    type: Scalars['String']['output'];
};
/** Image Content data interface */
export type Framework_Data_Image_Content_Interface_Input = {
    /** Media data (base64 encoded content) */
    base64_encoded_data: Scalars['String']['input'];
    /** Image name */
    name: Scalars['String']['input'];
    /** MIME type */
    type: Scalars['String']['input'];
};
/** Filter which can be used by any methods from service layer. */
export type Framework_Filter = {
    __typename?: 'framework_filter';
    /** Condition type */
    condition_type?: Maybe<Scalars['String']['output']>;
    /** Field */
    field: Scalars['String']['output'];
    /** Value */
    value: Scalars['String']['output'];
};
/** Interface Aggregation to get faceted data */
export type Framework_Search_Aggregation_Interface = {
    __typename?: 'framework_search_aggregation_interface';
    /** Document field names */
    bucket_names: Array<Maybe<Scalars['String']['output']>>;
    /** All Document fields */
    buckets: Array<Maybe<Framework_Search_Bucket_Interface>>;
};
/** Interface Aggregation Value */
export type Framework_Search_Aggregation_Value_Interface = {
    __typename?: 'framework_search_aggregation_value_interface';
    /** Metrics */
    metrics: Array<Maybe<Scalars['String']['output']>>;
    /** Aggregation */
    value: Scalars['String']['output'];
};
/** Interface for facet Bucket */
export type Framework_Search_Bucket_Interface = {
    __typename?: 'framework_search_bucket_interface';
    /** Field name */
    name: Scalars['String']['output'];
    /** Field values */
    values: Array<Maybe<Framework_Search_Aggregation_Value_Interface>>;
};
/** Interface Search Document */
export type Framework_Search_Document_Interface = {
    __typename?: 'framework_search_document_interface';
    /** Custom attributes values. */
    custom_attributes?: Maybe<Array<Maybe<Framework_Attribute_Interface>>>;
    id: Scalars['Int']['output'];
};
/** Groups two or more filters together using a logical OR */
export type Framework_Search_Filter_Group = {
    __typename?: 'framework_search_filter_group';
    /** A list of filters in this group */
    filters?: Maybe<Array<Maybe<Framework_Filter>>>;
};
/** Interface SearchCriteriaInterface */
export type Framework_Search_Search_Criteria_Interface = {
    __typename?: 'framework_search_search_criteria_interface';
    /** Current page. */
    current_page?: Maybe<Scalars['Int']['output']>;
    /** A list of filter groups. */
    filter_groups: Array<Maybe<Framework_Search_Filter_Group>>;
    /** Page size. */
    page_size?: Maybe<Scalars['Int']['output']>;
    request_name: Scalars['String']['output'];
    /** Sort order. */
    sort_orders?: Maybe<Array<Maybe<Framework_Sort_Order>>>;
};
/** Interface SearchResultInterface */
export type Framework_Search_Search_Result_Interface = {
    __typename?: 'framework_search_search_result_interface';
    aggregations: Framework_Search_Aggregation_Interface;
    items: Array<Maybe<Framework_Search_Document_Interface>>;
    search_criteria: Framework_Search_Search_Criteria_Interface;
    /** Total count. */
    total_count: Scalars['Int']['output'];
};
/** Data object for sort order. */
export type Framework_Sort_Order = {
    __typename?: 'framework_sort_order';
    /** Sorting direction. */
    direction: Scalars['String']['output'];
    /** Sorting field. */
    field: Scalars['String']['output'];
};
/** Gift Card Account data */
export type Gift_Card_Account_Data_Gift_Card_Account_Interface_Input = {
    /** Cards amount in base currency. */
    base_gift_cards_amount: Scalars['Float']['input'];
    /** Cards amount used in base currency. */
    base_gift_cards_amount_used: Scalars['Float']['input'];
    extension_attributes?: InputMaybe<Scalars['JSON']['input']>;
    /** Cards codes. */
    gift_cards?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    /** Cards amount in quote currency. */
    gift_cards_amount: Scalars['Float']['input'];
    /** Cards amount used in quote currency. */
    gift_cards_amount_used: Scalars['Float']['input'];
};
/** ExtensionInterface class for @see \Magento\GiftCard\Api\Data\GiftCardOptionInterface */
export type Gift_Card_Data_Gift_Card_Option_Extension_Interface = {
    __typename?: 'gift_card_data_gift_card_option_extension_interface';
    giftcard_created_codes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};
/** ExtensionInterface class for @see \Magento\GiftCard\Api\Data\GiftCardOptionInterface */
export type Gift_Card_Data_Gift_Card_Option_Extension_Interface_Input = {
    giftcard_created_codes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};
/** Interface GiftCardOptionInterface */
export type Gift_Card_Data_Gift_Card_Option_Interface = {
    __typename?: 'gift_card_data_gift_card_option_interface';
    /** Gift card open amount value. */
    custom_giftcard_amount?: Maybe<Scalars['Float']['output']>;
    extension_attributes?: Maybe<Gift_Card_Data_Gift_Card_Option_Extension_Interface>;
    /** Gift card amount. */
    giftcard_amount: Scalars['String']['output'];
    /** Giftcard message. */
    giftcard_message?: Maybe<Scalars['String']['output']>;
    /** Gift card recipient email. */
    giftcard_recipient_email: Scalars['String']['output'];
    /** Gift card recipient name. */
    giftcard_recipient_name: Scalars['String']['output'];
    /** Gift card sender email. */
    giftcard_sender_email: Scalars['String']['output'];
    /** Gift card sender name. */
    giftcard_sender_name: Scalars['String']['output'];
};
/** Interface GiftCardOptionInterface */
export type Gift_Card_Data_Gift_Card_Option_Interface_Input = {
    /** Gift card open amount value. */
    custom_giftcard_amount?: InputMaybe<Scalars['Float']['input']>;
    extension_attributes?: InputMaybe<Gift_Card_Data_Gift_Card_Option_Extension_Interface_Input>;
    /** Gift card amount. */
    giftcard_amount: Scalars['String']['input'];
    /** Giftcard message. */
    giftcard_message?: InputMaybe<Scalars['String']['input']>;
    /** Gift card recipient email. */
    giftcard_recipient_email: Scalars['String']['input'];
    /** Gift card recipient name. */
    giftcard_recipient_name: Scalars['String']['input'];
    /** Gift card sender email. */
    giftcard_sender_email: Scalars['String']['input'];
    /** Gift card sender name. */
    giftcard_sender_name: Scalars['String']['input'];
};
/** ExtensionInterface class for @see \Magento\GiftMessage\Api\Data\MessageInterface */
export type Gift_Message_Data_Message_Extension_Interface = {
    __typename?: 'gift_message_data_message_extension_interface';
    entity_id?: Maybe<Scalars['String']['output']>;
    entity_type?: Maybe<Scalars['String']['output']>;
    wrapping_add_printed_card?: Maybe<Scalars['Boolean']['output']>;
    wrapping_allow_gift_receipt?: Maybe<Scalars['Boolean']['output']>;
    wrapping_id?: Maybe<Scalars['Int']['output']>;
};
/** ExtensionInterface class for @see \Magento\GiftMessage\Api\Data\MessageInterface */
export type Gift_Message_Data_Message_Extension_Interface_Input = {
    entity_id?: InputMaybe<Scalars['String']['input']>;
    entity_type?: InputMaybe<Scalars['String']['input']>;
    wrapping_add_printed_card?: InputMaybe<Scalars['Boolean']['input']>;
    wrapping_allow_gift_receipt?: InputMaybe<Scalars['Boolean']['input']>;
    wrapping_id?: InputMaybe<Scalars['Int']['input']>;
};
/** Interface MessageInterface */
export type Gift_Message_Data_Message_Interface = {
    __typename?: 'gift_message_data_message_interface';
    /** Customer ID. Otherwise, null. */
    customer_id?: Maybe<Scalars['Int']['output']>;
    extension_attributes?: Maybe<Gift_Message_Data_Message_Extension_Interface>;
    /** Gift message ID. Otherwise, null. */
    gift_message_id?: Maybe<Scalars['Int']['output']>;
    /** Message text. */
    message: Scalars['String']['output'];
    /** Recipient name. */
    recipient: Scalars['String']['output'];
    /** Sender name. */
    sender: Scalars['String']['output'];
};
/** Interface MessageInterface */
export type Gift_Message_Data_Message_Interface_Input = {
    /** Customer ID. Otherwise, null. */
    customer_id?: InputMaybe<Scalars['Int']['input']>;
    extension_attributes?: InputMaybe<Gift_Message_Data_Message_Extension_Interface_Input>;
    /** Gift message ID. Otherwise, null. */
    gift_message_id?: InputMaybe<Scalars['Int']['input']>;
    /** Message text. */
    message: Scalars['String']['input'];
    /** Recipient name. */
    recipient: Scalars['String']['input'];
    /** Sender name. */
    sender: Scalars['String']['input'];
};
/** Represents `product item id with qty` of a grouped product. */
export type Grouped_Product_Data_Grouped_Options_Interface = {
    __typename?: 'grouped_product_data_grouped_options_interface';
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Associated product id */
    id?: Maybe<Scalars['Int']['output']>;
    /** Associated product qty */
    qty?: Maybe<Scalars['Int']['output']>;
};
/** Represents `product item id with qty` of a grouped product. */
export type Grouped_Product_Data_Grouped_Options_Interface_Input = {
    extension_attributes?: InputMaybe<Scalars['JSON']['input']>;
    /** Associated product id */
    id?: InputMaybe<Scalars['Int']['input']>;
    /** Associated product qty */
    qty?: InputMaybe<Scalars['Int']['input']>;
};
/** Represents sources projection on In-Store Pickup context. Realisation must follow immutable DTO concept. Partial immutability done according to restriction of current Extension Attributes implementation. */
export type Inventory_In_Store_Pickup_Api_Data_Pickup_Location_Interface = {
    __typename?: 'inventory_in_store_pickup_api_data_pickup_location_interface';
    /** Pickup Location city. */
    city?: Maybe<Scalars['String']['output']>;
    /** Pickup Location contact name. */
    contact_name?: Maybe<Scalars['String']['output']>;
    /** Pickup Location country ID. */
    country_id?: Maybe<Scalars['String']['output']>;
    /** Pickup Location description. */
    description?: Maybe<Scalars['String']['output']>;
    /** Pickup Location contact email. */
    email?: Maybe<Scalars['String']['output']>;
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Fax contact info. */
    fax?: Maybe<Scalars['String']['output']>;
    /** Pickup Location latitude. */
    latitude?: Maybe<Scalars['Float']['output']>;
    /** Pickup Location longitude. */
    longitude?: Maybe<Scalars['Float']['output']>;
    /** Pickup Location name. */
    name?: Maybe<Scalars['String']['output']>;
    /** Pickup Location phone. */
    phone?: Maybe<Scalars['String']['output']>;
    /** Source code of Pickup Location. */
    pickup_location_code: Scalars['String']['output'];
    /** Pickup Location postcode. */
    postcode?: Maybe<Scalars['String']['output']>;
    /** Pickup Location region. */
    region?: Maybe<Scalars['String']['output']>;
    /** Pickup Location region ID. */
    region_id?: Maybe<Scalars['Int']['output']>;
    /** Pickup Location street. */
    street?: Maybe<Scalars['String']['output']>;
};
/** Filter by Distance to the Address. Pickup Locations will be filtered by distance according to the geo-position of the entered address. Required fields for the address are country and one of the field: region or city or postcode. */
export type Inventory_In_Store_Pickup_Api_Data_Search_Request_Area_Interface = {
    __typename?: 'inventory_in_store_pickup_api_data_search_request_area_interface';
    /** Search radius in KM. */
    radius: Scalars['Int']['output'];
    /** Search term string. */
    search_term: Scalars['String']['output'];
};
/** ExtensionInterface class for @see \Magento\InventoryInStorePickupApi\Api\Data\SearchRequestInterface */
export type Inventory_In_Store_Pickup_Api_Data_Search_Request_Extension_Interface = {
    __typename?: 'inventory_in_store_pickup_api_data_search_request_extension_interface';
    products_info?: Maybe<Array<Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Product_Info_Interface>>>;
};
/** Filter for Pickup Location search. */
export type Inventory_In_Store_Pickup_Api_Data_Search_Request_Filter_Interface = {
    __typename?: 'inventory_in_store_pickup_api_data_search_request_filter_interface';
    /** Condition Type. */
    condition_type: Scalars['String']['output'];
    /** Value. */
    value: Scalars['String']['output'];
};
/** Filter to filter by Fields. Each field may be filtered with different condition type. Supported condition types restricted by @see \Magento\Framework\Api\SearchCriteriaInterface */
export type Inventory_In_Store_Pickup_Api_Data_Search_Request_Filters_Interface = {
    __typename?: 'inventory_in_store_pickup_api_data_search_request_filters_interface';
    city?: Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Filter_Interface>;
    country?: Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Filter_Interface>;
    name?: Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Filter_Interface>;
    pickup_location_code?: Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Filter_Interface>;
    postcode?: Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Filter_Interface>;
    region?: Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Filter_Interface>;
    region_id?: Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Filter_Interface>;
    street?: Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Filter_Interface>;
};
/** Endpoint used to search Pickup Locations by different parameters: - by attribute filters fields @see \Magento\InventoryInStorePickupApi\Api\Data\SearchRequest\FiltersInterface - by distance to the address @see \Magento\InventoryInStorePickupApi\Api\Data\SearchRequest\AreaInterface Also, endpoint supports paging and sort orders. */
export type Inventory_In_Store_Pickup_Api_Data_Search_Request_Interface = {
    __typename?: 'inventory_in_store_pickup_api_data_search_request_interface';
    area?: Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Area_Interface>;
    /** Current page. */
    current_page: Scalars['Int']['output'];
    extension_attributes?: Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Extension_Interface>;
    filters?: Maybe<Inventory_In_Store_Pickup_Api_Data_Search_Request_Filters_Interface>;
    /** Page size. */
    page_size?: Maybe<Scalars['Int']['output']>;
    /** Sales Channel code. */
    scope_code: Scalars['String']['output'];
    /** Sales Channel Type. */
    scope_type: Scalars['String']['output'];
    /** Sort Order. */
    sort?: Maybe<Array<Maybe<Framework_Sort_Order>>>;
};
/** Product Info Data Transfer Object. */
export type Inventory_In_Store_Pickup_Api_Data_Search_Request_Product_Info_Interface = {
    __typename?: 'inventory_in_store_pickup_api_data_search_request_product_info_interface';
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Product SKU. */
    sku: Scalars['String']['output'];
};
/** Search results for providing pickup locations. */
export type Inventory_In_Store_Pickup_Api_Data_Search_Result_Interface = {
    __typename?: 'inventory_in_store_pickup_api_data_search_result_interface';
    /** Items list. */
    items: Array<Maybe<Inventory_In_Store_Pickup_Api_Data_Pickup_Location_Interface>>;
    search_request: Inventory_In_Store_Pickup_Api_Data_Search_Request_Interface;
    /** Total count. */
    total_count: Scalars['Int']['output'];
};
/** Price interface. */
export type Msrp_Data_Product_Render_Msrp_Price_Info_Interface = {
    __typename?: 'msrp_data_product_render_msrp_price_info_interface';
    explanation_message: Scalars['String']['output'];
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    is_applicable: Scalars['String']['output'];
    is_shown_price_on_gesture: Scalars['String']['output'];
    msrp_message: Scalars['String']['output'];
    msrp_price: Scalars['String']['output'];
};
/** Interface AuthDataInterface */
export type Pay_Pal_Braintree_Data_Auth_Data_Interface = {
    __typename?: 'pay_pal_braintree_data_auth_data_interface';
    /** To success page */
    action_success: Scalars['String']['output'];
    /** Client token */
    client_token?: Maybe<Scalars['String']['output']>;
    /** Display name */
    display_name: Scalars['String']['output'];
    logged_in: Scalars['Boolean']['output'];
    /** Current store code */
    store_code: Scalars['String']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Card_Bin_Details_Interface = {
    __typename?: 'payment_services_paypal_data_payment_card_bin_details_interface';
    /** Bin */
    bin: Scalars['String']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Card_Details_Interface = {
    __typename?: 'payment_services_paypal_data_payment_card_details_interface';
    bin_details: Payment_Services_Paypal_Data_Payment_Card_Bin_Details_Interface;
    /** Card expiry month */
    card_expiry_month: Scalars['String']['output'];
    /** Card expiry year */
    card_expiry_year: Scalars['String']['output'];
    /** Last digits */
    last_digits: Scalars['String']['output'];
    /** Name */
    name: Scalars['String']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Config_Apple_Pay_Interface = {
    __typename?: 'payment_services_paypal_data_payment_config_apple_pay_interface';
    button_styles: Payment_Services_Paypal_Data_Payment_Config_Button_Styles_Interface;
    /** Code */
    code: Scalars['String']['output'];
    /** Visible */
    is_visible: Scalars['Boolean']['output'];
    /** Payment intent */
    payment_intent: Scalars['String']['output'];
    /** PaymentSource */
    payment_source: Scalars['String']['output'];
    /** SDK params */
    sdk_params: Array<Maybe<Payment_Services_Paypal_Data_Payment_Config_Sdk_Params_Interface>>;
    /** Sort Order */
    sort_order: Scalars['String']['output'];
    /** Title */
    title: Scalars['String']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Config_Button_Styles_Interface = {
    __typename?: 'payment_services_paypal_data_payment_config_button_styles_interface';
    /** Color */
    color: Scalars['String']['output'];
    /** Height */
    height: Scalars['Int']['output'];
    /** Label */
    label: Scalars['String']['output'];
    /** Layout */
    layout: Scalars['String']['output'];
    /** Shape */
    shape: Scalars['String']['output'];
    /** ShowTagline */
    tagline: Scalars['Boolean']['output'];
    /** Height */
    use_default_height: Scalars['Boolean']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Config_Google_Pay_Button_Styles_Interface = {
    __typename?: 'payment_services_paypal_data_payment_config_google_pay_button_styles_interface';
    /** Color */
    color: Scalars['String']['output'];
    /** Height */
    height: Scalars['Int']['output'];
    /** Type */
    type: Scalars['String']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Config_Google_Pay_Interface = {
    __typename?: 'payment_services_paypal_data_payment_config_google_pay_interface';
    button_styles: Payment_Services_Paypal_Data_Payment_Config_Google_Pay_Button_Styles_Interface;
    /** Code */
    code: Scalars['String']['output'];
    /** Visible */
    is_visible: Scalars['Boolean']['output'];
    /** Payment intent */
    payment_intent: Scalars['String']['output'];
    /** PaymentSource */
    payment_source: Scalars['String']['output'];
    /** SDK params */
    sdk_params: Array<Maybe<Payment_Services_Paypal_Data_Payment_Config_Sdk_Params_Interface>>;
    /** Sort Order */
    sort_order: Scalars['String']['output'];
    /** Title */
    title: Scalars['String']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Config_Hosted_Fields_Interface = {
    __typename?: 'payment_services_paypal_data_payment_config_hosted_fields_interface';
    /** CcVaultCode */
    cc_vault_code: Scalars['String']['output'];
    /** Code */
    code: Scalars['String']['output'];
    /** HasIsVaultEnabled */
    is_vault_enabled: Scalars['Boolean']['output'];
    /** Visible */
    is_visible: Scalars['Boolean']['output'];
    /** Payment intent */
    payment_intent: Scalars['String']['output'];
    /** Payment Source */
    payment_source: Scalars['String']['output'];
    /** RequiresCardDetails */
    requires_card_details: Scalars['Boolean']['output'];
    /** SDK params */
    sdk_params: Array<Maybe<Payment_Services_Paypal_Data_Payment_Config_Sdk_Params_Interface>>;
    /** Sort Order */
    sort_order: Scalars['String']['output'];
    /** ThreeDS */
    three_d_s: Scalars['String']['output'];
    /** Title */
    title: Scalars['String']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Config_Sdk_Params_Interface = {
    __typename?: 'payment_services_paypal_data_payment_config_sdk_params_interface';
    /** Code */
    name: Scalars['String']['output'];
    /** Config */
    value: Scalars['String']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Config_Smart_Buttons_Interface = {
    __typename?: 'payment_services_paypal_data_payment_config_smart_buttons_interface';
    button_styles: Payment_Services_Paypal_Data_Payment_Config_Button_Styles_Interface;
    /** Code */
    code: Scalars['String']['output'];
    /** CanDisplayMessage */
    display_message: Scalars['Boolean']['output'];
    /** Venmo */
    display_venmo: Scalars['Boolean']['output'];
    /** Visible */
    is_visible: Scalars['Boolean']['output'];
    message_styles: Payment_Services_Paypal_Data_Payment_Config_Smart_Buttons_Message_Styles_Interface;
    /** Payment intent */
    payment_intent: Scalars['String']['output'];
    /** SDK params */
    sdk_params: Array<Maybe<Payment_Services_Paypal_Data_Payment_Config_Sdk_Params_Interface>>;
    /** Sort Order */
    sort_order: Scalars['String']['output'];
    /** Title */
    title: Scalars['String']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Config_Smart_Buttons_Logo_Interface = {
    __typename?: 'payment_services_paypal_data_payment_config_smart_buttons_logo_interface';
    /** CanDisplayMessage */
    type: Scalars['String']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Config_Smart_Buttons_Message_Styles_Interface = {
    __typename?: 'payment_services_paypal_data_payment_config_smart_buttons_message_styles_interface';
    /** CanDisplayMessage */
    layout: Scalars['String']['output'];
    logo: Payment_Services_Paypal_Data_Payment_Config_Smart_Buttons_Logo_Interface;
};
/** Interface PaymentOrderDetailsInterface */
export type Payment_Services_Paypal_Data_Payment_Order_Details_Interface = {
    __typename?: 'payment_services_paypal_data_payment_order_details_interface';
    /** Payment order amount */
    amount: Scalars['Float']['output'];
    /** Payment order currency code */
    currency_code: Scalars['String']['output'];
    /** Payment order id */
    id: Scalars['String']['output'];
    /** Payment order mpOrderId */
    mp_order_id: Scalars['String']['output'];
    payment_source_details: Payment_Services_Paypal_Data_Payment_Source_Details_Interface;
    /** Payment order status */
    status: Scalars['String']['output'];
};
/** Interface PaymentOrderInterface */
export type Payment_Services_Paypal_Data_Payment_Order_Interface = {
    __typename?: 'payment_services_paypal_data_payment_order_interface';
    /** Payment order amount */
    amount: Scalars['Float']['output'];
    /** Payment order currency code */
    currency_code: Scalars['String']['output'];
    /** Payment order id */
    id: Scalars['String']['output'];
    /** Payment order mpOrderId */
    mp_order_id: Scalars['String']['output'];
    /** Payment order status */
    status: Scalars['String']['output'];
};
export type Payment_Services_Paypal_Data_Payment_Sdk_Params_Interface = {
    __typename?: 'payment_services_paypal_data_payment_sdk_params_interface';
    /** The payments sdk code */
    code: Scalars['String']['output'];
    /** The payments sdk params */
    params: Array<Maybe<Payment_Services_Paypal_Data_Payment_Config_Sdk_Params_Interface>>;
};
export type Payment_Services_Paypal_Data_Payment_Sdk_Params_Interface2 = {
    __typename?: 'payment_services_paypal_data_payment_sdk_params_interface2';
    /** The payments sdk code */
    code: Scalars['String']['output'];
    /** The payments sdk params */
    params: Array<Maybe<Payment_Services_Paypal_Data_Payment_Config_Sdk_Params_Interface>>;
};
export type Payment_Services_Paypal_Data_Payment_Source_Details_Interface = {
    __typename?: 'payment_services_paypal_data_payment_source_details_interface';
    card: Payment_Services_Paypal_Data_Payment_Card_Details_Interface;
};
export type Payment_Services_Paypal_Payment_Config_Response_Interface = {
    __typename?: 'payment_services_paypal_payment_config_response_interface';
    apple_pay: Payment_Services_Paypal_Data_Payment_Config_Apple_Pay_Interface;
    google_pay: Payment_Services_Paypal_Data_Payment_Config_Google_Pay_Interface;
    hosted_fields: Payment_Services_Paypal_Data_Payment_Config_Hosted_Fields_Interface;
    smart_buttons: Payment_Services_Paypal_Data_Payment_Config_Smart_Buttons_Interface;
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\AddressInterface */
export type Quote_Data_Address_Extension_Interface = {
    __typename?: 'quote_data_address_extension_interface';
    discounts?: Maybe<Array<Maybe<Sales_Rule_Data_Rule_Discount_Interface>>>;
    gift_registry_id?: Maybe<Scalars['Int']['output']>;
    pickup_location_code?: Maybe<Scalars['String']['output']>;
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\AddressInterface */
export type Quote_Data_Address_Extension_Interface_Input = {
    discounts?: InputMaybe<Array<InputMaybe<Sales_Rule_Data_Rule_Discount_Interface_Input>>>;
    gift_registry_id?: InputMaybe<Scalars['Int']['input']>;
    pickup_location_code?: InputMaybe<Scalars['String']['input']>;
};
/** Interface AddressInterface */
export type Quote_Data_Address_Interface = {
    __typename?: 'quote_data_address_interface';
    /** City name */
    city: Scalars['String']['output'];
    /** Company */
    company?: Maybe<Scalars['String']['output']>;
    /** Country id */
    country_id: Scalars['String']['output'];
    /** Custom attributes values. */
    custom_attributes?: Maybe<Array<Maybe<Framework_Attribute_Interface>>>;
    /** Customer address id */
    customer_address_id?: Maybe<Scalars['Int']['output']>;
    /** Customer id */
    customer_id?: Maybe<Scalars['Int']['output']>;
    /** Billing/shipping email */
    email: Scalars['String']['output'];
    extension_attributes?: Maybe<Quote_Data_Address_Extension_Interface>;
    /** Fax number */
    fax?: Maybe<Scalars['String']['output']>;
    /** First name */
    firstname: Scalars['String']['output'];
    /** Id */
    id?: Maybe<Scalars['Int']['output']>;
    /** Last name */
    lastname: Scalars['String']['output'];
    /** Middle name */
    middlename?: Maybe<Scalars['String']['output']>;
    /** Postcode */
    postcode: Scalars['String']['output'];
    /** Prefix */
    prefix?: Maybe<Scalars['String']['output']>;
    /** Region name */
    region: Scalars['String']['output'];
    /** Region code */
    region_code: Scalars['String']['output'];
    /** Region id */
    region_id: Scalars['Int']['output'];
    /** Same as billing flag */
    same_as_billing?: Maybe<Scalars['Int']['output']>;
    /** Save in address book flag */
    save_in_address_book?: Maybe<Scalars['Int']['output']>;
    /** Street */
    street: Array<Maybe<Scalars['String']['output']>>;
    /** Suffix */
    suffix?: Maybe<Scalars['String']['output']>;
    /** Telephone number */
    telephone: Scalars['String']['output'];
    /** Vat id */
    vat_id?: Maybe<Scalars['String']['output']>;
};
/** Interface AddressInterface */
export type Quote_Data_Address_Interface_Input = {
    /** City name */
    city: Scalars['String']['input'];
    /** Company */
    company?: InputMaybe<Scalars['String']['input']>;
    /** Country id */
    country_id: Scalars['String']['input'];
    /** Custom attributes values. */
    custom_attributes?: InputMaybe<Array<InputMaybe<Framework_Attribute_Interface_Input>>>;
    /** Customer address id */
    customer_address_id?: InputMaybe<Scalars['Int']['input']>;
    /** Customer id */
    customer_id?: InputMaybe<Scalars['Int']['input']>;
    /** Billing/shipping email */
    email: Scalars['String']['input'];
    extension_attributes?: InputMaybe<Quote_Data_Address_Extension_Interface_Input>;
    /** Fax number */
    fax?: InputMaybe<Scalars['String']['input']>;
    /** First name */
    firstname: Scalars['String']['input'];
    /** Id */
    id?: InputMaybe<Scalars['Int']['input']>;
    /** Last name */
    lastname: Scalars['String']['input'];
    /** Middle name */
    middlename?: InputMaybe<Scalars['String']['input']>;
    /** Postcode */
    postcode: Scalars['String']['input'];
    /** Prefix */
    prefix?: InputMaybe<Scalars['String']['input']>;
    /** Region name */
    region: Scalars['String']['input'];
    /** Region code */
    region_code: Scalars['String']['input'];
    /** Region id */
    region_id: Scalars['Int']['input'];
    /** Same as billing flag */
    same_as_billing?: InputMaybe<Scalars['Int']['input']>;
    /** Save in address book flag */
    save_in_address_book?: InputMaybe<Scalars['Int']['input']>;
    /** Street */
    street: Array<InputMaybe<Scalars['String']['input']>>;
    /** Suffix */
    suffix?: InputMaybe<Scalars['String']['input']>;
    /** Telephone number */
    telephone: Scalars['String']['input'];
    /** Vat id */
    vat_id?: InputMaybe<Scalars['String']['input']>;
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\CartInterface */
export type Quote_Data_Cart_Extension_Interface = {
    __typename?: 'quote_data_cart_extension_interface';
    coupon_codes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    shipping_assignments?: Maybe<Array<Maybe<Quote_Data_Shipping_Assignment_Interface>>>;
};
/** Interface CartInterface */
export type Quote_Data_Cart_Interface = {
    __typename?: 'quote_data_cart_interface';
    billing_address?: Maybe<Quote_Data_Address_Interface>;
    /** Cart conversion date and time. Otherwise, null. */
    converted_at?: Maybe<Scalars['String']['output']>;
    /** Cart creation date and time. Otherwise, null. */
    created_at?: Maybe<Scalars['String']['output']>;
    currency?: Maybe<Quote_Data_Currency_Interface>;
    customer: Customer_Data_Customer_Interface;
    /** For guest customers, false for logged in customers */
    customer_is_guest?: Maybe<Scalars['Boolean']['output']>;
    /** Notice text */
    customer_note?: Maybe<Scalars['String']['output']>;
    /** Customer notification flag */
    customer_note_notify?: Maybe<Scalars['Boolean']['output']>;
    /** Customer tax class ID. */
    customer_tax_class_id?: Maybe<Scalars['Int']['output']>;
    extension_attributes?: Maybe<Quote_Data_Cart_Extension_Interface>;
    /** Cart/quote ID. */
    id: Scalars['Int']['output'];
    /** Active status flag value. Otherwise, null. */
    is_active?: Maybe<Scalars['Boolean']['output']>;
    /** Virtual flag value. Otherwise, null. */
    is_virtual?: Maybe<Scalars['Boolean']['output']>;
    /** Array of items. Otherwise, null. */
    items?: Maybe<Array<Maybe<Quote_Data_Cart_Item_Interface>>>;
    /** Number of different items or products in the cart. Otherwise, null. */
    items_count?: Maybe<Scalars['Int']['output']>;
    /** Total quantity of all cart items. Otherwise, null. */
    items_qty?: Maybe<Scalars['Float']['output']>;
    /** Original order ID. Otherwise, null. */
    orig_order_id?: Maybe<Scalars['Int']['output']>;
    /** Reserved order ID. Otherwise, null. */
    reserved_order_id?: Maybe<Scalars['String']['output']>;
    /** Store identifier */
    store_id: Scalars['Int']['output'];
    /** Cart last update date and time. Otherwise, null. */
    updated_at?: Maybe<Scalars['String']['output']>;
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\CartItemInterface */
export type Quote_Data_Cart_Item_Extension_Interface = {
    __typename?: 'quote_data_cart_item_extension_interface';
    discounts?: Maybe<Array<Maybe<Sales_Rule_Data_Rule_Discount_Interface>>>;
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\CartItemInterface */
export type Quote_Data_Cart_Item_Extension_Interface_Input = {
    discounts?: InputMaybe<Array<InputMaybe<Sales_Rule_Data_Rule_Discount_Interface_Input>>>;
};
/** Interface CartItemInterface */
export type Quote_Data_Cart_Item_Interface = {
    __typename?: 'quote_data_cart_item_interface';
    extension_attributes?: Maybe<Quote_Data_Cart_Item_Extension_Interface>;
    /** Item ID. Otherwise, null. */
    item_id?: Maybe<Scalars['Int']['output']>;
    /** Product name. Otherwise, null. */
    name?: Maybe<Scalars['String']['output']>;
    /** Product price. Otherwise, null. */
    price?: Maybe<Scalars['Float']['output']>;
    product_option?: Maybe<Quote_Data_Product_Option_Interface>;
    /** Product type. Otherwise, null. */
    product_type?: Maybe<Scalars['String']['output']>;
    /** Product quantity. */
    qty: Scalars['Float']['output'];
    /** Quote id. */
    quote_id: Scalars['String']['output'];
    /** Product SKU. Otherwise, null. */
    sku?: Maybe<Scalars['String']['output']>;
};
/** Interface CartItemInterface */
export type Quote_Data_Cart_Item_Interface2 = {
    __typename?: 'quote_data_cart_item_interface2';
    extension_attributes?: Maybe<Quote_Data_Cart_Item_Extension_Interface>;
    /** Item ID. Otherwise, null. */
    item_id?: Maybe<Scalars['Int']['output']>;
    /** Product name. Otherwise, null. */
    name?: Maybe<Scalars['String']['output']>;
    /** Product price. Otherwise, null. */
    price?: Maybe<Scalars['Float']['output']>;
    product_option?: Maybe<Quote_Data_Product_Option_Interface>;
    /** Product type. Otherwise, null. */
    product_type?: Maybe<Scalars['String']['output']>;
    /** Product quantity. */
    qty: Scalars['Float']['output'];
    /** Quote id. */
    quote_id: Scalars['String']['output'];
    /** Product SKU. Otherwise, null. */
    sku?: Maybe<Scalars['String']['output']>;
};
/** Interface CartItemInterface */
export type Quote_Data_Cart_Item_Interface_Input = {
    extension_attributes?: InputMaybe<Quote_Data_Cart_Item_Extension_Interface_Input>;
    /** Item ID. Otherwise, null. */
    item_id?: InputMaybe<Scalars['Int']['input']>;
    /** Product name. Otherwise, null. */
    name?: InputMaybe<Scalars['String']['input']>;
    /** Product price. Otherwise, null. */
    price?: InputMaybe<Scalars['Float']['input']>;
    product_option?: InputMaybe<Quote_Data_Product_Option_Interface_Input>;
    /** Product type. Otherwise, null. */
    product_type?: InputMaybe<Scalars['String']['input']>;
    /** Product quantity. */
    qty: Scalars['Float']['input'];
    /** Quote id. */
    quote_id: Scalars['String']['input'];
    /** Product SKU. Otherwise, null. */
    sku?: InputMaybe<Scalars['String']['input']>;
};
/** Interface CurrencyInterface */
export type Quote_Data_Currency_Interface = {
    __typename?: 'quote_data_currency_interface';
    /** Base currency code */
    base_currency_code?: Maybe<Scalars['String']['output']>;
    /** Base currency to global currency rate */
    base_to_global_rate?: Maybe<Scalars['Float']['output']>;
    /** Base currency to quote currency rate */
    base_to_quote_rate?: Maybe<Scalars['Float']['output']>;
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Global currency code */
    global_currency_code?: Maybe<Scalars['String']['output']>;
    /** Quote currency code */
    quote_currency_code?: Maybe<Scalars['String']['output']>;
    /** Store currency code */
    store_currency_code?: Maybe<Scalars['String']['output']>;
    /** Store currency to base currency rate */
    store_to_base_rate?: Maybe<Scalars['Float']['output']>;
    /** Store currency to quote currency rate */
    store_to_quote_rate?: Maybe<Scalars['Float']['output']>;
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\PaymentInterface */
export type Quote_Data_Payment_Extension_Interface = {
    __typename?: 'quote_data_payment_extension_interface';
    agreement_ids?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\PaymentInterface */
export type Quote_Data_Payment_Extension_Interface_Input = {
    agreement_ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};
/** Interface PaymentInterface */
export type Quote_Data_Payment_Interface = {
    __typename?: 'quote_data_payment_interface';
    /** Payment additional details */
    additional_data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    extension_attributes?: Maybe<Quote_Data_Payment_Extension_Interface>;
    /** Payment method code */
    method: Scalars['String']['output'];
    /** Purchase order number */
    po_number?: Maybe<Scalars['String']['output']>;
};
/** Interface PaymentInterface */
export type Quote_Data_Payment_Interface_Input = {
    /** Payment additional details */
    additional_data?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    extension_attributes?: InputMaybe<Quote_Data_Payment_Extension_Interface_Input>;
    /** Payment method code */
    method: Scalars['String']['input'];
    /** Purchase order number */
    po_number?: InputMaybe<Scalars['String']['input']>;
};
/** Interface PaymentMethodInterface */
export type Quote_Data_Payment_Method_Interface = {
    __typename?: 'quote_data_payment_method_interface';
    /** Payment method code */
    code: Scalars['String']['output'];
    /** Payment method title */
    title: Scalars['String']['output'];
};
/** Interface PaymentMethodInterface */
export type Quote_Data_Payment_Method_Interface2 = {
    __typename?: 'quote_data_payment_method_interface2';
    /** Payment method code */
    code: Scalars['String']['output'];
    /** Payment method title */
    title: Scalars['String']['output'];
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\ProductOptionInterface */
export type Quote_Data_Product_Option_Extension_Interface = {
    __typename?: 'quote_data_product_option_extension_interface';
    bundle_options?: Maybe<Array<Maybe<Bundle_Data_Bundle_Option_Interface>>>;
    configurable_item_options?: Maybe<Array<Maybe<Configurable_Product_Data_Configurable_Item_Option_Value_Interface>>>;
    custom_options?: Maybe<Array<Maybe<Catalog_Data_Custom_Option_Interface>>>;
    downloadable_option?: Maybe<Downloadable_Data_Downloadable_Option_Interface>;
    giftcard_item_option?: Maybe<Gift_Card_Data_Gift_Card_Option_Interface>;
    grouped_options?: Maybe<Array<Maybe<Grouped_Product_Data_Grouped_Options_Interface>>>;
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\ProductOptionInterface */
export type Quote_Data_Product_Option_Extension_Interface_Input = {
    bundle_options?: InputMaybe<Array<InputMaybe<Bundle_Data_Bundle_Option_Interface_Input>>>;
    configurable_item_options?: InputMaybe<Array<InputMaybe<Configurable_Product_Data_Configurable_Item_Option_Value_Interface_Input>>>;
    custom_options?: InputMaybe<Array<InputMaybe<Catalog_Data_Custom_Option_Interface_Input>>>;
    downloadable_option?: InputMaybe<Downloadable_Data_Downloadable_Option_Interface_Input>;
    giftcard_item_option?: InputMaybe<Gift_Card_Data_Gift_Card_Option_Interface_Input>;
    grouped_options?: InputMaybe<Array<InputMaybe<Grouped_Product_Data_Grouped_Options_Interface_Input>>>;
};
/** Product option interface */
export type Quote_Data_Product_Option_Interface = {
    __typename?: 'quote_data_product_option_interface';
    extension_attributes?: Maybe<Quote_Data_Product_Option_Extension_Interface>;
};
/** Product option interface */
export type Quote_Data_Product_Option_Interface_Input = {
    extension_attributes?: InputMaybe<Quote_Data_Product_Option_Extension_Interface_Input>;
};
/** Interface ShippingAssignmentInterface */
export type Quote_Data_Shipping_Assignment_Interface = {
    __typename?: 'quote_data_shipping_assignment_interface';
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    items: Array<Maybe<Quote_Data_Cart_Item_Interface>>;
    shipping: Quote_Data_Shipping_Interface;
};
/** Interface ShippingInterface */
export type Quote_Data_Shipping_Interface = {
    __typename?: 'quote_data_shipping_interface';
    address: Quote_Data_Address_Interface;
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Shipping method */
    method: Scalars['String']['output'];
};
/** Interface ShippingMethodInterface */
export type Quote_Data_Shipping_Method_Interface = {
    __typename?: 'quote_data_shipping_method_interface';
    /** Shipping amount in store currency. */
    amount: Scalars['Float']['output'];
    /** The value of the availability flag for the current shipping method. */
    available: Scalars['Boolean']['output'];
    /** Shipping amount in base currency. */
    base_amount: Scalars['Float']['output'];
    /** Shipping carrier code. */
    carrier_code: Scalars['String']['output'];
    /** Shipping carrier title. Otherwise, null. */
    carrier_title?: Maybe<Scalars['String']['output']>;
    /** Shipping Error message. */
    error_message: Scalars['String']['output'];
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Shipping method code. */
    method_code: Scalars['String']['output'];
    /** Shipping method title. Otherwise, null. */
    method_title?: Maybe<Scalars['String']['output']>;
    /** Shipping price excl tax. */
    price_excl_tax: Scalars['Float']['output'];
    /** Shipping price incl tax. */
    price_incl_tax: Scalars['Float']['output'];
};
/** Interface ShippingMethodInterface */
export type Quote_Data_Shipping_Method_Interface2 = {
    __typename?: 'quote_data_shipping_method_interface2';
    /** Shipping amount in store currency. */
    amount: Scalars['Float']['output'];
    /** The value of the availability flag for the current shipping method. */
    available: Scalars['Boolean']['output'];
    /** Shipping amount in base currency. */
    base_amount: Scalars['Float']['output'];
    /** Shipping carrier code. */
    carrier_code: Scalars['String']['output'];
    /** Shipping carrier title. Otherwise, null. */
    carrier_title?: Maybe<Scalars['String']['output']>;
    /** Shipping Error message. */
    error_message: Scalars['String']['output'];
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Shipping method code. */
    method_code: Scalars['String']['output'];
    /** Shipping method title. Otherwise, null. */
    method_title?: Maybe<Scalars['String']['output']>;
    /** Shipping price excl tax. */
    price_excl_tax: Scalars['Float']['output'];
    /** Shipping price incl tax. */
    price_incl_tax: Scalars['Float']['output'];
};
/** Interface ShippingMethodInterface */
export type Quote_Data_Shipping_Method_Interface3 = {
    __typename?: 'quote_data_shipping_method_interface3';
    /** Shipping amount in store currency. */
    amount: Scalars['Float']['output'];
    /** The value of the availability flag for the current shipping method. */
    available: Scalars['Boolean']['output'];
    /** Shipping amount in base currency. */
    base_amount: Scalars['Float']['output'];
    /** Shipping carrier code. */
    carrier_code: Scalars['String']['output'];
    /** Shipping carrier title. Otherwise, null. */
    carrier_title?: Maybe<Scalars['String']['output']>;
    /** Shipping Error message. */
    error_message: Scalars['String']['output'];
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Shipping method code. */
    method_code: Scalars['String']['output'];
    /** Shipping method title. Otherwise, null. */
    method_title?: Maybe<Scalars['String']['output']>;
    /** Shipping price excl tax. */
    price_excl_tax: Scalars['Float']['output'];
    /** Shipping price incl tax. */
    price_incl_tax: Scalars['Float']['output'];
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\TotalSegmentInterface */
export type Quote_Data_Total_Segment_Extension_Interface = {
    __typename?: 'quote_data_total_segment_extension_interface';
    gift_cards?: Maybe<Scalars['String']['output']>;
    gw_add_card?: Maybe<Scalars['String']['output']>;
    gw_allow_gift_receipt?: Maybe<Scalars['String']['output']>;
    gw_base_price?: Maybe<Scalars['String']['output']>;
    gw_base_price_incl_tax?: Maybe<Scalars['String']['output']>;
    gw_base_tax_amount?: Maybe<Scalars['String']['output']>;
    gw_card_base_price?: Maybe<Scalars['String']['output']>;
    gw_card_base_price_incl_tax?: Maybe<Scalars['String']['output']>;
    gw_card_base_tax_amount?: Maybe<Scalars['String']['output']>;
    gw_card_price?: Maybe<Scalars['String']['output']>;
    gw_card_price_incl_tax?: Maybe<Scalars['String']['output']>;
    gw_card_tax_amount?: Maybe<Scalars['String']['output']>;
    gw_item_ids?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    gw_items_base_price?: Maybe<Scalars['String']['output']>;
    gw_items_base_price_incl_tax?: Maybe<Scalars['String']['output']>;
    gw_items_base_tax_amount?: Maybe<Scalars['String']['output']>;
    gw_items_price?: Maybe<Scalars['String']['output']>;
    gw_items_price_incl_tax?: Maybe<Scalars['String']['output']>;
    gw_items_tax_amount?: Maybe<Scalars['String']['output']>;
    gw_order_id?: Maybe<Scalars['String']['output']>;
    gw_price?: Maybe<Scalars['String']['output']>;
    gw_price_incl_tax?: Maybe<Scalars['String']['output']>;
    gw_tax_amount?: Maybe<Scalars['String']['output']>;
    tax_grandtotal_details?: Maybe<Array<Maybe<Tax_Data_Grand_Total_Details_Interface>>>;
};
/** Interface TotalsInterface */
export type Quote_Data_Total_Segment_Interface = {
    __typename?: 'quote_data_total_segment_interface';
    /** Display area code. */
    area?: Maybe<Scalars['String']['output']>;
    /** Code */
    code: Scalars['String']['output'];
    extension_attributes?: Maybe<Quote_Data_Total_Segment_Extension_Interface>;
    /** Total title */
    title?: Maybe<Scalars['String']['output']>;
    /** Total value */
    value: Scalars['Float']['output'];
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\TotalsAdditionalDataInterface */
export type Quote_Data_Totals_Additional_Data_Extension_Interface_Input = {
    gift_messages?: InputMaybe<Array<InputMaybe<Gift_Message_Data_Message_Interface_Input>>>;
};
/** Additional data for totals collection. */
export type Quote_Data_Totals_Additional_Data_Interface_Input = {
    /** Custom attributes values. */
    custom_attributes?: InputMaybe<Array<InputMaybe<Framework_Attribute_Interface_Input>>>;
    extension_attributes?: InputMaybe<Quote_Data_Totals_Additional_Data_Extension_Interface_Input>;
};
/** ExtensionInterface class for @see \Magento\Quote\Api\Data\TotalsInterface */
export type Quote_Data_Totals_Extension_Interface = {
    __typename?: 'quote_data_totals_extension_interface';
    base_customer_balance_amount?: Maybe<Scalars['Float']['output']>;
    base_reward_currency_amount?: Maybe<Scalars['Float']['output']>;
    coupon_codes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    coupon_label?: Maybe<Scalars['String']['output']>;
    coupons_labels?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    customer_balance_amount?: Maybe<Scalars['Float']['output']>;
    reward_currency_amount?: Maybe<Scalars['Float']['output']>;
    reward_points_balance?: Maybe<Scalars['Float']['output']>;
};
/** Interface TotalsInterface */
export type Quote_Data_Totals_Interface = {
    __typename?: 'quote_data_totals_interface';
    /** Base currency code */
    base_currency_code?: Maybe<Scalars['String']['output']>;
    /** Discount amount in base currency */
    base_discount_amount?: Maybe<Scalars['Float']['output']>;
    /** Grand total in base currency */
    base_grand_total?: Maybe<Scalars['Float']['output']>;
    /** Shipping amount in base currency */
    base_shipping_amount?: Maybe<Scalars['Float']['output']>;
    /** Shipping discount amount in base currency */
    base_shipping_discount_amount?: Maybe<Scalars['Float']['output']>;
    /** Shipping including tax in base currency */
    base_shipping_incl_tax?: Maybe<Scalars['Float']['output']>;
    /** Shipping tax amount in base currency */
    base_shipping_tax_amount?: Maybe<Scalars['Float']['output']>;
    /** Subtotal in base currency */
    base_subtotal?: Maybe<Scalars['Float']['output']>;
    /** Subtotal including tax in base currency */
    base_subtotal_incl_tax?: Maybe<Scalars['Float']['output']>;
    /** Subtotal in base currency with applied discount */
    base_subtotal_with_discount?: Maybe<Scalars['Float']['output']>;
    /** Tax amount in base currency */
    base_tax_amount?: Maybe<Scalars['Float']['output']>;
    /** Applied coupon code */
    coupon_code?: Maybe<Scalars['String']['output']>;
    /** Discount amount in quote currency */
    discount_amount?: Maybe<Scalars['Float']['output']>;
    extension_attributes?: Maybe<Quote_Data_Totals_Extension_Interface>;
    /** Grand total in quote currency */
    grand_total?: Maybe<Scalars['Float']['output']>;
    /** Totals by items */
    items?: Maybe<Array<Maybe<Quote_Data_Totals_Item_Interface>>>;
    /** Items qty */
    items_qty?: Maybe<Scalars['Int']['output']>;
    /** Quote currency code */
    quote_currency_code?: Maybe<Scalars['String']['output']>;
    /** Shipping amount in quote currency */
    shipping_amount?: Maybe<Scalars['Float']['output']>;
    /** Shipping discount amount in quote currency */
    shipping_discount_amount?: Maybe<Scalars['Float']['output']>;
    /** Shipping including tax in quote currency */
    shipping_incl_tax?: Maybe<Scalars['Float']['output']>;
    /** Shipping tax amount in quote currency */
    shipping_tax_amount?: Maybe<Scalars['Float']['output']>;
    /** Subtotal in quote currency */
    subtotal?: Maybe<Scalars['Float']['output']>;
    /** Subtotal including tax in quote currency */
    subtotal_incl_tax?: Maybe<Scalars['Float']['output']>;
    /** Subtotal in quote currency with applied discount */
    subtotal_with_discount?: Maybe<Scalars['Float']['output']>;
    /** Tax amount in quote currency */
    tax_amount?: Maybe<Scalars['Float']['output']>;
    /** Dynamically calculated totals */
    total_segments: Array<Maybe<Quote_Data_Total_Segment_Interface>>;
    /** Item weee tax applied amount in quote currency. */
    weee_tax_applied_amount: Scalars['Float']['output'];
};
/** Interface TotalsItemInterface */
export type Quote_Data_Totals_Item_Interface = {
    __typename?: 'quote_data_totals_item_interface';
    /** Discount amount in base currency. Otherwise, null. */
    base_discount_amount?: Maybe<Scalars['Float']['output']>;
    /** Item price in base currency. */
    base_price: Scalars['Float']['output'];
    /** Price including tax in base currency. Otherwise, null. */
    base_price_incl_tax?: Maybe<Scalars['Float']['output']>;
    /** Row total in base currency. */
    base_row_total: Scalars['Float']['output'];
    /** Row total including tax in base currency. Otherwise, null. */
    base_row_total_incl_tax?: Maybe<Scalars['Float']['output']>;
    /** Tax amount in base currency. Otherwise, null. */
    base_tax_amount?: Maybe<Scalars['Float']['output']>;
    /** Discount amount in quote currency. Otherwise, null. */
    discount_amount?: Maybe<Scalars['Float']['output']>;
    /** Discount percent. Otherwise, null. */
    discount_percent?: Maybe<Scalars['Float']['output']>;
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Item id */
    item_id: Scalars['Int']['output'];
    /** Product name. Otherwise, null. */
    name?: Maybe<Scalars['String']['output']>;
    /** Item price in quote currency. */
    options: Scalars['String']['output'];
    /** Item price in quote currency. */
    price: Scalars['Float']['output'];
    /** Price including tax in quote currency. Otherwise, null. */
    price_incl_tax?: Maybe<Scalars['Float']['output']>;
    /** Item quantity. */
    qty: Scalars['Float']['output'];
    /** Row total in quote currency. */
    row_total: Scalars['Float']['output'];
    /** Row total including tax in quote currency. Otherwise, null. */
    row_total_incl_tax?: Maybe<Scalars['Float']['output']>;
    /** Row total with discount in quote currency. Otherwise, null. */
    row_total_with_discount?: Maybe<Scalars['Float']['output']>;
    /** Tax amount in quote currency. Otherwise, null. */
    tax_amount?: Maybe<Scalars['Float']['output']>;
    /** Tax percent. Otherwise, null. */
    tax_percent?: Maybe<Scalars['Float']['output']>;
    /** Item weee tax applied in quote currency. */
    weee_tax_applied: Scalars['String']['output'];
    /** Item weee tax applied amount in quote currency. */
    weee_tax_applied_amount: Scalars['Float']['output'];
};
/** Discount Data Interface */
export type Sales_Rule_Data_Discount_Data_Interface = {
    __typename?: 'sales_rule_data_discount_data_interface';
    /** Amount */
    amount: Scalars['Float']['output'];
    /** Base Amount */
    base_amount: Scalars['Float']['output'];
    /** Base Original Amount */
    base_original_amount: Scalars['Float']['output'];
    /** Original Amount */
    original_amount: Scalars['Float']['output'];
};
/** Discount Data Interface */
export type Sales_Rule_Data_Discount_Data_Interface_Input = {
    /** Amount */
    amount: Scalars['Float']['input'];
    /** Base Amount */
    base_amount: Scalars['Float']['input'];
    /** Base Original Amount */
    base_original_amount: Scalars['Float']['input'];
    /** Original Amount */
    original_amount: Scalars['Float']['input'];
};
/** Rule discount Interface */
export type Sales_Rule_Data_Rule_Discount_Interface = {
    __typename?: 'sales_rule_data_rule_discount_interface';
    discount_data: Sales_Rule_Data_Discount_Data_Interface;
    /** Rule ID */
    rule_i_d: Scalars['Int']['output'];
    /** Rule Label */
    rule_label: Scalars['String']['output'];
};
/** Rule discount Interface */
export type Sales_Rule_Data_Rule_Discount_Interface_Input = {
    discount_data: Sales_Rule_Data_Discount_Data_Interface_Input;
    /** Rule ID */
    rule_i_d: Scalars['Int']['input'];
    /** Rule Label */
    rule_label: Scalars['String']['input'];
};
/** Interface GrandTotalDetailsInterface */
export type Tax_Data_Grand_Total_Details_Interface = {
    __typename?: 'tax_data_grand_total_details_interface';
    /** Tax amount value */
    amount: Scalars['Float']['output'];
    /** Group identifier */
    group_id: Scalars['Int']['output'];
    /** Tax rates info */
    rates: Array<Maybe<Tax_Data_Grand_Total_Rates_Interface>>;
};
/** Interface GrandTotalRatesInterface */
export type Tax_Data_Grand_Total_Rates_Interface = {
    __typename?: 'tax_data_grand_total_rates_interface';
    /** Tax percentage value */
    percent: Scalars['String']['output'];
    /** Rate title */
    title: Scalars['String']['output'];
};
/** Authy device data interface */
export type Two_Factor_Auth_Data_Authy_Device_Interface_Input = {
    /** The country */
    country: Scalars['String']['input'];
    extension_attributes?: InputMaybe<Scalars['JSON']['input']>;
    /** The method to authenticate with */
    method: Scalars['String']['input'];
    /** The phone number */
    phone_number: Scalars['String']['input'];
};
/** Response for device registration prompt */
export type Two_Factor_Auth_Data_Authy_Registration_Prompt_Response_Interface = {
    __typename?: 'two_factor_auth_data_authy_registration_prompt_response_interface';
    /** The seconds to expire */
    expiration_seconds: Scalars['String']['output'];
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** The message */
    message: Scalars['String']['output'];
};
/** Represents the data needed to use duo */
export type Two_Factor_Auth_Data_Duo_Data_Interface = {
    __typename?: 'two_factor_auth_data_duo_data_interface';
    /** The api hostname */
    api_hostname: Scalars['String']['output'];
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** The signature */
    signature: Scalars['String']['output'];
};
/** Google configuration data interface */
export type Two_Factor_Auth_Data_Google_Configure_Interface = {
    __typename?: 'two_factor_auth_data_google_configure_interface';
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
    /** Value for QR code base 64 */
    qr_code_base64: Scalars['String']['output'];
    /** Value for secret code */
    secret_code: Scalars['String']['output'];
};
/** Represents a WebAuthn dataset */
export type Two_Factor_Auth_Data_U2f_Web_Authn_Request_Interface = {
    __typename?: 'two_factor_auth_data_u2f_web_authn_request_interface';
    /** The needed data to initiate a WebAuthn registration ceremony */
    credential_request_options_json: Scalars['String']['output'];
    extension_attributes?: Maybe<Scalars['JSON']['output']>;
};
/** 2FA engine interface */
export type Two_Factor_Auth_Engine_Interface = {
    __typename?: 'two_factor_auth_engine_interface';
    /** True if this provider has been enabled by admin */
    enabled: Scalars['Boolean']['output'];
};
/** 2FA provider interface */
export type Two_Factor_Auth_Provider_Interface = {
    __typename?: 'two_factor_auth_provider_interface';
    /** Auth action */
    auth_action: Scalars['String']['output'];
    /** Provider code */
    code: Scalars['String']['output'];
    /** Configure action */
    configure_action: Scalars['String']['output'];
    /** True if this provider has been enabled by admin */
    enabled: Scalars['Boolean']['output'];
    engine: Two_Factor_Auth_Engine_Interface;
    /** Allowed extra actions */
    extra_actions: Array<Maybe<Scalars['String']['output']>>;
    /** Icon */
    icon: Scalars['String']['output'];
    /** Provider name */
    name: Scalars['String']['output'];
    /** True if this provider configuration can be reset */
    reset_allowed: Scalars['Boolean']['output'];
};
/** 2FA provider interface */
export type Two_Factor_Auth_Provider_Interface2 = {
    __typename?: 'two_factor_auth_provider_interface2';
    /** Auth action */
    auth_action: Scalars['String']['output'];
    /** Provider code */
    code: Scalars['String']['output'];
    /** Configure action */
    configure_action: Scalars['String']['output'];
    /** True if this provider has been enabled by admin */
    enabled: Scalars['Boolean']['output'];
    engine: Two_Factor_Auth_Engine_Interface;
    /** Allowed extra actions */
    extra_actions: Array<Maybe<Scalars['String']['output']>>;
    /** Icon */
    icon: Scalars['String']['output'];
    /** Provider name */
    name: Scalars['String']['output'];
    /** True if this provider configuration can be reset */
    reset_allowed: Scalars['Boolean']['output'];
};
/** List of all weee attributes, their amounts, etc.., that product has */
export type Weee_Data_Product_Render_Weee_Adjustment_Attribute_Interface = {
    __typename?: 'weee_data_product_render_weee_adjustment_attribute_interface';
    /** Weee attribute amount */
    amount: Scalars['String']['output'];
    /** Product amount exclude tax */
    amount_excl_tax: Scalars['String']['output'];
    /** Weee attribute code */
    attribute_code: Scalars['String']['output'];
    extension_attributes: Scalars['JSON']['output'];
    /** Tax which is calculated to fixed product tax attribute */
    tax_amount: Scalars['String']['output'];
    /** Tax amount of weee attribute */
    tax_amount_incl_tax: Scalars['String']['output'];
};
export type CustomerOrderQueryVariables = Exact<{
    number: Scalars['String']['input'];
}>;
export type CustomerOrderQuery = {
    __typename?: 'Query';
    customer?: {
        __typename?: 'Customer';
        orders?: {
            __typename?: 'CustomerOrders';
            total_count?: number | null;
            items: Array<{
                __typename?: 'CustomerOrder';
                number: string;
                status: string;
                email?: string | null;
                shipping_method?: string | null;
                is_virtual: boolean;
                payment_methods?: Array<{
                    __typename?: 'OrderPaymentMethod';
                    name: string;
                    type: string;
                } | null> | null;
                total?: {
                    __typename?: 'OrderTotal';
                    subtotal: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                    total_tax: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                    total_shipping: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                    grand_total: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
                billing_address?: {
                    __typename?: 'OrderAddress';
                    firstname: string;
                    middlename?: string | null;
                    lastname: string;
                    street: Array<string | null>;
                    city: string;
                    postcode?: string | null;
                    telephone?: string | null;
                    country_code?: CountryCodeEnum | null;
                    region?: string | null;
                    region_id?: string | null;
                    company?: string | null;
                    custom_attributesV2: Array<{
                        __typename?: 'AttributeSelectedOptions';
                        code: string;
                    } | {
                        __typename?: 'AttributeValue';
                        value: string;
                        code: string;
                    } | null>;
                } | null;
                shipping_address?: {
                    __typename?: 'OrderAddress';
                    firstname: string;
                    middlename?: string | null;
                    lastname: string;
                    street: Array<string | null>;
                    city: string;
                    postcode?: string | null;
                    telephone?: string | null;
                    country_code?: CountryCodeEnum | null;
                    region?: string | null;
                    region_id?: string | null;
                    company?: string | null;
                    custom_attributesV2: Array<{
                        __typename?: 'AttributeSelectedOptions';
                        code: string;
                    } | {
                        __typename?: 'AttributeValue';
                        value: string;
                        code: string;
                    } | null>;
                } | null;
                items?: Array<{
                    __typename: 'BundleOrderItem';
                    id: string;
                    quantity_canceled?: number | null;
                    quantity_invoiced?: number | null;
                    quantity_ordered?: number | null;
                    quantity_refunded?: number | null;
                    quantity_returned?: number | null;
                    quantity_shipped?: number | null;
                    product_sale_price: {
                        __typename?: 'Money';
                        value?: number | null;
                        currency?: CurrencyEnum | null;
                    };
                    product?: {
                        __typename?: 'BundleProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'ConfigurableProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'DownloadableProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'GiftCardProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'GroupedProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'SimpleProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'VirtualProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | null;
                    selected_options?: Array<{
                        __typename?: 'OrderItemOption';
                        label: string;
                        value: string;
                    } | null> | null;
                } | {
                    __typename: 'DownloadableOrderItem';
                    id: string;
                    quantity_canceled?: number | null;
                    quantity_invoiced?: number | null;
                    quantity_ordered?: number | null;
                    quantity_refunded?: number | null;
                    quantity_returned?: number | null;
                    quantity_shipped?: number | null;
                    product_sale_price: {
                        __typename?: 'Money';
                        value?: number | null;
                        currency?: CurrencyEnum | null;
                    };
                    product?: {
                        __typename?: 'BundleProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'ConfigurableProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'DownloadableProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'GiftCardProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'GroupedProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'SimpleProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'VirtualProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | null;
                    selected_options?: Array<{
                        __typename?: 'OrderItemOption';
                        label: string;
                        value: string;
                    } | null> | null;
                } | {
                    __typename: 'GiftCardOrderItem';
                    id: string;
                    quantity_canceled?: number | null;
                    quantity_invoiced?: number | null;
                    quantity_ordered?: number | null;
                    quantity_refunded?: number | null;
                    quantity_returned?: number | null;
                    quantity_shipped?: number | null;
                    gift_card?: {
                        __typename?: 'GiftCardItem';
                        recipient_name?: string | null;
                        recipient_email?: string | null;
                        sender_name?: string | null;
                        sender_email?: string | null;
                        message?: string | null;
                    } | null;
                    product_sale_price: {
                        __typename?: 'Money';
                        value?: number | null;
                        currency?: CurrencyEnum | null;
                    };
                    product?: {
                        __typename?: 'BundleProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'ConfigurableProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'DownloadableProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'GiftCardProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'GroupedProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'SimpleProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'VirtualProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | null;
                    selected_options?: Array<{
                        __typename?: 'OrderItemOption';
                        label: string;
                        value: string;
                    } | null> | null;
                } | {
                    __typename: 'OrderItem';
                    id: string;
                    quantity_canceled?: number | null;
                    quantity_invoiced?: number | null;
                    quantity_ordered?: number | null;
                    quantity_refunded?: number | null;
                    quantity_returned?: number | null;
                    quantity_shipped?: number | null;
                    product_sale_price: {
                        __typename?: 'Money';
                        value?: number | null;
                        currency?: CurrencyEnum | null;
                    };
                    product?: {
                        __typename?: 'BundleProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'ConfigurableProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'DownloadableProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'GiftCardProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'GroupedProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'SimpleProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | {
                        __typename?: 'VirtualProduct';
                        name?: string | null;
                        sku?: string | null;
                        thumbnail?: {
                            __typename?: 'ProductImage';
                            label?: string | null;
                            url?: string | null;
                        } | null;
                        price_range: {
                            __typename?: 'PriceRange';
                            maximum_price?: {
                                __typename?: 'ProductPrice';
                                regular_price: {
                                    __typename?: 'Money';
                                    currency?: CurrencyEnum | null;
                                    value?: number | null;
                                };
                            } | null;
                        };
                    } | null;
                    selected_options?: Array<{
                        __typename?: 'OrderItemOption';
                        label: string;
                        value: string;
                    } | null> | null;
                } | null> | null;
            } | null>;
        } | null;
    } | null;
};
export type GuestOrderDataFragment = {
    __typename?: 'CustomerOrder';
    number: string;
    status: string;
    email?: string | null;
    shipping_method?: string | null;
    is_virtual: boolean;
    payment_methods?: Array<{
        __typename?: 'OrderPaymentMethod';
        name: string;
        type: string;
    } | null> | null;
    total?: {
        __typename?: 'OrderTotal';
        subtotal: {
            __typename?: 'Money';
            currency?: CurrencyEnum | null;
            value?: number | null;
        };
        total_tax: {
            __typename?: 'Money';
            currency?: CurrencyEnum | null;
            value?: number | null;
        };
        total_shipping: {
            __typename?: 'Money';
            currency?: CurrencyEnum | null;
            value?: number | null;
        };
        grand_total: {
            __typename?: 'Money';
            currency?: CurrencyEnum | null;
            value?: number | null;
        };
    } | null;
    billing_address?: {
        __typename?: 'OrderAddress';
        firstname: string;
        middlename?: string | null;
        lastname: string;
        street: Array<string | null>;
        city: string;
        postcode?: string | null;
        telephone?: string | null;
        country_code?: CountryCodeEnum | null;
        region?: string | null;
        region_id?: string | null;
        company?: string | null;
        custom_attributesV2: Array<{
            __typename?: 'AttributeSelectedOptions';
            code: string;
        } | {
            __typename?: 'AttributeValue';
            value: string;
            code: string;
        } | null>;
    } | null;
    shipping_address?: {
        __typename?: 'OrderAddress';
        firstname: string;
        middlename?: string | null;
        lastname: string;
        street: Array<string | null>;
        city: string;
        postcode?: string | null;
        telephone?: string | null;
        country_code?: CountryCodeEnum | null;
        region?: string | null;
        region_id?: string | null;
        company?: string | null;
        custom_attributesV2: Array<{
            __typename?: 'AttributeSelectedOptions';
            code: string;
        } | {
            __typename?: 'AttributeValue';
            value: string;
            code: string;
        } | null>;
    } | null;
    items?: Array<{
        __typename: 'BundleOrderItem';
        id: string;
        quantity_canceled?: number | null;
        quantity_invoiced?: number | null;
        quantity_ordered?: number | null;
        quantity_refunded?: number | null;
        quantity_returned?: number | null;
        quantity_shipped?: number | null;
        product_sale_price: {
            __typename?: 'Money';
            value?: number | null;
            currency?: CurrencyEnum | null;
        };
        product?: {
            __typename?: 'BundleProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'ConfigurableProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'DownloadableProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'GiftCardProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'GroupedProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'SimpleProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'VirtualProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | null;
        selected_options?: Array<{
            __typename?: 'OrderItemOption';
            label: string;
            value: string;
        } | null> | null;
    } | {
        __typename: 'DownloadableOrderItem';
        id: string;
        quantity_canceled?: number | null;
        quantity_invoiced?: number | null;
        quantity_ordered?: number | null;
        quantity_refunded?: number | null;
        quantity_returned?: number | null;
        quantity_shipped?: number | null;
        product_sale_price: {
            __typename?: 'Money';
            value?: number | null;
            currency?: CurrencyEnum | null;
        };
        product?: {
            __typename?: 'BundleProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'ConfigurableProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'DownloadableProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'GiftCardProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'GroupedProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'SimpleProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'VirtualProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | null;
        selected_options?: Array<{
            __typename?: 'OrderItemOption';
            label: string;
            value: string;
        } | null> | null;
    } | {
        __typename: 'GiftCardOrderItem';
        id: string;
        quantity_canceled?: number | null;
        quantity_invoiced?: number | null;
        quantity_ordered?: number | null;
        quantity_refunded?: number | null;
        quantity_returned?: number | null;
        quantity_shipped?: number | null;
        gift_card?: {
            __typename?: 'GiftCardItem';
            recipient_name?: string | null;
            recipient_email?: string | null;
            sender_name?: string | null;
            sender_email?: string | null;
            message?: string | null;
        } | null;
        product_sale_price: {
            __typename?: 'Money';
            value?: number | null;
            currency?: CurrencyEnum | null;
        };
        product?: {
            __typename?: 'BundleProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'ConfigurableProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'DownloadableProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'GiftCardProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'GroupedProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'SimpleProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'VirtualProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | null;
        selected_options?: Array<{
            __typename?: 'OrderItemOption';
            label: string;
            value: string;
        } | null> | null;
    } | {
        __typename: 'OrderItem';
        id: string;
        quantity_canceled?: number | null;
        quantity_invoiced?: number | null;
        quantity_ordered?: number | null;
        quantity_refunded?: number | null;
        quantity_returned?: number | null;
        quantity_shipped?: number | null;
        product_sale_price: {
            __typename?: 'Money';
            value?: number | null;
            currency?: CurrencyEnum | null;
        };
        product?: {
            __typename?: 'BundleProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'ConfigurableProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'DownloadableProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'GiftCardProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'GroupedProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'SimpleProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | {
            __typename?: 'VirtualProduct';
            name?: string | null;
            sku?: string | null;
            thumbnail?: {
                __typename?: 'ProductImage';
                label?: string | null;
                url?: string | null;
            } | null;
            price_range: {
                __typename?: 'PriceRange';
                maximum_price?: {
                    __typename?: 'ProductPrice';
                    regular_price: {
                        __typename?: 'Money';
                        currency?: CurrencyEnum | null;
                        value?: number | null;
                    };
                } | null;
            };
        } | null;
        selected_options?: Array<{
            __typename?: 'OrderItemOption';
            label: string;
            value: string;
        } | null> | null;
    } | null> | null;
};
export type GuestOrderQueryVariables = Exact<{
    number: Scalars['String']['input'];
    email: Scalars['String']['input'];
    postcode: Scalars['String']['input'];
}>;
export type GuestOrderQuery = {
    __typename?: 'Query';
    guestOrder: {
        __typename?: 'CustomerOrder';
        number: string;
        status: string;
        email?: string | null;
        shipping_method?: string | null;
        is_virtual: boolean;
        payment_methods?: Array<{
            __typename?: 'OrderPaymentMethod';
            name: string;
            type: string;
        } | null> | null;
        total?: {
            __typename?: 'OrderTotal';
            subtotal: {
                __typename?: 'Money';
                currency?: CurrencyEnum | null;
                value?: number | null;
            };
            total_tax: {
                __typename?: 'Money';
                currency?: CurrencyEnum | null;
                value?: number | null;
            };
            total_shipping: {
                __typename?: 'Money';
                currency?: CurrencyEnum | null;
                value?: number | null;
            };
            grand_total: {
                __typename?: 'Money';
                currency?: CurrencyEnum | null;
                value?: number | null;
            };
        } | null;
        billing_address?: {
            __typename?: 'OrderAddress';
            firstname: string;
            middlename?: string | null;
            lastname: string;
            street: Array<string | null>;
            city: string;
            postcode?: string | null;
            telephone?: string | null;
            country_code?: CountryCodeEnum | null;
            region?: string | null;
            region_id?: string | null;
            company?: string | null;
            custom_attributesV2: Array<{
                __typename?: 'AttributeSelectedOptions';
                code: string;
            } | {
                __typename?: 'AttributeValue';
                value: string;
                code: string;
            } | null>;
        } | null;
        shipping_address?: {
            __typename?: 'OrderAddress';
            firstname: string;
            middlename?: string | null;
            lastname: string;
            street: Array<string | null>;
            city: string;
            postcode?: string | null;
            telephone?: string | null;
            country_code?: CountryCodeEnum | null;
            region?: string | null;
            region_id?: string | null;
            company?: string | null;
            custom_attributesV2: Array<{
                __typename?: 'AttributeSelectedOptions';
                code: string;
            } | {
                __typename?: 'AttributeValue';
                value: string;
                code: string;
            } | null>;
        } | null;
        items?: Array<{
            __typename: 'BundleOrderItem';
            id: string;
            quantity_canceled?: number | null;
            quantity_invoiced?: number | null;
            quantity_ordered?: number | null;
            quantity_refunded?: number | null;
            quantity_returned?: number | null;
            quantity_shipped?: number | null;
            product_sale_price: {
                __typename?: 'Money';
                value?: number | null;
                currency?: CurrencyEnum | null;
            };
            product?: {
                __typename?: 'BundleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'ConfigurableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'DownloadableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GiftCardProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GroupedProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'SimpleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'VirtualProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | null;
            selected_options?: Array<{
                __typename?: 'OrderItemOption';
                label: string;
                value: string;
            } | null> | null;
        } | {
            __typename: 'DownloadableOrderItem';
            id: string;
            quantity_canceled?: number | null;
            quantity_invoiced?: number | null;
            quantity_ordered?: number | null;
            quantity_refunded?: number | null;
            quantity_returned?: number | null;
            quantity_shipped?: number | null;
            product_sale_price: {
                __typename?: 'Money';
                value?: number | null;
                currency?: CurrencyEnum | null;
            };
            product?: {
                __typename?: 'BundleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'ConfigurableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'DownloadableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GiftCardProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GroupedProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'SimpleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'VirtualProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | null;
            selected_options?: Array<{
                __typename?: 'OrderItemOption';
                label: string;
                value: string;
            } | null> | null;
        } | {
            __typename: 'GiftCardOrderItem';
            id: string;
            quantity_canceled?: number | null;
            quantity_invoiced?: number | null;
            quantity_ordered?: number | null;
            quantity_refunded?: number | null;
            quantity_returned?: number | null;
            quantity_shipped?: number | null;
            gift_card?: {
                __typename?: 'GiftCardItem';
                recipient_name?: string | null;
                recipient_email?: string | null;
                sender_name?: string | null;
                sender_email?: string | null;
                message?: string | null;
            } | null;
            product_sale_price: {
                __typename?: 'Money';
                value?: number | null;
                currency?: CurrencyEnum | null;
            };
            product?: {
                __typename?: 'BundleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'ConfigurableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'DownloadableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GiftCardProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GroupedProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'SimpleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'VirtualProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | null;
            selected_options?: Array<{
                __typename?: 'OrderItemOption';
                label: string;
                value: string;
            } | null> | null;
        } | {
            __typename: 'OrderItem';
            id: string;
            quantity_canceled?: number | null;
            quantity_invoiced?: number | null;
            quantity_ordered?: number | null;
            quantity_refunded?: number | null;
            quantity_returned?: number | null;
            quantity_shipped?: number | null;
            product_sale_price: {
                __typename?: 'Money';
                value?: number | null;
                currency?: CurrencyEnum | null;
            };
            product?: {
                __typename?: 'BundleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'ConfigurableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'DownloadableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GiftCardProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GroupedProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'SimpleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'VirtualProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | null;
            selected_options?: Array<{
                __typename?: 'OrderItemOption';
                label: string;
                value: string;
            } | null> | null;
        } | null> | null;
    };
};
export type GuestOrderByTokenQueryVariables = Exact<{
    token: Scalars['String']['input'];
}>;
export type GuestOrderByTokenQuery = {
    __typename?: 'Query';
    guestOrderByToken: {
        __typename?: 'CustomerOrder';
        number: string;
        status: string;
        email?: string | null;
        shipping_method?: string | null;
        is_virtual: boolean;
        payment_methods?: Array<{
            __typename?: 'OrderPaymentMethod';
            name: string;
            type: string;
        } | null> | null;
        total?: {
            __typename?: 'OrderTotal';
            subtotal: {
                __typename?: 'Money';
                currency?: CurrencyEnum | null;
                value?: number | null;
            };
            total_tax: {
                __typename?: 'Money';
                currency?: CurrencyEnum | null;
                value?: number | null;
            };
            total_shipping: {
                __typename?: 'Money';
                currency?: CurrencyEnum | null;
                value?: number | null;
            };
            grand_total: {
                __typename?: 'Money';
                currency?: CurrencyEnum | null;
                value?: number | null;
            };
        } | null;
        billing_address?: {
            __typename?: 'OrderAddress';
            firstname: string;
            middlename?: string | null;
            lastname: string;
            street: Array<string | null>;
            city: string;
            postcode?: string | null;
            telephone?: string | null;
            country_code?: CountryCodeEnum | null;
            region?: string | null;
            region_id?: string | null;
            company?: string | null;
            custom_attributesV2: Array<{
                __typename?: 'AttributeSelectedOptions';
                code: string;
            } | {
                __typename?: 'AttributeValue';
                value: string;
                code: string;
            } | null>;
        } | null;
        shipping_address?: {
            __typename?: 'OrderAddress';
            firstname: string;
            middlename?: string | null;
            lastname: string;
            street: Array<string | null>;
            city: string;
            postcode?: string | null;
            telephone?: string | null;
            country_code?: CountryCodeEnum | null;
            region?: string | null;
            region_id?: string | null;
            company?: string | null;
            custom_attributesV2: Array<{
                __typename?: 'AttributeSelectedOptions';
                code: string;
            } | {
                __typename?: 'AttributeValue';
                value: string;
                code: string;
            } | null>;
        } | null;
        items?: Array<{
            __typename: 'BundleOrderItem';
            id: string;
            quantity_canceled?: number | null;
            quantity_invoiced?: number | null;
            quantity_ordered?: number | null;
            quantity_refunded?: number | null;
            quantity_returned?: number | null;
            quantity_shipped?: number | null;
            product_sale_price: {
                __typename?: 'Money';
                value?: number | null;
                currency?: CurrencyEnum | null;
            };
            product?: {
                __typename?: 'BundleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'ConfigurableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'DownloadableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GiftCardProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GroupedProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'SimpleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'VirtualProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | null;
            selected_options?: Array<{
                __typename?: 'OrderItemOption';
                label: string;
                value: string;
            } | null> | null;
        } | {
            __typename: 'DownloadableOrderItem';
            id: string;
            quantity_canceled?: number | null;
            quantity_invoiced?: number | null;
            quantity_ordered?: number | null;
            quantity_refunded?: number | null;
            quantity_returned?: number | null;
            quantity_shipped?: number | null;
            product_sale_price: {
                __typename?: 'Money';
                value?: number | null;
                currency?: CurrencyEnum | null;
            };
            product?: {
                __typename?: 'BundleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'ConfigurableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'DownloadableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GiftCardProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GroupedProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'SimpleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'VirtualProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | null;
            selected_options?: Array<{
                __typename?: 'OrderItemOption';
                label: string;
                value: string;
            } | null> | null;
        } | {
            __typename: 'GiftCardOrderItem';
            id: string;
            quantity_canceled?: number | null;
            quantity_invoiced?: number | null;
            quantity_ordered?: number | null;
            quantity_refunded?: number | null;
            quantity_returned?: number | null;
            quantity_shipped?: number | null;
            gift_card?: {
                __typename?: 'GiftCardItem';
                recipient_name?: string | null;
                recipient_email?: string | null;
                sender_name?: string | null;
                sender_email?: string | null;
                message?: string | null;
            } | null;
            product_sale_price: {
                __typename?: 'Money';
                value?: number | null;
                currency?: CurrencyEnum | null;
            };
            product?: {
                __typename?: 'BundleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'ConfigurableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'DownloadableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GiftCardProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GroupedProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'SimpleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'VirtualProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | null;
            selected_options?: Array<{
                __typename?: 'OrderItemOption';
                label: string;
                value: string;
            } | null> | null;
        } | {
            __typename: 'OrderItem';
            id: string;
            quantity_canceled?: number | null;
            quantity_invoiced?: number | null;
            quantity_ordered?: number | null;
            quantity_refunded?: number | null;
            quantity_returned?: number | null;
            quantity_shipped?: number | null;
            product_sale_price: {
                __typename?: 'Money';
                value?: number | null;
                currency?: CurrencyEnum | null;
            };
            product?: {
                __typename?: 'BundleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'ConfigurableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'DownloadableProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GiftCardProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'GroupedProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'SimpleProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | {
                __typename?: 'VirtualProduct';
                name?: string | null;
                sku?: string | null;
                thumbnail?: {
                    __typename?: 'ProductImage';
                    label?: string | null;
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: 'PriceRange';
                    maximum_price?: {
                        __typename?: 'ProductPrice';
                        regular_price: {
                            __typename?: 'Money';
                            currency?: CurrencyEnum | null;
                            value?: number | null;
                        };
                    } | null;
                };
            } | null;
            selected_options?: Array<{
                __typename?: 'OrderItemOption';
                label: string;
                value: string;
            } | null> | null;
        } | null> | null;
    };
};
export type IsEmailAvailableQueryVariables = Exact<{
    email: Scalars['String']['input'];
}>;
export type IsEmailAvailableQuery = {
    __typename?: 'Query';
    isEmailAvailable?: {
        __typename?: 'IsEmailAvailableOutput';
        is_email_available?: boolean | null;
    } | null;
};
//# sourceMappingURL=types.d.ts.map