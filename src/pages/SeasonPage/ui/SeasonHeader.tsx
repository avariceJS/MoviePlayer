// shared -> interface
import { Season as SeasonInterface } from '@/shared/interface/interfaces'

// features
import { ContentSection } from '@/features/ContentSection'

// shared -> utils
import { tmdbImageSrc } from '@/shared/utils/ImageSrc'

// shared -> components
import { Image } from '@/shared/components/Image'

/**
 * SeasonHeader component displays the header for a specific TV show season,
 * including the season poster, title, air date, and number of episodes.
 *
 * @param {Object} season - The season data to display.
 * @returns JSX.Element
 */

const SeasonHeader = ({ season }: { season: SeasonInterface }) => (
  <>
    <div className="h-[150px] left-0 right-0 top-0 relative">
      <Image
        alt={season.filmName}
        className="rounded-0 rounded-none"
        src={tmdbImageSrc(season.posterPath)}
      />
    </div>
    <ContentSection className="-mt-[75px] flex items-center relative z-10 mobile:block">
      <Image
        alt={season.filmName}
        src={tmdbImageSrc(season.posterPath)}
        className="w-[150px] min-w-[200px] min-h-[250px] h-[200px] mobile:mx-auto"
      />
      <div className="px-3 flex flex-col items-start gap-3 py-3">
        <p className="text-2xl line-clamp-1">{season.filmName}</p>
        <div className="flex items-center">
          <p className="text-base opacity-[0.9]">
            {season.name} ({new Date(season.airDate).getFullYear()})
          </p>
          <p className="text-xl opacity-[0.9] ml-1 ">
            &#8226; {season.episodes?.length} episodes
          </p>
        </div>
      </div>
    </ContentSection>
  </>
)

export default SeasonHeader
