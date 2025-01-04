import axios from 'axios'
import {
  MediaType,
  Film,
  Genre,
  Cast,
  Trailer,
  Season,
  Episode,
} from '../interface/interfaces'
import { formatResult } from '../utils/formatResult'

const API_KEY = import.meta.env.VITE_API_KEY
const baseURL = import.meta.env.VITE_API_URL

const axiosClient = axios.create({
  baseURL: baseURL,
})

interface ApiEpisode {
  id: number
  name: string
  overview: string
  air_date: string
  still_path: string
  episode_number: number
}

interface ApiResponse {
  poster_path: string
  results: Film[]
  total_pages?: number
  total_results?: number
  genres?: Genre[]
  cast?: Cast[]
  id?: number
  name?: string
  season_number: number
  episodes: ApiEpisode[]
  air_date: string
}

axiosClient.interceptors.request.use((config) => {
  return {
    ...config,

    params: {
      ...config.params,
      api_key: API_KEY,
    },
  }
})

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

export const getInTheaters = async (): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<ApiResponse>(`/movie/now_playing`)

    return data.results.map((val) => formatResult(val, 'movie'))
  } catch (error) {
    console.error(error)
  }

  return []
}

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
      films: data.results.map((val) => formatResult(val)),
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
        characterName: cast.characterName,
        name: cast.name,
        profilePath: cast.profilePath,
      })) ?? []
    )
  } catch (error) {
    console.error(error)
  }

  return []
}

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
