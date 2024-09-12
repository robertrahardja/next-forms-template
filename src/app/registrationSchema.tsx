import { z } from 'zod';
import { validateZipcode } from './validateZipcode';

export const schema = z.object({
  firstName: z.string().trim().min(1, { message: 'First name is required' }),
  last: z.string().trim().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  zipcode: z.string().trim().refine(validateZipcode, { message: 'Invalid zipcode' }),


});
