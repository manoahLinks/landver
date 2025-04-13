"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage = 1, totalPages = 4, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Prev</span>
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1
        const isActive = pageNumber === currentPage

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`
              flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium
              ${isActive ? "bg-[#6E62E5] text-white" : "text-gray-700 hover:bg-gray-100"}
            `}
          >
            {pageNumber}
          </button>
        )
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
