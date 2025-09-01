import { Router } from "express"
import { userRoutes } from "../modules/user/user.routes"
import { authRoutes } from "../modules/auth/auth.routes"
import { UploadRoutes } from "../modules/Upload/upload.route"

const router = Router()
const routes = [
    {
        path: "/users",
        component: userRoutes
    },
    {
        path: "/auth",
        component: authRoutes
    },
    {
        path: "/upload",
        component: UploadRoutes
    },
]

routes.forEach(route => router.use(route.path, route.component))
export default router