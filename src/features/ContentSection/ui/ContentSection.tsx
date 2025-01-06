// shared -> components
import { LayoutContainer } from '@/shared/components/Container'

// interfaces
import { ContentSectionProps } from '../interface'

/**
 * ContentSection component to render a section with optional title and children.
 *
 * @param props - Contains title, className, and children to render inside the section.
 * @returns A section with a title and content.
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
