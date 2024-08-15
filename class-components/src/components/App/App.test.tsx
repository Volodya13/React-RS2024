import { render, screen, act } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useGetAllEpisodesQuery, useGetEpisodeByIdQuery } from '../../services/episodesApi';

vi.mock('../../services/episodesApi', () => ({
  useGetAllEpisodesQuery: vi.fn(),
  useGetEpisodeByIdQuery: vi.fn(),
}));

const mockUseGetAllEpisodesQuery = useGetAllEpisodesQuery as ReturnType<typeof vi.fn>;
const mockUseGetEpisodeByIdQuery = useGetEpisodeByIdQuery as ReturnType<typeof vi.fn>;

describe('App', () => {
  test('renders SearchComponent and Detail components', async () => {
    mockUseGetAllEpisodesQuery.mockReturnValue({
      data: { episodes: [] },
      error: null,
      isLoading: false,
    });

    await act(async () => {
      render(
        <Provider store={setupStore}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(screen.getByText(/No episodes available/i)).toBeInTheDocument();

    mockUseGetEpisodeByIdQuery.mockReturnValue({
      data: {
        episode: {
          uid: '1',
          title: 'Episode 1',
          season: { title: 'Season 1' },
          series: { title: 'Series 1' },
          usAirDate: '2024-07-28',
          directors: [{ uid: 'd1', name: 'Director 1' }],
          writers: [{ uid: 'w1', name: 'Writer 1' }],
          characters: [{ uid: 'c1', name: 'Character 1' }],
        },
      },
      error: null,
      isLoading: false,
    });

    await act(async () => {
      render(
        <Provider store={setupStore}>
          <MemoryRouter initialEntries={['/details/1']}>
            <App />
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(screen.getByText(/Details about episode: Episode 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Season: Season 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Series: Series 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Date: 2024-07-28/i)).toBeInTheDocument();
    expect(screen.getByText(/Director 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Writer 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Character 1/i)).toBeInTheDocument();
  });

  test('displays NotFound component for invalid routes', async () => {
    await act(async () => {
      render(
        <Provider store={setupStore}>
          <MemoryRouter initialEntries={['/invalid-route']}>
            <App />
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    mockUseGetAllEpisodesQuery.mockReturnValue({
      data: null,
      error: new Error('API Error'),
      isLoading: false,
    });

    await act(async () => {
      render(
        <Provider store={setupStore}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(screen.getByText(/Something went wrong.../i)).toBeInTheDocument();
  });
});
