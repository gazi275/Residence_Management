import catchAsync from "../../../shared/catchAsync"
import { getImageUrl } from "../../helper/uploadFile"
import sendResponse from "../../middleware/sendResponse"
import { IssueTypeServices } from "./issueType.service"

const createIssueType = catchAsync(async (req, res) => {
  let image = null;
  
  // Check if file exists before processing
  if (req?.file) {
    const imageUrl = req.file as Express.MulterS3.File;
    image = await getImageUrl(imageUrl);
  }

  const issueType = await IssueTypeServices.createIssueType({
    ...req.body,
    image
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "IssueType created successfully",
    data: issueType,
  });
});

const getAllIssueTypes = catchAsync(async (req, res) => {
  const issueTypes = await IssueTypeServices.getAllIssueTypes(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "IssueTypes retrieved successfully",
    data: issueTypes,
  })
})

const getSingleIssueType = catchAsync(async (req, res) => {
  const issueType = await IssueTypeServices.getSingleIssueType(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "IssueType retrieved successfully",
    data: issueType,
  })
})

const updateIssueType = catchAsync(async (req, res) => {
  let updateData = { ...req.body };
  
  // Check if new image is uploaded
  if (req?.file) {
    const imageUrl = req.file as Express.MulterS3.File;
    const image = await getImageUrl(imageUrl);
    updateData.image = image;
  }
  
  // Remove any undefined or empty values to avoid overwriting existing data
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === undefined || updateData[key] === '') {
      delete updateData[key];
    }
  });

  const issueType = await IssueTypeServices.updateIssueType(req.params.id, updateData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "IssueType updated successfully",
    data: issueType,
  })
})

const deleteIssueType = catchAsync(async (req, res) => {
  const issueType = await IssueTypeServices.deleteIssueType(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "IssueType deleted successfully",
    data: issueType,
  })
})

export const IssueTypeControllers = {
  createIssueType,
  getAllIssueTypes,
  getSingleIssueType,
  updateIssueType,
  deleteIssueType,
};