import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "@components/Pagination";
import TodoFilter from "@components/TodoFilter";
import TodoForm from "@components/TodoForm";
import TodoList from "@components/TodoList";
import TodoMessage from "@components/TodoMessage";
import TodoBackend from "@API/TodoBackend";
import { authTokenHeadersGet } from "@handlers/authHandlers";
import { getPageCount } from "@utils/pages";
import { todosOnPageLimit } from "@config/config";

/**
 * Компонент-страница с главной страницей
 * 
 * @returns {object} компонент-страница главная страница
 */
const Main = () => {

    // хук useSelector() - получить состояние из reducer-а redux
    // аргументом передаётся функция, эта функция принимает аргументом состояние, из которой можно получить нужную переменную
    // state.isAuth.isAuth - получить из состояния reducer isAuth, и из этого reducer-а получить переменную isAuth
    const isAuth = useSelector(state => state.isAuth.isAuth);

    // управление состоянием активности модального окна с сообщением
    const [modalActive, setModalActive] = useState(false);

    // управление состоянием текста сообщения с ошибкой или результатом выполнения операции
    const [message, setMessage] = useState("");

    // управление состоянием отображаемых todo
    const [todoList, setTodoList] = useState(
        {
            // всего todo
            full: [],

            // todo на одной странице после подсчёта пагинации
            paginated: [],

            // todo после обработки запроса на поиск 
            searched: []
        }
    );

    // управление состоянием запроса в поисковой строке
    const [searchQuery, setSearchQuery] = useState("");

    // управление состоянием текущей отображаемой страницы при пагинации
    const [page, setPage] = useState(1);

    // управление состоянием общим количеством отображаемых страниц при пагинации
    const [totalPages, setTotalPages] = useState(0);

    /**
     * Запрос к API на получение всех todo 
     */
    const fetchTodoList = () => {

        // формирование headers для запроса
        const headers = authTokenHeadersGet();

        // запрос к API
        TodoBackend.getTodoList(
            headers
        ).then(
            response => {
                if (response.status === 200) {

                    // определение общего кол-ва todo
                    const totalCount = response.data.length;

                    // подсчёт и изменение состояния общего количества страниц при пагинации
                    setTotalPages(getPageCount(totalCount, todosOnPageLimit));

                    // изменение состояния отображаемых todo
                    // деструктурируется todoList и измменяются значения full (всего) и paginated (не более todosOnPageLimit todo на одной странице)
                    setTodoList(
                        { ...todoList, full: response.data, paginated: response.data.slice(0, todosOnPageLimit) }
                    );
                };
            }
        ).catch(
            error => {
                // изменение состояния для сообщения об ошибке в модальном окне
                setMessage(error.response.data.message);

                // изменение состояния для открытия модального окна
                setModalActive(true);
            }
        );
    };

    /**
     * Запрос к API на удаление todo 
     * 
     * @param {string} pk pk удаляемой todo
     */
    const deleteTodo = (pk) => {
        const headers = authTokenHeadersGet();

        // запрос к API
        TodoBackend.deleteTodo(
            headers, pk
        ).then(
            response => {
                if (response.status === 204) {

                    // изменение состояния отображаемых todo
                    setTodoList(
                        {
                            // деструктурируется todoList
                            ...todoList,

                            // из массивов с todo всех типов, удаляется todo которая удалилась на бэке 
                            full: todoList.full.filter(todo => todo.pk !== pk),
                            paginated: todoList.paginated.filter(todo => todo.pk !== pk),
                            searched: todoList.searched.filter(todo => todo.pk !== pk)
                        }
                    );
                };
            }
        ).catch(
            error => {
                setMessage(error.response.data.message);
                setModalActive(true);
            }
        );
    };

    /**
     * Запрос к API на изменение статуса готовности todo 
     * 
     * @param {object} todo объект с данными одной todo
     */
    const toggleTodo = (todo) => {
        const headers = authTokenHeadersGet();

        // запрос к API
        TodoBackend.toggleTodo(
            headers, todo
        ).catch(
            error => {
                setMessage(error.response.data.message);
                setModalActive(true);
            }
        );
    };

    /**
     * Обработка поискового запроса (запроса к API не происходит)
     * 
     * @param {object} todos объект в котором находятся объекты единичных todo
     * @param {string} query поисковый запрос 
     * 
     * @returns {object} результат поиска
     */
    const searchTodo = (todos, query) => {

        // совпадения по title
        const titleTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

        // совпадения по description
        const descriptionTodos = todos.filter(todo => todo.description.toLowerCase().includes(query.toLowerCase()));

        // объединённые совпадения
        const concatTodos = [...titleTodos, ...descriptionTodos];

        // благодаря Set() убираются дублирования
        return [...new Set(concatTodos)];
    };

    /**
     * Обработка запроса на смену страницы при пагинации
     * 
     * @param {string} page номер страницы 
     */
    const changePage = (page) => {

        // изменение состояния при переходе на другую страницу
        setPage(page);

        // определение номера последнего todo который будет показываться 
        const newLimitTo = todosOnPageLimit * page;

        // определение номера первого todo который будет показываться 
        const newLimitFrom = newLimitTo - todosOnPageLimit;

        // массив для todo которые будут показываться на открываемой странице
        let newPaginated = [];

        // если есть todo в массиве для хранения результатов поиска
        // то todo для открываемой страницы пагинации берутся оттуда
        if (todoList.searched.length) {

            // при помощи slice() по лимитам
            newPaginated = todoList.searched.slice(newLimitFrom, newLimitTo);
        }

        // иначе todo берутся из массива со всеми todo
        else {
            newPaginated = todoList.full.slice(newLimitFrom, newLimitTo);
        };

        // изменение состояния отображаемых todo
        setTodoList(
            {
                // деструктурируется todoList
                ...todoList,

                // массивом с todo для текущей страницы пагинации, становится массив с определёнными ранее todo   
                paginated: newPaginated
            }
        );
    };

    // useEffect() - хук выполняющийся в компоненте в зависмости от каких-то условий (монтирование компонента & изменение состояния чего-либо)
    // первый аргумент - callback, если в callback-е есть return() - он будет вызван в момент размонтирования компонента
    // второй аргумент - массив зависимостей, при изменении которых хук будет отрабатывать, 
    // если пустой - хук отрабатывает только один раз, в момент монтирования компонента
    useEffect(
        () => {
            const headers = authTokenHeadersGet();

            // если получается сформировать headers с токеном аутентификации - вызов метода получения всех todo от бэка
            if (headers.Authorization) {
                fetchTodoList();
            };
        }, []
    );

    useEffect(
        () => {
            if (isAuth) {

                // в массиве со всеми todo происходит поиск todo по введённому запросу
                let searchResult = searchTodo(todoList.full, searchQuery);

                // если поисковый запрос становится пустым
                if (!searchQuery) {

                    // формируется массив todo для первой страницы пагинации
                    searchResult = todoList.full.slice(0, todosOnPageLimit);

                    // подсчёт и изменение состояния общего количества страниц при пагинации отталкиваясь от общего кол-ва todo
                    setTotalPages(getPageCount(todoList.full.length, todosOnPageLimit));
                }

                // иначе
                // подсчёт и изменение состояния общего количества страниц при пагинации отталкиваясь от кол-ва todo найденных по запросу
                else {
                    setTotalPages(getPageCount(searchResult.length, todosOnPageLimit));
                };

                // изменение состояния отображаемых todo
                setTodoList(
                    {
                        ...todoList,

                        // todo найденные по поисковому запросу
                        searched: searchResult,

                        // todo показываемые на первой странице
                        paginated: searchResult.slice(0, todosOnPageLimit)
                    }
                );

                // изменение состояния текущей страницы при пагинации
                // страница 1 - первая с результатами поиска
                setPage(1);
            };
        },

        // хук отрабатывает при изменении состояния поискового запроса
        [searchQuery]
    );

    return (
        <div>
            {isAuth
                ?
                <div>

                    {/* форма создания todo */}
                    <TodoForm fetchCallback={fetchTodoList} />

                    {/* поисковая строка */}
                    <TodoFilter filter={searchQuery} setFilter={setSearchQuery} />

                    {/* список отображаемых todo */}
                    <TodoList todos={todoList} toggle={toggleTodo} remove={deleteTodo} />

                    {/* пагинация */}
                    <Pagination totalPages={totalPages} page={page} changePage={changePage} />

                    {/* модальное окно с возможной ошибкой */}
                    <TodoMessage active={modalActive} setActive={setModalActive} message={message} />
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
