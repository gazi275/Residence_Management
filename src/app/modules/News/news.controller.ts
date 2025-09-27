import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { NewsServices } from "./news.service"
import { getFileUrl } from "../../helper/uploadFile"

const createNews = catchAsync(async (req, res) => {
  let image = null;
  let video = null;
  let thumbnail = null;

  // Handle file uploads
  if (req.files && typeof req.files === 'object') {
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };
    
    // Handle image upload
    if (files.image && files.image[0]) {
      image = await getFileUrl(files.image[0]);
    }
    
    // Handle video upload
    if (files.video && files.video[0]) {
      video = await getFileUrl(files.video[0]);
    }

    // Handle thumbnail upload
    if (files.thumbnail && files.thumbnail[0]) {
      thumbnail = await getFileUrl(files.thumbnail[0]);
    }
  }

  const newsData = {
    ...req.body,
    image,
    video,
    thumbnail
  };

  const news = await NewsServices.createNews(newsData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "News created successfully",
    data: news,
  });
});

const getAllNewss = catchAsync(async (req, res) => {
  // Get user ID from authenticated user
  const userId = req.user?.id;
  
  if (!userId) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "User not authenticated",
    });
  }

  const newss = await NewsServices.getAllNewss(userId, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News retrieved successfully",
    data: newss,
  });
});

const getSingleNews = catchAsync(async (req, res) => {
  // For regular users, check access. For admin/manager, skip access check
  const userId = req.user?.role === 'USER' || req.user?.role === 'CARETAKER' 
    ? req.user?.id 
    : undefined;

  const news = await NewsServices.getSingleNews(req.params.id, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News retrieved successfully",
    data: news,
  });
});

const updateNews = catchAsync(async (req, res) => {
  let updateData = { ...req.body };

  // Handle file uploads for update
  if (req.files && typeof req.files === 'object') {
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };
    
    // Handle image update
    if (files.image && files.image[0]) {
      updateData.image = await getFileUrl(files.image[0]);
    }
    
    // Handle video update
    if (files.video && files.video[0]) {
      updateData.video = await getFileUrl(files.video[0]);
    }

    // Handle thumbnail update
    if (files.thumbnail && files.thumbnail[0]) {
      updateData.thumbnail = await getFileUrl(files.thumbnail[0]);
    }
  }

  // Remove any undefined or empty values
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === undefined || updateData[key] === '') {
      delete updateData[key];
    }
  });

  const news = await NewsServices.updateNews(req.params.id, updateData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News updated successfully",
    data: news,
  });
});

const deleteNews = catchAsync(async (req, res) => {
  const news = await NewsServices.deleteNews(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News deleted successfully",
    data: news,
  });
});

// Get news by residence (for admin/manager)
const getNewsByResidence = catchAsync(async (req, res) => {
  const { residenceId } = req.params;
  const newss = await NewsServices.getNewsByResidence(residenceId, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Residence news retrieved successfully",
    data: newss,
  });
});

export const NewsControllers = {
  createNews,
  getAllNewss,
  getSingleNews,
  updateNews,
  deleteNews,
  getNewsByResidence,
};