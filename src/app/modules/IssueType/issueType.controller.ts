import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { IssueTypeServices } from "./issueType.service"

const createIssueType = catchAsync(async (req, res) => {
  const issueType = await IssueTypeServices.createIssueType(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "IssueType created successfully",
    data: issueType,
  })
})

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
  const issueType = await IssueTypeServices.updateIssueType(req.params.id, req.body)

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
}
