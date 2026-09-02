import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileList from '@/components/ProfileList';

const mockProfiles = [
  {
    id: '1',
    full_name: 'John Smith',
    first_name: 'John',
    last_name: 'Smith',
    job_title: 'Software Engineer',
    job_company_name: 'Google',
    industry: 'Technology',
    location_name: 'San Francisco',
    location_country: 'US',
    skills: ['TypeScript'],
    linkedin_url: 'https://linkedin.com/in/john',
    linkedin_username: 'john',
    inferred_years_experience: 5,
    emails: [],
  },
];

describe('ProfileList', () => {
  it('renders profiles', () => {
    render(<ProfileList profiles={mockProfiles} total={1} isLoading={false} />);
    expect(screen.getByText('John Smith')).toBeInTheDocument();
  });

  it('shows total count', () => {
    render(<ProfileList profiles={mockProfiles} total={1} isLoading={false} />);
    expect(screen.getByText(/Showing/)).toBeInTheDocument();
    expect(screen.getByText(/profiles/)).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<ProfileList profiles={[]} total={0} isLoading={false} />);
    expect(screen.getByText(/No profiles found/)).toBeInTheDocument();
  });

  it('shows loading state', () => {
    const { container } = render(<ProfileList profiles={[]} total={0} isLoading={true} />);
    expect(container.querySelector('.animate-shimmer')).toBeInTheDocument();
  });
});
