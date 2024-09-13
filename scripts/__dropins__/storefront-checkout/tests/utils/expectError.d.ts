type expectErrorProps = {
    candidate: (...args: any[]) => Promise<any>;
    args: any[];
    expectedError: any;
    expectedMessage: string;
};
export declare function expectError({ candidate, args, expectedError, expectedMessage, }: expectErrorProps): Promise<void>;
export {};
//# sourceMappingURL=expectError.d.ts.map