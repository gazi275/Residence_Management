import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { NewsControllers } from './news.controller';

const router = express.Router();

router.post('/', auth(Role.ADMIN, Role.SUPER_ADMIN), NewsControllers.createNews);
router.get('/', NewsControllers.getAllNewss);
router.get('/:id', NewsControllers.getSingleNews);
router.patch('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), NewsControllers.updateNews);
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), NewsControllers.deleteNews);

export const NewsRoutes = router;
