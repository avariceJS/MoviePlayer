// Navigate
import { useNavigate } from 'react-router-dom'

// Features
import { Image } from '../Image'

// Interface
import { TheatersCardInterface } from './interface'

const TheatersCard = (props: TheatersCardInterface) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/${props.film.MediaType}/${props.film.id}`)}
      className="mx-3 my-1.5 cursor-pointer"
    >
      <Image src={props.film.coverPath} className="h-48"></Image>
      <p className="py-1.5 line-clamp-2">{props.film.title}</p>
    </div>
  )
}

export default TheatersCard
