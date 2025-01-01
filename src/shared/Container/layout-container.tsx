// Interfaces
import { CustomComponentProps } from '../interface/interfaces'

// Utilities
import { mergeClassName } from '../utils/MergeCn'

/**
 * A container component to standardize layout padding and width.
 *
 * @param props - Includes children components and optional additional classes.
 * @returns A div wrapping child elements with consistent styles.
 */
const LayoutContainer = (props: CustomComponentProps) => {
  return (
    <div
      className={mergeClassName(
        'px-6 py-1.5 max-w-screen-lg mx-auto',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

export default LayoutContainer
