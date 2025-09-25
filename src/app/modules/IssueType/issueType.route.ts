import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { IssueTypeControllers } from './issueType.controller';

const router = express.Router();

router.post('/', auth(Role.ADMIN, Role.SUPER_ADMIN), IssueTypeControllers.createIssueType);
router.get('/', IssueTypeControllers.getAllIssueTypes);
router.get('/:id', IssueTypeControllers.getSingleIssueType);
router.patch('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), IssueTypeControllers.updateIssueType);
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), IssueTypeControllers.deleteIssueType);

export const IssueTypeRoutes = router;
