// shared -> interface
import { Film } from '@/shared/interface/interfaces'

export interface TrendingHeroCardProps {
  trendingFilm: Film
  onClick: () => void
}
