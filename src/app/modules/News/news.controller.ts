import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { NewsServices } from "./news.service"

const createNews = catchAsync(async (req, res) => {
  const news = await NewsServices.createNews(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News created successfully",
    data: news,
  })
})

const getAllNewss = catchAsync(async (req, res) => {
  const newss = await NewsServices.getAllNewss(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Newss retrieved successfully",
    data: newss,
  })
})

const getSingleNews = catchAsync(async (req, res) => {
  const news = await NewsServices.getSingleNews(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News retrieved successfully",
    data: news,
  })
})

const updateNews = catchAsync(async (req, res) => {
  const news = await NewsServices.updateNews(req.params.id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News updated successfully",
    data: news,
  })
})

const deleteNews = catchAsync(async (req, res) => {
  const news = await NewsServices.deleteNews(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News deleted successfully",
    data: news,
  })
})

export const NewsControllers = {
  createNews,
  getAllNewss,
  getSingleNews,
  updateNews,
  deleteNews,
}
