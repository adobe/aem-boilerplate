/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2026 Adobe
 * All Rights Reserved.
 * __________________
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 */
export interface UsePreloadImagesOptions {
    /** Skip the preload entirely; ready resolves to true synchronously. */
    enabled?: boolean;
    /**
     * Maximum time to wait for all images before giving up and reporting ready=true
     * with error=true. Prevents a single broken URL from soft-locking consumers.
     */
    timeoutMs?: number;
}
export interface UsePreloadImagesResult {
    ready: boolean;
    error: boolean;
}
/**
 * Preloads a list of image URLs in the background and reports when all are
 * decoded and ready to paint. Used to avoid visible flicker when a gallery
 * needs to swap to a new set of images.
 *
 * - Calls img.decode() when available (guarantees paint readiness); falls
 *   back to onload otherwise.
 * - Cancels stale state updates when the URL list changes; the underlying
 *   network requests continue in the background and are left to the browser.
 * - Always resolves ready=true after timeoutMs as a safety fallback.
 *
 * `ready` is derived synchronously from the URL list, so a transition to a
 * new non-empty url set immediately reports ready=false in the same render —
 * avoiding races where consumers would otherwise see a stale ready=true.
 */
export declare function usePreloadImages(urls: string[], { enabled, timeoutMs, }?: UsePreloadImagesOptions): UsePreloadImagesResult;
//# sourceMappingURL=usePreloadImages.d.ts.map