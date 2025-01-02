// Base
import { ReactNode } from 'react'

export type MediaType = 'movie' | 'tv'

export interface CustomComponentProps {
  children?: ReactNode
  className?: string
}

export interface Season {
  id: number
}

export interface Film {
  id: number
  MediaType: MediaType
  title: string
  description: string
  posterPath: string
  coverPath: string
  genreIds: number[]
  seasons: Season[]
}

export interface Cast {
  id: number
  name: string
  characterName: string
}

export interface Trailer {
  id: number
  key: string
}
