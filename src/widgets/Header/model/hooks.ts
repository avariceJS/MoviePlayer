//  navigate
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

// base
import { useCallback, useEffect, useRef, useState } from 'react'

// shared -> utils
import { mergeClassName } from '@/shared/utils/MergeCn'

// style
const MENU_CLASS = 'py-1 px-1.5 hover:bg-primary rounded-md mobile:px-6'
const MENU_CLASS_ACTIVE = 'bg-primary'

/**
 * Custom hook for managing header logic: search input, active menu state, and page navigation.
 *
 * @returns {
 *   pathname: Current path.
 *   keyword: Search input value.
 *   isSearchFocus: Whether search input is focused.
 *   setSearchFocus: Function to set search focus state.
 *   setKeyword: Function to update search keyword.
 *   goToSearchPage: Navigates to search results page.
 *   getMenuClass: Determines the CSS class for active menu links.
 *   searchRef: Ref for the search input.
 * }
 */
export const useHeaderLogic = () => {
  const location = useLocation()
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const [pathname, setPathname] = useState('')
  const pathnameRef = useRef('')
  const defaultKeyword = useRef('')

  const [keyword, setKeyword] = useState('')
  const [isSearchFocus, setSearchFocus] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const goToSearchPage = () => {
    if (keyword) {
      defaultKeyword.current = keyword
      navigate(`/search?q=${keyword}`)
      setSearchFocus(false)
      searchRef.current?.blur()
    }
  }

  const initKeyWord = () => {
    if (pathnameRef.current === '/search') {
      setKeyword(defaultKeyword.current)
    } else {
      setKeyword('')
    }
  }

  const onWindowClick = useCallback(() => {
    setSearchFocus(false)
    initKeyWord()
  }, [])

  const getMenuClass = (path: string) => {
    if (path === pathname) {
      return mergeClassName(MENU_CLASS, MENU_CLASS_ACTIVE)
    }
    return mergeClassName(MENU_CLASS, '')
  }

  useEffect(() => {
    setPathname(location.pathname)
    pathnameRef.current = location.pathname
    defaultKeyword.current = params.get('q') || ''
    initKeyWord()
  }, [location.pathname, params])

  useEffect(() => {
    window.addEventListener('click', onWindowClick)
    return () => {
      window.removeEventListener('click', onWindowClick)
    }
  }, [onWindowClick])

  return {
    pathname,
    keyword,
    isSearchFocus,
    setSearchFocus,
    setKeyword,
    goToSearchPage,
    getMenuClass,
    searchRef,
  }
}
