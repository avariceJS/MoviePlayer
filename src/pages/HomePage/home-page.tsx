import { useEffect, useState } from 'react'

import ContentSection from '../../features/ContentSection/content-section'
import { Film } from '../../features/interface/interfaces'
import CustomSlider from '../../features/Slider/custom-slider'
import '../../features/Slider/slider.css'
import TrendingHeroCard from '../../features/TrendingHero/trending-hero-card'


/**
 * Home page component displaying trending and in-theater films.
 */
const HomePage = () => {
  const [trendingFilms, setTrendingFilms] = useState<Film[]>([])
  const [inTheatersFilms, setInTheatersFilms] = useState<Film[]>([])

  useEffect(() => {
    // Mock fetch function
    const fetchFilms = () => {
      const mockData: Film[] = Array.from({ length: 6 }, (_, index) => ({
        id: index + 1,
        title: `Film ${index + 1}`,
        description: `Description for Film ${index + 1}`,
        coverPath: '',
        genreIds: [1, 2, 3],
        posterPath: '',
        seasons: [],
      }))

      setTrendingFilms(mockData)
      setInTheatersFilms(mockData)
    }

    fetchFilms()
  }, [])

  return (
    <>
      <ContentSection className="py-0">
        <CustomSlider autoplay={true} slidesToShow={1} slidesToScroll={1}>
          {trendingFilms.map((film) => (
            <TrendingHeroCard key={film.id} trendingFilm={film} />
          ))}
        </CustomSlider>
      </ContentSection>

      <ContentSection title="In Theaters">
        <CustomSlider
          isFilmCardSlider
          autoplay={true}
          slidesToShow={5}
          slidesToScroll={5}
        >
          {inTheatersFilms.map((film) => (
            <TrendingHeroCard key={film.id} trendingFilm={film} />
          ))}
        </CustomSlider>
      </ContentSection>
    </>
  )
}

export default HomePage
