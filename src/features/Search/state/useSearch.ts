// api
import { fetchGenres, fetchSearchResults } from '../api/searchApi'

// shared -> interface
import { Film } from '@/shared/interface/interfaces'

// base
import { useState, useRef, useEffect } from 'react'

/**
 * Custom hook to handle search logic including fetching genres and search results.
 *
 * @param keyword - The search keyword to fetch results.
 * @returns Search results (films), total items, and genre mapping.
 */
export const useSearch = (keyword: string) => {
  const [items, setItems] = useState<Film[]>([])
  const [totalItem, setTotalItem] = useState(0)
  const [genreMap, setGenreMap] = useState<Record<number, string>>({})
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const loadGenres = async () => {
      const genres = await fetchGenres()
      setGenreMap(genres)
    }
    loadGenres()
  }, [])

  useEffect(() => {
    const loadResults = async () => {
      if (!keyword) return
      if (searchTimeout.current) clearTimeout(searchTimeout.current)

      searchTimeout.current = setTimeout(async () => {
        const { films, totalPages } = await fetchSearchResults(keyword)
        setTotalItem(totalPages)
        setItems(films)
      }, 150)
    }

    loadResults()
  }, [keyword])

  return { items, totalItem, genreMap }
}
