/**
 * Constructs a full image URL from a TMDB image path.
 *
 * @param {string} path - The relative image path from TMDB.
 * @returns {string} - The full image URL.
 */
export const tmdbImageSrc = (path: string) => {
  if (!path) return ''

  return `https://image.tmdb.org/t/p/original/${path}`
}
