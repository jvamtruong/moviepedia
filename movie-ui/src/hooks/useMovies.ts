import type { Movie } from '@/types/Movie'
import { BASE_URL_DEV } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getMovies = async (page: number) => {
  try {
    const response = await axios.get<Movie[]>(
      `${BASE_URL_DEV}/movies?page=${page}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching movies:', error)
    return []
  }
}

export const useMovies = (page: number) => {
  return useQuery({
    queryKey: ['movies', page],
    queryFn: () => getMovies(page),
    enabled: !!page,
  })
}
