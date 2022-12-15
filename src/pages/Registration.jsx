import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TodoMessage from "@components/TodoMessage";
import { registration } from "@handlers/authHandlers";

/**
 * Компонент-страница с формой регистрации
 * 
 * @returns {object} компонент-страница с формой регистрации
 */
const Registration = () => {

    const isAuth = useSelector(state => state.isAuth.isAuth);

    const defaultState = {
        email: "",
        username: "",
        password: "",
        passwordConfirm: ""
    };

    const [modalActive, setModalActive] = useState(false);
    const [message, setMessage] = useState("");
    const [credentials, setCredetials] = useState(defaultState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Проверка совпадения полей "Пароль" и "Подтверждение пароля"
     * 
     * @returns {bool} совпадают ли поля "Пароль" и "Подтверждение пароля"
     */
    const passwordCheck = () => {
        return (credentials.password === credentials.passwordConfirm) ? true : false;
    };

    /**
     * Обработка события нажатия на клавишу "Зарегистрироваться"
     * 
     * @param {object} event сущность доступная при использовании слушателя onSubmit 
     */
    const registrationStart = (event) => {
        event.preventDefault();

        // проверка совпадают ли пароли
        const passwordMatch = passwordCheck();

        if (passwordMatch) {

            registration(
                credentials, dispatch, navigate, setMessage, setModalActive
            );
        }
        else {
            setMessage("Passwords do not match!");
            setModalActive(true);
        };
    };

    return (
        <div>
            {isAuth
                ?
                <h3 className="position-absolute top-50 start-50 translate-middle">
                    You need to log out before start registration
                </h3>
                :
                <form className="col-3 position-absolute top-50 start-50 translate-middle" onSubmit={registrationStart}>
                    <div className="mb-3">
                        <label className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={credentials.email}
                            onChange={event =>
                                setCredetials(
                                    { ...credentials, email: event.target.value }
                                )
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputUsername"
                            aria-describedby="emailHelp"
                            value={credentials.username}
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
                            value={credentials.password}
                            onChange={event =>
                                setCredetials(
                                    { ...credentials, password: event.target.value }
                                )
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1Confirm"
                            value={credentials.passwordConfirm}
                            onChange={event =>
                                setCredetials(
                                    { ...credentials, passwordConfirm: event.target.value }
                                )
                            }
                        />
                    </div>

                    <button type="submit" className="btn btn-success">
                        Registration
                    </button>
                </form>
            }

            <div><TodoMessage active={modalActive} setActive={setModalActive} message={message} /></div>
        </div>
    );
};

export default Registration;
