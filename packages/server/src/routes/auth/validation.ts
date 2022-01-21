import { check } from 'express-validator';
import validator from '../../middlewares/validator';

export const credentialChecks = [
  check('email', 'invalid email').isEmail(),
  check(
    'password',
    'password should be at least 6 or more characters'
  ).isLength({
    min: 6,
  }),
];

const validations = validator(credentialChecks);

export default validations;
