
declare module '@adobe-commerce/event-bus' {
    interface Events {
        'company/updated': {
            company?: any;
            message?: string;
            error?: any;
        };
        'companyStructure/updated': {
            message?: string;
            action?: 'move' | 'remove' | 'add';
            nodeId?: string;
            newParentId?: string;
            nodeIds?: string[];
            nodes?: any[];
            error?: any;
        };
        'companyContext/changed': string | null | undefined;
    }
}
//# sourceMappingURL=events.d.ts.map