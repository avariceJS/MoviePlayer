// navigate
import { useLocation, useSearchParams } from 'react-router-dom'

// shared -> interface
import { Film, MediaType } from '@/shared/interface/interfaces'

// entities -> api
import { fetchFilms } from '@/entities/film/api/filmRequests'

// hooks
import { useCallback, useEffect, useRef, useState } from 'react'

export const useCatalog = (type: MediaType | 'search' | 'list') => {
  const [films, setFilms] = useState<Film[]>([])
  const [onLoading, setOnLoading] = useState(false)
  const [params] = useSearchParams()
  const page = useRef(1)
  const totalPage = useRef(1)
  const loadingRef = useRef(false)
  const location = useLocation()

  const fetch = useCallback(async () => {
    if (loadingRef.current || page.current > totalPage.current) return

    loadingRef.current = true
    setOnLoading(true)

    const result = await fetchFilms(
      type,
      { q: params.get('q') ?? undefined },
      page.current
    )

    if (result) {
      const { films: newFilms, totalPages } = result

      totalPage.current = totalPages
      setFilms((prev) => [...prev, ...newFilms])
      page.current += 1
    }

    setOnLoading(false)
    loadingRef.current = false
  }, [params, type])

  useEffect(() => {
    setFilms([])
    page.current = 1
    fetch()
  }, [location, type, params, fetch])

  return { films, onLoading, fetch, page, totalPage, loadingRef }
}
