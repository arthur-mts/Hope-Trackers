/**
 * Wraps a promise with a timeout which resolves to `null` after a given delay.
 * @ignore
 */
export declare const promiseTimeoutResolveNull: <T>(ms: number, promise: Promise<T>) => Promise<T | null>;
