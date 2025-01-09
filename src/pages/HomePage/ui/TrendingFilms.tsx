// features
import { ContentSection } from '@/features/ContentSection'
import { TrendingHeroCard } from '@/features/TrendingHero'
import { CustomSlider } from '@/features/Slider'

//shared/utils
import { tmdbImageSrc } from '@/shared/utils/ImageSrc'
import { mergeFilms } from '@/shared/utils/mergeFilms'

//shared/interface
import { Film } from '@/shared/interface/interfaces'

//shared/api
import { getTrendings } from '@/shared/api/tmdbApi'

// navigate
import { useNavigate } from 'react-router-dom'

// base
import { useEffect, useState } from 'react'

/**
 * TrendingFilms component fetches and displays a slider of trending films and TV shows.
 * It shows trending films and series in a hero-style slider with clickable cards.
 *
 * @returns JSX.Element
 */

const TrendingFilms = () => {
  const navigate = useNavigate()
  const [trendingsFilm, setTrendingsFilm] = useState<Film[]>([])

  const fetchTrending = async () => {
    const cachedData = localStorage.getItem('trendings')
    if (cachedData) {
      setTrendingsFilm(JSON.parse(cachedData))
    } else {
      const movies = await getTrendings('movie')
      const tvs = await getTrendings('tv')
      const mergedFilms = mergeFilms(movies, tvs)
      localStorage.setItem('trendings', JSON.stringify(mergedFilms))
      setTrendingsFilm(mergedFilms)
    }
  }
  useEffect(() => {
    fetchTrending()
  }, [])
  return (
    <ContentSection className="py-0">
      <CustomSlider autoplay={true} slidesToShow={1} slidesToScroll={1}>
        {trendingsFilm.map((film) => (
          <TrendingHeroCard
            onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
            key={film.id}
            trendingFilm={{
              id: film.id,
              seasons: film.seasons,
              title: film.title || film.name,
              description: film.overview,
              posterPath: tmdbImageSrc(film.coverPath ?? ''),
            }}
          />
        ))}
      </CustomSlider>
    </ContentSection>
  )
}

export default TrendingFilms
