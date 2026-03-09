/**
 * Video utility functions for ProductGallery
 */
/**
 * Gets the MIME type for a video URL based on file extension
 * @param url - The video URL
 * @returns The MIME type string, defaults to 'video/mp4' if unknown
 */
export declare function getVideoMimeType(url: string): string;
/**
 * Checks if URL is a direct video file based on extension
 * @param url - The video URL
 * @returns true if direct video file
 */
export declare function isDirectVideoFile(url: string): boolean;
/**
 * Gets the preview image URL for a video.
 * Uses provided preview URL if available, otherwise tries to derive from video URL.
 * @param videoUrl - The video URL
 * @param previewUrl - The preview URL from data (if available)
 * @returns The preview image URL or undefined
 */
export declare function getVideoPreviewUrl(videoUrl: string, previewUrl?: string): string | undefined;
/**
 * Converts YouTube/Vimeo URLs to embeddable URLs.
 * Returns original URL for other video sources.
 * @param url - The original video URL
 * @returns The embed URL
 */
export declare function getEmbedUrl(url: string): string;
//# sourceMappingURL=videoUtils.d.ts.map