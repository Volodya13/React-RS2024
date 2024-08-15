import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEpisode } from '../../interfaces/IEpisode';

interface SelectedItemsState {
  selectedItems: IEpisode[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<IEpisode>) => {
      state.selectedItems.push(action.payload);
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter((item) => item.uid !== action.payload);
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
    selectItems: (state, action: PayloadAction<IEpisode[]>) => {
      state.selectedItems = action.payload;
    },
  },
});

export const { selectItem, unselectItem, unselectAllItems, selectItems } =
  selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
