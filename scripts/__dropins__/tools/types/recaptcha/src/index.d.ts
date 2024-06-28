import { ReCaptchaV3Response, ReCaptchaV3ModifyProps, PropsFormTypes } from './types/recaptcha.types';

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
    _updateBadgePosition(currentForm: PropsFormTypes, config: ReCaptchaV3ModifyProps): Promise<void | null>;
    _addRecaptchaScript(): Promise<void>;
    _fetchStoreConfig(): Promise<ReCaptchaV3Response | undefined>;
    _loadConfig(): Promise<ReCaptchaV3ModifyProps | null>;
    setEndpoint(url: string): void;
    setConfig(configList: PropsFormTypes[]): Promise<void>;
    initReCaptcha(): Promise<void>;
    verifyReCaptcha(): Promise<string | undefined>;
    getMethods(): {
        setEndpoint: (url: string) => void;
        setConfig: (configList: PropsFormTypes[]) => Promise<void>;
        initReCaptcha: () => Promise<void>;
        verifyReCaptcha: () => Promise<string | undefined>;
    };
}
declare const initReCaptcha: () => Promise<void>, verifyReCaptcha: () => Promise<string | undefined>, setEndpoint: (url: string) => void, setConfig: (configList: PropsFormTypes[]) => Promise<void>;
export { setEndpoint, setConfig, initReCaptcha, verifyReCaptcha };
//# sourceMappingURL=index.d.ts.map