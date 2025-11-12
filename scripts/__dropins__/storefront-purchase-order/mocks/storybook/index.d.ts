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
/**
 * Storybook MSW (Mock Service Worker) handlers
 *
 * This directory contains MSW handlers used for:
 * - Storybook stories
 * - Mocking GraphQL requests at the network level
 * - Testing different UI states (loading, error, empty, etc.)
 *
 * These handlers intercept actual GraphQL requests and return
 * realistic mock responses for different scenarios.
 */
export { storybookHandlers, purchaseOrderHandlers, purchaseOrderLoadingHandlers, purchaseOrderEmptyHandlers, purchaseOrderErrorHandlers, purchaseOrderPaginationHandlers, companyPurchaseOrderPaginationHandlers, } from './purchase-orders';
export * from './events-data';
export * from './purchase-orders';
export * from './approval-rules';
//# sourceMappingURL=index.d.ts.map