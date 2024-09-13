import { ReCaptchaV3Response, PropsFormTypes, ReCaptchaV3Model } from './types/recaptcha.types';

export declare const recaptchaFetchApi: {
    setEndpoint: (endpoint: string) => void;
    setFetchGraphQlHeader: (key: string, value: string | null) => void;
    removeFetchGraphQlHeader: (key: string) => void;
    setFetchGraphQlHeaders: (header: import('@adobe/fetch-graphql').Header) => void;
    fetchGraphQl: <T = any>(query: string, options?: import('@adobe/fetch-graphql').FetchOptions | undefined) => Promise<{
        errors?: import('@adobe/fetch-graphql').FetchQueryError | undefined;
        data: T;
    }>;
    getConfig: () => {
        endpoint: string | undefined;
        fetchGraphQlHeaders: import('@adobe/fetch-graphql').Header | undefined;
    };
};
export declare class RecaptchaModule {
    _enableReCAPTCHA: boolean;
    _recaptchaBackendEndpoint: string;
    _recaptchaScriptUrl: string;
    _configStorageKey: string;
    _logger: boolean;
    _updateBadgePosition(badgeId: string, config: ReCaptchaV3Model): Promise<void | null>;
    _addRecaptchaScript(): Promise<void>;
    _fetchStoreConfig(): Promise<ReCaptchaV3Response | undefined>;
    _loadConfig(): Promise<ReCaptchaV3Model | null>;
    setEndpoint(url: string): void;
    setConfig(configList: PropsFormTypes[]): Promise<void>;
    initReCaptcha(lazyLoadTimeout?: number): Promise<void>;
    verifyReCaptcha(): Promise<string | undefined>;
    enableLogger(logger: boolean): void;
    getMethods(): {
        enableLogger: (logger: boolean) => void;
        setEndpoint: (url: string) => void;
        setConfig: (configList: PropsFormTypes[]) => Promise<void>;
        initReCaptcha: (lazyLoadTimeout?: number) => Promise<void>;
        verifyReCaptcha: () => Promise<string | undefined>;
    };
}
declare const initReCaptcha: (lazyLoadTimeout?: number) => Promise<void>, verifyReCaptcha: () => Promise<string | undefined>, setEndpoint: (url: string) => void, setConfig: (configList: PropsFormTypes[]) => Promise<void>, enableLogger: (logger: boolean) => void;
export { setEndpoint, setConfig, initReCaptcha, verifyReCaptcha, enableLogger };
//# sourceMappingURL=index.d.ts.map