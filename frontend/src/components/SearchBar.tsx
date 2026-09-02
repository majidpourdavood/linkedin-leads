'use client';

import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="flex items-center pl-5 text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by name, job title, company, skills..."
            className="flex-1 px-4 py-4 text-lg text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 m-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-blue-500/25"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Searching...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
