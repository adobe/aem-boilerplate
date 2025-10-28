import { HTMLAttributes } from 'preact/compat';

export interface PageSizePickerProps extends HTMLAttributes<HTMLDivElement> {
    currentPageSize: number;
    onPageSizeChange: (pageSize: number) => void;
    disabled?: boolean;
    pageSizeOptions?: number[];
}
export declare const PageSizePicker: ({ currentPageSize, onPageSizeChange, disabled, pageSizeOptions, }: PageSizePickerProps) => import("preact/compat").JSX.Element;
//# sourceMappingURL=PageSizePicker.d.ts.map