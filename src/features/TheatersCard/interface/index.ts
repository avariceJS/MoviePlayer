// Base
import { ReactNode } from 'react'

export interface TheatersCardInterface {
  imageSrc: string
  title: string
  children?: ReactNode
  onClick?: () => void
}
