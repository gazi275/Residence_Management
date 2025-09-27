import { JoinStatus, Residences } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors"

const createResidences = async (payload: Residences) => {
  // Check if code already exists
  if (payload.code) {
    const existingResidence = await prisma.residences.findFirst({
      where: {
        code: payload.code,
      },
    });

    if (existingResidence) {
      throw new ApiError(400, "Residence code already exists");
    }
  }

  const residences = await prisma.residences.create({
    data: payload,
  });
  return residences;
};

const getAllResidencess = async (query: any) => {
  const { 
    page = 1, 
    limit = 10, 
    search, 
    type, 
    city, 
    state, 
    country 
  } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const whereConditions: any = {};

  // Add search functionality
  if (search) {
    whereConditions.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { code: { contains: search, mode: 'insensitive' } },
      { city: { contains: search, mode: 'insensitive' } },
      { state: { contains: search, mode: 'insensitive' } },
      { street: { contains: search, mode: 'insensitive' } },
    ];
  }

  // Add filters
  if (type) {
    whereConditions.type = type;
  }
  if (city) {
    whereConditions.city = { contains: city, mode: 'insensitive' };
  }
  if (state) {
    whereConditions.state = { contains: state, mode: 'insensitive' };
  }
  if (country) {
    whereConditions.country = { contains: country, mode: 'insensitive' };
  }

  const totalCount = await prisma.residences.count({
    where: whereConditions,
  });

  const residencess = await prisma.residences.findMany({
    where: whereConditions,
    skip,
    take,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      totalCount,
      totalPages: Math.ceil(totalCount / Number(limit)),
    },
    data: residencess,
  };
};

const joinResidences = async (id: string,userId:string) => {
  const residences = await prisma.residences.findUnique({
    where: {
      id,
    },
  });
  if (!residences) {
    throw new ApiError(404, "Residences not found");
  }
  const user = await prisma.user.findUnique({
    where: {
      id:userId,
    },
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const residenceUser = await prisma.residenceUser.create({
    data: {
      userId: userId,
      residenceId: residences.id,
    },
  });

  return residenceUser;
};

const getSingleResidences = async (id: string) => {
  const residences = await prisma.residences.findUnique({
    where: {
      id,
    },
  });

  if (!residences) {
    throw new ApiError(404, "Residences not found");
  }

  return residences;
};

const updateResidences = async (id: string, payload: Partial<Residences>) => {
  // First check if the record exists
  const existingResidence = await prisma.residences.findUnique({
    where: {
      id,
    },
  });

  if (!existingResidence) {
    throw new ApiError(404, "Residences not found");
  }

  // Check if code is being updated and if it already exists
  if (payload.code && payload.code !== existingResidence.code) {
    const codeExists = await prisma.residences.findFirst({
      where: {
        code: payload.code,
        id: { not: id }, // Exclude current residence
      },
    });

    if (codeExists) {
      throw new ApiError(400, "Residence code already exists");
    }
  }

  const residences = await prisma.residences.update({
    where: {
      id,
    },
    data: payload,
  });

  return residences;
};

const deleteResidences = async (id: string) => {
  const residences = await prisma.residences.findUnique({
    where: {
      id,
    },
  });

  if (!residences) {
    throw new ApiError(404, "Residences not found");
  }

  await prisma.residences.delete({
    where: {
      id,
    },
  });

  return residences;
};

const getPendingUsers = async (residenceId: string, query: any) => {
  const { page = 1, limit = 10, search } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  // First check if residence exists
  const residence = await prisma.residences.findUnique({
    where: { id: residenceId },
  });

  if (!residence) {
    throw new ApiError(404, "Residence not found");
  }

  const whereConditions: any = {
    residenceId: residenceId,
    joinStatus: "PENDING",
  };

  // Add search functionality for user name or email
  if (search) {
    whereConditions.user = {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    };
  }

  const totalCount = await prisma.residenceUser.count({
    where: whereConditions,
  });

  const pendingUsers = await prisma.residenceUser.findMany({
    where: whereConditions,
    skip,
    take,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          status: true,
          createdAt: true,
        },
      },
      residence: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      totalCount,
      totalPages: Math.ceil(totalCount / Number(limit)),
    },
    data: pendingUsers,
  };
};

// Update ResidenceUser status
const updateResidenceUserStatus = async (
  residenceUserId: string,
  status: JoinStatus
) => {
  // Check if ResidenceUser exists
  const residenceUser = await prisma.residenceUser.findUnique({
    where: { id: residenceUserId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      residence: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!residenceUser) {
    throw new ApiError(404, "Residence user request not found");
  }

  // Update the status
  const updatedResidenceUser = await prisma.residenceUser.update({
    where: { id: residenceUserId },
    data: { joinStatus: status },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          status: true,
        },
      },
      residence: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  });

  // You can add notification logic here if needed
  // For example, notify the user about approval/rejection

  return updatedResidenceUser;
};

const getResidenceUsers = async (residenceId: string, query: any) => {
  const { 
    page = 1, 
    limit = 10, 
    search, 
    joinStatus 
  } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  // Check if residence exists
  const residence = await prisma.residences.findUnique({
    where: { id: residenceId },
  });

  if (!residence) {
    throw new ApiError(404, "Residence not found");
  }

  const whereConditions: any = {
    residenceId: residenceId,
    // Default to APPROVED users only
    joinStatus: joinStatus || JoinStatus.APPROVED,
  };

  // Add search functionality
  if (search) {
    whereConditions.user = {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    };
  }

  const totalCount = await prisma.residenceUser.count({
    where: whereConditions,
  });

  const residenceUsers = await prisma.residenceUser.findMany({
    where: whereConditions,
    skip,
    take,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          status: true,
          role: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      totalCount,
      totalPages: Math.ceil(totalCount / Number(limit)),
    },
    data: residenceUsers,
  };
};

export const ResidencesServices = {
  createResidences,
  getAllResidencess,
  getSingleResidences,
  getResidenceUsers,
  updateResidences,
  deleteResidences,
  joinResidences,
  getPendingUsers,
  updateResidenceUserStatus,
};