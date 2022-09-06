import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoFilter from "../components/TodoFilter";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TodoBackend from "../API/TodoBackend";
import { authTokenHeadersGet } from "../handlers/authHandlers";

const Main = () => {
    const isAuth = useSelector(state => state.isAuth.isAuth);

    const [todoList, setTodoList] = useState(
        {
            full: [],
            searched: []
        }
    );

    const [searchQuery, setSearchQuery] = useState("");

    const fetchTodoList = () => {
        const headers = authTokenHeadersGet();

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
        const headers = authTokenHeadersGet();

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
        const headers = authTokenHeadersGet();

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
            const headers = authTokenHeadersGet();
            if (headers.Authorization) {
                fetchTodoList();
            };
        }, []
    );

    useEffect(
        () => {
            if (isAuth) {
                const searchResult = searchTodo(todoList.full, searchQuery);
                setTodoList(
                    { ...todoList, searched: searchResult }
                );
            };
        }, [searchQuery]
    );

    return (
        <div>
            {isAuth
                ?
                <div>
                    <TodoForm />
                    <TodoFilter filter={searchQuery} setFilter={setSearchQuery} />
                    <TodoList todos={todoList} toggle={toggleTodo} remove={deleteTodo} />
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
