// navigate
import { useLocation, useNavigate, useParams } from 'react-router-dom'

// features
import { ContentSection } from '@/features/ContentSection'
import { TheatersCard } from '@/features/TheatersCard'
import { CustomSlider } from '@/features/Slider'

// shared/utils
import { youtubeThumbnail } from '@/shared/utils/Thumbnail'
import { tmdbImageSrc } from '@/shared/utils/ImageSrc'

// base
import { useCallback, useEffect, useState } from 'react'

// shared/components
import { Image } from '@/shared/components/Image'

// interface
import { FilmProps } from './interface'

// shared -> api
import {
  getCasts,
  getDetail,
  getRecommendations,
  getTrailers,
} from '@/shared/api/tmdbApi'

// shared -> interface
import {
  Cast,
  Film as FilmInterface,
  Trailer,
} from '@/shared/interface/interfaces'

/**
 * Film component displays detailed information about a film or TV show, including:
 * - Film details (title, description, poster)
 * - Trailers
 * - Cast members
 * - Seasons (for TV shows)
 * - Recommendations
 *
 * @param {object} props - Component props.
 * @param {MediaType} props.mediaType - Type of media, either 'movie' or 'tv'.
 *
 * @returns JSX.Element
 */
export const Film = (props: FilmProps) => {
  const location = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState<FilmInterface[]>([])
  const [film, setFilm] = useState<FilmInterface | null | undefined>(null)
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [casts, setCasts] = useState<Cast[]>([])

  const fetch = useCallback(async () => {
    const film = await getDetail(props.mediaType, parseInt(id as string))
    console.log(film)
    if (film) {
      setFilm(film)
      setCasts(await getCasts(film.mediaType ?? 'movie', film.id))
      setRecommendations(
        await getRecommendations(film.mediaType ?? 'movie', film.id)
      )
      setTrailers(await getTrailers(film.mediaType ?? 'movie', film.id ?? 0))
    }
  }, [props.mediaType, id])

  useEffect(() => {
    setFilm(undefined)
    fetch()
  }, [location, fetch])

  if (film === null) {
    return <></>
  } else if (film === undefined) {
    return <div className="text-center p-6 h-full flex-1"></div>
  }

  const handleTrailerClick = (key: string) => {
    window.open(`https://www.youtube.com/watch?v=${key}`, '_blank')
  }

  return (
    <>
      <div className="h-[300px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image
          alt={film.title ?? 'image'}
          src={tmdbImageSrc(film.coverPath ?? '')}
          className=" h-full w-full   "
        ></Image>
      </div>
      <ContentSection className="-mt-[150px] flex items-start relative z-10 mobile:block">
        <Image
          alt={film.title ?? 'image'}
          src={tmdbImageSrc(film.posterPath ?? '')}
          className="w-[200px] min-w-[200px] h-[300px] mobile:mx-auto"
        ></Image>
        <div className="px-3 flex flex-col gap-3">
          <p className="text-xl line-clamp-1">{film?.title}</p>
          <p className="line-clamp-3 opacity-90">{film?.description}</p>
        </div>
      </ContentSection>
      <ContentSection title="Trailers">
        <div className="overflow-x-auto scrollbar scrollbar-thumb-primary scrollbar-track-sky-900">
          <div className="flex gap-3">
            {trailers.map((trailer, i) => (
              <div key={i} className="flex-shrink-0">
                <TheatersCard
                  title=""
                  imageSrc={youtubeThumbnail(trailer.key)}
                  onClick={() => handleTrailerClick(trailer.key)}
                />
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Casts">
        <CustomSlider
          isFilmCardSlider={true}
          autoplay={true}
          slidesToShow={5}
          slidesToScroll={5}
        >
          {casts.map((cast, i) => (
            <>
              <TheatersCard
                key={i}
                title=""
                imageSrc={tmdbImageSrc(cast.profilePath ?? '')}
              />
              <p className="font-semibold">{cast.name}</p>
              <p className="opacity-[0.9] text-sm">{cast.characterName}</p>
            </>
          ))}
        </CustomSlider>
      </ContentSection>

      <ContentSection title="Seasons">
        {props.mediaType === 'tv' && film.seasons.length > 0 ? (
          <CustomSlider
            isFilmCardSlider={true}
            autoplay={true}
            slidesToShow={5}
            slidesToScroll={5}
          >
            {film.seasons.map((season, i) => (
              <TheatersCard
                className="h-[300px]"
                onClick={() =>
                  navigate(`/tv/${film.id}/season/${season.seasonNumber}`)
                }
                title={season.name}
                imageSrc={tmdbImageSrc(season.posterPath)}
                key={i}
              />
            ))}
          </CustomSlider>
        ) : props.mediaType === 'tv' ? (
          <p>No seasons available for this TV series.</p>
        ) : (
          <p>This is a movie, and no seasons are available.</p>
        )}
      </ContentSection>
      <ContentSection title="Recommendations">
        <CustomSlider
          isFilmCardSlider={true}
          autoplay={true}
          slidesToShow={5}
          slidesToScroll={5}
        >
          {recommendations.map((film, i) => (
            <TheatersCard
              onClick={() => navigate(`/${props.mediaType}/${film.id}`)}
              title={film.title ?? ''}
              imageSrc={tmdbImageSrc(film.posterPath ?? '')}
              key={i}
            ></TheatersCard>
          ))}
        </CustomSlider>
      </ContentSection>
    </>
  )
}
