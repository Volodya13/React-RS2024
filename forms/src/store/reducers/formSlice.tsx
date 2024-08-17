import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormsData } from '../../interfaces/interfaces.tsx';

interface FormState {
  data: FormsData[];
}

const initialState: FormState = {
  data: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveFormData(state, action: PayloadAction<FormsData>) {
      state.data.push(action.payload);
    },
  },
});

export const { saveFormData } = formSlice.actions;

export default formSlice.reducer;
