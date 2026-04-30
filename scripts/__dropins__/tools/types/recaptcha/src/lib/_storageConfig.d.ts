import { ReCaptchaModel } from '../types/recaptcha.types';

declare const getConfigStorage: (storageKey: string, retries?: number, delay?: number) => Promise<ReCaptchaModel | null>;
declare const setConfigStorage: (storageKey: string, config: ReCaptchaModel, logger: boolean) => null | undefined;
export { getConfigStorage, setConfigStorage };
//# sourceMappingURL=_storageConfig.d.ts.map