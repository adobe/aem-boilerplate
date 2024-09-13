declare enum EventsList {
    CREATE_ACCOUNT_EVENT = "create-account",
    SIGN_IN = "sign-in",
    SIGN_OUT = "sign-out"
}
export declare function pushEvent(event: string): void;
declare const publishEvents: (eventType: string, eventParams: any) => null | undefined;
export { EventsList, publishEvents };
//# sourceMappingURL=acdl.d.ts.map