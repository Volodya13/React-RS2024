/*
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSearchEpisodesQuery } from '../../services/episodesApi';
import { IEpisode } from '../../interfaces/IEpisode.ts';

interface SearchState {
  searchItem: string;
  error: string | null;
  results: IEpisode[];
}

const initialState: SearchState = {
  searchItem: '',
  error: null,
};

export const performSearch = createAsyncThunk(
  'search/performSearch',
  async (searchItem: string, { rejectWithValue }) => {
    const trimmedSearchItem = searchItem.trim();
    const regex = /^[a-zA-Z\d]+$/;
    if (!regex.test(trimmedSearchItem)) {
      return rejectWithValue('Please use only Latin letters.');
    }
    try {
      const [response] = await Promise.all([useSearchEpisodesQuery(trimmedSearchItem)]);
      return response;
    } catch (error) {
      return rejectWithValue('Search failed.');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchItem(state, action: PayloadAction<string>) {
      state.searchItem = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setSearchItem, setError } = searchSlice.actions;

export default searchSlice.reducer;
*/
