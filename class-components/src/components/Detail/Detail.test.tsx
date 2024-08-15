import { render, screen, act } from '@testing-library/react';
import Detail from './Detail';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { useGetEpisodeByIdQuery } from '../../services/episodesApi';

vi.mock('../../services/episodesApi', () => ({
  useGetEpisodeByIdQuery: vi.fn(),
}));

const mockUseGetEpisodeByIdQuery = useGetEpisodeByIdQuery as ReturnType<typeof vi.fn>;

const store = setupStore;

describe('Detail', () => {
  test('displays detailed card data', async () => {
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
        <Provider store={store}>
          <MemoryRouter initialEntries={['/details/1']}>
            <Routes>
              <Route path="/details/:id" element={<Detail />} />
            </Routes>
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

  test('displays loading state initially', () => {
    mockUseGetEpisodeByIdQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route path="/details/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    mockUseGetEpisodeByIdQuery.mockReturnValue({
      data: null,
      error: new Error('API Error'),
      isLoading: false,
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/details/1']}>
            <Routes>
              <Route path="/details/:id" element={<Detail />} />
            </Routes>
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(screen.getByText(/Error: API Error/i)).toBeInTheDocument();
  });

  test('displays no data found when there is no episode data', async () => {
    mockUseGetEpisodeByIdQuery.mockReturnValue({
      data: { episode: null },
      error: null,
      isLoading: false,
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/details/1']}>
            <Routes>
              <Route path="/details/:id" element={<Detail />} />
            </Routes>
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(screen.getByText(/No data found/i)).toBeInTheDocument();
  });
});
