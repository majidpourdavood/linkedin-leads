'use client';

import ProfileCard from './ProfileCard';

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

interface ProfileListProps {
  profiles: Profile[];
  total: number;
  isLoading: boolean;
}

export default function ProfileList({ profiles, total, isLoading }: ProfileListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-6 mx-4 sm:mx-6 animate-shimmer"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-slate-200 rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-slate-200 rounded-lg w-1/3" />
                <div className="h-4 bg-slate-200 rounded-lg w-1/4" />
                <div className="flex gap-2">
                  <div className="h-6 bg-slate-200 rounded-full w-20" />
                  <div className="h-6 bg-slate-200 rounded-full w-24" />
                  <div className="h-6 bg-slate-200 rounded-full w-16" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
          <svg
            className="w-10 h-10 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          No profiles found
        </h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Try adjusting your search keywords or filters to find what you&apos;re looking for
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">
            Showing <span className="text-slate-900">{profiles.length}</span> of{' '}
            <span className="text-slate-900">{total.toLocaleString()}</span> profiles
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Live results
        </div>
      </div>
      <div className="space-y-4">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
