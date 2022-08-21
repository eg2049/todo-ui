import React, { useEffect, useState } from "react";
import TodoBackend from "../API/TodoBackend";

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);

    async function fetchTodoList() {
        const response = await TodoBackend.getTodoList();
        setTodoList(response.data);
    };

    const deleteTodo = (pk) => {
        TodoBackend.deleteTodo(pk);
        setTodoList(todoList.filter(todo => todo.pk !== pk));
    };

    const toggleTodo = (todo) => {
        TodoBackend.toggleTodo(todo);
    };

    useEffect(
        () => {
            fetchTodoList();
        }, []
    );

    return (
        <div>
            <h2>Todo List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>title</th>
                        <th>description</th>
                        <th>done</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todoList.map(
                            todo =>
                                <tr key={todo.pk}>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            defaultChecked={todo.done}
                                            onChange={() => toggleTodo(todo)}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteTodo(todo.pk)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
