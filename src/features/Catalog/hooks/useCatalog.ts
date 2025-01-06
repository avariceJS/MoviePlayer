// navigate
import { useLocation, useSearchParams } from 'react-router-dom'

// shared -> interface
import { Film, MediaType } from '@/shared/interface/interfaces'

// entities -> api
import { fetchFilms } from '@/entities/film/api/filmRequests'

// base
import { useEffect, useRef, useState } from 'react'

export const useCatalog = (type: MediaType | 'search' | 'list') => {
  const [films, setFilms] = useState<Film[]>([])
  const [onLoading, setOnLoading] = useState(false)
  const [params] = useSearchParams()
  const page = useRef(1)
  const totalPage = useRef(2)
  const loadingRef = useRef(false)
  const location = useLocation()

  const fetch = async () => {
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
    }

    setOnLoading(false)
    loadingRef.current = false
  }

  useEffect(() => {
    setFilms([])
    fetch()
  }, [location])

  return { films, onLoading, fetch, page, totalPage, loadingRef }
}
