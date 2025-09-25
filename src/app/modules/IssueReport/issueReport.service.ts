import { IssueReport } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors"

const createIssueReport = async (payload: IssueReport) => {
  const issueReport = await prisma.issueReport.create({
    data: payload,
    include: {
      issueType: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
  return issueReport;
};

const getAllIssueReports = async (query: any) => {
  const { page = 1, limit = 10, status, userId, issueTypeId } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const whereConditions: any = {};

  // Add filters
  if (status) {
    whereConditions.status = status;
  }
  if (userId) {
    whereConditions.userId = userId;
  }
  if (issueTypeId) {
    whereConditions.issueTypeId = issueTypeId;
  }

  const totalCount = await prisma.issueReport.count({
    where: whereConditions,
  });

  const issueReports = await prisma.issueReport.findMany({
    where: whereConditions,
    skip,
    take,
    include: {
      issueType: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
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
    data: issueReports,
  };
};

const getSingleIssueReport = async (id: string) => {
  const issueReport = await prisma.issueReport.findUnique({
    where: {
      id,
    },
    include: {
      issueType: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  if (!issueReport) {
    throw new ApiError(404, "IssueReport not found");
  }

  return issueReport;
};

const updateIssueReport = async (id: string, payload: Partial<IssueReport>) => {
  // First check if the record exists
  const existingIssueReport = await prisma.issueReport.findUnique({
    where: {
      id,
    },
  });

  if (!existingIssueReport) {
    throw new ApiError(404, "IssueReport not found");
  }

  const issueReport = await prisma.issueReport.update({
    where: {
      id,
    },
    data: payload,
    include: {
      issueType: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return issueReport;
};

const deleteIssueReport = async (id: string) => {
  const issueReport = await prisma.issueReport.findUnique({
    where: {
      id,
    },
  });

  if (!issueReport) {
    throw new ApiError(404, "IssueReport not found");
  }

  await prisma.issueReport.delete({
    where: {
      id,
    },
  });

  return issueReport;
};

export const IssueReportServices = {
  createIssueReport,
  getAllIssueReports,
  getSingleIssueReport,
  updateIssueReport,
  deleteIssueReport,
};