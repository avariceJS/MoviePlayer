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
import {
  getInTheaters,
  getPopulars,
  getTopRated,
  getTrendings,
} from '@/shared/api/themoviedb'
import { mergeFilms } from '@/shared/utils/mergeFilms'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [trendingsFilm, setTrendingsFilm] = useState<Film[]>([])
  const [inTheaters, setInTheaters] = useState<Film[]>([])
  const [topRatedMovie, setTopRatedMovie] = useState<Film[]>([])
  const [popularsFilm, setPopularsFilm] = useState<Film[]>([])
  const [topRatedTv, setTopRatedTv] = useState<Film[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    fetchInTheaters()
    fetchPopulars()
    fetchTrending()
    fetchTopRatedTv()
    fetchTopRatedMovie()
  }, [])

  const fetchTrending = async () => {
    const movies = await getTrendings('movie')
    const tvs = await getTrendings('tv')

    setTrendingsFilm(mergeFilms(movies, tvs))
  }

  const fetchInTheaters = async () => {
    setInTheaters(await getInTheaters())
  }

  const fetchPopulars = async () => {
    const movies = await getPopulars('movie')
    const tvs = await getPopulars('tv')

    setPopularsFilm(mergeFilms(movies, tvs, 20))
  }

  const fetchTopRatedTv = async () => {
    setTopRatedTv(await (await getTopRated('tv')).films)
  }

  const fetchTopRatedMovie = async () => {
    setTopRatedMovie(await (await getTopRated('movie')).films)
  }

  return (
    <>
      <ContentSection className="py-0">
        <CustomSlider autoplay={true} slidesToShow={1} slidesToScroll={1}>
          {trendingsFilm.map((film) => (
            <TrendingHeroCard
              onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
              key={film.id}
              trendingFilm={{
                title: film.title || film.name,
                description: film.overview,
                posterPath: tmdbImageSrc(film.coverPath ?? ''),
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
          {inTheaters.map((film) => (
            <TheatersCard
              onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
              key={film.id}
              imageSrc={`https://image.tmdb.org/t/p/w500${film.posterPath}`}
              title={film.title || 'No Title'}
            />
          ))}
        </CustomSlider>
      </ContentSection>
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
      {/* top rated tv */}
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
      {/* to rated movies*/}
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
    </>
  )
}

export default HomePage
