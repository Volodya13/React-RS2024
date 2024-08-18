import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Za-z]+$/, 'Name should contain only alphabets and start with a capital letter'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age should be a positive number')
    .integer('Age should be a number'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[@$!%*?&#=]).{8,}$/,
      'Password must include upper case, number, special character',
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Please select your gender'),
  profilePicture: yup.mixed().required('Profile picture is required'),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], 'Please accept the terms and conditions')
    .default(false),
});
