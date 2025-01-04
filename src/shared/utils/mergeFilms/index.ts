import { Film } from '@/shared/interface/interfaces'

export const isFilm = (film: unknown): film is Film => {
  return <Film>film !== undefined
}

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
