import { ValuesModel } from '../data/models';

export declare const initialValues: ValuesModel;
/**
 * Emits a checkout/values event with the provided values
 * Merges with previous values if they exist
 *
 * @param values - Partial values to be emitted or merged with existing values
 */
export declare function notifyValues(values: Partial<ValuesModel>): void;
/**
 * Retrieves a specific value from the ValuesModel by key
 * @param key - The key of the ValuesModel to retrieve
 * @returns The value for the specified key or null if not defined/found
 */
export declare function getValue<K extends keyof ValuesModel>(key: K): ValuesModel[K] | null;
//# sourceMappingURL=values.d.ts.map