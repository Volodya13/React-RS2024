import { UseFormRegister } from 'react-hook-form';
import { IFormsData } from './IFormsData.tsx';

export interface IFormFieldProps {
  label: string;
  id: keyof IFormsData;
  type: 'text' | 'email' | 'number' | 'password' | 'radio' | 'checkbox';
  placeholder?: string;
  register: UseFormRegister<IFormsData>;
  error?: string;
  required?: boolean;
}
