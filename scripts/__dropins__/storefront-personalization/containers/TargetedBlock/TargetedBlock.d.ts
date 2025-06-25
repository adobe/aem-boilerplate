import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { PersonalizationData } from '../../data/models';

export interface TargetedBlockProps extends HTMLAttributes<HTMLDivElement> {
    slots: {
        Content: SlotProps;
    };
    personalizationData: PersonalizationData;
    type?: string;
}
export declare const TargetedBlock: Container<TargetedBlockProps>;
//# sourceMappingURL=TargetedBlock.d.ts.map