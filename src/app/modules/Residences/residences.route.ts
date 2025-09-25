import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { ResidencesControllers } from './residences.controller';
import { fileUploader } from '../../helper/uploadFile';

const router = express.Router();

// Add file upload middleware for create and update
router.post('/', auth(Role.ADMIN, Role.SUPER_ADMIN), fileUploader.uploadResidenceFiles, ResidencesControllers.createResidences);
router.get('/', ResidencesControllers.getAllResidencess);
router.get('/:id', ResidencesControllers.getSingleResidences);
router.patch('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), fileUploader.uploadResidenceFiles, ResidencesControllers.updateResidences);
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), ResidencesControllers.deleteResidences);

export const ResidencesRoutes = router;