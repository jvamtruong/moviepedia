import type { Movie } from '@/types/Movie'
import { BASE_URL_DEV } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getTopSearchResults = async (q: string) => {
  try {
    const response = await axios.get(`${BASE_URL_DEV}/movies/search?q=${q}`)
    return response.data.results as Movie[]
  } catch (error) {
    console.error('Error fetching top search results:', error)
    return []
  }
}

export const useSuggestions = (q: string) => {
  return useQuery({
    queryKey: ['suggestions', q],
    queryFn: () => getTopSearchResults(q),
    enabled: !!q,
  })
}
