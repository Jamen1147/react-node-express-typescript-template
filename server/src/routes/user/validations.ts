import { check } from 'express-validator';
import requestValidator from '../../middlewares/validator';

const loginChecks = [
  check('email', 'invalid email').isEmail(),
  check('password', 'password should at be 6 or more characters').isLength({
    min: 6,
  }),
];

export const registerValidations = requestValidator([
  check('name', 'name is required').not().isEmpty(),
  ...loginChecks,
]);

export const loginValidations = requestValidator(loginChecks);
