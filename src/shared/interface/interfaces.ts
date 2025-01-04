// Base
import { ReactNode } from 'react'

export type MediaType = 'movie' | 'tv'

export interface CustomComponentProps {
  children?: ReactNode
  className?: string
}

export interface Episode {
  id: number
  title: string
  overview: string
  airDate: string
  stillPath: string
  episodeNumber: number
}

export interface Season {
  id: number
  filmName: string
  name: string
  seasonNumber: number
  posterPath: string
  episodes: Episode[]
  airDate: string
}

export interface Film {
  id?: number
  mediaType?: MediaType
  poster_path?: string
  title?: string
  name?: string
  description?: string
  backdrop_path?: string
  posterPath?: string
  coverPath?: string
  genreIds?: number[]
  overview?: string
  seasons?: Season[]
}

export interface Genre {
  id: number
  name: string
}

export interface Cast {
  id: number
  name: string
  characterName: string
  profilePath: string
}

export interface Trailer {
  id: number
  key: string
  site: string
}
