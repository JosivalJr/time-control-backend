import { Router } from 'express';
import { EmployeeController } from '../controllers/employee';
import { ensureAuthenticated } from '../middleware';

const router = Router();

router.get(
  '/employee',
  ensureAuthenticated,
  EmployeeController.getAllValidation,
  EmployeeController.getAll,
);

router.post(
  '/employee',
  EmployeeController.createValidation,
  EmployeeController.create,
);

router.patch(
  '/employee/:id',
  ensureAuthenticated,
  EmployeeController.updateByIdValidation,
  EmployeeController.updateById,
);

router.delete(
  '/employee/:id',
  ensureAuthenticated,
  EmployeeController.deleteByIdValidation,
  EmployeeController.deleteById,
);

router.get(
  '/employee/:id',
  ensureAuthenticated,
  EmployeeController.getById,
  EmployeeController.getByIdValidation,
);

router.post(
  '/employee/signin',
  EmployeeController.signInValidation,
  EmployeeController.signIn,
);

export default router;
