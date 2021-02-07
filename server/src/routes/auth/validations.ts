import { check } from 'express-validator';
import requestValidator from '../../middlewares/validator';

export const loginChecks = [
  check('email', 'invalid email').isEmail(),
  check('password', 'password should at be 6 or more characters').isLength({
    min: 6,
  }),
];

export const loginValidations = requestValidator(loginChecks);
