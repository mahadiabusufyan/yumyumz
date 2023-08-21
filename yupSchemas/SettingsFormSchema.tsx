import * as Yup from 'yup';

export const SettingsFormSchema = Yup.object({
  firstName: Yup.string().required('Please Enter Your First Name!'),
  lastName: Yup.string().required('Please Enter Your Last Name!'),
});
