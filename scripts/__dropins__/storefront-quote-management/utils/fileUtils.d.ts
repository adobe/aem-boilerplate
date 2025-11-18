/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes - The file size in bytes
 * @returns A formatted string with the appropriate unit (Bytes, KB, MB, GB)
 *
 * @example
 * formatFileSize(0) // '0 Bytes'
 * formatFileSize(1024) // '1 KB'
 * formatFileSize(1536) // '1.5 KB'
 * formatFileSize(1048576) // '1 MB'
 * formatFileSize(5242880) // '5 MB'
 */
export declare const formatFileSize: (bytes: number) => string;
/**
 * Validates if a file type is accepted
 * @param fileType - The MIME type of the file
 * @param acceptedTypes - Array of accepted MIME types (e.g., ['image/png', 'application/pdf'])
 * @returns true if the file type is accepted, false otherwise
 *
 * @example
 * validateFileType('image/png', ['image/png', 'image/jpeg']) // true
 * validateFileType('application/pdf', ['image/png']) // false
 * validateFileType('image/png', []) // true (empty array means all types accepted)
 */
export declare const validateFileType: (fileType: string, acceptedTypes?: string[]) => boolean;
/**
 * Validates if a file size is within the maximum limit
 * @param fileSize - The file size in bytes
 * @param maxSize - Maximum allowed file size in bytes
 * @returns true if the file size is within the limit, false otherwise
 *
 * @example
 * validateFileSize(1024, 2048) // true
 * validateFileSize(3072, 2048) // false
 * validateFileSize(1024, undefined) // true (no limit)
 */
export declare const validateFileSize: (fileSize: number, maxSize?: number) => boolean;
//# sourceMappingURL=fileUtils.d.ts.map