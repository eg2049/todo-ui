import React, { useEffect, useState } from "react";
import { authTokenHeadersGet } from "../handlers/authHandlers";
import TodoBackend from "../API/TodoBackend";

const TodoList = () => {

    const headers = authTokenHeadersGet();

    const [todoList, setTodoList] = useState([]);

    const fetchTodoList = () => {
        TodoBackend.getTodoList(
            headers
        ).then(
            response => {
                if (response.status === 200) {
                    setTodoList(response.data);
                }
                else {
                    console.log(response);
                };
            }
        ).catch(
            error => {
                console.error(error);
            }
        )
    };

    const deleteTodo = (pk) => {
        TodoBackend.deleteTodo(
            headers, pk
        ).then(
            response => {
                if (response.status === 204) {
                    setTodoList(todoList.filter(todo => todo.pk !== pk));
                }
                else {
                    console.log(response);
                };
            }
        ).catch(
            error => {
                console.error(error);
            }
        );
    };

    const toggleTodo = (todo) => {
        TodoBackend.toggleTodo(
            headers, todo
        ).then(
            response => {
                if (response.status !== 200) {
                    console.log(response);
                };
            }
        ).catch(
            error => {
                console.error(error);
            }
        );
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
