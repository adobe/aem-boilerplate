import { CheckoutError } from '../../data/models/checkout';
import { Container } from '@dropins/tools/types/elsie/src/lib';

export interface ServerErrorProps {
    autoScroll?: boolean;
    onRetry?: (error: CheckoutError | null) => void;
    onServerError?: (error: string) => void;
    active?: boolean;
}
export declare const ServerError: Container<ServerErrorProps>;
//# sourceMappingURL=ServerError.d.ts.map