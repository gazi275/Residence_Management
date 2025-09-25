import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { IssueTypeControllers } from './issueType.controller';
import { fileUploader } from '../../helper/uploadFile';
import { parseBodyMiddleware } from '../../middleware/parseBodyData';

const router = express.Router();

router.post('/', auth(),fileUploader.uploadProfileImage,
  parseBodyMiddleware, IssueTypeControllers.createIssueType);
router.get('/', IssueTypeControllers.getAllIssueTypes);
router.get('/:id', IssueTypeControllers.getSingleIssueType);
router.patch('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN),fileUploader.uploadProfileImage,
  parseBodyMiddleware, IssueTypeControllers.updateIssueType);
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), IssueTypeControllers.deleteIssueType);

export const IssueTypeRoutes = router;
