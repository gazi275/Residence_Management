import { User } from "@prisma/client";
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { compare, hash } from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { OTPFn } from "../../helper/OTPFn";
import OTPVerify from "../../helper/OTPVerify";
import { getImageUrl } from "../../helper/uploadFile";
import { prisma } from "../../../utils/prisma";
import { jwtHelpers } from "../../helper/jwtHelper";

const createUserIntoDB = async (payload: User) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (findUser && findUser?.isVerified) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User already exists");
  }
  if (findUser && !findUser?.isVerified) {
    await OTPFn(payload.email);
    return;
  }

  const newPass = await hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: newPass,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  OTPFn(payload.email);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const changePasswordIntoDB = async (id: string, payload: any) => {
  const findUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  const comparePassword = await compare(payload.oldPassword, findUser.password);
  if (!comparePassword) {
    throw new ApiError(
      StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      "Invalid password"
    );
  }

  const hashedPassword = await hash(payload.newPassword, 10);
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  });
  return result;
};

const updateUserIntoDB = async (id: string, payload: any, image?: any) => {
    // Initialize userImage variable
    let userImage;

    // Check if an image is provided and get the URL if true
    if (image) {
        userImage = await getImageUrl(image);
    }

    // Find the existing user from the database
    const findUser = await prisma.user.findUnique({
        where: { id },
    });

    // If the user is not found, throw an error
    if (!findUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    // Prepare the data for the update, ensuring we only update fields that are provided
    const updateData: any = { ...payload };

    // Only set the image if a new one was uploaded
    if (userImage) {
        updateData.image = userImage;
    }

    // Update the user in the database with the provided data
    const result = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return result;
};


const getMyProfile = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserByAdminIntoDB = async (id: string, payload: any, image: any) => {
  const userImage = await getImageUrl(image);

  const findUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...payload,
      image: userImage ?? undefined,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const findUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

export const userServices = {
  createUserIntoDB,
  updateUserIntoDB,
  changePasswordIntoDB,
  getMyProfile,
  getSingleUserFromDB,
  updateUserByAdminIntoDB,
  getAllUserFromDB,
  deleteUserFromDB,
};
