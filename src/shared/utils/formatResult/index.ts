import { MediaType, Film, Season } from '@/shared/interface/interfaces'

interface Obj {
  id: number
  title?: string
  name?: string
  overview?: string
  backdrop_path?: string
  poster_path?: string
  genre_ids?: number[]
  genres?: Genre[]
  media_type?: MediaType
  seasons?: SeasonApi[]
}

interface Genre {
  id: number
  name: string
}

interface SeasonApi {
  id: number
  name: string
  poster_path: string
  season_number: number
  air_date: string
}

export const formatResult = (obj: Obj, mediaType?: MediaType): Film => {
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
        (season: SeasonApi) =>
          ({
            id: season.id,
            filmName: obj.title || '',
            name: season.name,
            posterPath: season.poster_path,
            seasonNumber: season.season_number,
            airDate: season.air_date,
            episodes: [],
          } satisfies Season)
      ) || [],
  }
}
