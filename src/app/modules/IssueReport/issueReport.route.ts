import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { IssueReportControllers } from './issueReport.controller';
import { fileUploader } from '../../helper/uploadFile'; // Add this import

const router = express.Router();

// Add multer middleware for multiple image uploads
router.post('/', auth(), fileUploader.uploadMultipleImages, IssueReportControllers.createIssueReport);
router.get('/', IssueReportControllers.getAllIssueReports);
router.get('/:id', IssueReportControllers.getSingleIssueReport);

// Add multer middleware for update route too (optional image update)
router.patch('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), fileUploader.uploadMultipleImages, IssueReportControllers.updateIssueReport);
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), IssueReportControllers.deleteIssueReport);

export const IssueReportRoutes = router;