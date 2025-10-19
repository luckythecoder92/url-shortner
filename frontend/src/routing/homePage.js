
import HomePage from "../pages/HomePage";
import { routeTree} from "./routeTree";
import { createRoute } from '@tanstack/react-router'

export const homePageRoute = createRoute({
    getParentRoute: () => routeTree,
    path:"/home",
    component: HomePage ,
});

