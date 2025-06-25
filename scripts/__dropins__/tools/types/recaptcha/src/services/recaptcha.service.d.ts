import { ReCaptchaV3Model } from '../types/recaptcha.types';

export declare const getRecaptchaToken: (websiteKey: string) => Promise<string>;
export declare const waitForReCaptcha: () => Promise<unknown>;
export declare const verifyReCaptchaLoad: (badgeId: string, config: ReCaptchaV3Model, logger: boolean) => Promise<void>;
//# sourceMappingURL=recaptcha.service.d.ts.map