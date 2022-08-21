import Error from "../pages/Error";
import Todos from "../pages/Todos";
import { todoUIEndpoints } from "../config";

export const routes = [
    { path: todoUIEndpoints.getTodoList, element: <Todos />, exact: true },
    { path: todoUIEndpoints.notFound, element: <Error />, exact: false }
];
