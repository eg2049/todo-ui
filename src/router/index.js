import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Main from "../pages/Main";
import { todoUIEndpoints } from "../config";

export const routes = [
    { path: todoUIEndpoints.login, element: <Login />, exact: true },
    { path: todoUIEndpoints.main, element: <Main />, exact: true },
    { path: todoUIEndpoints.notFound, element: <NotFound />, exact: false }
];
