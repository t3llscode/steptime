// \\\\\\\\\\ Import / Export ////////// \\

// \\\\\\\\\\ Utility ////////// \\

/** forces a value to be an array
 * @param value - value to be forced into an array
 * @returns - value as an array
 */
export function forceArr(value: any): any[] {
    return Array.isArray(value) ? value : [value];
}

/** filters an object by keys
 * @param obj - object to be filtered
 * @param keys - keys to keep
 * @returns - object with only the keys that are in the keys array
 */
export function filterObject(obj: { [key: string]: any }, keys: string[]): object {
    return keys.reduce((acc: { [key: string]: any }, key: string) => {
        if (obj.hasOwnProperty(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}