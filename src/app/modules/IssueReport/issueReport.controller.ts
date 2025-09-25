import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { IssueReportServices } from "./issueReport.service"
import { getImageUrls } from "../../helper/uploadFile"

const createIssueReport = catchAsync(async (req, res) => {
  const userId = req.user.id;
  let imageUrls: string[] = [];

  // Handle multiple image uploads
  if (req?.files && Array.isArray(req.files) && req.files.length > 0) {
    const images = req.files as Array<Express.MulterS3.File>;
    imageUrls = await getImageUrls(images);
  }

  const issueReport = await IssueReportServices.createIssueReport({
    ...req.body,
    userId,
    images: imageUrls
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "IssueReport created successfully",
    data: issueReport,
  });
});

const getAllIssueReports = catchAsync(async (req, res) => {
  const issueReports = await IssueReportServices.getAllIssueReports(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "IssueReports retrieved successfully",
    data: issueReports,
  });
});

const getSingleIssueReport = catchAsync(async (req, res) => {
  const issueReport = await IssueReportServices.getSingleIssueReport(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "IssueReport retrieved successfully",
    data: issueReport,
  });
});

const updateIssueReport = catchAsync(async (req, res) => {
  let updateData = { ...req.body };

  // Handle new image uploads if provided
  if (req?.files && Array.isArray(req.files) && req.files.length > 0) {
    const images = req.files as Array<Express.MulterS3.File>;
    const imageUrls = await getImageUrls(images);
    updateData.images = imageUrls;
  }

  // Remove any undefined or empty values
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === undefined || updateData[key] === '') {
      delete updateData[key];
    }
  });

  const issueReport = await IssueReportServices.updateIssueReport(req.params.id, updateData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "IssueReport updated successfully",
    data: issueReport,
  });
});

const deleteIssueReport = catchAsync(async (req, res) => {
  const issueReport = await IssueReportServices.deleteIssueReport(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "IssueReport deleted successfully",
    data: issueReport,
  });
});

export const IssueReportControllers = {
  createIssueReport,
  getAllIssueReports,
  getSingleIssueReport,
  updateIssueReport,
  deleteIssueReport,
};