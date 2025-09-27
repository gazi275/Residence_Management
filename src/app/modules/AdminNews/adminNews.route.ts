import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { AdminNewsControllers } from './adminNews.controller';
import { fileUploader } from '../../helper/uploadFile';

const router = express.Router();

const uploadNewsFiles = fileUploader.uploadAllFiles.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

// Create news with file upload
router.post(
  '/', 
  auth(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
  uploadNewsFiles,
  AdminNewsControllers.createNews
);

// Get all admin news (no auth required for public viewing)
router.get('/', AdminNewsControllers.getAllAdminNewss);

// Get single admin news
router.get('/:id', AdminNewsControllers.getSingleAdminNews);

// Update admin news with file upload
router.patch(
  '/:id', 
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  uploadNewsFiles, // Added file upload middleware for update
  AdminNewsControllers.updateAdminNews
);

// Delete admin news
router.delete(
  '/:id', 
  auth(Role.ADMIN, Role.SUPER_ADMIN), 
  AdminNewsControllers.deleteAdminNews
);

export const AdminNewsRoutes = router;