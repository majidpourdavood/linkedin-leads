import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '@/components/SearchBar';

describe('SearchBar', () => {
  it('renders search input', () => {
    render(<SearchBar onSearch={jest.fn()} isLoading={false} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('renders search button', () => {
    render(<SearchBar onSearch={jest.fn()} isLoading={false} />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with keyword', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} isLoading={false} />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });
    
    button.click();
    expect(onSearch).toHaveBeenCalledWith('');
  });
});
