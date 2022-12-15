import React, { useState } from "react";
import TodoMessage from "@components/TodoMessage";
import { authTokenHeadersGet } from "@handlers/authHandlers";
import TodoBackend from "@API/TodoBackend";

/**
 * Компонент форма для создания todo
 * 
 * @param {*} param0 object сразу деструктурируется
 * @param {function} fetchCallback callback для вызова API получения всех todo пользователя
 * 
 * @returns {object} компонент форма для создания todo
 */
const TodoForm = ({ fetchCallback }) => {

    const headers = authTokenHeadersGet();

    const defaultState = {
        title: "",
        description: ""
    };

    const [modalActive, setModalActive] = useState(false);
    const [message, setMessage] = useState("");
    const [todo, setTodo] = useState(defaultState);

    /**
     * Обработка события нажатия на кнопку "Создать"
     */
    const addTodo = (event) => {

        event.preventDefault();

        // запрос к API
        TodoBackend.addTodo(
            headers, todo
        ).then(
            response => {
                if (response.status === 201) {
                    setTodo(defaultState);

                    // обновлённый список todo
                    fetchCallback();
                }
            }
        ).catch(
            error => {
                setMessage(error.response.data.message);
                setModalActive(true);
            }
        );
    };

    return (
        <div className="card card-body mb-4">
            <h2>Add Todo</h2>

            {/* вызов функции обработки события создания todo при нажатии на кнопку */}
            <form onSubmit={addTodo}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={todo.title}
                        onChange={
                            event => setTodo(
                                {
                                    ...todo,
                                    title: event.target.value
                                }
                            )
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={todo.description}
                        onChange={
                            event => setTodo(
                                {
                                    ...todo,
                                    description: event.target.value
                                }
                            )
                        }
                    />
                </div>

                <div className="form-group mt-2">
                    <button type="submit" className="btn btn-success">
                        Add
                    </button>
                </div>
            </form>

            <TodoMessage active={modalActive} setActive={setModalActive} message={message} />
        </div>
    );
};

export default TodoForm;
