import React from "react"
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Todos = () => {
    return (
        <div>
            <TodoForm />
            <TodoList />
        </div>
    );
};

export default Todos;
