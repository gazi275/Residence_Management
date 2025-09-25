import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { EmergencyContactServices } from "./emergencyContact.service"

const createEmergencyContact = catchAsync(async (req, res) => {
  const emergencyContact = await EmergencyContactServices.createEmergencyContact(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "EmergencyContact created successfully",
    data: emergencyContact,
  })
})

const getAllEmergencyContacts = catchAsync(async (req, res) => {
  const emergencyContacts = await EmergencyContactServices.getAllEmergencyContacts(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "EmergencyContacts retrieved successfully",
    data: emergencyContacts,
  })
})

const getSingleEmergencyContact = catchAsync(async (req, res) => {
  const emergencyContact = await EmergencyContactServices.getSingleEmergencyContact(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "EmergencyContact retrieved successfully",
    data: emergencyContact,
  })
})

const updateEmergencyContact = catchAsync(async (req, res) => {
  const emergencyContact = await EmergencyContactServices.updateEmergencyContact(req.params.id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "EmergencyContact updated successfully",
    data: emergencyContact,
  })
})

const deleteEmergencyContact = catchAsync(async (req, res) => {
  const emergencyContact = await EmergencyContactServices.deleteEmergencyContact(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "EmergencyContact deleted successfully",
    data: emergencyContact,
  })
})

export const EmergencyContactControllers = {
  createEmergencyContact,
  getAllEmergencyContacts,
  getSingleEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
}
