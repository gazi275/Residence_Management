import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { NewsControllers } from './news.controller';
import { fileUploader } from '../../helper/uploadFile';

const router = express.Router();

// Upload middleware for news files (image, video, thumbnail)
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
  NewsControllers.createNews
);

// Get all news (user's residence news only)
router.get(
  '/', 
  auth(Role.USER, Role.CARETAKER, Role.MANAGER, Role.ADMIN, Role.SUPER_ADMIN),
  NewsControllers.getAllNewss
);

// Get single news
router.get(
  '/:id', 
  auth(Role.USER, Role.CARETAKER, Role.MANAGER, Role.ADMIN, Role.SUPER_ADMIN),
  NewsControllers.getSingleNews
);

// Update news with file upload
router.patch(
  '/:id', 
  auth(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
  uploadNewsFiles,
  NewsControllers.updateNews
);

// Delete news
router.delete(
  '/:id', 
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  NewsControllers.deleteNews
);

// Get news by residence (for admin/manager)
router.get(
  '/residence/:residenceId',
  auth(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER, Role.CARETAKER),
  NewsControllers.getNewsByResidence
);

export const NewsRoutes = router;