import * as Yup from 'yup';

const AddRecipeFormSchema = Yup.object({
  status: Yup.string().required('Please Choose Property Status'),
  class: Yup.string().required('Please Choose Property Class'),
  category: Yup.string().required('Please Choose Property Type'),
  description: Yup.string().required('Please Enter Property Description'),
  price: Yup.number().required('Please Enter Property Price'),
  bedrooms: Yup.string().required('Required'),
  bathrooms: Yup.string().required('Required'),
  photos: Yup.array().min(5, 'At least 5 photos are required'),
  region: Yup.string().required('Region is required'),
  listing_address: Yup.object().shape({
    address: Yup.string().required('Please Enter Address'),
  }),
  city: Yup.string().required('City is required'),
});

export default AddRecipeFormSchema;
