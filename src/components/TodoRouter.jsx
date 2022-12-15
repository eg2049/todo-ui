import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "@router";

/**
 * Компонент для создания и подключения маршрутов страниц UI
 *  
 * @returns {object} компонент маршруты страниц UI
 */
const TodoRouter = () => {

    return (

        // создаётся компонент Routes состоящий из компонентов Route
        <Routes>

            {/* итерация по всем маршрутам и создание компонента Route на основе каждого */}
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
