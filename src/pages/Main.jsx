import React from "react";
import { useSelector } from "react-redux";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Main = () => {
    const isAuth = useSelector(state => state.isAuth.isAuth);

    return (
        <div>
            {isAuth
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
