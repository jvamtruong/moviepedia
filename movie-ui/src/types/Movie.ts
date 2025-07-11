export interface Movie {
  id: string
  src: string
  title: string
  poster?: string | null
  imdbRating?: number
  releasedAt?: string
  duration?: string
  description?: string
}

export interface SearchResult {
  total: number
  results: Movie[]
}