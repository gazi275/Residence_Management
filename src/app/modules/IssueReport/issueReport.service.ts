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
      assignedUser: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
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

const getSingleIssueReport = async (id: string, userId: string) => {
  // Step 1: Find the issue report with related data
  const issueReport = await prisma.issueReport.findUnique({
    where: { id },
    include: {
      issueType: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          residenceUsers: {
            where: { joinStatus: "APPROVED" },
            include: {
              residence: {
                select: {
                  id: true,
                  name: true,
                  city: true,
                  state: true,
                  type: true,
                  userId: true,
                  // to identify creator
                },
              },
            },
          },
        },
      },
      assignedUser: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
        },
      },
    },
  });

  if (!issueReport) {
    throw new ApiError(404, "Issue report not found");
  }

  // Step 2: Access check
  const isOwner = issueReport.userId === userId;

  // Residence creator check
  const residenceUser = issueReport.user.residenceUsers[0];
  const residenceCreatorId = residenceUser?.residence?.userId;
  const isResidenceCreator = residenceCreatorId === userId;

  if (!isOwner && !isResidenceCreator) {
    throw new ApiError(403, "You are not authorized to view this issue report");
  }

  // Step 3: Build timeline (same style as getSingleIssueType)
  const timeline = [];

  // Always include creation
  timeline.push({
    status: "PENDING",
    date: issueReport.createdAt,
    label: "Reported",
  });

  // If assigned
  if (issueReport.assignedTo && issueReport.status !== "PENDING") {
    timeline.push({
      status: "ASSIGNED",
      date: issueReport.updatedAt,
      label: "Assigned",
    });
  }

  // In progress
  if (issueReport.status === "IN_PROGRESS") {
    timeline.push({
      status: "IN_PROGRESS",
      date: issueReport.updatedAt,
      label: "In Progress",
    });
  }

  // Completed / Resolved
  if (issueReport.status === "RESOLVED") {
    timeline.push({
      status: "RESOLVED",
      date: issueReport.updatedAt,
      label: "Completed",
    });
  }

  // Rejected
  if (issueReport.status === "REJECTED") {
    timeline.push({
      status: "REJECTED",
      date: issueReport.updatedAt,
      label: "Rejected",
    });
  }

  // Step 4: Return data with timeline
  return {
    ...issueReport,
    timeline,
  };
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