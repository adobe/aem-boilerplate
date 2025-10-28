
declare module '@adobe-commerce/event-bus' {
    interface Events {
        'company/updated': {
            company?: unknown;
            message?: string;
            error?: unknown;
        };
        'companyStructure/updated': {
            message?: string;
            action?: 'move' | 'remove' | 'add';
            nodeId?: string;
            newParentId?: string;
            nodeIds?: string[];
            nodes?: unknown[];
            error?: unknown;
        };
        'companyContext/changed': string | null | undefined;
    }
}
//# sourceMappingURL=events.d.ts.map