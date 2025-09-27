import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { AppointmentServices } from "./appointment.service"

const createAppointment = catchAsync(async (req, res) => {
  const userId = req.user.id

  const appointment = await AppointmentServices.createAppointment({...req.body, userId})

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Appointment created successfully",
    data: appointment,
  })
})

const getAllAppointments = catchAsync(async (req, res) => {
  const userId = req.user.id
  const appointments = await AppointmentServices.getAllAppointments(req.query, userId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Appointments retrieved successfully",
    data: appointments,
  })
})

const getSingleAppointment = catchAsync(async (req, res) => {
  const userId = req.user.id
  const appointment = await AppointmentServices.getSingleAppointment(req.params.id, userId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Appointment retrieved successfully",
    data: appointment,
  })
})

const updateAppointment = catchAsync(async (req, res) => {
  const userId = req.user.id
  const userRole = req.user.role
  const appointment = await AppointmentServices.updateAppointment(req.params.id, req.body, userId, userRole)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Appointment updated successfully",
    data: appointment,
  })
})

const deleteAppointment = catchAsync(async (req, res) => {
  const appointment = await AppointmentServices.deleteAppointment(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Appointment deleted successfully",
    data: appointment,
  })
})

export const AppointmentControllers = {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
}