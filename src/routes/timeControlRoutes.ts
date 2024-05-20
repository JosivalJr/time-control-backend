import { Router } from 'express';
import { TimeControlController } from '../controllers/timeControl';
import { ensureAuthenticated } from '../middleware';

const router = Router();

router.get(
  '/timecontrol',
  ensureAuthenticated,
  TimeControlController.getAllValidation,
  TimeControlController.getAll,
);

router.post(
  '/timecontrol',
  ensureAuthenticated,
  TimeControlController.createValidation,
  TimeControlController.create,
);

router.patch(
  '/timecontrol/:id',
  ensureAuthenticated,
  TimeControlController.updateByIdValidation,
  TimeControlController.updateById,
);

router.delete(
  '/timecontrol/:id',
  ensureAuthenticated,
  TimeControlController.deleteByIdValidation,
  TimeControlController.deleteById,
);

router.get(
  '/timecontrol/:id',
  ensureAuthenticated,
  TimeControlController.getById,
  TimeControlController.getByIdValidation,
);

export default router;
