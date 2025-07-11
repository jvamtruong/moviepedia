import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SearchDropdown from '../components/search/SearchDropdown'
import MovieGrid from '../components/movie/MovieGrid'
import Pagination from '../components/ui/Pagination'
import { useMovies } from '@/hooks/useMovies'
import { useSuggestions } from '@/hooks/useSuggestions'
import { useQueryClient } from '@tanstack/react-query'
import type { Movie } from '@/types/Movie'
import { useSearchResults } from '@/hooks/useSearchResults'

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const queryClient = useQueryClient()
  const { data: moviesPerPage, isLoading: isMoviesLoading } = useMovies(currentPage)
  const { data: topResults, isLoading: isSearching } = useSuggestions(searchQuery)
  const { data: allResults, isLoading: isAllResultsLoading } = useSearchResults(selectedMovie?.title as string)

  // console.log('allResults', allResults)

  useEffect(() => {
    // Reset to first page when search query changes
    setCurrentPage(1)
  }, [searchQuery, selectedMovie])

  if (isMoviesLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-4'>Loading movies...</h1>
      </div>
    )
  }

  if (isAllResultsLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-4'>Loading search results...</h1>
      </div>
    )
  }

  const handleSearch = async (query: string, selectedMovie = null) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setSelectedMovie(null)
      return
    }

    if (selectedMovie) {
      setSelectedMovie(selectedMovie)
      setCurrentPage(1)
      queryClient.invalidateQueries({
        queryKey: ['all-results', (selectedMovie as Movie)?.title],
      })
      return
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (!selectedMovie) {
      queryClient.invalidateQueries({
        queryKey: ['movies', page],
      })
    }
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const ITEMS_PER_PAGE = 32
  const ALL_MOVIES = 59021
  let totalPages = Math.ceil(ALL_MOVIES / ITEMS_PER_PAGE)
  let allSearchResults: Movie[] = []

  if (allResults) {
    totalPages = Math.ceil(allResults?.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    allSearchResults = allResults?.slice(startIndex, endIndex)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight'>
            Movie Search
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Discover and explore your favorite movies with our elegant search
            experience
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='mb-12'
        >
          <SearchDropdown
            onSearch={handleSearch}
            suggestions={topResults}
            isLoading={isSearching}
            searchQuery={searchQuery}
          />
        </motion.div>

        {/* Results Header */}
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='mb-6'
          >
            <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
              {allResults?.length} results for "{selectedMovie.title}"
            </h2>
          </motion.div>
        )}

        {/* Results Info */}
        {/* <ResultsInfo
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={allResults?.length}
          isSearching={isSearching}
        /> */}

        {/* Movies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='mb-12'
        >
          <MovieGrid
            movies={selectedMovie ? allSearchResults : moviesPerPage}
            isLoading={selectedMovie ? isAllResultsLoading : isMoviesLoading}
          />
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='mb-8'
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}