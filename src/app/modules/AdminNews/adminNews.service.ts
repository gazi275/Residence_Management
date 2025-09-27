import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors"

interface AdminNewsPayload {
  title: string;
  content: string;
  image?: string | null;
  video?: string | null;
  thumbnail?: string | null;
}

const createNews = async (payload: AdminNewsPayload) => {
  try {
    const news = await prisma.adminNews.create({
      data: payload,
    });
    return news;
  } catch (error) {
    console.error("Error creating admin news:", error);
    throw new ApiError(500, "Failed to create news");
  }
};

const getAllAdminNewss = async (query: any) => {
  const { page = 1, limit = 10, search } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const whereConditions: any = {};

  // Add search functionality
  if (search) {
    whereConditions.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }

  try {
    const totalCount = await prisma.adminNews.count({
      where: whereConditions,
    });

    const adminNewss = await prisma.adminNews.findMany({
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
      data: adminNewss,
    };
  } catch (error) {
    console.error("Error fetching admin news:", error);
    throw new ApiError(500, "Failed to fetch admin news");
  }
};

const getSingleAdminNews = async (id: string) => {
  try {
    const adminNews = await prisma.adminNews.findUnique({
      where: {
        id,
      },
    });

    if (!adminNews) {
      throw new ApiError(404, "Admin News not found");
    }

    return adminNews;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error("Error fetching single admin news:", error);
    throw new ApiError(500, "Failed to fetch admin news");
  }
};

const updateAdminNews = async (id: string, payload: Partial<AdminNewsPayload>) => {
  try {
    // First check if the record exists
    const existingNews = await prisma.adminNews.findUnique({
      where: { id },
    });

    if (!existingNews) {
      throw new ApiError(404, "Admin News not found");
    }

    const adminNews = await prisma.adminNews.update({
      where: {
        id,
      },
      data: payload,
    });

    return adminNews;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error("Error updating admin news:", error);
    throw new ApiError(500, "Failed to update admin news");
  }
};

const deleteAdminNews = async (id: string) => {
  try {
    const adminNews = await prisma.adminNews.findUnique({
      where: {
        id,
      },
    });

    if (!adminNews) {
      throw new ApiError(404, "Admin News not found");
    }

    await prisma.adminNews.delete({
      where: {
        id,
      },
    });

    return adminNews;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error("Error deleting admin news:", error);
    throw new ApiError(500, "Failed to delete admin news");
  }
};

export const AdminNewsServices = {
  createNews,
  getAllAdminNewss,
  getSingleAdminNews,
  updateAdminNews,
  deleteAdminNews,
};