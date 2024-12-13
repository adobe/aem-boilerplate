import { Container } from '@dropins/tools/types/elsie/src/lib';

export interface ServerErrorProps {
    onRetry?: () => void;
    onServerError?: (error: string) => void;
}
export declare const ServerError: Container<ServerErrorProps>;
//# sourceMappingURL=ServerError.d.ts.map