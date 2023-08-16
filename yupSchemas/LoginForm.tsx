import * as Yup from 'yup';

export const LoginFormSchema = Yup.object({
  email: Yup.string()
    .email('Please Enter Valid Email')
    .required('Email cannot be empty'),
  password: Yup.string().required('Please Enter Password'),
});
