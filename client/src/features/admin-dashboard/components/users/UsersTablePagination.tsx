type Props = {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onRowsPerPageChange: (value: number) => void;
};

export default function UsersTablePagination({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  startIndex,
  endIndex,
  onPrev,
  onNext,
  onRowsPerPageChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600 md:flex-row md:items-center md:justify-end">
      <div className="flex items-center gap-2">
        <span>Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="rounded border border-gray-200 px-2 py-1 outline-none"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>
      </div>

      <div>
        {startIndex}-{endIndex} of {totalItems}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="rounded border border-gray-200 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="rounded border border-gray-200 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}