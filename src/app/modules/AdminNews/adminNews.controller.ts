import catchAsync from "../../../shared/catchAsync"
import { getFileUrl } from "../../helper/uploadFile";
import sendResponse from "../../middleware/sendResponse"
import { AdminNewsServices } from "./adminNews.service"

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

  // Remove undefined values
  Object.keys(newsData).forEach(key => {
    if (newsData[key] === undefined || newsData[key] === '') {
      delete newsData[key];
    }
  });

  const news = await AdminNewsServices.createNews(newsData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "News created successfully",
    data: news,
  });
});

const getAllAdminNewss = catchAsync(async (req, res) => {
  const adminNewss = await AdminNewsServices.getAllAdminNewss(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin News retrieved successfully",
    data: adminNewss,
  })
})

const getSingleAdminNews = catchAsync(async (req, res) => {
  const adminNews = await AdminNewsServices.getSingleAdminNews(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin News retrieved successfully",
    data: adminNews,
  })
})

const updateAdminNews = catchAsync(async (req, res) => {
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

  const adminNews = await AdminNewsServices.updateAdminNews(req.params.id, updateData)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin News updated successfully",
    data: adminNews,
  })
})

const deleteAdminNews = catchAsync(async (req, res) => {
  const adminNews = await AdminNewsServices.deleteAdminNews(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin News deleted successfully",
    data: adminNews,
  })
})

export const AdminNewsControllers = {
  createNews,
  getAllAdminNewss,
  getSingleAdminNews,
  updateAdminNews,
  deleteAdminNews,
};