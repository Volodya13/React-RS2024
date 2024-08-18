import { schema } from './schema.ts';
import { FormsData } from '../interfaces/interfaces.tsx';
import * as yup from 'yup';

export const handleImageUpload = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject('Failed to read file');
      }
    };

    reader.onerror = () => {
      reject('Error occurred while reading file');
    };

    try {
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};

export const calculatePasswordStrength = (password: string): number => {
  let score = 0;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[@$!%*?&#=]/.test(password);
  const upperCaseCount = (password.match(/[A-Z]/g) || []).length;
  const numberCount = (password.match(/\d/g) || []).length;
  const specialCharCount = (password.match(/[@$!%*?&#=]/g) || []).length;

  if (hasLowerCase) score += 1;
  if (hasUpperCase) score += 1;
  if (hasNumbers) score += 1;
  if (hasSpecialChars) score += 1;
  if (upperCaseCount >= 2) score += 1;
  if (numberCount > 1) score += 1;
  if (specialCharCount > 1) score += 1;

  return score;
};

export const validateUncontrolledForm = async (data: FormsData) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return {};
  } catch (validationError) {
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

    (validationError as yup.ValidationError).inner.forEach((error: yup.ValidationError) => {
      if (error.path) {
        errors[error.path as keyof FormsData] = error.message;
      }
    });

    return errors;
  }
};
