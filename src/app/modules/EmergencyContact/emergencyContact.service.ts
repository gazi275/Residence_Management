import { EmergencyContact } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors"

const createEmergencyContact = async (payload: EmergencyContact) => {
  const emergencyContact = await prisma.emergencyContact.create({
    data: payload,
  });
  return emergencyContact;
};

const getAllEmergencyContacts = async (query: any) => {
  const { page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const whereConditions: any = {};

  const totalCount = await prisma.emergencyContact.count({
    where: whereConditions,
  });

  const emergencyContacts = await prisma.emergencyContact.findMany({
    where: whereConditions,
    skip,
    take,
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      totalCount,
      totalPages: Math.ceil(totalCount / Number(limit)),
    },
    data: emergencyContacts,
  };
};

const getSingleEmergencyContact = async (id: string) => {
  const emergencyContact = await prisma.emergencyContact.findUnique({
    where: {
      id,
    },
  });

  if (!emergencyContact) {
    throw new ApiError(400, "EmergencyContact not found");
  }

  return emergencyContact;
};

const updateEmergencyContact = async (id: string, payload: Partial<EmergencyContact>) => {
  const emergencyContact = await prisma.emergencyContact.update({
    where: {
      id,
    },
    data: payload,
  });

  return emergencyContact;
};

const deleteEmergencyContact = async (id: string) => {
  const emergencyContact = await prisma.emergencyContact.findUnique({
    where: {
      id,
    },
  });

  if (!emergencyContact) {
    throw new ApiError(400, "EmergencyContact not found");
  }

  await prisma.emergencyContact.delete({
    where: {
      id,
    },
  });

  return emergencyContact;
};

export const EmergencyContactServices = {
  createEmergencyContact,
  getAllEmergencyContacts,
  getSingleEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
};