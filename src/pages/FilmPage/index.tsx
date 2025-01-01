// Hooks
import { useState } from 'react'

// Navigate
import { useParams } from 'react-router-dom'

// Features
import ContentSection from '@/features/ContentSection'
import { Image } from '@/features/Image'

// Shared
import { Film as FilmInterface } from '@/shared/interface/interfaces'
import { FilmProps } from './interface'

const Film = (props: FilmProps) => {
  const { params } = useParams()

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
  return (
    <>
      <div className="h-[300px] left-0 right-0 top-0">
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
    </>
  )
}

export default Film
