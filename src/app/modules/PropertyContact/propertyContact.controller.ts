import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { PropertyContactServices } from "./propertyContact.service"

const createPropertyContact = catchAsync(async (req, res) => {
  const propertyContact = await PropertyContactServices.createPropertyContact(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "PropertyContact created successfully",
    data: propertyContact,
  })
})

const getAllPropertyContacts = catchAsync(async (req, res) => {
  const propertyContacts = await PropertyContactServices.getAllPropertyContacts(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "PropertyContacts retrieved successfully",
    data: propertyContacts,
  })
})

const getSinglePropertyContact = catchAsync(async (req, res) => {
  const propertyContact = await PropertyContactServices.getSinglePropertyContact(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "PropertyContact retrieved successfully",
    data: propertyContact,
  })
})

const updatePropertyContact = catchAsync(async (req, res) => {
  const propertyContact = await PropertyContactServices.updatePropertyContact(req.params.id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "PropertyContact updated successfully",
    data: propertyContact,
  })
})

const deletePropertyContact = catchAsync(async (req, res) => {
  const propertyContact = await PropertyContactServices.deletePropertyContact(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "PropertyContact deleted successfully",
    data: propertyContact,
  })
})

export const PropertyContactControllers = {
  createPropertyContact,
  getAllPropertyContacts,
  getSinglePropertyContact,
  updatePropertyContact,
  deletePropertyContact,
}
