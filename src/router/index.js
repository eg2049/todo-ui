import Login from "@pages/Login";
import Logout from "@pages/Logout";
import Main from "@pages/Main";
import NotFound from "@pages/NotFound";
import Profile from "@pages/Profile";
import Registration from "@pages/Registration";
import { todoUIEndpoints } from "@config/config";

/**
 * Данные маршрутов страниц UI (путь / компонент React / exact)
 * 
 * props exact указывается, так в адресах страниц может повторяться часть пути /todos & /todos/:id 
 * это нужно для того чтобы роутер воспринимал такие пути как разные
 * для того чтобы маршрут был динамическим, необходимо указать :id (двоеточие, название параметра)
 */
export const routes = [
    { path: todoUIEndpoints.login, element: <Login />, exact: true },
    { path: todoUIEndpoints.logout, element: <Logout />, exact: true },
    { path: todoUIEndpoints.main, element: <Main />, exact: true },
    { path: todoUIEndpoints.profile, element: <Profile />, exact: true },
    { path: todoUIEndpoints.registration, element: <Registration />, exact: true },
    { path: todoUIEndpoints.notFound, element: <NotFound />, exact: false }
];
