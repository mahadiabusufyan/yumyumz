import * as Yup from 'yup';

export const RegisterFormSchema = Yup.object({
  name: Yup.string().required('Name'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email cannot be empty'),
  password: Yup.string()
    .required('Please enter a password')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});
