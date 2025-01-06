//shared -> api
import { discover, getTopRated, search } from '@/shared/api/tmdbApi'

// shared -> interface
import { MediaType} from '@/shared/interface/interfaces'

// interface
import { SearchParams } from '../interface/interfaces'

/**
 * Fetch media (films or TV shows) based on type and parameters.
 *
 * @param type - Media type (movie, tv, search, or list).
 * @param params - Search or list parameters (e.g., query or title).
 * @param page - Page number for pagination.
 * @returns Fetched data based on the specified type.
 */
export const fetchFilms = (
  type: MediaType | 'search' | 'list',
  params: SearchParams,
  page: number
) => {
  switch (type) {
    case 'movie':
      return discover('movie', page)
    case 'tv':
      return discover('tv', page)
    case 'search':
      return search(params?.q || '', page)
    case 'list':
      if (params.title === 'top-rated-tv') {
        return getTopRated('tv', page)
      } else if (params.title === 'top-rated-movies') {
        return getTopRated('movie', page)
      }
      break
    default:
      throw new Error('Invalid type')
  }
}
