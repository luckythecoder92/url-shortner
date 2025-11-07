import DashBoardPage from "../pages/DashBoardPage";
import { routeTree } from "./routeTree";
import { createRoute } from '@tanstack/react-router'
import { checkAuth } from '../utils/helper.js'

const dashBoardRoute = createRoute({
    getParentRoute: () => routeTree,
    path:"/dashboard",
    component: DashBoardPage ,
    beforeLoad: checkAuth
});

export { dashBoardRoute };