// Hooks
import { useEffect, useState } from 'react'

// Interfaces
import { SearchResultsDropdownProps } from './interface'

// Features
import { Image } from '../Image'

// Shared -> interface
import { Film } from '@/shared/interface/interfaces'

/**
 * A dropdown component displaying search results.
 *
 * @param props - Includes the search keyword and a function to navigate to the search page.
 * @returns A styled dropdown with a list of mock search results.
 */
export const SearchResultsDropdown = (props: SearchResultsDropdownProps) => {
  const [items, setItems] = useState<Film[]>([])
  const [totalItem, setTotalItem] = useState(6)

  /**
   * Loads mock data for the dropdown items.
   */
  const loadMockData = () => {
    const mockFilms: Film[] = []

    for (let i = 0; i < 6; i++) {
      mockFilms.push({
        id: 1,
        title: 'lorem',
        description: '',
        coverPath: '',
        genreIds: [1, 2, 3, 4, 5, 6, 7],
        posterPath: '',
        seasons: [],
        mediaType: 'tv',
      })
    }
    setItems(mockFilms)
  }

  useEffect(() => {
    loadMockData()
  }, [props.keyword])

  return (
    <div className="absolute top-[48px] left-0 right-0 rounded-md overflow-auto bg-header max-h-[400px] p-3 shadow-lg">
      {items.map((film, i) => (
        <div
          key={i}
          className="flex items-start p-1.5 rounded-lg hover:bg-primary cursor-pointer m-1.5"
        >
          {/* image */}
          <Image
            src=""
            className="h-[111px] min-w-[102px] w-[102px] rounded-md"
          ></Image>
          {/* title and genres */}
          <div className="px-3 truncate">
            <p className="text-base truncate">{film.title}</p>
            <ul className="flex flex-wrap gap-x-1.5 text-sm opacity-[0.7]">
              {film.genreIds.map((id, i) => (
                <li key={i}> items {i}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {totalItem > 5 ? (
        <button
          onClick={() => props.goToSearchPage()}
          className="px-3 py-1.5 bg-primary w-full hover:text-body sticky -bottom-2.5 shadow-lg"
        >
          More results
        </button>
      ) : (
        ''
      )}
    </div>
  )
}
