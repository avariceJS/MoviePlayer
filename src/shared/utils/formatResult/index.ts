import { MediaType, Film, Season } from '@/shared/interface/interfaces'

export const formatResult = (obj: any, mediaType?: MediaType): Film => {
  return {
    id: obj.id,
    title: obj.title || obj.name,
    description: obj.overview,
    coverPath: obj.backdrop_path,
    posterPath: obj.poster_path,
    genreIds: obj.genre_ids || obj.genres?.map((g: any) => g.id) || [],
    mediaType: mediaType || obj.media_type,
    seasons:
      obj.seasons?.map(
        (season: any) =>
          ({
            id: season.id,
            filmName: obj.title,
            name: season.name,
            posterPath: season.poster_path,
            seasonNumber: season.season_number,
            airDate: season.air_date,
            episodes: [],
          } satisfies Season)
      ) || [],
  }
}
