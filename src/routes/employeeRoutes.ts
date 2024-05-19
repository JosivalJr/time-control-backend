import { Router } from 'express';
import { EmployeeController } from '../controllers/employee';

const router = Router();

router.get(
  '/employee',
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
  EmployeeController.updateByIdValidation,
  EmployeeController.updateById,
);

router.delete(
  '/employee/:id',
  EmployeeController.deleteByIdValidation,
  EmployeeController.deleteById,
);

router.get(
  '/employee/:id',
  EmployeeController.getById,
  EmployeeController.getByIdValidation,
);

export default router;
