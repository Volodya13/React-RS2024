import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormsData } from '../../interfaces/interfaces.tsx';

interface FormState {
  uncontrolledFormData: FormsData[];
  controlledFormData: FormsData[];
}

const initialState: FormState = {
  uncontrolledFormData: [],
  controlledFormData: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveUncontrolledFormData(state, action: PayloadAction<FormsData>) {
      state.uncontrolledFormData.push(action.payload);
    },
    saveControlledFormData(state, action: PayloadAction<FormsData>) {
      state.controlledFormData.push(action.payload);
    },
  },
});

export const { saveUncontrolledFormData, saveControlledFormData } = formSlice.actions;

export default formSlice.reducer;
