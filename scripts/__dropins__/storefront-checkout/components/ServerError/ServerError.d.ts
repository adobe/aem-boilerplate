import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ServerErrorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon'> {
    errorMessage: string;
    contactSupport?: string;
    onClick?: (e: any) => void;
}
export declare const ServerError: FunctionComponent<ServerErrorProps>;
//# sourceMappingURL=ServerError.d.ts.map