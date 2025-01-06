// shared -> interface
import { Film } from '@/shared/interface/interfaces'

/**
 * Type guard function to check if the given object is a Film.
 *
 * @param film - The object to be checked.
 * @returns True if the object is a valid Film, otherwise false.
 */
export const isFilm = (film: unknown): film is Film => {
  return <Film>film !== undefined
}

/**
 * Merges two arrays of films (movies and TV shows) alternately, up to a specified limit.
 *
 * @param movies - An array of movie films.
 * @param tvs - An array of TV show films.
 * @param limit - The maximum number of merged films to return (default is 6).
 * @returns A merged array of Film objects, alternating between movies and TV shows.
 */
export const mergeFilms = (movies: Film[], tvs: Film[], limit = 6) => {
  const arrs: Film[] = []

  for (let i = 0; i < limit; i++) {
    let film: unknown

    if (i % 2 == 1) {
      if (tvs[i - 1]) {
        film = tvs[i - 1]
      }
    } else {
      if (movies[i - 1]) {
        film = tvs[i - 1]
      }
    }

    if (isFilm(film)) arrs.push(film)
  }

  return arrs
}
