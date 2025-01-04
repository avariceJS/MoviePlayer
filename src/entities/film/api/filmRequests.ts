import { discover, search, getTopRated } from '@/shared/api/themoviedb'
import { MediaType } from '@/shared/interface/interfaces'

interface SearchParams {
  q?: string
  title?: string
}

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
