export const tmdbImageSrc = (path: string) => {
  if (!path) return ''

  return `https://image.tmdb.org/t/p/original/${path}`
}