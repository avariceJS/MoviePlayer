// Pages
import Film from '@/pages/FilmPage'
import HomePage from '@/pages/HomePage'
import MediaCatalog from '@/pages/MediaCatalog'

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
          element={<MediaCatalog type="movie"></MediaCatalog>}
        ></Route>

        {/* TV catalog route */}
        <Route
          path="/tv"
          element={<MediaCatalog type="tv"></MediaCatalog>}
        ></Route>

        {/* Search results page */}
        <Route
          path="/search"
          element={<MediaCatalog type="search"></MediaCatalog>}
        ></Route>

        <Route
          path="/movie/:id"
          element={<Film mediaType="movie"></Film>}
        ></Route>
        <Route path="/tv/:id" element={<Film mediaType="tv"></Film>}></Route>
      </Routes>
    </div>
  )
}

export default Body
