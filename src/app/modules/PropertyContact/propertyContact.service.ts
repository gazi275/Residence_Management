import { PropertyContact } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors"

const createPropertyContact = async (payload: PropertyContact) => {
  const propertyContact = await prisma.propertyContact.create({
    data: payload,
  });
  return propertyContact;
};

const getAllPropertyContacts = async (query: any) => {
  const { page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const whereConditions: any = {};

  const totalCount = await prisma.propertyContact.count({
    where: whereConditions,
  });

  const propertyContacts = await prisma.propertyContact.findMany({
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
    data: propertyContacts,
  };
};

const getSinglePropertyContact = async (id: string) => {
  const propertyContact = await prisma.propertyContact.findUnique({
    where: {
      id,
    },
  });

  if (!propertyContact) {
    throw new ApiError(400, "PropertyContact not found");
  }

  return propertyContact;
};

const updatePropertyContact = async (id: string, payload: Partial<PropertyContact>) => {
  const propertyContact = await prisma.propertyContact.update({
    where: {
      id,
    },
    data: payload,
  });

  return propertyContact;
};

const deletePropertyContact = async (id: string) => {
  const propertyContact = await prisma.propertyContact.findUnique({
    where: {
      id,
    },
  });

  if (!propertyContact) {
    throw new ApiError(400, "PropertyContact not found");
  }

  await prisma.propertyContact.delete({
    where: {
      id,
    },
  });

  return propertyContact;
};

export const PropertyContactServices = {
  createPropertyContact,
  getAllPropertyContacts,
  getSinglePropertyContact,
  updatePropertyContact,
  deletePropertyContact,
};