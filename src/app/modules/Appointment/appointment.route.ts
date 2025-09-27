import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { AppointmentControllers } from './appointment.controller';

const router = express.Router();

router.post('/', auth(), AppointmentControllers.createAppointment);
router.get('/', auth(), AppointmentControllers.getAllAppointments);
router.get('/:id', auth(), AppointmentControllers.getSingleAppointment);
router.patch('/:id', auth(), AppointmentControllers.updateAppointment);
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), AppointmentControllers.deleteAppointment);

export const AppointmentRoutes = router;