import { Router } from 'express';
import { TimeControlController } from '../controllers/timeControl';

const router = Router();

router.get(
  '/timecontrol',
  TimeControlController.getAllValidation,
  TimeControlController.getAll,
);

router.post(
  '/timecontrol',
  TimeControlController.createValidation,
  TimeControlController.create,
);

router.patch(
  '/timecontrol/:id',
  TimeControlController.updateByIdValidation,
  TimeControlController.updateById,
);

router.delete(
  '/timecontrol/:id',
  TimeControlController.deleteByIdValidation,
  TimeControlController.deleteById,
);

router.get(
  '/timecontrol/:id',
  TimeControlController.getById,
  TimeControlController.getByIdValidation,
);

export default router;
