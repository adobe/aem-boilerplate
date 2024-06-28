import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
    centered?: boolean;
    onClose?: () => void;
}
export declare const Overlay: FunctionComponent<OverlayProps>;
//# sourceMappingURL=Overlay.d.ts.map