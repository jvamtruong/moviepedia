import { motion } from 'framer-motion'
import MovieCard from './MovieCard'
import type { Movie } from '@/types/Movie'

type Props = {
  movies?: Movie[]
  isLoading: boolean
}

export default function MovieGrid({ movies, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div key={i} className='animate-pulse'>
              <div className='aspect-[2/3] bg-gray-200 rounded-xl mb-3'></div>
              <div className='space-y-1'>
                <div className='h-3 bg-gray-200 rounded w-3/4'></div>
                <div className='h-2.5 bg-gray-200 rounded w-1/2'></div>
              </div>
            </div>
          ))}
      </div>
    )
  }

  if (movies?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='text-center py-16'
      >
        <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <span className='text-4xl'>🎬</span>
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>
          No movies found
        </h3>
        <p className='text-gray-600'>
          Try searching for a different movie title
        </p>
      </motion.div>
    )
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
      {movies?.map((movie, index) => (
        <MovieCard key={movie.id || index} movie={movie} index={index} />
      ))}
    </div>
  )
}
