import React from "react";

/**
 * Компонент для работы с реестром todo
 * 
 * @param {object} param0 object сразу деструктурируется
 * @param {object} todos object с разными видами массивов todo (это состояние формируемое в Main.jsx)
 * @param {function} toggle обработчик запроса на переключение состояния todo
 * @param {function} remove обработчик запроса на удаление todo
 *  
 * @returns {object} компонент для работы с реестром todo
 */
const TodoList = ({ todos, toggle, remove }) => {

    return (
        <div className="min-vh-100 mb-4">
            <h2>Todo List</h2>

            {/* если есть todo в массиве "для пагинации", то отображаются они */}
            {todos.paginated.length
                ?
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>description</th>
                            <th>done</th>
                            <th></th>
                        </tr>
                    </thead>

                    {/* тело таблицы заполняется данными todo отображаемых на текущей странице */}
                    <tbody>
                        {
                            // итерация по массиву todo "для пагинации"
                            todos.paginated.map(
                                todo =>
                                    <tr key={todo.pk}>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>
                                            <input
                                                type="checkbox"

                                                // текущее состояние todo
                                                defaultChecked={todo.done}

                                                // обработка события изменения состояния
                                                onChange={
                                                    () => toggle(todo)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"

                                                // обработка события удаления todo
                                                onClick={
                                                    () => remove(todo.pk)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

                :
                todos.full.length

                    // если todo есть, но не найдены по поисковому запросу
                    ?
                    <div className="text-center mt-5">
                        <h3>No todos found for your query</h3>
                    </div>

                    // если todo пока нет
                    :
                    <div className="text-center mt-5">
                        <h3>You don't have any todo right now</h3>
                    </div>
            }

        </div>
    );
};

export default TodoList;
