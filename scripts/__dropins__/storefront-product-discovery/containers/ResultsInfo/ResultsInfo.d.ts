import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';

export interface ResultsInfoProps extends HTMLAttributes<HTMLDivElement> {
    slots?: {
        SearchPhrase?: SlotProps;
        TotalCount?: SlotProps;
    };
}
export declare const ResultsInfo: Container<ResultsInfoProps>;
//# sourceMappingURL=ResultsInfo.d.ts.map