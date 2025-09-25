import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { ReportControllers } from './report.controller';

const router = express.Router();

router.post('/', auth(Role.ADMIN, Role.SUPER_ADMIN), ReportControllers.createReport);
router.get('/', ReportControllers.getAllReports);
router.get('/:id', ReportControllers.getSingleReport);
router.patch('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), ReportControllers.updateReport);
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), ReportControllers.deleteReport);

export const ReportRoutes = router;
