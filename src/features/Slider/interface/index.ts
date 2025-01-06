// react-slick
import { Settings } from 'react-slick'

export interface SliderProps extends Settings {
  isFilmCardSlider?: boolean
  isSeasonCardSlider?: boolean
  children: React.ReactNode
}
