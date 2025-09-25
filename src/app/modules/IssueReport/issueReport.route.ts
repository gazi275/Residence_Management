import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { IssueReportControllers } from './issueReport.controller';

const router = express.Router();

router.post('/', auth(Role.ADMIN, Role.SUPER_ADMIN), IssueReportControllers.createIssueReport);
router.get('/', IssueReportControllers.getAllIssueReports);
router.get('/:id', IssueReportControllers.getSingleIssueReport);
router.patch('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), IssueReportControllers.updateIssueReport);
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), IssueReportControllers.deleteIssueReport);

export const IssueReportRoutes = router;
