import { motion } from 'framer-motion'
import { Calendar, Clock, Film, Star} from 'lucide-react'
import type { Movie } from '@/types/Movie'

type Props = {
  movie: Movie
  index: number
}

export default function MovieCard({ movie, index }: Props) {
  const handleCardClick = () => {
    // Open movie detail page in new tab
    window.open(movie.src)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className='group relative'
      onClick={handleCardClick}
    >
      <div className='overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl h-full flex flex-col'>
        {/* Movie Poster */}
        <div className='relative aspect-[2/3] overflow-hidden'>
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
              loading={index > 2 ? 'lazy' : 'eager'}
            />
          ) : (
            <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center'>
              <div className='text-center'>
                <div className='w-12 h-12 bg-gray-300 dark:bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <Film className='w-5 h-5 text-gray-500 dark:text-gray-300' />
                </div>
                <p className='text-gray-500 dark:text-gray-300 text-xs'>
                  No Poster
                </p>
              </div>
            </div>
          )}

          {/* Rating Badge */}
          {movie.imdbRating && (
            <div className='absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 backdrop-blur-sm'>
              <Star className='w-3 h-3 fill-yellow-400 text-yellow-400' />
              <span>{movie.imdbRating}</span>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className='p-4 flex-1 flex flex-col'>
          <div className='space-y-2 flex-1'>
            {/* Title */}
            <div>
              <h3 className='text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight'>
                {movie.title}
              </h3>
            </div>

            {/* Metadata */}
            <div className='flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1'>
              {movie.releasedAt && (
                <div className='flex items-center gap-1'>
                  <Calendar className='w-3 h-3' />
                  <span>{movie.releasedAt}</span>
                </div>
              )}
              {movie.duration && (
                <div className='flex items-center gap-1'>
                  <Clock className='w-3 h-3' />
                  <span>
                    {Math.floor(parseInt(movie.duration) / 60) > 0 &&
                      `${Math.floor(parseInt(movie.duration) / 60)}h`}
                    {parseInt(movie.duration) % 60 > 0 && ` ${parseInt(movie.duration) % 60}m`}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {movie.description && (
              <p className='text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-2 leading-relaxed'>
                {movie.description}
              </p>
            )}
          </div>

          {/* Watch Button */}
          <button
            className='mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded transition-colors duration-200'
          >
            Watch Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}