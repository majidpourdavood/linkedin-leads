import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '@/components/Pagination';

describe('Pagination', () => {
  it('renders pagination buttons', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={jest.fn()} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables previous on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={jest.fn()} />);
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables next on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={jest.fn()} />);
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('renders page numbers', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={jest.fn()} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not render when totalPages is 1', () => {
    const { container } = render(<Pagination page={1} totalPages={1} onPageChange={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });
});
