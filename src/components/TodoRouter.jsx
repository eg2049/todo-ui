import React from "react"
import { Route, Routes } from "react-router-dom";
import { routes } from "../router";

const TodoRouter = () => {
    return (
        <Routes>
            {routes.map(route =>
                <Route
                    key={route.element}
                    path={route.path}
                    element={route.element}
                    exact={route.exact}
                />)
            }
        </Routes>
    );
};

export default TodoRouter;
