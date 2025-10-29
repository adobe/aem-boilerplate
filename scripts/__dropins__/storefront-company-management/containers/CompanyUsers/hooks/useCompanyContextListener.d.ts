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
 * Configuration options for company context event handling
 */
export interface CompanyContextListenerOptions {
    /** Whether to enable eager listening (subscribe immediately on mount) */
    eager?: boolean;
    /** Whether the hook is enabled (allows conditional subscription) */
    enabled?: boolean;
}
/**
 * Custom hook that listens to company context changes and executes a callback
 *
 * This hook provides a reusable pattern for components that need to respond to
 * company context changes (e.g., user switching companies, company data updates).
 *
 * @param callback - Function to execute when company context changes
 * @param options - Configuration options for the event listener
 *
 * @example
 * ```typescript
 * const MyComponent = () => {
 *   const [data, setData] = useState(null);
 *
 *   const refreshData = useCallback(async () => {
 *     const newData = await fetchMyData();
 *     setData(newData);
 *   }, []);
 *
 *   // Listen for company context changes and refresh data
 *   useCompanyContextListener(refreshData);
 *
 *   return <div>{data}</div>;
 * };
 * ```
 *
 * @example
 * ```typescript
 * // With options
 * useCompanyContextListener(refreshData, {
 *   eager: true,    // Subscribe immediately on mount
 *   enabled: true   // Conditionally enable/disable
 * });
 * ```
 */
export declare const useCompanyContextListener: (callback: () => void, options?: CompanyContextListenerOptions) => void;
//# sourceMappingURL=useCompanyContextListener.d.ts.map