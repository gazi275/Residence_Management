import { IssueReport } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors"

const createIssueReport = async (payload: IssueReport) => {
  const issueReport = await prisma.issueReport.create({
    data: payload,
  });
  return issueReport;
};

const getAllIssueReports = async (query: any) => {
  const { page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const whereConditions: any = {};

  const totalCount = await prisma.issueReport.count({
    where: whereConditions,
  });

  const issueReports = await prisma.issueReport.findMany({
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
    data: issueReports,
  };
};

const getSingleIssueReport = async (id: string) => {
  const issueReport = await prisma.issueReport.findUnique({
    where: {
      id,
    },
  });

  if (!issueReport) {
    throw new ApiError(400, "IssueReport not found");
  }

  return issueReport;
};

const updateIssueReport = async (id: string, payload: Partial<IssueReport>) => {
  const issueReport = await prisma.issueReport.update({
    where: {
      id,
    },
    data: payload,
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
    throw new ApiError(400, "IssueReport not found");
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