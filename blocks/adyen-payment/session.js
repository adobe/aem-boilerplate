/**
 * Adyen Sessions API helpers.
 *
 * Covers the minimal frontend needs for the Sessions-based OOPE flow:
 *   create-session (App Builder) → Drop-in → onPaymentCompleted
 *   → setPaymentMethodOnCart → placeOrder → validate-payment webhook
 */

import { loadCSS } from '../../scripts/aem.js';

const SDK_VERSION = '6.23.0';

/**
 * Commerce OOPE payment method code — must match payment-methods.yaml.
 * Exported so containers.js and commerce-checkout.js share one definition.
 */
export const ADYEN_PAYMENT_CODE = 'adyen_gateway';

// Single promise shared across concurrent callers so the script/CSS are never
// appended twice even if the slot renders before the first load finishes.
let sdkLoadPromise = null;

/**
 * Load the Adyen Web SDK (JS + CSS) from the Adyen CDN.
 * Safe to call multiple times — deduplicates at both the promise and DOM level.
 *
 * @param {string} environment - 'test' | 'live'
 */
export async function loadAdyenWebSDK(environment = 'test') {
  if (window.AdyenWeb?.AdyenCheckout || window.AdyenCheckout) return Promise.resolve();
  if (sdkLoadPromise) return sdkLoadPromise;

  const base = `https://checkoutshopper-${environment}.adyen.com/checkoutshopper/sdk/${SDK_VERSION}`;

  sdkLoadPromise = Promise.all([
    loadCSS(`${base}/adyen.css`),
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${base}/adyen.js`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load Adyen Web SDK'));
      document.head.appendChild(script);
    }),
  ]).finally(() => {
    sdkLoadPromise = null;
  });

  return sdkLoadPromise;
}

// ─── Session creation ─────────────────────────────────────────────────────────

/**
 * Call the App Builder create-session action.
 *
 * @param {string} endpoint  - Full URL of the adyen/create-session web action
 * @param {{ amount, reference, returnUrl, countryCode }} payload
 * @returns {Promise<{ id: string, sessionData: string, ... }>} Adyen session object
 */
export async function createAdyenSession(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await response.json();
  if (!response.ok || body.success === false) {
    throw new Error(`create-session failed: ${JSON.stringify(body.error ?? body)}`);
  }
  // App Builder wraps the Adyen response in { success: true, message: { id, sessionData, ... } }
  const session = body.message ?? body;
  if (!session?.id || !session?.sessionData) {
    throw new Error(`create-session returned invalid session — check App Builder logs. Response: ${JSON.stringify(body)}`);
  }
  return session;
}

// ─── Drop-in coordination ─────────────────────────────────────────────────────
// Bridges the Drop-in slot (containers.js) with handlePlaceOrder
// (commerce-checkout.js) so Place Order triggers Drop-in submission and the
// result flows back synchronously before placeOrder is called.

// 10-minute timeout matches typical Adyen session expiry.
const PAYMENT_TIMEOUT_MS = 10 * 60 * 1000;

let dropinInstance = null;

/** Returns true if the Adyen Drop-in is currently mounted. */
export function isDropinMounted() { return !!dropinInstance; }

let paymentResolve = null;
let paymentReject = null;
let paymentTimeoutId = null;

/** Returns true when submitAdyenPayment() has been called and is awaiting a result. */
export function isPaymentPending() { return !!paymentResolve; }

function clearPaymentCallbacks() {
  if (paymentTimeoutId) clearTimeout(paymentTimeoutId);
  paymentTimeoutId = null;
  paymentResolve = null;
  paymentReject = null;
}

/**
 * Store the mounted Drop-in instance so handlePlaceOrder can call submit().
 * Unmounts any previously stored instance first.
 */
export function setDropinInstance(instance) {
  if (dropinInstance && dropinInstance !== instance) {
    try { dropinInstance.unmount(); } catch { /* ignore */ }
  }
  dropinInstance = instance;
}

/** Clear the instance when the payment method is deselected. */
export function clearDropinInstance() {
  if (paymentReject) {
    paymentReject(new Error('Payment method deselected'));
    clearPaymentCallbacks();
  }
  dropinInstance = null;
}

/**
 * Programmatically submit the Drop-in and await payment completion.
 * Rejects after PAYMENT_TIMEOUT_MS if onPaymentCompleted never fires.
 *
 * @returns {Promise<{ sessionId, resultCode, sessionData, sessionResult }>}
 */
export function submitAdyenPayment() {
  if (!dropinInstance) throw new Error('[Adyen] Drop-in not initialised');

  return new Promise((resolve, reject) => {
    paymentResolve = resolve;
    paymentReject = reject;

    paymentTimeoutId = setTimeout(() => {
      clearPaymentCallbacks();
      reject(new Error('Payment timed out. Please try again.'));
    }, PAYMENT_TIMEOUT_MS);

    dropinInstance.submit();
  });
}

/** Called from onPaymentCompleted — resolves the awaiting handlePlaceOrder. */
export function resolveAdyenPayment(result) {
  if (paymentResolve) {
    // Save reference before clearPaymentCallbacks() nulls it out.
    const resolve = paymentResolve;
    clearPaymentCallbacks();
    resolve(result);
  }
}

/** Called from onPaymentFailed / onError — rejects the awaiting handlePlaceOrder. */
export function rejectAdyenPayment(reason) {
  if (paymentReject) {
    const reject = paymentReject;
    clearPaymentCallbacks();
    reject(new Error(reason || 'Payment failed'));
  }
}
