import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileCard from '@/components/ProfileCard';

const mockProfile = {
  id: '1',
  full_name: 'John Smith',
  first_name: 'John',
  last_name: 'Smith',
  job_title: 'Software Engineer',
  job_company_name: 'Google',
  industry: 'Technology',
  location_name: 'San Francisco',
  location_country: 'US',
  skills: ['TypeScript', 'React', 'Node.js'],
  linkedin_url: 'https://linkedin.com/in/john.smith',
  linkedin_username: 'john.smith',
  inferred_years_experience: 5,
  emails: ['john@gmail.com'],
};

describe('ProfileCard', () => {
  it('renders profile name', () => {
    render(<ProfileCard profile={mockProfile} />);
    expect(screen.getByText('John Smith')).toBeInTheDocument();
  });

  it('renders job title', () => {
    render(<ProfileCard profile={mockProfile} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders company name', () => {
    render(<ProfileCard profile={mockProfile} />);
    expect(screen.getByText('Google')).toBeInTheDocument();
  });

  it('renders skills', () => {
    render(<ProfileCard profile={mockProfile} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders experience years', () => {
    render(<ProfileCard profile={mockProfile} />);
    expect(screen.getByText('5yr exp')).toBeInTheDocument();
  });
});
