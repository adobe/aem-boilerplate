import { FetchQueryError } from '../fetch-graphql';

export declare class FetchError extends Error {
    constructor(reasons: FetchQueryError);
}
export declare class InvalidArgument extends Error {
    constructor(message: string);
}
export declare class UnexpectedError extends Error {
    constructor(message: string);
}
export declare class MissingCart extends InvalidArgument {
    constructor();
}
export declare class MissingEmail extends InvalidArgument {
    constructor();
}
export declare class MissingPaymentMethod extends InvalidArgument {
    constructor();
}
export declare class MissingShippinghAddress extends InvalidArgument {
    constructor();
}
export declare class MissingBillingAddress extends InvalidArgument {
    constructor();
}
export declare class MissingCountry extends InvalidArgument {
    constructor();
}
//# sourceMappingURL=errors.d.ts.map