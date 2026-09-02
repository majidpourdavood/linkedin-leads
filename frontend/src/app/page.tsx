'use client';

import { useState, useEffect, useCallback } from 'react';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import ProfileList from '@/components/ProfileList';
import Pagination from '@/components/Pagination';
import { apiFetch } from '@/lib/api-client';

interface Profile {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  job_title: string;
  job_company_name: string;
  industry: string;
  location_name: string;
  location_country: string;
  skills: string[];
  linkedin_url: string;
  linkedin_username: string;
  inferred_years_experience: number;
  emails: string[];
}

interface Filters {
  skills: string[];
  industry: string[];
  job_title: string[];
  location: string[];
  company_size: string[];
}

interface SearchResponse {
  data: Profile[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function HomePage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState<Filters>({
    skills: [],
    industry: [],
    job_title: [],
    location: [],
    company_size: [],
  });

  const fetchProfiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '20');

      if (keyword) params.set('keyword', keyword);
      if (filters.skills.length) params.set('skills', filters.skills.join(','));
      if (filters.industry.length) params.set('industry', filters.industry.join(','));
      if (filters.job_title.length) params.set('job_title', filters.job_title.join(','));
      if (filters.location.length) params.set('location', filters.location.join(','));
      if (filters.company_size.length) params.set('company_size', filters.company_size.join(','));

      const res = await apiFetch<SearchResponse>(`/profiles/search?${params.toString()}`);
      setProfiles(res.data);
      setTotal(res.meta.total);
      setTotalPages(res.meta.totalPages);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, keyword, filters]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    setPage(1);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="relative overflow-hidden bg-white border-b border-slate-200 shadow-sm rounded-b-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="relative py-12 px-16">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn Profile Search
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Professional</span> Profiles
            </h1>
            <p className="text-lg text-slate-500">
              Search through {total > 0 ? total.toLocaleString() : 'hundreds of'} LinkedIn profiles with advanced filters
            </p>
          </div>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>
      </header>

      <main className="py-8 px-16">
        <ProfileList profiles={profiles} total={total} isLoading={isLoading} />
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="px-16 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="text-sm">LinkedIn Leads Search Platform</span>
            </div>
            <div className="text-sm text-slate-400">
              Built with NestJS & Next.js
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
