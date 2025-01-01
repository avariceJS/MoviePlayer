// Interface
import { MediaCatalogInterface } from './interface'

/**
 * Catalog component displaying media type.
 *
 * @param mediaType - The type of media being cataloged.
 * @returns A section displaying media type information.
 */
const MediaCatalog = (props: MediaCatalogInterface) => {
  return <div>{props.type}</div>
}

export default MediaCatalog
