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
 * Fixture flag keys used in sessionStorage for test scenarios
 */
export declare const FIXTURE_FLAGS: {
    readonly USE_EXCEED_LIMIT_FIXTURE: "useExceedLimitFixture";
};
/**
 * Helper functions to manage fixture flags in sessionStorage
 * These functions safely check for window availability for SSR compatibility
 */
/**
 * Sets a fixture flag in sessionStorage
 * @param flag - The fixture flag key
 * @param value - The value to set (defaults to 'true')
 */
export declare function setFixtureFlag(flag: string, value?: string): void;
/**
 * Removes a fixture flag from sessionStorage
 * @param flag - The fixture flag key
 */
export declare function removeFixtureFlag(flag: string): void;
/**
 * Gets a fixture flag value from sessionStorage
 * @param flag - The fixture flag key
 * @returns The flag value or null if not set
 */
export declare function getFixtureFlag(flag: string): string | null;
/**
 * Checks if a fixture flag is set to 'true' in sessionStorage
 * @param flag - The fixture flag key
 * @returns True if the flag is set to 'true', false otherwise
 */
export declare function isFixtureFlagSet(flag: string): boolean;
/**
 * Specific helper for the useExceedLimitFixture flag
 */
export declare const exceedLimitFixture: {
    /**
     * Enables the exceed limit fixture (sets useExceedLimitFixture to 'true')
     */
    readonly enable: () => void;
    /**
     * Disables the exceed limit fixture (removes useExceedLimitFixture from sessionStorage)
     */
    readonly disable: () => void;
    /**
     * Checks if the exceed limit fixture is enabled
     * @returns True if useExceedLimitFixture is set to 'true'
     */
    readonly isEnabled: () => boolean;
};
//# sourceMappingURL=session-storage.d.ts.map