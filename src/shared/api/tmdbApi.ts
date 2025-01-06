// config
import { API_KEY, BASE_URL } from '../config/apiConfig'

// interface
import { ApiResponse, ApiEpisode } from './interface'

// utils
import { formatResult } from '../utils/formatResult'

// axios
import axios from 'axios'

//shared -> interface
import {
  MediaType,
  Film,
  Genre,
  Cast,
  Trailer,
  Season,
  Episode,
} from '../interface/interfaces'

const axiosClient = axios.create({
  baseURL: BASE_URL,
})

// Interceptor to attach API key to each request
axiosClient.interceptors.request.use((config) => {
  return {
    ...config,

    params: {
      ...config.params,
      api_key: API_KEY,
    },
  }
})

/**
 * Fetches trending films based on the given media type (movies or TV shows) for the current week.
 *
 * @param mediaType - The type of media (either 'movie' or 'tv').
 * @returns A promise that resolves to an array of Film objects.
 */
export const getTrendings = async (mediaType: MediaType): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(
      `/trending/${mediaType}/week`
    )

    return data.results.map((val) => formatResult(val, mediaType))
  } catch (error) {
    console.error(error)
  }

  return []
}

/**
 * Fetches movies that are currently playing in theaters.
 *
 * @returns A promise that resolves to an array of Film objects.
 */
export const getInTheaters = async (): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(`/movie/now_playing`)

    return data.results.map((val) => formatResult(val, 'movie'))
  } catch (error) {
    console.error(error)
  }

  return []
}

/**
 * Fetches popular films of the specified media type (movies or TV shows) with pagination.
 *
 * @param mediaType - The type of media (either 'movie' or 'tv').
 * @param page - The page number for pagination (default is 1).
 * @returns A promise that resolves to an array of Film objects.
 */
export const getPopulars = async (
  mediaType: MediaType,
  page = 1
): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(
      `/${mediaType}/popular`,
      {
        params: {
          page,
        },
      }
    )

    return data.results.map((val) => formatResult(val, mediaType))
  } catch (error) {
    console.error(error)
  }

  return []
}

/**
 * Fetches top-rated films of the specified media type (movies or TV shows) with pagination.
 *
 * @param mediaType - The type of media (either 'movie' or 'tv').
 * @param page - The page number for pagination (default is 1).
 * @returns An object containing an array of Film objects and the total number of pages.
 */
export const getTopRated = async (
  mediaType: MediaType,
  page = 1
): Promise<{
  films: Film[]
  totalPages: number
}> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(
      `/${mediaType}/top_rated`,
      {
        params: {
          page,
        },
      }
    )

    return {
      films: data.results.map((val) => formatResult(val, mediaType)),
      totalPages: data.total_pages ?? 0,
    }
  } catch (error) {
    console.error(error)
  }

  return {
    films: [],
    totalPages: 0,
  }
}

/**
 * Search for films based on the provided query string and return matching results.
 *
 * @param query - The search query string.
 * @param page - The page number for pagination (default is 1).
 * @returns An object containing the search results with total pages, total results, and the films found.
 */
export const search = async (
  query: string,
  page = 1
): Promise<{
  totalPages: number
  totalResults: number
  films: Film[]
}> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(`/search/multi`, {
      params: {
        query,
        page,
      },
    })

    return {
      totalPages: data.total_pages ?? 0,
      totalResults: data.total_results ?? 0,
      films: data.results.map((val) => formatResult(val, 'tv')),
    }
  } catch (error) {
    console.error(error)
  }

  return {
    totalPages: 0,
    totalResults: 0,
    films: [],
  }
}

/**
 * Fetches the list of genres for a specific media type (either movies or TV shows).
 *
 * @param mediaType - The type of media (either 'movie' or 'tv').
 * @returns A promise that resolves to an array of Genre objects.
 */
export const getGenres = async (mediaType: MediaType): Promise<Genre[]> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(
      `/genre/${mediaType}/list`
    )

    return data.genres as Genre[]
  } catch (error) {
    console.error(error)
  }

  return []
}

/**
 * Fetches detailed information about a specific film based on its media type and ID.
 *
 * @param mediaType - The type of media (either 'movie' or 'tv').
 * @param id - The unique identifier of the film.
 * @returns A promise that resolves to a Film object, or null if not found.
 */
export const getDetail = async (
  mediaType: MediaType,
  id: number
): Promise<null | Film> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(`/${mediaType}/${id}`)

    return formatResult(data, mediaType)
  } catch (error) {
    console.error(error)
  }

  return null
}

/**
 * Fetches the cast details of a specific film based on its media type and ID.
 *
 * @param mediaType - The type of media (either 'movie' or 'tv').
 * @param id - The unique identifier of the film.
 * @returns A promise that resolves to an array of Cast objects.
 */
export const getCasts = async (
  mediaType: MediaType,
  id: number
): Promise<Cast[]> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(
      `/${mediaType}/${id}/credits`
    )

    return (
      data.cast?.map((cast) => ({
        id: cast.id,
        characterName: cast.character,
        name: cast.name,
        profilePath: cast.profile_path,
      })) ?? []
    )
  } catch (error) {
    console.error(error)
  }

  return []
}

/**
 * Fetches trailers for a specific film, filtering only YouTube videos.
 *
 * @param mediaType - The type of media (either 'movie' or 'tv').
 * @param id - The unique identifier of the film.
 * @returns A promise that resolves to an array of Trailer objects.
 */
export const getTrailers = async (
  mediaType: MediaType,
  id: number
): Promise<Trailer[]> => {
  try {
    const { data } = await axiosClient.get(`/${mediaType}/${id}/videos`)

    return (
      data.results
        .filter((res: Trailer) => res.site.toLowerCase() === 'youtube')
        .map((res: Trailer) => ({
          id: res.id,
          key: res.key,
        })) ?? []
    )
  } catch (error) {
    console.error(error)
  }

  return []
}

/**
 * Fetches recommendations for a specific film based on its media type and ID.
 *
 * @param mediaType - The type of media (either 'movie' or 'tv').
 * @param id - The unique identifier of the film.
 * @returns A promise that resolves to an array of recommended Film objects.
 */
export const getRecommendations = async (
  mediaType: MediaType,
  id: number
): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(
      `/${mediaType}/${id}/recommendations`
    )

    return data.results.map((val) => formatResult(val, mediaType))
  } catch (error) {
    console.error(error)
  }

  return []
}

/**
 * Fetches details for a specific season of a TV show, including its episodes.
 *
 * @param tvId - The unique identifier of the TV show.
 * @param seasonNumber - The season number (e.g., 1, 2, etc.).
 * @returns A promise that resolves to a Season object or null if not found.
 */
export const getSeason = async (
  tvId: number,
  seasonNumber: number
): Promise<Season | null> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(
      `/tv/${tvId}/season/${seasonNumber}`
    )

    const film = await getDetail('tv', tvId)

    return {
      id: data.id ?? 0,
      filmName: film?.title || '',
      name: data.name || '',
      posterPath: data.poster_path || '',
      seasonNumber: data.season_number,
      airDate: data.air_date,
      episodes:
        data.episodes.map(
          (episode: ApiEpisode) =>
            ({
              id: episode.id,
              title: episode.name,
              overview: episode.overview,
              airDate: episode.air_date,
              stillPath: episode.still_path,
              episodeNumber: episode.episode_number,
            } satisfies Episode)
        ) ?? [],
    }
  } catch (error) {
    console.error(error)
  }

  return null
}

/**
 * Fetches films based on specific criteria using the "discover" endpoint.
 *
 * @param mediaType - The type of media (either 'movie' or 'tv').
 * @param page - The page number for pagination (default is 1).
 * @returns An object containing an array of Film objects and total pages for pagination.
 */
export const discover = async (
  mediaType: MediaType,
  page = 1
): Promise<{
  films: Film[]
  totalPages: number
}> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(
      `/discover/${mediaType}`,
      {
        params: {
          page,
        },
      }
    )

    return {
      films: data.results.map((val) => formatResult(val, mediaType)),
      totalPages: data.total_pages ?? 0,
    }
  } catch (error) {
    console.error(error)
  }

  return {
    films: [],
    totalPages: 0,
  }
}
