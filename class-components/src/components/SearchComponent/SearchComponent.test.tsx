import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchComponent } from './SearchComponent';
import { describe, test, expect, vi } from 'vitest';

vi.mock('../../services/DataFetch', () => ({
  FetchEpisodes: vi.fn().mockImplementation(() => ({
    getEpisodes: vi.fn().mockResolvedValue({ episodes: [], page: { totalPages: 1 } }),
    searchEpisodes: vi.fn().mockResolvedValue([]),
  })),
}));

describe('SearchComponent', () => {
  test('renders the search bar and results', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchComponent />
        </MemoryRouter>,
      );
    });
    expect(screen.getByText(/Space - final frontier!/i)).toBeInTheDocument();
  });

  test('retrieves value from local storage on mount', async () => {
    localStorage.setItem('searchItem', 'Star Trek');

    await act(async () => {
      render(
        <MemoryRouter>
          <SearchComponent />
        </MemoryRouter>,
      );
    });

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveValue('Star Trek');
  });
});
