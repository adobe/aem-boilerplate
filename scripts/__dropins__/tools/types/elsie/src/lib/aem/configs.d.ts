interface ConfigHeaders {
    all?: Record<string, string>;
    [key: string]: Record<string, string> | undefined;
}
interface ConfigPublic {
    default: ConfigRoot;
    [key: string]: ConfigRoot;
}
interface ConfigRoot {
    headers?: ConfigHeaders;
    [key: string]: any;
}
interface Config {
    public: ConfigPublic;
    [key: string]: any;
}
/**
 * Reset the config state
 */
declare function resetConfig(): void;
/**
 * Get root path
 * @param {Object} [configObj=config] - The config object.
 * @returns {string} - The root path.
 */
declare function getRootPath(configObj?: Config | null): string;
/**
 * Get list of root paths from public config
 * @returns {Array} - The list of root paths.
 */
declare function getListOfRootPaths(): string[];
/**
 * Checks if the public config contains more than "default"
 * @returns {boolean} - true if public config contains more than "default"
 */
declare function isMultistore(): boolean;
/**
 * Retrieves headers from config entries like commerce.headers.pdp.my-header, etc and
 * returns as object of all headers like { my-header: value, ... }
 * @param {string} scope - The scope of the headers to retrieve.
 * @returns {Object} - The headers.
 */
declare function getHeaders(scope: string): Record<string, string>;
/**
 * Initializes the configuration system.
 * @returns {Object} The initialized root configuration
 */
declare function initializeConfig(configObj: Config): ConfigRoot;
/**
 * Retrieves a configuration value.
 *
 * @param {string} configParam - The configuration parameter to retrieve.
 * @returns {string|undefined} - The value of the configuration parameter, or undefined.
 */
declare function getConfigValue(configParam: string): any;
export { initializeConfig, getRootPath, getListOfRootPaths, isMultistore, getConfigValue, getHeaders, resetConfig, };
//# sourceMappingURL=configs.d.ts.map