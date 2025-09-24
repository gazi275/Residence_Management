import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { fileUploader } from "../../helper/uploadFile";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";

const route = Router();


route.post(
  "/",

  userController.createUserController
);

route.get("/me", auth(), userController.getMyProfileController);

route.get(
  "/",
  auth(Role.ADMIN,Role.SUPER_ADMIN),
  userController.getAllUserController)

route.put(
  "/change-password",
  auth(),
  validateRequest(UserValidation.changePasswordValidation),
  userController.changePasswordController
);

route.get(
  "/:id",
  auth(Role.ADMIN),
  userController.getSingleUserController
);

route.patch(
  "/:id",
  auth(Role.ADMIN),
  userController.updateUserByAdminController
);

route.put(
  "/me",
  auth(),
  fileUploader.uploadProfileImage,
  parseBodyMiddleware,
  userController.updateUserController
);

route.delete(
  "/:id",
  auth(Role.ADMIN,Role.SUPER_ADMIN),
  userController.deleteUserController
);



export const userRoutes = route;
