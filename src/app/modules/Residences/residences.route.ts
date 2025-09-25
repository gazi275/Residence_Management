import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { ResidencesControllers } from './residences.controller';

const router = express.Router();

router.post('/', auth(Role.ADMIN, Role.SUPER_ADMIN), ResidencesControllers.createResidences);
router.get('/', ResidencesControllers.getAllResidencess);
router.get('/:id', ResidencesControllers.getSingleResidences);
router.patch('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), ResidencesControllers.updateResidences);
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), ResidencesControllers.deleteResidences);

export const ResidencesRoutes = router;
