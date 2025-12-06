interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}: PaginationProps) {

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex justify-between items-center py-4 text-sm">
      
      <div className="text-gray-600">
        Showing {(currentPage - 1) * itemsPerPage + 1} – 
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </div>

      <div className="flex gap-2">
        <button
          disabled={!hasPrev}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={!hasNext}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
}
