// shared -> api
import { getGenres, search } from '@/shared/api/tmdbApi'

// shared -> interface
import { Genre } from '@/shared/interface/interfaces'

/**
 * Fetches and combines genres for both movies and TV shows.
 *
 * @returns A record of genre IDs to genre names.
 */
export const fetchGenres = async (): Promise<Record<number, string>> => {
  try {
    const [movieGenres, tvGenres] = await Promise.all([
      getGenres('movie'),
      getGenres('tv'),
    ])

    return [...movieGenres, ...tvGenres].reduce((acc, genre: Genre) => {
      acc[genre.id] = genre.name
      return acc
    }, {} as Record<number, string>)
  } catch (error) {
    console.error('Error fetching genres:', error)
    return {}
  }
}

/**
 * Fetches search results based on a given keyword.
 *
 * @param keyword - The search keyword.
 * @returns Search results with films and total pages.
 */
export const fetchSearchResults = async (keyword: string) => {
  if (!keyword) return { films: [], totalPages: 0 }

  return search(keyword)
}
