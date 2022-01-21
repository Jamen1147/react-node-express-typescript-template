import { check } from 'express-validator';
import validator from '../../middlewares/validator';
import { credentialChecks } from '../auth/validation';

const validations = validator([
  check('name', 'name is required').not().isEmpty(),
  ...credentialChecks,
]);

export default validations;
