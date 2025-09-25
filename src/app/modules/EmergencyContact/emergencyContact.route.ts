import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { EmergencyContactControllers } from './emergencyContact.controller';

const router = express.Router();

router.post('/', auth(Role.ADMIN, Role.SUPER_ADMIN), EmergencyContactControllers.createEmergencyContact);
router.get('/', EmergencyContactControllers.getAllEmergencyContacts);
router.get('/:id', EmergencyContactControllers.getSingleEmergencyContact);
router.patch('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), EmergencyContactControllers.updateEmergencyContact);
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), EmergencyContactControllers.deleteEmergencyContact);

export const EmergencyContactRoutes = router;
