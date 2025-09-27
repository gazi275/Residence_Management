import { News, JoinStatus } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors"

const createNews = async (payload: News) => {
  // Verify that residence exists
  const residence = await prisma.residences.findUnique({
    where: { id: payload.residenceId },
  });

  if (!residence) {
    throw new ApiError(404, "Residence not found");
  }

  const news = await prisma.news.create({
    data: payload,
    include: {
      residence: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  });
  return news;
};

const getAllNewss = async (userId: string, query: any) => {
  const { page = 1, limit = 10, search } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  // First, get user's approved residences
  const userResidences = await prisma.residenceUser.findMany({
    where: {
      userId: userId,
      joinStatus: JoinStatus.APPROVED,
    },
    select: {
      residenceId: true,
    },
  });

  // If user has no approved residences, return empty result
  if (userResidences.length === 0) {
    return {
      meta: {
        page: Number(page),
        limit: Number(limit),
        totalCount: 0,
        totalPages: 0,
      },
      data: [],
    };
  }

  // Extract residence IDs
  const residenceIds = userResidences.map(ur => ur.residenceId);

  const whereConditions: any = {
    residenceId: {
      in: residenceIds,
    },
  };

  // Add search functionality
  if (search) {
    whereConditions.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }

  const totalCount = await prisma.news.count({
    where: whereConditions,
  });

  const newss = await prisma.news.findMany({
    where: whereConditions,
    skip,
    take,
    include: {
      residence: {
        select: {
          id: true,
          name: true,
          code: true,
          logo: true,
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
    data: newss,
  };
};

const getSingleNews = async (id: string, userId?: string) => {
  const news = await prisma.news.findUnique({
    where: {
      id,
    },
    include: {
      residence: {
        select: {
          id: true,
          name: true,
          code: true,
          logo: true,
        },
      },
    },
  });

  if (!news) {
    throw new ApiError(404, "News not found");
  }

  // If userId is provided, check if user has access to this news
  if (userId) {
    const userHasAccess = await prisma.residenceUser.findFirst({
      where: {
        userId: userId,
        residenceId: news.residenceId,
        joinStatus: JoinStatus.APPROVED,
      },
    });

    if (!userHasAccess) {
      throw new ApiError(403, "You don't have access to this news");
    }
  }

  return news;
};

const updateNews = async (id: string, payload: Partial<News>) => {
  // Check if news exists
  const existingNews = await prisma.news.findUnique({
    where: { id },
  });

  if (!existingNews) {
    throw new ApiError(404, "News not found");
  }

  // If residenceId is being updated, verify new residence exists
  if (payload.residenceId && payload.residenceId !== existingNews.residenceId) {
    const residence = await prisma.residences.findUnique({
      where: { id: payload.residenceId },
    });

    if (!residence) {
      throw new ApiError(404, "Residence not found");
    }
  }

  const news = await prisma.news.update({
    where: {
      id,
    },
    data: payload,
    include: {
      residence: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
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
    throw new ApiError(404, "News not found");
  }

  await prisma.news.delete({
    where: {
      id,
    },
  });

  return news;
};

// Get news by residence ID (for admin/manager use)
const getNewsByResidence = async (residenceId: string, query: any) => {
  const { page = 1, limit = 10, search } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  // Verify residence exists
  const residence = await prisma.residences.findUnique({
    where: { id: residenceId },
  });

  if (!residence) {
    throw new ApiError(404, "Residence not found");
  }

  const whereConditions: any = {
    residenceId: residenceId,
  };

  // Add search functionality
  if (search) {
    whereConditions.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }

  const totalCount = await prisma.news.count({
    where: whereConditions,
  });

  const newss = await prisma.news.findMany({
    where: whereConditions,
    skip,
    take,
    include: {
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
    data: newss,
  };
};

export const NewsServices = {
  createNews,
  getAllNewss,
  getSingleNews,
  updateNews,
  deleteNews,
  getNewsByResidence,
};