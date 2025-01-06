// shared/interface
import { Season as SeasonInterface } from '@/shared/interface/interfaces'

// features
import { ContentSection } from '@/features/ContentSection'

// shared/api
import { getSeason } from '@/shared/api/tmdbApi'

// navigate
import { useParams } from 'react-router-dom'

// ui
import SeasonHeader from './ui/SeasonHeader'
import EpisodeCard from './ui/EpisodeCard'

// base
import { useState, useEffect } from 'react'

/**
 * Season component fetches and displays details for a specific season of a TV show.
 * It shows the season header and a list of episodes.
 *
 * @returns JSX.Element
 */

export const Season = () => {
  const [season, setSeason] = useState<SeasonInterface | null>(null)
  const params = useParams()

  useEffect(() => {
    const fetch = async () => {
      const data = await getSeason(
        parseInt(params.id as string),
        parseInt(params.seasonNumber as string)
      )
      setSeason(data)
    }
    fetch()
  }, [params.id, params.seasonNumber])

  if (!season) return null

  return (
    <>
      <SeasonHeader season={season} />
      <ContentSection title="Episodes">
        {season.episodes.map((episode, i) => (
          <EpisodeCard episode={episode} key={i} />
        ))}
      </ContentSection>
    </>
  )
}
