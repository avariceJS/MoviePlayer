import { MediaType, Film, Season, Genre } from '@/shared/interface/interfaces'
import { Obj } from './interface'

/**
 * Formats an API response into a consistent Film object structure.
 *
 * @param {Obj} obj - The API response object to format.
 * @param {MediaType} [mediaType] - Optional media type (e.g., 'movie' or 'tv').
 * @returns {Film} - A formatted Film object.
 */
export const formatResult = (obj: Obj, mediaType: MediaType): Film => {
  return {
    id: obj.id,
    title: obj.title || obj.name,
    description: obj.overview || '',
    coverPath: obj.backdrop_path || '',
    posterPath: obj.poster_path || '',
    genreIds: obj.genre_ids || obj.genres?.map((g: Genre) => g.id) || [],
    mediaType: mediaType || obj.media_type,
    seasons:
      obj.seasons?.map(
        (season: Season) =>
          ({
            id: season.id,
            filmName: obj.title || '',
            name: season.name,
            posterPath: season.poster_path ?? '',
            seasonNumber: season.season_number ?? 0,
            airDate: season.air_date ?? '',
            episodes: [],
          } satisfies Season)
      ) || [],
  }
}
