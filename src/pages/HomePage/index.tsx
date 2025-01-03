// Hooks
import { useEffect, useState } from 'react'

// Features
import ContentSection from '@/features/ContentSection'
import TrendingHeroCard from '@/features/TrendingHero'
import TheatersCard from '@/features/TheatersCard'
import CustomSlider from '@/features/Slider'

// Shared -> Interface
import { Film } from '@/shared/interface/interfaces'

// Shared -> Utils
import { tmdbImageSrc } from '@/shared/utils/ImageSrc'

/**
 * Home page component displaying trending and in-theater films.
 */
const HomePage = () => {
  const [trendingFilms, setTrendingFilms] = useState<Film[]>([])
  const [inTheatersFilms, setInTheatersFilms] = useState<Film[]>([])

  const API_KEY = import.meta.env.VITE_API_KEY
  const baseURL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const trendingResponse = await fetch(
          `${baseURL}/trending/all/day?api_key=${API_KEY}`
        )
        const trendingData = await trendingResponse.json()
        console.log('Trending Films:', trendingData)
        setTrendingFilms(trendingData.results || [])

        const theatersResponse = await fetch(
          `${baseURL}/movie/now_playing?api_key=${API_KEY}`
        )
        const theatersData = await theatersResponse.json()

        setInTheatersFilms(theatersData.results || [])
      } catch (error) {
        console.error('error', error)
      }
    }

    fetchFilms()
  }, [])

  return (
    <>
      <ContentSection className="py-0">
        <CustomSlider autoplay={true} slidesToShow={1} slidesToScroll={1}>
          {trendingFilms.map((film) => (
            <TrendingHeroCard
              key={film.id}
              trendingFilm={{
                title: film.title || film.name,
                description: film.overview,
                posterPath: tmdbImageSrc(film.backdrop_path ?? ''),
              }}
            />
          ))}
        </CustomSlider>
      </ContentSection>

      <ContentSection title="In Theaters">
        <CustomSlider
          isFilmCardSlider={true}
          autoplay={true}
          slidesToShow={5}
          slidesToScroll={5}
        >
          {inTheatersFilms.map((film) => (
            <TheatersCard
              key={film.id}
              imageSrc={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              title={film.title || 'No Title'}
            />
          ))}
        </CustomSlider>
      </ContentSection>
    </>
  )
}

export default HomePage
