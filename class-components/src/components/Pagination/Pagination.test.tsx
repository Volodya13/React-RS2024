import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import { describe, test, vi, expect } from 'vitest';

// Мокаем хук useSearchParams
vi.mock('react-router-dom', () => {
  const actual = vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe('Pagination', () => {
  test('renders Pagination component with initial page 0', () => {
    (useSearchParams as unknown as vi.Mock).mockReturnValue([
      new URLSearchParams({ page: '0' }),
      vi.fn(),
    ]);

    render(
      <MemoryRouter>
        <Pagination />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Page 1/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /◀️/i })).toBeDisabled();
  });

  test('enables Previous button when currentPage is greater than 0', () => {
    (useSearchParams as unknown as vi.Mock).mockReturnValue([
      new URLSearchParams({ page: '1' }),
      vi.fn(),
    ]);

    render(
      <MemoryRouter>
        <Pagination />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Page 2/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /◀️/i })).toBeEnabled();
  });

  test('navigates to next page when Next button is clicked', () => {
    const setSearchParams = vi.fn();
    (useSearchParams as unknown as vi.Mock).mockReturnValue([
      new URLSearchParams({ page: '0' }),
      setSearchParams,
    ]);

    render(
      <MemoryRouter>
        <Pagination />
      </MemoryRouter>,
    );

    const nextButton = screen.getByRole('button', { name: /▶️/i });
    fireEvent.click(nextButton);

    expect(setSearchParams).toHaveBeenCalledWith({ page: '1' });
  });

  test('navigates to previous page when Previous button is clicked', () => {
    const setSearchParams = vi.fn();
    (useSearchParams as unknown as vi.Mock).mockReturnValue([
      new URLSearchParams({ page: '1' }),
      setSearchParams,
    ]);

    render(
      <MemoryRouter>
        <Pagination />
      </MemoryRouter>,
    );

    const prevButton = screen.getByRole('button', { name: /◀️/i });
    fireEvent.click(prevButton);

    expect(setSearchParams).toHaveBeenCalledWith({ page: '0' });
  });
});
