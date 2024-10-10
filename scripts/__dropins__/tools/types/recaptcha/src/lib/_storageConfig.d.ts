import { ReCaptchaV3Model } from '../types/recaptcha.types';

declare const getConfigStorage: (storageKey: string, retries?: number, delay?: number) => Promise<ReCaptchaV3Model | null>;
declare const setConfigStorage: (storageKey: string, config: ReCaptchaV3Model, logger: boolean) => null | undefined;
export { getConfigStorage, setConfigStorage };
//# sourceMappingURL=_storageConfig.d.ts.map