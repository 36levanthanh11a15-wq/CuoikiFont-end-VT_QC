import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalProducts: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalProducts, 
  pageSize, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalProducts / pageSize);
  
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-3 md:space-x-4 mt-16">
      {/* Prev Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
          currentPage === 1 
            ? 'opacity-30 cursor-not-allowed text-gray-500' 
            : 'text-white hover:border-primary hover:text-primary bg-white/5 active:scale-95'
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className="text-gray-600 font-black tracking-widest px-2">
                ...
              </span>
            );
          }
          
          const isCurrent = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-display font-black italic transition-all duration-500 ${
                isCurrent
                  ? 'bg-primary text-black scale-110 shadow-[0_0_40px_rgba(255,77,0,0.4)] z-10'
                  : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white hover:border-white/20 border border-transparent'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
          currentPage === totalPages
            ? 'opacity-30 cursor-not-allowed text-gray-500'
            : 'text-white hover:border-primary hover:text-primary bg-white/5 active:scale-95'
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
