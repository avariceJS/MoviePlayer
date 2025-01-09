import { ContentSection } from '@/features/ContentSection'

// shared -> interface
import { MediaType } from '@/shared/interface/interfaces'

// shared -> utils
import { tmdbImageSrc } from '@/shared/utils/ImageSrc'

// features
import { TheatersCard } from '../../TheatersCard'

// hooks
import { useCatalog } from '../hooks/useCatalog'

// navigate
import { useNavigate } from 'react-router-dom'

// base
import { useCallback, useEffect } from 'react'
import LoadingSpinner from '@/features/LoadingSpinner'

interface Props {
  type: MediaType | 'search' | 'list'
}

const Catalog = ({ type }: Props) => {
  const navigate = useNavigate()
  const { films, fetch, onLoading } = useCatalog(type)

  const onWindowScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 100
    ) {
      fetch()
    }
  }, [fetch])

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll)
    return () => {
      window.removeEventListener('scroll', onWindowScroll)
    }
  }, [onWindowScroll])

  return (
    <>
      <ContentSection>
        <div className="grid lg:grid-cols-5 sm:grid-cols-4 mobile:grid-cols-3">
          {films.map((film, i) => (
            <TheatersCard
              key={i}
              onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
              imageSrc={tmdbImageSrc(film.posterPath ?? '')}
              title={film.title ?? 'No title available'}
            />
          ))}
        </div>

        {onLoading && (
          <div className="text-center py-4">
            <LoadingSpinner />
          </div>
        )}
      </ContentSection>
    </>
  )
}

export default Catalog
