// features
import { ContentSection } from '@/features/ContentSection'
import { TheatersCard } from '@/features/TheatersCard'
import { CustomSlider } from '@/features/Slider'

// shared/interface
import { Film } from '@/shared/interface/interfaces'

// shared/api
import { getTopRated } from '@/shared/api/tmdbApi'

// navigate
import { useNavigate } from 'react-router-dom'

// base
import { useEffect, useState } from 'react'

/**
 * TopRatedTv component fetches and displays a slider of top-rated TV shows.
 * It shows the top-rated TV series in a custom slider, each clickable for more details.
 *
 * @returns JSX.Element
 */

const TopRatedTv = () => {
  const [topRatedTv, setTopRatedTv] = useState<Film[]>([])
  const navigate = useNavigate()
  const fetchTopRatedTv = async () => {
    setTopRatedTv(await (await getTopRated('tv')).films)
  }
  useEffect(() => {
    fetchTopRatedTv()
  }, [])
  return (
    <ContentSection title="Top rated tv">
      <CustomSlider
        isFilmCardSlider={true}
        autoplay={true}
        slidesToShow={5}
        slidesToScroll={5}
      >
        {topRatedTv.map((film) => (
          <TheatersCard
            onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
            key={film.id}
            imageSrc={`https://image.tmdb.org/t/p/original${film.posterPath}`}
            title={film.title || 'No Title'}
          />
        ))}
      </CustomSlider>
    </ContentSection>
  )
}

export default TopRatedTv
