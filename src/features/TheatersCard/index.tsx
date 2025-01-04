// Navigate
// import { useNavigate } from 'react-router-dom'

// Features
import { mergeClassName } from '@/shared/utils/MergeCn'
import { Image } from '../Image'

// Interface
import { TheatersCardInterface } from './interface'

const TheatersCard = (props: TheatersCardInterface) => {


  return (
    <div
      onClick={() => (props.onClick ? props.onClick() : '')}
      className={mergeClassName('mx-3 my-1.5 cursor-pointer', props.className)}
    >
      <Image src={props.imageSrc} className="h-48 "></Image>
      <p className="py-1.5 line-clamp-2">{props.title}</p>
    </div>
  )
}

export default TheatersCard
