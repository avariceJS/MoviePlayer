// features
import { ContentSection } from '@/features/ContentSection'
import { TheatersCard } from '@/features/TheatersCard'
import { CustomSlider } from '@/features/Slider'

// shared -> interface
import { Film } from '@/shared/interface/interfaces'

// shared -> api
import { getTopRated } from '@/shared/api/tmdbApi'

// navigate
import { useNavigate } from 'react-router-dom'

// base
import { useEffect, useState } from 'react'

/**
 * TopRatedMovies component fetches and displays a slider of top-rated movies.
 * It shows the top-rated films in a custom slider, each clickable for more details.
 *
 * @returns JSX.Element
 */

const TopRatedMovies = () => {
  const [topRatedMovie, setTopRatedMovie] = useState<Film[]>([])
  const navigate = useNavigate()
  const fetchTopRatedMovie = async () => {
    setTopRatedMovie(await (await getTopRated('movie')).films)
  }
  useEffect(() => {
    fetchTopRatedMovie()
  }, [])
  return (
    <ContentSection title="Top rated movies">
      <CustomSlider
        isFilmCardSlider={true}
        autoplay={true}
        slidesToShow={5}
        slidesToScroll={5}
      >
        {topRatedMovie.map((film) => (
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

export default TopRatedMovies
