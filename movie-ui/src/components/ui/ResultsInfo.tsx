import { motion } from 'framer-motion'

type Props = {
  currentPage: number
  itemsPerPage: number
  totalItems?: number
  isSearching?: boolean
}

export default function ResultsInfo({
  currentPage,
  itemsPerPage,
  totalItems,
  isSearching = false,
}: Props) {
  if (totalItems === 0) return null

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='flex items-center justify-between text-sm text-gray-600 mb-6'
    >
      <div>
        Showing <span className='font-medium text-gray-900'>{endItem - startItem + 1}</span>{' '} of {' '}
        <span className='font-medium text-gray-900'>{totalItems}</span> movies
      </div>

      {isSearching && (
        <div className='flex items-center space-x-2'>
          <div className='w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
          <span>Searching...</span>
        </div>
      )}
    </motion.div>
  )
}
