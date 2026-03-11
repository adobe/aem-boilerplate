import { SubmitSkuValue } from './quickOrderMultipleSku.types';

export interface QuickOrderCsvUploadProps {
    className?: string;
    routeSampleCSV?: () => string;
    onFileUpload?: (values: SubmitSkuValue) => void;
}
export interface CsvFileInputProps {
    t: Record<string, string>;
    onFileUpload: (file: File) => void;
    error: string | null;
    fileName: string | null;
    onDownloadSample: () => void;
    showSampleDownload: boolean;
    disabled?: boolean;
}
export interface UseQuickOrderCsvUploadProps {
    routeSampleCSV?: () => string;
    onFileUpload?: (values: SubmitSkuValue) => void;
}
export interface UseQuickOrderCsvUploadReturn {
    handleFileUpload: (file: File) => void;
    error: string | null;
    fileName: string | null;
    handleDownloadSample: () => void;
    showSampleDownload: boolean;
}
export interface CSVValidationResult {
    isValid: boolean;
    error?: string;
    data?: SubmitSkuValue;
}
//# sourceMappingURL=quickOrderCsvUpload.types.d.ts.map