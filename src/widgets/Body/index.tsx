// features
import Catalog from '@/features/Catalog/ui/catalog'

// page
import { Season } from '@/pages/SeasonPage/season'
import { HomePage } from '@/pages/HomePage'
import { Film } from '@/pages/FilmPage'

// navigate
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
        {/* TV catalog route */}
        <Route path="/tv" element={<Catalog type="tv"></Catalog>} />
        {/* tv page*/}
        <Route path="/tv/:id" element={<Film mediaType="tv"></Film>} />
        {/* season page*/}
        <Route path="/tv/:id/season/:seasonNumber" element={<Season />} />
        {/* Movies catalog route */}
        <Route path="/movies" element={<Catalog type="movie"></Catalog>} />
        {/* Search results page */}
        <Route path="/search" element={<Catalog type="search"></Catalog>} />
        {/* Movies page*/}
        <Route path="/movie/:id" element={<Film mediaType="movie"></Film>} />
      </Routes>
    </div>
  )
}

export default Body
