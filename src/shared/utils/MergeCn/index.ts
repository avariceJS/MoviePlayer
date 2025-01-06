/**
 * Merges two class names into one string.
 * If the second class name is not provided, it defaults to an empty string.
 *
 * @param {string} val1 - The first class name.
 * @param {string} [val2] - The second class name (optional).
 * @returns {string} - The combined class names.
 */
export const mergeClassName = (val1: string, val2?: string) => {
  return val1 + ' ' + (val2 || '')
}
