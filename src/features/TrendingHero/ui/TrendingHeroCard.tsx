// shared -> components
import { Image } from '@/shared/components/Image'

// interface
import { TrendingHeroCardProps } from '../interface'

/**
 * Component for displaying a trending film hero section.
 *
 * @param trendingFilm - Film data including title, description, etc.
 * @returns A hero section with a film's details and trailer button.
 */

const TrendingHeroCard = (props: TrendingHeroCardProps) => {
  return (
    <div
      className="h-[300px] relative flex items-center cursor-pointer"
      onClick={() => props.onClick()}
    >
      <div className="absolute left-0 top-0 right-0 bottom-0">
        <div className="overlay-slick-hero"></div>
        <Image
          alt="image"
          className="w-full h-full"
          src={props.trendingFilm.posterPath ?? ''}
        ></Image>
      </div>
      <div className="flex flex-col items-start relative z-10 mx-[60px] gap-3 max-w-[50%] mobile:max-w-[100%]">
        <p className="text-xl line-clamp-1">{props.trendingFilm.title}</p>
        <p className="text-sm line-clamp-3">{props.trendingFilm.description}</p>
      </div>
    </div>
  )
}

export default TrendingHeroCard
