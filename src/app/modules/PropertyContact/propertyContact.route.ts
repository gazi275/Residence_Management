import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { PropertyContactControllers } from './propertyContact.controller';

const router = express.Router();

router.post('/', auth(Role.ADMIN, Role.SUPER_ADMIN,Role.MANAGER,Role.CARETAKER), PropertyContactControllers.createPropertyContact);
router.get('/', PropertyContactControllers.getAllPropertyContacts);
router.get('/:id', PropertyContactControllers.getSinglePropertyContact);
router.patch('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN,Role.MANAGER,Role.CARETAKER), PropertyContactControllers.updatePropertyContact);
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN,Role.MANAGER,Role.CARETAKER), PropertyContactControllers.deletePropertyContact);

export const PropertyContactRoutes = router;
