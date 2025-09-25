import { Router } from "express"
import { userRoutes } from "../modules/user/user.routes"
import { authRoutes } from "../modules/auth/auth.routes"
import { UploadRoutes } from "../modules/Upload/upload.route"
import { ResidencesRoutes } from "../modules/Residences/residences.route"

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
    {
        path: "/residences",
        component: ResidencesRoutes
    }
]

routes.forEach(route => router.use(route.path, route.component))
export default router