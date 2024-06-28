import { ReCaptchaV3InitProps, ReCaptchaV3ModifyProps } from '../types/recaptcha.types';

declare const getConfigStorage: (storageKey: string, retries?: number, delay?: number) => Promise<ReCaptchaV3ModifyProps | null>;
declare const setConfigStorage: (storageKey: string, config: ReCaptchaV3InitProps) => null | undefined;
export { getConfigStorage, setConfigStorage };
//# sourceMappingURL=_storageConfig.d.ts.map