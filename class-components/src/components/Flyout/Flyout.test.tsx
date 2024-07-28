import { render, screen, fireEvent } from '@testing-library/react';
import Flyout from './Flyout';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { describe, test, expect, vi } from 'vitest';
import { IEpisode } from '../../interfaces/IEpisode';

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(),
});

const setupTestStore = (initialState: Partial<ReturnType<typeof setupStore.getState>>) => {
  return setupStore({ preloadedState: initialState });
};

// Пример данных для тестирования
const exampleEpisodes: IEpisode[] = [
  {
    uid: '1',
    title: 'Episode 1',
    usAirDate: '2024-07-28',
    episode: {
      uid: '1',
      title: 'Episode 1',
      seasonNumber: 1,
      episodeNumber: 1,
      directors: [{ uid: 'd1', name: 'Director 1' }],
      writers: [{ uid: 'w1', name: 'Writer 1' }],
      characters: [{ uid: 'c1', name: 'Character 1' }],
      series: { uid: 's1', title: 'Series 1' },
      season: { uid: 'se1', title: 'Season 1' },
      productionSerialNumber: 'PSN1',
      featureLength: false,
      stardateFrom: null,
      stardateTo: null,
      yearFrom: null,
      yearTo: null,
      usAirDate: '2024-07-28',
    },
  },
  {
    uid: '2',
    title: 'Episode 2',
    usAirDate: '2024-07-29',
    episode: {
      uid: '2',
      title: 'Episode 2',
      seasonNumber: 1,
      episodeNumber: 2,
      directors: [{ uid: 'd2', name: 'Director 2' }],
      writers: [{ uid: 'w2', name: 'Writer 2' }],
      characters: [{ uid: 'c2', name: 'Character 2' }],
      series: { uid: 's2', title: 'Series 2' },
      season: { uid: 'se2', title: 'Season 2' },
      productionSerialNumber: 'PSN2',
      featureLength: false,
      stardateFrom: null,
      stardateTo: null,
      yearFrom: null,
      yearTo: null,
      usAirDate: '2024-07-29',
    },
  },
];

describe('Flyout', () => {
  test('renders Flyout component when selected items are available', () => {
    const store = setupTestStore({
      selectedItems: {
        selectedItems: exampleEpisodes,
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    expect(screen.getByText(/Selected: 2/i)).toBeInTheDocument();
  });

  test('download button triggers CSV download', () => {
    const store = setupTestStore({
      selectedItems: {
        selectedItems: exampleEpisodes,
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    const downloadButton = screen.getByText(/Download/i);
    window.URL.createObjectURL = vi.fn();
    document.body.appendChild = vi.fn();
    document.body.removeChild = vi.fn();

    fireEvent.click(downloadButton);

    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
  });

  test('unselect all button clears selected items', () => {
    const store = setupTestStore({
      selectedItems: {
        selectedItems: exampleEpisodes,
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    const unselectAllButton = screen.getByText(/Unselect all/i);

    fireEvent.click(unselectAllButton);

    expect(store.getState().selectedItems.selectedItems).toEqual([]);
  });
});
