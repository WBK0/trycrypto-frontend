import * as Yup from 'yup';

// Validating the email field using the Yup library
export const emailSchema = Yup.object().shape({
  email: Yup.string()
  .email('You have entered an incorrect email')
  .required('This field is required')
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'You have entered an incorrect email')
});