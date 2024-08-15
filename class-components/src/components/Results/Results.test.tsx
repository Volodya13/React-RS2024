/*
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Results } from './Results';
import { IEpisode } from '../../interfaces/IEpisode';
import { describe, test, expect, vi } from 'vitest';

const mockEpisodes: IEpisode[] = [
  {
    uid: '1',
    title: 'Episode 1',
    seasonNumber: 0,
    episodeNumber: 0,
    directors: [],
    writers: [],
    series: {
      uid: '',
      title: '',
    },
    season: {
      uid: '',
      title: '',
    },
    productionSerialNumber: '',
    featureLength: false,
    stardateFrom: null,
    stardateTo: null,
    yearFrom: null,
    yearTo: null,
    usAirDate: '',
  },
  {
    uid: '2',
    title: 'Episode 2',
    seasonNumber: 0,
    episodeNumber: 0,
    directors: [],
    writers: [],
    series: {
      uid: '',
      title: '',
    },
    season: {
      uid: '',
      title: '',
    },
    productionSerialNumber: '',
    featureLength: false,
    stardateFrom: null,
    stardateTo: null,
    yearFrom: null,
    yearTo: null,
    usAirDate: '',
  },
];

describe('Results', () => {
  test('renders the specified number of cards', async () => {
    await act(async () => {
      render(
        <Results
          episodes={mockEpisodes}
          pageNumber={1}
          totalPages={1}
          onPageChange={vi.fn()}
          onEpisodeClick={vi.fn()}
        />,
      );
    });

    expect(screen.getAllByText(/Episode/i)).toHaveLength(2);
  });

  test('handles pagination correctly', async () => {
    const onPageChangeMock = vi.fn();

    await act(async () => {
      render(
        <Results
          episodes={mockEpisodes}
          pageNumber={1}
          totalPages={2}
          onPageChange={onPageChangeMock}
          onEpisodeClick={vi.fn()}
        />,
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Next/i));
    });

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  test('calls onEpisodeClick when episode is clicked', async () => {
    const onEpisodeClickMock = vi.fn();

    await act(async () => {
      render(
        <Results
          episodes={mockEpisodes}
          pageNumber={1}
          totalPages={1}
          onPageChange={vi.fn()}
          onEpisodeClick={onEpisodeClickMock}
        />,
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Episode 1/i));
    });

    expect(onEpisodeClickMock).toHaveBeenCalledWith('1');
  });
});
*/
