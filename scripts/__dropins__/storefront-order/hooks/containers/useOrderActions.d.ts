import { UseOrderActionsProps } from '../../types';

export declare const useOrderActions: ({ enableOrderCancellation, }: UseOrderActionsProps) => {
    orderActionStatus: {
        heading: string;
        text: string;
        status: 'success' | 'error' | 'warning' | undefined;
    };
    isDismissed: boolean;
    onDismiss: () => void;
};
//# sourceMappingURL=useOrderActions.d.ts.map