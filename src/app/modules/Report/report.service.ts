import { Report } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors"

const createReport = async (payload: Report) => {
  const report = await prisma.report.create({
    data: payload,
  });
  return report;
};

const getAllReports = async (query: any) => {
  const { page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const whereConditions: any = {};

  const totalCount = await prisma.report.count({
    where: whereConditions,
  });

  const reports = await prisma.report.findMany({
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
    data: reports,
  };
};

const getSingleReport = async (id: string) => {
  const report = await prisma.report.findUnique({
    where: {
      id,
    },
  });

  if (!report) {
    throw new ApiError(400, "Report not found");
  }

  return report;
};

const updateReport = async (id: string, payload: Partial<Report>) => {
  const report = await prisma.report.update({
    where: {
      id,
    },
    data: payload,
  });

  return report;
};

const deleteReport = async (id: string) => {
  const report = await prisma.report.findUnique({
    where: {
      id,
    },
  });

  if (!report) {
    throw new ApiError(400, "Report not found");
  }

  await prisma.report.delete({
    where: {
      id,
    },
  });

  return report;
};

export const ReportServices = {
  createReport,
  getAllReports,
  getSingleReport,
  updateReport,
  deleteReport,
};