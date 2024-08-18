import { FormsData } from '../interfaces/interfaces.tsx';

export const validateUncontrolledForm = (data: FormsData) => {
  const errors: Record<keyof FormsData, string | undefined> = {
    name: undefined,
    age: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    gender: undefined,
    profilePicture: undefined,
    termsAndConditions: undefined,
  };

  if (!data.name) {
    errors.name = 'Name is required';
  } else if (!/^[A-Za-z]+$/.test(data.name)) {
    errors.name = 'Name should contain only alphabets and start with a capital letter';
  }

  if (!data.age || data.age <= 0) {
    errors.age = 'Age should be a positive number';
  }

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[@$!%*?&#=]).{8,}$/.test(data.password)) {
    errors.password = 'Password must include upper case, number, special character';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  if (!data.gender) {
    errors.gender = 'Please select your gender';
  }

  if (!data.profilePicture) {
    errors.profilePicture = 'Please upload your profile picture';
  }

  if (!data.termsAndConditions) {
    errors.termsAndConditions = 'Please accept the terms and conditions';
  }

  return errors;
};
