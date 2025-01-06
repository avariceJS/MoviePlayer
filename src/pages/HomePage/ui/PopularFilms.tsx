// features
import { ContentSection } from '@/features/ContentSection'
import { TheatersCard } from '@/features/TheatersCard'
import { CustomSlider } from '@/features/Slider'

// shared -> utils
import { mergeFilms } from '@/shared/utils/mergeFilms'

// shared -> interface
import { Film } from '@/shared/interface/interfaces'

//shared -> api
import { getPopulars } from '@/shared/api/tmdbApi'

//navigate
import { useNavigate } from 'react-router-dom'

//base
import { useEffect, useState } from 'react'

/**
 * PopularFilms component fetches and displays a slider of popular films and TV shows.
 * It merges the results of popular movies and TV shows and shows them in a custom slider.
 *
 * @returns JSX.Element
 */
const PopularFilms = () => {
  const [popularsFilm, setPopularsFilm] = useState<Film[]>([])
  const navigate = useNavigate()

  const fetchPopulars = async () => {
    const movies = await getPopulars('movie')
    const tvs = await getPopulars('tv')

    setPopularsFilm(mergeFilms(movies, tvs, 20))
  }
  useEffect(() => {
    fetchPopulars()
  }, [])
  return (
    <ContentSection title="What's Popular">
      <CustomSlider
        isFilmCardSlider={true}
        autoplay={true}
        slidesToShow={5}
        slidesToScroll={5}
      >
        {popularsFilm.map((film) => (
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

export default PopularFilms
