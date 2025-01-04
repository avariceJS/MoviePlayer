// Pages
import Catalog from '@/features/Catalog/catalog'
import { Film } from '@/pages/FilmPage'

import HomePage from '@/pages/HomePage'

// Navigate
import { Route, Routes } from 'react-router-dom'

/**
 * Main Body component to handle application routing.
 * It defines routes for different pages.
 */
const Body = () => {
  return (
    <div>
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<HomePage />}></Route>

        {/* Movies catalog route */}
        <Route
          path="/movies"
          element={<Catalog type="movie"></Catalog>}
        ></Route>

        {/* TV catalog route */}
        <Route path="/tv" element={<Catalog type="tv"></Catalog>}></Route>

        {/* Search results page */}
        <Route
          path="/search"
          element={<Catalog type="search"></Catalog>}
        ></Route>

        <Route
          path="/movie/:id"
          element={<Film mediaType="movie"></Film>}
        ></Route>

        <Route path="/tv/:id" element={<Film mediaType="tv"></Film>}></Route>

        {/* <Route path="/tv/:id/season/:seasonNumber" element={<Season />}></Route> */}
      </Routes>
    </div>
  )
}

export default Body
