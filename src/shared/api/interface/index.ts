import { Film, Genre, Cast } from '@/shared/interface/interfaces'

export interface ApiEpisode {
  id: number
  name: string
  overview: string
  air_date: string
  still_path: string
  episode_number: number
}

export interface ApiResponse {
  poster_path: string
  results: Film[]
  total_pages?: number
  total_results?: number
  genres?: Genre[]
  cast?: Cast[]
  id: number
  name?: string
  season_number: number
  episodes: ApiEpisode[]
  air_date: string
}
