import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { ReportServices } from "./report.service"

const createReport = catchAsync(async (req, res) => {
  const report = await ReportServices.createReport(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Report created successfully",
    data: report,
  })
})

const getAllReports = catchAsync(async (req, res) => {
  const reports = await ReportServices.getAllReports(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reports retrieved successfully",
    data: reports,
  })
})

const getSingleReport = catchAsync(async (req, res) => {
  const report = await ReportServices.getSingleReport(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Report retrieved successfully",
    data: report,
  })
})

const updateReport = catchAsync(async (req, res) => {
  const report = await ReportServices.updateReport(req.params.id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Report updated successfully",
    data: report,
  })
})

const deleteReport = catchAsync(async (req, res) => {
  const report = await ReportServices.deleteReport(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Report deleted successfully",
    data: report,
  })
})

export const ReportControllers = {
  createReport,
  getAllReports,
  getSingleReport,
  updateReport,
  deleteReport,
}
