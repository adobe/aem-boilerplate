import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface IncrementerProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size'> {
    name?: string;
    size?: 'medium' | 'large';
    onValue?: (value: any) => void;
    onUpdateError?: (error: Error) => void;
    error?: boolean;
    success?: boolean;
    min?: number;
    max?: number;
    disabled?: boolean;
    maxLength?: number;
}
export declare const Incrementer: FunctionComponent<IncrementerProps>;
//# sourceMappingURL=Incrementer.d.ts.map