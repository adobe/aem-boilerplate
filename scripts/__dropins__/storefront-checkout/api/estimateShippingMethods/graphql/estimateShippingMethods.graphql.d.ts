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
export declare const estimateShippingMethodsMutation = "\nmutation estimateShippingMethods(\n\t$cartId: String!\n  $address: EstimateAddressInput!\n) {\n\testimateShippingMethods(\n\t\tinput: {\n\t\t\tcart_id: $cartId\n\t\t\taddress: $address\n\t\t}\n\t) {\n\t\tcarrier_title\n\t\tcarrier_code\n\t\tmethod_title\n\t\tmethod_code\n\t\tavailable\n\t\tamount {\n\t\t\tcurrency\n\t\t\tvalue\n\t\t}\n\t\tprice_excl_tax {\n\t\t\tcurrency\n\t\t\tvalue\n\t\t}\n\t\tprice_incl_tax {\n\t\t\tcurrency\n\t\t\tvalue\n\t\t}\n\t\terror_message\n\t}\n}\n";
//# sourceMappingURL=estimateShippingMethods.graphql.d.ts.map