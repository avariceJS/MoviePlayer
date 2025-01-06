/**
 * Generates the URL for a YouTube video thumbnail.
 *
 * @param key - The unique video identifier (YouTube video ID).
 * @returns A URL string pointing to the video thumbnail image.
 */
export const youtubeThumbnail = (key: string) => {
  return `https://img.youtube.com/vi/${key}/mqdefault.jpg`
}
