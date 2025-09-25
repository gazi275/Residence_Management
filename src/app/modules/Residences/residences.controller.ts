import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { ResidencesServices } from "./residences.service"

const createResidences = catchAsync(async (req, res) => {
  const residences = await ResidencesServices.createResidences(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Residences created successfully",
    data: residences,
  })
})

const getAllResidencess = catchAsync(async (req, res) => {
  const residencess = await ResidencesServices.getAllResidencess(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Residencess retrieved successfully",
    data: residencess,
  })
})

const getSingleResidences = catchAsync(async (req, res) => {
  const residences = await ResidencesServices.getSingleResidences(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Residences retrieved successfully",
    data: residences,
  })
})

const updateResidences = catchAsync(async (req, res) => {
  const residences = await ResidencesServices.updateResidences(req.params.id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Residences updated successfully",
    data: residences,
  })
})

const deleteResidences = catchAsync(async (req, res) => {
  const residences = await ResidencesServices.deleteResidences(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Residences deleted successfully",
    data: residences,
  })
})

export const ResidencesControllers = {
  createResidences,
  getAllResidencess,
  getSingleResidences,
  updateResidences,
  deleteResidences,
}
