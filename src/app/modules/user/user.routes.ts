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
  validateRequest(UserValidation.createValidation),
  userController.createUserController
);

route.put(
  "/change-password",
  auth(Role.USER || Role.ADMIN),
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
route.get("/me", auth(), userController.getMyProfileController);

export const userRoutes = route;
