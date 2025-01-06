// shared -> utils
import { mergeClassName } from '@/shared/utils/MergeCn'

// interface
import { TheatersCardInterface } from '../interface'

// shared -> components
import { Image } from '@/shared/components/Image'

/**
 * TheatersCard displays a clickable card with an image and title.
 *
 * @param {object} props - Component props.
 * @param {function} [props.onClick] - Click handler function (optional).
 * @param {string} props.imageSrc - Image source URL.
 * @param {string} props.title - Card title text.
 * @param {string} [props.className] - Additional CSS classes (optional).
 *
 * @returns JSX.Element
 */
const TheatersCard = (props: TheatersCardInterface) => {
  return (
    <div
      onClick={() => (props.onClick ? props.onClick() : '')}
      className={mergeClassName('mx-3 my-1.5 cursor-pointer', props.className)}
    >
      <Image src={props.imageSrc} alt={props.title} className="h-48 "></Image>
      <p className="py-1.5 line-clamp-2">{props.title}</p>
    </div>
  )
}

export default TheatersCard
