// Icon
import { MdPlayCircleOutline } from 'react-icons/md'

// Navigate
import { useNavigate } from 'react-router-dom'

// Features
import { Image } from '../Image'

// Interface
import { TrendingHeroCardProps } from './interface'

/**
 * Component for displaying a trending film hero section.
 *
 * @param trendingFilm - Film data including title, description, etc.
 * @returns A hero section with a film's details and trailer button.
 */
const TrendingHeroCard = (props: TrendingHeroCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      className="h-[300px] relative flex items-center cursor-pointer"
      onClick={() =>
        navigate(`/${props.trendingFilm.MediaType}/${props.trendingFilm.id}`)
      }
    >
      <div className="absolute left-0 top-0 right-0 bottom-0">
        <div className="overlay-slick-hero"></div>
        <Image
          className="w-full h-full"
          src={props.trendingFilm.coverPath}
        ></Image>
      </div>
      <div className="flex flex-col items-start relative z-10 mx-[60px] gap-3 max-w-[50%] mobile:max-w-[100%]">
        <p className="text-xl line-clamp-1">{props.trendingFilm.title}</p>
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
