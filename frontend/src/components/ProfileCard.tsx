'use client';

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

interface ProfileCardProps {
  profile: Profile;
}

const gradients = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-pink-400',
  'from-orange-500 to-amber-400',
  'from-emerald-500 to-teal-400',
  'from-rose-500 to-red-400',
  'from-indigo-500 to-blue-400',
  'from-fuchsia-500 to-purple-400',
];

function getGradient(name: string): string {
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const initials = `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`.toUpperCase();
  const gradient = getGradient(profile.full_name || '');

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 animate-fadeIn">
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <span className="text-xl font-bold text-white drop-shadow-sm">{initials}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
              {profile.full_name}
            </h3>
            {profile.linkedin_username && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-blue-500 hover:text-blue-600 transition-colors"
                title="LinkedIn Profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}
          </div>

          {profile.job_title && (
            <p className="text-sm font-medium text-slate-700 mb-0.5">
              {profile.job_title}
            </p>
          )}

          {profile.job_company_name && (
            <p className="text-sm text-slate-500 mb-2">
              at <span className="font-medium text-slate-600">{profile.job_company_name}</span>
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {profile.location_country && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profile.location_name || profile.location_country}
              </span>
            )}

            {profile.inferred_years_experience && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {profile.inferred_years_experience}yr exp
              </span>
            )}

            {profile.industry && (
              <span className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                {profile.industry}
              </span>
            )}
          </div>

          {profile.skills && profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.slice(0, 5).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
              {profile.skills.length > 5 && (
                <span className="px-2.5 py-1 text-xs font-medium text-slate-500 bg-slate-100 rounded-md">
                  +{profile.skills.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
