// shared -> utils
import { mergeClassName } from '@/shared/utils/MergeCn'

// interface
import { ImageProps } from '../interface'

/**
 * A image wrapper component.
 *
 * @param props - Includes image source, additional classes, and child elements.
 * @returns A styled div containing an image.
 */
export const Image = (props: ImageProps) => {
  return (
    <div className={mergeClassName('bg-primary', props.className)}>
      <img src={props.src} className="w-full h-full" alt="" />
    </div>
  )
}
