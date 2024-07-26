import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

const initialState: PaginationState = {
  pageNumber: 0,
  pageSize: 7,
  totalPages: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setPageNumber, setTotalPages } = paginationSlice.actions;

export default paginationSlice.reducer;
