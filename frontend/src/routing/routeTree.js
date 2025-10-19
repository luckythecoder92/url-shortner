import { createRootRoute } from "@tanstack/react-router";
import RouteLayout from "../RouteLayout.jsx";
import { homePageRoute } from "./homePage.js";
import { dashBoardRoute } from "./dashBoard.js";
import { authRoute } from "./authRoute.js";


export const routeTree = createRootRoute({
    component: RouteLayout 
})

routeTree.addChildren([
    homePageRoute,
    dashBoardRoute,
    authRoute
]);
