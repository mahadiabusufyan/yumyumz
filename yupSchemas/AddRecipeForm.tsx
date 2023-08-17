import * as Yup from 'yup';

const AddRecipeFormSchema = Yup.object({
  title: Yup.string().required('Please type recipe title'),
  // photos: Yup.array().min(5, 'At least 5 photos are required'),
});

export default AddRecipeFormSchema;
