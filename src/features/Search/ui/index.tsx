// shared -> interface
import { Film, Genre } from '@/shared/interface/interfaces'

// interface
import { SearchResultsDropdownProps } from '../interface'

// shared -> api
import { getGenres, search } from '@/shared/api/tmdbApi'

// shared -> utils
import { tmdbImageSrc } from '@/shared/utils/ImageSrc'

// base
import { useEffect, useRef, useState } from 'react'

// shared -> components
import { Image } from '@/shared/components/Image'

// navigate
import { useNavigate } from 'react-router-dom'

/**
 * Dropdown component displaying search results with genre mapping.
 *
 * @param keyword - The search keyword to fetch results.
 * @param goToSearchPage - Function to navigate to the full search page.
 * @returns A dropdown showing search results with film titles, genres, and posters.
 */
const SearchResultsDropdown = ({
  keyword,
  goToSearchPage,
}: SearchResultsDropdownProps) => {
  const [items, setItems] = useState<Film[]>([])
  const [totalItem, setTotalItem] = useState(0)
  const [genreMap, setGenreMap] = useState<Record<number, string>>({})
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()

  const fetchGenres = async () => {
    try {
      const [movieGenres, tvGenres] = await Promise.all([
        getGenres('movie'),
        getGenres('tv'),
      ])

      const genreMapping = [...movieGenres, ...tvGenres].reduce(
        (acc: Record<number, string>, genre: Genre) => {
          acc[genre.id] = genre.name
          return acc
        },
        {}
      )

      console.log('Combined Genre Map:', genreMapping)
      setGenreMap(genreMapping)
    } catch (error) {
      console.error('Error fetching genres:', error)
    }
  }

  const fetchResults = async () => {
    if (!keyword) return
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    searchTimeout.current = setTimeout(async () => {
      const res = await search(keyword)
      setTotalItem(res.totalPages || 0)
      setItems(res.films || [])
    }, 150)
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  useEffect(() => {
    fetchResults()
  }, [keyword])

  return (
    <div className="absolute top-[48px] left-0 right-0 rounded-lg bg-header shadow-lg z-50">
      <div className="max-h-[400px] overflow-auto p-3 bg-header rounded-lg shadow-inner">
        {items.length > 0 ? (
          items.map((film, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-2 rounded-md hover:bg-primary hover:shadow-md cursor-pointer transition-all mb-4"
              onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
            >
              {/* Постер фильма */}
              <Image
                src={tmdbImageSrc(film.posterPath ?? '')}
                alt={film.title ?? ''}
                className="h-[125px] w-min-[200px] w-[125px] rounded-md "
              />
              {/* Информация о фильме */}
              <div className="flex-1 truncate">
                <p className="text-base font-semibold truncate">
                  {film.title || 'Untitled'}
                </p>
                <ul className="flex flex-wrap gap-1 text-sm text-gray-400">
                  {film.genreIds?.map((id, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-700 px-2 py-1 rounded-md text-white"
                    >
                      {genreMap[id] || 'Unknown Genre'}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No results found</p>
        )}
      </div>
      {totalItem > 5 && (
        <button
          onClick={goToSearchPage}
          className="w-full py-3 bg-gray-600 text-white font-medium hover:bg-primary-dark transition-all sticky bottom-0 rounded-b-lg"
        >
          More results
        </button>
      )}
    </div>
  )
}

export default SearchResultsDropdown
