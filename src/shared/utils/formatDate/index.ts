/**
 * Formats a date string into a "DD/MM/YYYY" format.
 *
 * @param {string} val - The date string to be formatted.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (val: string) => {
  const d = new Date(val)

  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
}
