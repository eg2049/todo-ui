import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "@components/Pagination";
import TodoFilter from "@components/TodoFilter";
import TodoForm from "@components/TodoForm";
import TodoList from "@components/TodoList";
import TodoBackend from "@API/TodoBackend";
import { authTokenHeadersGet } from "@handlers/authHandlers";
import { getPageCount } from "@utils/pages";
import { todosOnPageLimit } from "@config/config";

const Main = () => {

    const isAuth = useSelector(state => state.isAuth.isAuth);

    const [todoList, setTodoList] = useState(
        {
            full: [],
            paginated: [],
            searched: []
        }
    );

    const [searchQuery, setSearchQuery] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchTodoList = () => {
        const headers = authTokenHeadersGet();

        TodoBackend.getTodoList(
            headers
        ).then(
            response => {
                if (response.status === 200) {

                    const totalCount = response.data.length;

                    setTotalPages(getPageCount(totalCount, todosOnPageLimit));

                    setTodoList(
                        { ...todoList, full: response.data, paginated: response.data.slice(0, todosOnPageLimit) }
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
                            paginated: todoList.paginated.filter(todo => todo.pk !== pk),
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

    const changePage = (page) => {
        setPage(page);

        const newLimitTo = todosOnPageLimit * page;
        const newLimitFrom = newLimitTo - todosOnPageLimit;

        let newPaginated = [];

        if (todoList.searched.length) {
            newPaginated = todoList.searched.slice(newLimitFrom, newLimitTo);
        }
        else {
            newPaginated = todoList.full.slice(newLimitFrom, newLimitTo);
        };

        setTodoList(
            { ...todoList, paginated: newPaginated }
        );
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
                let searchResult = searchTodo(todoList.full, searchQuery);

                if (!searchQuery) {
                    searchResult = todoList.full.slice(0, todosOnPageLimit);
                    setTotalPages(getPageCount(todoList.full.length, todosOnPageLimit));
                }
                else {
                    setTotalPages(getPageCount(searchResult.length, todosOnPageLimit));
                };

                setTodoList(
                    { ...todoList, searched: searchResult, paginated: searchResult.slice(0, todosOnPageLimit) }
                );

                setPage(1);
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
                    <Pagination totalPages={totalPages} page={page} changePage={changePage} />
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
