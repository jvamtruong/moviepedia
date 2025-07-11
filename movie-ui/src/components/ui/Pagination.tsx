import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: Props) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const showPages = 5 // Number of page buttons to show

    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first page
      pages.push(1)

      // Calculate range around current page
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust range if we're near the beginning or end
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4)
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3)
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...')
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...')
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-center space-x-2 ${className}`}
    >
      {/* Previous Button */}
      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-2 rounded-xl border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
      >
        <ChevronLeft className='w-4 h-4' />
        <span className='hidden sm:inline ml-1'>Previous</span>
      </Button>

      {/* Page Numbers */}
      <div className='flex items-center space-x-1'>
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <div className='px-3 py-2 text-gray-400'>
                <MoreHorizontal className='w-4 h-4' />
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(page)}
                className={`
                  px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                {page}
              </motion.button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-3 py-2 rounded-xl border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
      >
        <span className='hidden sm:inline mr-1'>Next</span>
        <ChevronRight className='w-4 h-4' />
      </Button>
    </motion.div>
  )
}
