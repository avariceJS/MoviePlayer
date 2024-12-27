import { MediaType } from './interface/types'


interface MediaCatalogProps  {
  type: MediaType | 'search'
}

/**
 * Catalog component displaying media type.
 * 
 * @param mediaType - The type of media being cataloged.
 * @returns A section displaying media type information.
 */
const MediaCatalog = (props: MediaCatalogProps ) => {
  return <div>{props.type}</div>
}

export default MediaCatalog
