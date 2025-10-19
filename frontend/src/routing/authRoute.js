import AuthPage from "../pages/AuthPage";
import { routeTree } from "./routeTree";
import { createRoute } from '@tanstack/react-router'

export const authRoute = createRoute({
    getParentRoute: () => routeTree,
    path:"/auth",
    component: AuthPage ,
});

