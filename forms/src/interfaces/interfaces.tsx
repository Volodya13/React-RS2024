import { UseFormRegister } from 'react-hook-form';

export interface FormsData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  profilePicture: string | null;
  termsAndConditions: boolean;
}

export enum FieldTypes {
  text = 'text',
  email = 'email',
  number = 'number',
  password = 'password',
  radio = 'radio',
  checkbox = 'checkbox',
  file = 'file',
}

export interface FormsDataField {
  label: string;
  id: keyof FormsData;
  type: FieldTypes;
  placeholder?: string;
  register: UseFormRegister<FormsData>;
  error?: string;
  required?: boolean;
}
