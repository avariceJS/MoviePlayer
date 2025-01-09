// features
import { ContentSection } from '@/features/ContentSection'
import { TheatersCard } from '@/features/TheatersCard'
import { CustomSlider } from '@/features/Slider'

// shared -> interface
import { Film } from '@/shared/interface/interfaces'

// shared -> api
import { getInTheaters } from '@/shared/api/tmdbApi'

// navigate
import { useNavigate } from 'react-router-dom'

// base
import { useEffect, useState } from 'react'

/**
 * InTheaters component fetches and displays a slider of films currently in theaters.
 * It uses a custom slider to show the films with clickable cards for more details.
 *
 * @returns JSX.Element
 */
const InTheaters = () => {
  const [inTheaters, setInTheaters] = useState<Film[]>([])
  const navigate = useNavigate()

  const fetchInTheaters = async () => {
    const cachedData = localStorage.getItem('inTheaters')
    if (cachedData) {
      setInTheaters(JSON.parse(cachedData))
    } else {
      const films = await getInTheaters()
      localStorage.setItem('inTheaters', JSON.stringify(films))
      setInTheaters(films)
    }
  }
  useEffect(() => {
    fetchInTheaters()
  }, [])
  return (
    <ContentSection title="In Theaters">
      <CustomSlider
        isFilmCardSlider={true}
        autoplay={true}
        slidesToShow={5}
        slidesToScroll={5}
      >
        {inTheaters.map((film) => (
          <TheatersCard
            onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
            key={film.id}
            imageSrc={`https://image.tmdb.org/t/p/w500${film.posterPath}`}
            title={film.title || 'No Title'}
          />
        ))}
      </CustomSlider>
    </ContentSection>
  )
}

export default InTheaters
