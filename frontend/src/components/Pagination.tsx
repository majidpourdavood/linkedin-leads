'use client';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          typeof p === 'string' ? (
            <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`min-w-[40px] h-10 flex items-center justify-center text-sm font-medium rounded-xl transition-all duration-200 ${
                p === page
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
      >
        Next
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
