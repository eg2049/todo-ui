import React, { useEffect, useState } from "react";
import { authTokenHeadersGet } from "../handlers/authHandlers";
import TodoBackend from "../API/TodoBackend";
import TodoFilter from "./TodoFilter";

const TodoList = () => {

    const headers = authTokenHeadersGet();

    const [todoList, setTodoList] = useState(
        {
            full: [],
            searched: []
        }
    );

    const [searchQuery, setSearchQuery] = useState("");

    const fetchTodoList = () => {
        TodoBackend.getTodoList(
            headers
        ).then(
            response => {
                if (response.status === 200) {
                    setTodoList(
                        { ...todoList, full: response.data, searched: response.data }
                    );
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

    const deleteTodo = (pk) => {
        TodoBackend.deleteTodo(
            headers, pk
        ).then(
            response => {
                if (response.status === 204) {
                    setTodoList(
                        {
                            ...todoList,
                            full: todoList.full.filter(todo => todo.pk !== pk),
                            searched: todoList.searched.filter(todo => todo.pk !== pk)
                        }
                    );
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

    const searchTodo = (todos, query) => {

        const titleTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
        const descriptionTodos = todos.filter(todo => todo.description.toLowerCase().includes(query.toLowerCase()));
        const concatTodos = [...titleTodos, ...descriptionTodos];

        return [...new Set(concatTodos)];
    };

    useEffect(
        () => {
            fetchTodoList();
        }, []
    );

    useEffect(
        () => {
            const searchResult = searchTodo(todoList.full, searchQuery)
            setTodoList(
                { ...todoList, searched: searchResult }
            )
        }, [searchQuery]
    );

    return (
        <div>
            <h2>Todo List</h2>

            <TodoFilter filter={searchQuery} setFilter={setSearchQuery} />

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
                        todoList.searched.map(
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
