'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api-client';

interface FilterOptions {
  skills: string[];
  industries: string[];
  jobTitles: string[];
  locations: string[];
  companySizes: string[];
}

interface FilterPanelProps {
  filters: {
    skills: string[];
    industry: string[];
    job_title: string[];
    location: string[];
    company_size: string[];
  };
  onFilterChange: (filters: FilterPanelProps['filters']) => void;
}

export default function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const [options, setOptions] = useState<FilterOptions>({
    skills: [],
    industries: [],
    jobTitles: [],
    locations: [],
    companySizes: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const res = await apiFetch<{ data: FilterOptions }>('/profiles/filters');
      const filterData = res?.data;
      if (filterData && typeof filterData === 'object') {
        setOptions({
          skills: Array.isArray(filterData.skills) ? filterData.skills : [],
          industries: Array.isArray(filterData.industries) ? filterData.industries : [],
          jobTitles: Array.isArray(filterData.jobTitles) ? filterData.jobTitles : [],
          locations: Array.isArray(filterData.locations) ? filterData.locations : [],
          companySizes: Array.isArray(filterData.companySizes) ? filterData.companySizes : [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  };

  const handleMultiSelect = (
    field: keyof FilterPanelProps['filters'],
    value: string,
  ) => {
    const current = filters[field];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [field]: updated });
  };

  const clearAll = () => {
    onFilterChange({
      skills: [],
      industry: [],
      job_title: [],
      location: [],
      company_size: [],
    });
  };

  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0);
  const activeCount = Object.values(filters).flat().length;

  return (
    <div className="w-full max-w-3xl mt-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm"
        >
          <svg
            className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold bg-blue-600 text-white rounded-full">
              {activeCount}
            </span>
          )}
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear all
          </button>
        )}
      </div>

      {isOpen && (
        <div className="mt-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FilterGroup
              title="Skills"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              options={(options.skills || []).slice(0, 15)}
              selected={filters.skills}
              onChange={(val) => handleMultiSelect('skills', val)}
            />
            <FilterGroup
              title="Industry"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              options={(options.industries || [])}
              selected={filters.industry}
              onChange={(val) => handleMultiSelect('industry', val)}
            />
            <FilterGroup
              title="Job Title"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              options={(options.jobTitles || []).slice(0, 15)}
              selected={filters.job_title}
              onChange={(val) => handleMultiSelect('job_title', val)}
            />
            <FilterGroup
              title="Location"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              options={(options.locations || [])}
              selected={filters.location}
              onChange={(val) => handleMultiSelect('location', val)}
            />
            <FilterGroup
              title="Company Size"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              options={(options.companySizes || [])}
              selected={filters.company_size}
              onChange={(val) => handleMultiSelect('company_size', val)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  title,
  icon,
  options,
  selected,
  onChange,
}: {
  title: string;
  icon: React.ReactNode;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-slate-400">{icon}</span>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {selected.length > 0 && (
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
            {selected.length}
          </span>
        )}
      </div>
      <div className="max-h-44 overflow-y-auto space-y-1 pr-1">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2.5 cursor-pointer group py-1"
          >
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
                className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
              />
            </div>
            <span className="text-sm text-slate-600 group-hover:text-blue-600 truncate transition-colors">
              {option}
            </span>
          </label>
        ))}
        {options.length === 0 && (
          <p className="text-sm text-slate-400 italic py-2">No options available</p>
        )}
      </div>
    </div>
  );
}
