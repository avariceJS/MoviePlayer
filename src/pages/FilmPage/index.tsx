// Hooks
import { useEffect, useState } from 'react'

// Interface
import { FilmProps } from './interface'

// Navigate
import { useParams } from 'react-router-dom'

// Features
import ContentSection from '@/features/ContentSection'
import { Image } from '@/features/Image'

// Shared -> interface
import {
  Cast,
  Film as FilmInterface,
  Trailer,
} from '@/shared/interface/interfaces'
import TheatersCard from '@/features/TheatersCard'

const FilmPage = (props: FilmProps) => {
  const { params } = useParams()
  const [casts, setCasts] = useState<Cast[]>([])
  const [trailers, setTrailers] = useState<Trailer[]>([])

  const [film, setFilm] = useState<FilmInterface>({
    id: 0,
    coverPath: '',
    description: 'film description',
    genreIds: [1, 2, 3, 4, 5],
    MediaType: props.mediaType,
    posterPath: '',
    seasons: [],
    title: 'film title',
  })

  const fetch = () => {
    const arrs: any[] = []

    for (let i = 0; i < 6; i++) {
      arrs.push({})
    }
    setCasts(arrs)
    setTrailers(arrs)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <div className="h-[300px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src="" className=" h-full w-full   "></Image>
      </div>
      <ContentSection className="-mt-[150px] flex items-start relative z-10 mobile:block">
        <Image src="" className="w-48 h-72"></Image>
        <div className="px-3 flex flex-col gap-3">
          <p className="text-xl line-clamp-1">{film.title}</p>
          <ul className="flex items-center gap-3">
            {film.genreIds.map((genre, i) => (
              <li className="px-3 py-1.5 border border-primary text-sm" key={i}>
                item {i}
              </li>
            ))}
          </ul>
          <p className="line-clamp-3 opacity-90">{film.description}</p>
        </div>
      </ContentSection>
      <ContentSection title="Casts">
        <div className="scrollbar scrollbar-thumb-primary scrollbar-track-sky-900 overflow-x-scroll">
          <div className="flex items-center gap-3">
            {casts.map((casts, i) => (
              <div className="flex-shrink-0 max-w-[200px] my-3">
                <TheatersCard
                  imageSrc=""
                  key={i}
                  title="title film"
                ></TheatersCard>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>
      <ContentSection className="mt-6" title="Trailers">
        <div className="scrollbar scrollbar-thumb-primary scrollbar-track-sky-900 overflow-x-scroll">
          <div className="flex items-center gap-3">
            {casts.map((casts, i) => (
              <div className="flex-shrink-0 max-w-[300px] my-3">
                <TheatersCard
                  imageSrc=""
                  key={i}
                  title="title film"
                ></TheatersCard>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>
    </>
  )
}

export default FilmPage
