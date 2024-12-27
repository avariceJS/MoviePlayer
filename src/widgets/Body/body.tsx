import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/HomePage/home-page'
import MediaCatalog from '../../pages/MediaCatalog/media-catalog'

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
      </Routes>
    </div>
  )
}

export default Body
