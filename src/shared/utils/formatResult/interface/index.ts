// shared -> interface
import { Genre, MediaType, Season } from '@/shared/interface/interfaces'

export interface Obj {
  id: number
  title?: string
  name?: string
  overview?: string
  backdrop_path?: string
  poster_path?: string
  genre_ids?: number[]
  genres?: Genre[]
  media_type?: MediaType
  seasons?: Season[]
}

export interface SeasonApi {
  id: number
  name: string
  poster_path: string
  season_number: number
  air_date: string
}
