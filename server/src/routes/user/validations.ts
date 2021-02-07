import { check } from 'express-validator';
import requestValidator from '../../middlewares/validator';
import { loginChecks } from '../auth/validations';

export const registerValidations = requestValidator([
  check('name', 'name is required').not().isEmpty(),
  ...loginChecks,
]);
