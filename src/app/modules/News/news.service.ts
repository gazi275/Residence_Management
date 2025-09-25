import { News } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors"

const createNews = async (payload: News) => {
  const news = await prisma.news.create({
    data: payload,
  });
  return news;
};

const getAllNewss = async (query: any) => {
  const { page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const whereConditions: any = {};

  const totalCount = await prisma.news.count({
    where: whereConditions,
  });

  const newss = await prisma.news.findMany({
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
    data: newss,
  };
};

const getSingleNews = async (id: string) => {
  const news = await prisma.news.findUnique({
    where: {
      id,
    },
  });

  if (!news) {
    throw new ApiError(400, "News not found");
  }

  return news;
};

const updateNews = async (id: string, payload: Partial<News>) => {
  const news = await prisma.news.update({
    where: {
      id,
    },
    data: payload,
  });

  return news;
};

const deleteNews = async (id: string) => {
  const news = await prisma.news.findUnique({
    where: {
      id,
    },
  });

  if (!news) {
    throw new ApiError(400, "News not found");
  }

  await prisma.news.delete({
    where: {
      id,
    },
  });

  return news;
};

export const NewsServices = {
  createNews,
  getAllNewss,
  getSingleNews,
  updateNews,
  deleteNews,
};