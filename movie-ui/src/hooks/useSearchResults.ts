import type { Movie } from '@/types/Movie'
import { BASE_URL_DEV } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getAllSearchResults = async (query: string) => {
  try {
    const response = await axios.get<Movie[]>(
      `${BASE_URL_DEV}/movies/search-all?q=${query}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching search results:', error)
    return []
  }

}

export const useSearchResults = (query: string) => {
  return useQuery({
    queryKey: ['all-results', query],
    queryFn: () => getAllSearchResults(query),
    enabled: !!query,
  })
}
