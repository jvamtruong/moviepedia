import { useState, useRef, useEffect } from 'react'
import { Search, X, Film, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import type { Movie } from '@/types/Movie'

type Props = {
  onSearch: (query: string, selectedMovie?: any) => void
  suggestions?: Movie[]
  isLoading: boolean
  searchQuery?: string
}

export default function SearchDropdown({ onSearch, suggestions, isLoading, searchQuery }: Props) {
  const [query, setQuery] = useState(searchQuery || '')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setSelectedIndex(-1)

    if (value.trim()) {
      setIsOpen(true)
      onSearch(value)
    } else {
      setIsOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev < (suggestions?.length ?? 0) - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSuggestionClick(suggestions?.[selectedIndex] as Movie)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  const handleSuggestionClick = (movie: Movie) => {
    setQuery(movie.title)
    setIsOpen(false)
    onSearch(movie.title, movie)
  }

  const clearSearch = () => {
    setQuery('')
    setIsOpen(false)
    onSearch('')
  }

  return (
    <div className='relative w-full max-w-2xl mx-auto' ref={dropdownRef}>
      <div className='relative'>
        {/* Search Icon */}
        <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none'>
          <Search className='h-5 w-5 text-gray-400' />
        </div>

        {/* Input Field */}
        <Input
          ref={inputRef}
          type='text'
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder='Search for movies...'
          className='w-full pl-12 pr-10 py-3.5 text-base border-0 bg-white/95 backdrop-blur-sm shadow-md rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all duration-200 placeholder-gray-400'
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={clearSearch}
            className='absolute inset-y-0 right-0 pr-4 flex items-center group'
            aria-label='Clear search'
          >
            <X className='h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors' />
          </button>
        )}
      </div>

      {/* Dropdown Suggestions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className='absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/80 max-h-[28rem] overflow-auto'
          >
            {isLoading ? (
              <div className='p-4 flex flex-col items-center justify-center'>
                <div className='flex items-center justify-center space-x-2 py-6'>
                  <div className='w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse [animation-delay:-0.32s]'></div>
                  <div className='w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse [animation-delay:-0.16s]'></div>
                  <div className='w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse'></div>
                </div>
                <p className='text-sm text-gray-500'>Searching movies...</p>
              </div>
            ) : (suggestions?.length ?? 0) > 0 ? (
              <ul className='divide-y divide-gray-100/80'>
                {suggestions?.map((movie, index) => (
                  <motion.li
                    key={movie.id || index}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                      index === selectedIndex
                        ? 'bg-blue-300/60'
                        : 'hover:bg-blue-300/60'
                    }`}
                    onClick={() => handleSuggestionClick(movie)}
                  >
                    <div className='flex items-center gap-3'>
                      {/* Movie Poster */}
                      <div className='flex-shrink-0 relative w-10 h-14 rounded-md overflow-hidden bg-gray-100 shadow-sm'>
                        {movie.poster ? (
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className='absolute inset-0 w-full h-full object-cover'
                            loading='lazy'
                          />
                        ) : (
                          <div className='w-full h-full flex items-center justify-center'>
                            <Film className='w-5 h-5 text-gray-400' />
                          </div>
                        )}
                      </div>

                      {/* Movie Info */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-baseline gap-2'>
                          <p className='text-sm font-medium text-gray-900 truncate'>
                            {movie.title}
                          </p>
                          {movie.releasedAt && (
                            <span className='text-xs text-gray-500 whitespace-nowrap'>
                              ({new Date(movie.releasedAt).getFullYear()})
                            </span>
                          )}
                        </div>

                        <div className='flex items-center gap-2 mt-0.5'>
                          {movie.duration && (
                            <span className='text-xs text-gray-500'>
                              {Math.floor(parseInt(movie.duration) / 60) > 0 &&
                                `${Math.floor(parseInt(movie.duration) / 60)}h`}{' '}
                              {parseInt(movie.duration) % 60 > 0 && `${parseInt(movie.duration) % 60}m`}
                            </span>
                          )}

                          {movie.imdbRating && (
                            <span className='flex items-center text-xs font-medium text-yellow-700 bg-yellow-100/60 px-1.5 py-0.5 rounded'>
                              <Star className='w-3 h-3 fill-yellow-500 mr-0.5' />
                              {movie.imdbRating}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className='p-6 text-center'>
                <Film className='w-8 h-8 mx-auto mb-3 text-gray-300' />
                <p className='text-gray-500'>No results found</p>
                {query && (
                  <p className='text-sm text-gray-400 mt-1'>
                    Try different keywords
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
