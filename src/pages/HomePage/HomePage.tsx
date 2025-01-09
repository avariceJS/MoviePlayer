// features
import LoadingSpinner from '@/features/LoadingSpinner'

// base
import React, { Suspense } from 'react'

// ui
const TrendingFilms = React.lazy(() => import('./ui/TrendingFilms'))
const InTheaters = React.lazy(() => import('./ui/InTheaters'))
const PopularFilms = React.lazy(() => import('./ui/PopularFilms'))
const TopRatedTv = React.lazy(() => import('./ui/TopRatedTv'))
const TopRatedMovies = React.lazy(() => import('./ui/TopRatedMovies'))

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
    <Suspense fallback={<LoadingSpinner />}>
      <TrendingFilms />
      <InTheaters />
      <PopularFilms />
      <TopRatedTv />
      <TopRatedMovies />
    </Suspense>
  )
}

export default HomePage
