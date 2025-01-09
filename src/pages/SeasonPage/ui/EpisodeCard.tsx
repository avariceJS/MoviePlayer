// shared -> interface
import { Season as SeasonInterface } from '@/shared/interface/interfaces'

// shared -> utils
import { formatDate } from '@/shared/utils/formatDate'

// shared -> utils
import { tmdbImageSrc } from '@/shared/utils/ImageSrc'

// shared -> components
import { Image } from '@/shared/components/Image'

/**
 * EpisodeCard component displays details for a single TV episode, including:
 * - Episode poster
 * - Title and episode number
 * - Overview
 * - Air date
 *
 * @param {Object} episode - The episode data to display.
 * @returns JSX.Element
 */

const EpisodeCard = ({
  episode,
}: {
  episode: SeasonInterface['episodes'][0]
}) => (
  <div className="my-6 flex items-stretch gap-4 rounded-md overflow-hidden px-3 py-1.5 mobile:block font-medium">
    <Image
      alt={episode.title}
      src={tmdbImageSrc(episode.stillPath)}
      className="min-w-[300px] w-[300px] h-[150px]"
    />
    <div className="overflow-hidden flex flex-col gap-3 mobile:py-3">
      <p className="text-lg truncate">
        {episode.episodeNumber}. {episode.title}
      </p>
      <p className="opacity-[0.9] line-clamp-5">{episode.overview}</p>
      <div className="mt-auto pt-3 text-right">
        {formatDate(episode.airDate)}
      </div>
    </div>
  </div>
)
export default EpisodeCard
