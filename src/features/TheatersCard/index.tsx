// Navigate
// import { useNavigate } from 'react-router-dom'

// Features
import { Image } from '../Image'

// Interface
import { TheatersCardInterface } from './interface'

const TheatersCard = (props: TheatersCardInterface) => {
  // const navigate = useNavigate()

  return (
    <div
      onClick={() => (props.onClick ? props.onClick() : '')}
      className="mx-3 my-1.5 cursor-pointer w-[150px]"
    >
      <Image src={props.imageSrc} className="h-48"></Image>
      <p className="py-1.5 line-clamp-2">{props.title}</p>
    </div>
  )
}

export default TheatersCard
