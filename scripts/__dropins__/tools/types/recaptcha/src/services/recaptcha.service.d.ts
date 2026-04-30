import { ReCaptchaModel } from '../types/recaptcha.types';

export declare const getRecaptchaToken: (websiteKey: string, isEnterprise?: boolean) => Promise<string>;
export declare const waitForReCaptcha: () => Promise<unknown>;
export declare const verifyReCaptchaLoad: (badgeId: string, config: ReCaptchaModel, logger: boolean, isEnterprise?: boolean) => Promise<void>;
//# sourceMappingURL=recaptcha.service.d.ts.map