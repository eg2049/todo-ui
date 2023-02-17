import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import TodoMessage from "@components/TodoMessage";
import { profileConfirmationRequest } from "@handlers/authHandlers";

/**
 * Компонент-страница с формой подтверждения логина
 * 
 * @returns {object} компонент-страница с формой подтверждения логина
 */
const ProfileConfirmation = () => {

    const isAuth = useSelector(state => state.isAuth.isAuth);

    const defaultState = {
        password: "",
        passwordConfirm: ""
    };

    // хук useSearchParams() - получить query параметры из url
    const [queryParams, setQueryParams] = useSearchParams();

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
     * Обработка события нажатия на клавишу "Подтвердить"
     * 
     * @param {object} event сущность доступная при использовании слушателя onSubmit 
     */
    const confirmationStart = (event) => {
        event.preventDefault();

        // проверка совпадают ли пароли
        const passwordMatch = passwordCheck();

        if (passwordMatch) {

            const body = {

                // получение токена по ключу из Object, удаление "/" (слэшэй), если они есть
                "token": queryParams.get("token").replace("/", ""),
                "password": credentials.password
            }

            profileConfirmationRequest(
                body, dispatch, navigate, setMessage, setModalActive
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
                    You need to log out before start account confirmation
                </h3>
                :
                <form className="col-3 position-absolute top-50 start-50 translate-middle" onSubmit={confirmationStart}>

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
                        Confirm
                    </button>
                </form>
            }

            <div><TodoMessage active={modalActive} setActive={setModalActive} message={message} /></div>
        </div>
    );
};

export default ProfileConfirmation;
