// Interfaces
import { CustomComponentProps } from '../interface/interfaces'

// Utilities
import { mergeClassName } from '../../shared/utils/utils'


interface Props extends CustomComponentProps {
  src: string
}

/**
 * A image wrapper component.
 *
 * @param props - Includes image source, additional classes, and child elements.
 * @returns A styled div containing an image.
 */
export const Image = (props: Props) => {
  return (
    <div
      className={mergeClassName('bg-primary h-full w-full', props.className)}
    >
      <img src={props.src} className="w-full h-full" alt="" />
    </div>
  )
}
