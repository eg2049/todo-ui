import React from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { authTokenHeadersGet } from "../handlers/authHandlers";

const Main = () => {
    const isAuth = authTokenHeadersGet();

    return (
        <div>
            {isAuth.Authorization
                ?
                <div>
                    <TodoForm />
                    <TodoList />
                </div>
                :
                <h3 className="position-absolute top-50 start-50 translate-middle">
                    Please log in to manage your todo list
                </h3>
            }
        </div>
    );
};

export default Main;
