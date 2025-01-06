// shared -> components
import { LayoutContainer } from '@/shared/components/Container'

// features
import { SearchResultsDropdown } from '@/features/Search'

// hooks
import { useHeaderLogic } from '../model/hooks'

// icons
import { IoIosSearch } from 'react-icons/io'

// navigate
import { Link } from 'react-router-dom'

/**
 * Header component to display the navigation bar with a search input and brand menu.
 *
 * @returns Displays a header with:
 *   - Brand logo linking to the homepage.
 *   - Navigation menu links (Movies and TV).
 *   - Search input with focus and search result dropdown.
 */
export const Header = () => {
  const {
    keyword,
    isSearchFocus,
    setSearchFocus,
    setKeyword,
    goToSearchPage,
    getMenuClass,
    searchRef,
  } = useHeaderLogic()

  return (
    <div className="bg-header sticky top-0 z-50">
      <LayoutContainer className="flex items-center justify-between gap-3">
        {/* brand menu */}
        <div className="flex items-center gap-6">
          {/* brand */}
          <h1 className="text-2xl font-semibold">
            <Link to={'/'}>FilmHaven</Link>
          </h1>
          {/* menu */}
          <div className="pt-1.5 flex items-center gap-1.5 mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0 mobile:justify-center mobile:py-3 mobile:bg-header mobile:gap-6 ">
            <Link className={getMenuClass('/movies')} to={'/movies'}>
              Movies
            </Link>
            <Link className={getMenuClass('/tv')} to={'/tv'}>
              TV
            </Link>
          </div>
        </div>
        {/* search */}
        <div className="border-b-[1.5px] border-white flex items-center p-1 flex-[0.5] focus-within:border-primary relative">
          <input
            onClick={(e) => {
              e.stopPropagation()
              setSearchFocus(true)
            }}
            onKeyDown={(e) => (e.key === 'Enter' ? goToSearchPage() : '')}
            onInput={(e) => setKeyword(e.currentTarget.value)}
            value={keyword}
            type="text"
            className="bg-transparent outline-0 flex-1"
            placeholder="search..."
            ref={searchRef}
          />
          <IoIosSearch size={18}></IoIosSearch>
          {isSearchFocus ? (
            <SearchResultsDropdown
              keyword={keyword}
              goToSearchPage={goToSearchPage}
            />
          ) : (
            ''
          )}
        </div>
      </LayoutContainer>
    </div>
  )
}
