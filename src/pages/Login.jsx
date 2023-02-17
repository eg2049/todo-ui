import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authTokenGetRequest } from "@handlers/authHandlers";
import TodoMessage from "@components/TodoMessage";

/**
 * Компонент-страница с формой логина
 * 
 * @returns {object} компонент-страница с формой логина
 */
const Login = () => {

    const isAuth = useSelector(state => state.isAuth.isAuth);

    // состояние полей формы логина по умолчанию
    const defaultState = {
        username: "",
        password: ""
    };

    const [modalActive, setModalActive] = useState(false);
    const [message, setMessage] = useState("");

    // управление состоянием кред для логина
    const [credentials, setCredetials] = useState(defaultState);

    // хук useDispatch() - позволяет изменять состояния в reducer-ax redux
    const dispatch = useDispatch();

    // хук useNavigate() - используется для динамической навигации по страницам UI
    const navigate = useNavigate();

    /**
     * Обработка события нажатия на клавишу "Войти"
     *  
     * @param {object} event сущность доступная при использовании слушателя onSubmit
     */
    const authStart = (event) => {

        // предотвращение default поведения браузера
        // при нажатии на кнопку не будет выполняться type="submit" (обновление страницы и отправка данных на сервер)
        event.preventDefault();

        authTokenGetRequest(
            credentials, dispatch, navigate, setMessage, setModalActive
        );
    };

    return (
        <div>
            {isAuth

                // сообщение, если пользоватль уже залогинен
                ?
                <h3 className="position-absolute top-50 start-50 translate-middle">
                    You are already logged in
                </h3>

                // форма, если пользоватль ещё не залогинен
                :
                <form className="col-3 position-absolute top-50 start-50 translate-middle" onSubmit={authStart}>
                    <div className="mb-3">
                        <label className="form-label">
                            Login
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"

                            // value данного input-а двусторонне связывается с credentials.username
                            value={credentials.username}

                            // credentials разворачивается со всеми своими полями
                            // затем перезатирается поле username конкретно в этом input-е
                            onChange={event =>
                                setCredetials(
                                    { ...credentials, username: event.target.value }
                                )
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"

                            // value данного input-а двусторонне связывается с credentials.password
                            value={credentials.password}

                            // credentials разворачивается со всеми своими полями
                            // затем перезатирается поле password конкретно в этом input-е
                            onChange={event =>
                                setCredetials(
                                    { ...credentials, password: event.target.value }
                                )
                            }
                        />
                    </div>

                    <button type="submit" className="btn btn-success">
                        Login
                    </button>
                </form>
            }

            <div><TodoMessage active={modalActive} setActive={setModalActive} message={message} /></div>
        </div>
    );
};

export default Login;
