import { FunctionComponent } from 'preact';

export interface AttachedFile {
    key: string;
    name: string;
    size: number;
    status: 'uploading' | 'success' | 'error';
    error?: string;
}
export interface AttachedFilesListProps {
    files: AttachedFile[];
    onRemove: (key: string) => void;
    disabled?: boolean;
}
export declare const AttachedFilesList: FunctionComponent<AttachedFilesListProps>;
//# sourceMappingURL=AttachedFilesList.d.ts.map