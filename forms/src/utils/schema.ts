import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Za-z]+$/, "Name should contain only alphabets and start with a capital letter"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age should be a positive number")
    .integer("Age should be a number"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[@$!%*?&#=]).{8,}$/, "Password must include upper case, number, special character"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  gender: yup
    .string()
    .required("Please select your gender"),
  profilePicture: yup
    .mixed<FileList>()
    .required("Please upload your profile picture")
    .test("fileSize", "File too large", (value) => {
      return value && value.length > 0 && value[0].size <= 2000000; // Пример: ограничение на размер файла 2MB
    })
    .test("fileType", "Unsupported file format", (value) => {
      return value && value.length > 0 && ["image/jpeg", "image/png"].includes(value[0].type); // Пример: поддерживаемые форматы
    }),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "Please accept the terms and conditions")
    .default(false),
});
