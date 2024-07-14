import { render, screen, act } from '@testing-library/react';
import Detail from './Detail';
import { describe, test, expect, vi } from 'vitest';

vi.mock('../../services/DataFetch', () => ({
  FetchEpisodes: vi.fn().mockImplementation(() => ({
    getEpisodeById: vi.fn().mockResolvedValue({
      uid: '1',
      title: 'Episode 1',
      season: { title: 'Season 1' },
      episodeNumber: 1,
      series: { title: 'Series 1' },
      directors: [{ name: 'Director 1' }],
      writers: [{ name: 'Writer 1' }],
    }),
  })),
}));

describe('Detail', () => {
  test('displays detailed card data', async () => {
    await act(async () => {
      render(<Detail id="1" />);
    });

    const title = await screen.findByText(/Episode 1/i);
    expect(title).toBeInTheDocument();
  });
});
