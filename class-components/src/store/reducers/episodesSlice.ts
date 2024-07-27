import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEpisode } from '../../interfaces/IEpisode';

interface EpisodesState {
  episodes: IEpisode[];
  searchResults: IEpisode[];
  isSearching: boolean;
}

const initialState: EpisodesState = {
  episodes: [],
  searchResults: [],
  isSearching: false,
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    setAllEpisodes(state, action: PayloadAction<IEpisode[]>) {
      state.episodes = action.payload;
    },
    setSearchResults(state, action: PayloadAction<IEpisode[]>) {
      state.searchResults = action.payload;
      state.isSearching = true;
    },
    clearSearch(state) {
      state.searchResults = [];
      state.isSearching = false;
    },
  },
});

export const { setAllEpisodes, setSearchResults, clearSearch } = episodesSlice.actions;

export default episodesSlice.reducer;
