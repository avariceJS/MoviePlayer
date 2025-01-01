// Interfaces
import { ContentSectionProps } from './interface'

// Shared -> Container
import LayoutContainer from '@/shared/Container/layout-container'

/**
 * A reusable section component for layout and content organization.
 *
 * @param props - Includes an optional title and children elements.
 * @returns A styled section with optional title and content.
 */
const ContentSection = (props: ContentSectionProps) => {
  return (
    <LayoutContainer className={props.className}>
      {props.title ? (
        <h1 className="text-xl px-6 py-1.5">{props.title}</h1>
      ) : (
        ''
      )}
      {props.children}
    </LayoutContainer>
  )
}

export default ContentSection
