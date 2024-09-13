import { FetchQueryError } from '@adobe/fetch-graphql';

export declare class InvalidArgument extends Error {
    constructor(message: string);
}
export declare class FetchError extends Error {
    constructor(reasons: FetchQueryError);
}
export declare class MissingArgument extends Error {
    constructor(argument: string);
}
export declare class OrderNotFound extends Error {
    constructor();
}
export declare class MissingEmail extends InvalidArgument {
    constructor();
}
//# sourceMappingURL=errors.d.ts.map