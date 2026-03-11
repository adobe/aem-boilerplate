import { CSVValidationResult } from '../types';

export interface ValidationMessages {
    emptyFile: string;
    missingColumns: string;
    extraColumns: string;
    maxRowsExceeded: string;
    skuRequired: string;
    invalidQuantity: string;
    noValidData: string;
}
/**
 * Validates CSV content and extracts SKU/quantity data
 * Handles BOM, different line endings, quoted values, and empty lines
 * @param content - Raw CSV file content
 * @param messages - Localized error messages
 * @returns Validation result with data or error
 */
export declare const validateCsvContent: (content: string, messages: ValidationMessages) => CSVValidationResult;
//# sourceMappingURL=validateCsvContent.d.ts.map