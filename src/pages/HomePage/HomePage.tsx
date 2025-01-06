// ui
import TopRatedMovies from './ui/TopRatedMovies'
import TrendingFilms from './ui/TrendingFilms'
import PopularFilms from './ui/PopularFilms'
import TopRatedTv from './ui/TopRatedTv'
import InTheaters from './ui/InTheaters'

/**
 * HomePage component displays various sections such as:
 * - Trending films
 * - Films currently in theaters
 * - Popular films
 * - Top-rated TV shows
 * - Top-rated movies
 *
 * @returns JSX.Element
 */
const HomePage = () => {
  return (
    <>
      <TrendingFilms />
      <InTheaters />
      <PopularFilms />
      <TopRatedTv />
      <TopRatedMovies />
    </>
  )
}

export default HomePage
