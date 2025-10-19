import DashBoardPage from "../pages/DashBoardPage";
import { routeTree } from "./routeTree";
import { createRoute } from '@tanstack/react-router'

const dashBoardRoute = createRoute({
    getParentRoute: () => routeTree,
    path:"/dashboard",
    component: DashBoardPage ,
});

export { dashBoardRoute };