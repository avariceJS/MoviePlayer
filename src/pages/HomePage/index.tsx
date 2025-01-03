// Hooks
import { useEffect, useState } from 'react'

// Features
import ContentSection from '@/features/ContentSection'
import TrendingHeroCard from '@/features/TrendingHero'
import TheatersCard from '@/features/TheatersCard'
import CustomSlider from '@/features/Slider'

// Shared -> Interface
import { Film } from '@/shared/interface/interfaces'
import { title } from 'process'

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
        MediaType: 'tv',
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
          isFilmCardSlider={true}
          autoplay={true}
          slidesToShow={5}
          slidesToScroll={5}
        >
          {inTheatersFilms.map((film) => (
            <TheatersCard imageSrc="" key={film.id} title={film.title} />
          ))}
        </CustomSlider>
      </ContentSection>
    </>
  )
}

export default HomePage
