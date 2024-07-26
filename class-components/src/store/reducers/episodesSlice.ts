// store/reducers/episodesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEpisode } from '../../interfaces/IEpisode';
import { IPageParams } from '../../interfaces/IPageParams';

interface EpisodesState {
  episodes: IEpisode[];
  pageParams: IPageParams;
  loading: boolean;
  error: string | null;
}

const initialState: EpisodesState = {
  episodes: [],
  loading: false,
  error: null,
  pageParams: {
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: false,
    pageNumber: 1,
    pageSize: 7,
  },
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pageParams.pageNumber = action.payload;
    },
    setPageParams: (state, action: PayloadAction<IPageParams>) => {
      state.pageParams = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setEpisodes: (state, action: PayloadAction<IEpisode[]>) => {
      state.episodes = action.payload;
    },
    setTotalElements: (state, action: PayloadAction<number>) => {
      state.pageParams.totalElements = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.pageParams.totalPages = action.payload;
    },
  },
});

export const {
  setPage,
  setPageParams,
  setLoading,
  setError,
  setEpisodes,
  setTotalElements,
  setTotalPages,
} = episodesSlice.actions;

export default episodesSlice.reducer;
