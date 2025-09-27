import { Router } from "express"
import { userRoutes } from "../modules/user/user.routes"
import { authRoutes } from "../modules/auth/auth.routes"
import { UploadRoutes } from "../modules/Upload/upload.route"
import { ResidencesRoutes } from "../modules/Residences/residences.route"
import path from "path"
import { IssueTypeRoutes } from "../modules/IssueType/issueType.route"
import { IssueReportRoutes } from "../modules/IssueReport/issueReport.route"
import { NewsRoutes } from "../modules/News/news.route"
import { AdminNewsRoutes } from "../modules/AdminNews/adminNews.route"
import { PropertyContactRoutes } from "../modules/PropertyContact/propertyContact.route"

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
    },
    {
        path: "/issue",
        component: IssueTypeRoutes
    },
    {
        path: "/issues-report",
        component: IssueReportRoutes
    },
    {
        path:"/news",
        component:NewsRoutes
    },
    {
        path:"/admin-news",
        component:AdminNewsRoutes
    },
    {
        path:"/property-contact",
        component:PropertyContactRoutes
    }
]

routes.forEach(route => router.use(route.path, route.component))
export default router