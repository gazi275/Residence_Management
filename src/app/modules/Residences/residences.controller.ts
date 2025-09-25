import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { ResidencesServices } from "./residences.service"
import { getFileUrl, getFileUrls } from "../../helper/uploadFile"

const createResidences = catchAsync(async (req, res) => {
  let logo = null;
  let documents: string[] = [];

  // Handle file uploads
  if (req.files && typeof req.files === 'object') {
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };
    
    // Handle logo upload
    if (files.logo && files.logo[0]) {
      logo = await getFileUrl(files.logo[0]);
    }
    
    // Handle documents upload
    if (files.documents && files.documents.length > 0) {
      documents = await getFileUrls(files.documents);
    }
  }

  const residences = await ResidencesServices.createResidences({
    ...req.body,
    logo,
    documents
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Residences created successfully",
    data: residences,
  });
});

const getAllResidencess = catchAsync(async (req, res) => {
  const residencess = await ResidencesServices.getAllResidencess(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Residences retrieved successfully",
    data: residencess,
  });
});

const getSingleResidences = catchAsync(async (req, res) => {
  const residences = await ResidencesServices.getSingleResidences(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Residences retrieved successfully",
    data: residences,
  });
});

const updateResidences = catchAsync(async (req, res) => {
  let updateData = { ...req.body };

  // Handle file uploads for update
  if (req.files && typeof req.files === 'object') {
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };
    
    // Handle logo update
    if (files.logo && files.logo[0]) {
      updateData.logo = await getFileUrl(files.logo[0]);
    }
    
    // Handle documents update
    if (files.documents && files.documents.length > 0) {
      updateData.documents = await getFileUrls(files.documents);
    }
  }

  // Remove any undefined or empty values
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === undefined || updateData[key] === '') {
      delete updateData[key];
    }
  });

  const residences = await ResidencesServices.updateResidences(req.params.id, updateData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Residences updated successfully",
    data: residences,
  });
});

const deleteResidences = catchAsync(async (req, res) => {
  const residences = await ResidencesServices.deleteResidences(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Residences deleted successfully",
    data: residences,
  });
});

export const ResidencesControllers = {
  createResidences,
  getAllResidencess,
  getSingleResidences,
  updateResidences,
  deleteResidences,
};