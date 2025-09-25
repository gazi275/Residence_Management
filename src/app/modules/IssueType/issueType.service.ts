import { IssueType } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors"

const createIssueType = async (payload: IssueType) => {
  const issueType = await prisma.issueType.create({
    data: payload,
  });
  return issueType;
};

const getAllIssueTypes = async (query: any) => {
  const { page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const whereConditions: any = {};

  const totalCount = await prisma.issueType.count({
    where: whereConditions,
  });

  const issueTypes = await prisma.issueType.findMany({
    where: whereConditions,
    skip,
    take,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      issueReports: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          assignedUser: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      totalCount,
      totalPages: Math.ceil(totalCount / Number(limit)),
    },
    data: issueTypes,
  };
};

const getSingleIssueType = async (id: string) => {
  const issueType = await prisma.issueType.findUnique({
    where: {
      id,
    },
    include: {
      issueReports: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          assignedUser: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!issueType) {
    throw new ApiError(400, "IssueType not found");
  }

  return issueType;
};

const updateIssueType = async (id: string, payload: Partial<IssueType>) => {
  // First check if the record exists
  const existingIssueType = await prisma.issueType.findUnique({
    where: {
      id,
    },
  });

  if (!existingIssueType) {
    throw new ApiError(404, "IssueType not found");
  }

  // Only update fields that are provided in payload
  const issueType = await prisma.issueType.update({
    where: {
      id,
    },
    data: payload,
  });

  return issueType;
};

const deleteIssueType = async (id: string) => {
  const issueType = await prisma.issueType.findUnique({
    where: {
      id,
    },
  });

  if (!issueType) {
    throw new ApiError(404, "IssueType not found");
  }

  await prisma.issueType.delete({
    where: {
      id,
    },
  });

  return issueType;
};

export const IssueTypeServices = {
  createIssueType,
  getAllIssueTypes,
  getSingleIssueType,
  updateIssueType,
  deleteIssueType,
};