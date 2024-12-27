import { MdPlayCircleOutline } from 'react-icons/md'
import { Image } from '../Image/image'
import { Film } from '../interface/interfaces'

interface TrendingHeroCardProps {
  trendingFilm: Film
}

/**
 * Component for displaying a trending film hero section.
 *
 * @param trendingFilm - Film data including title, description, etc.
 * @returns A hero section with a film's details and trailer button.
 */
const TrendingHeroCard = (props: TrendingHeroCardProps) => {
  return (
    <div className="h-[300px] relative flex items-center">
      <div className="absolute left-0 top-0 right-0 bottom-0">
        <div className="overlay-slick-hero"></div>
        <Image src={props.trendingFilm.coverPath}></Image>
      </div>
      <div className="flex flex-col items-start relative z-10 mx-[60px] gap-3 max-w-[50%] truncate">
        <p className="text-xl  truncate">{props.trendingFilm.title}</p>
        <p className="text-sm line-clamp-3">{props.trendingFilm.description}</p>
        <button className="px-3 py-1.5 flex items-center gap-3 bg-red rounded-md">
          <MdPlayCircleOutline size={18}></MdPlayCircleOutline>
          <span>Play trailers</span>
        </button>
      </div>
    </div>
  )
}

export default TrendingHeroCard
