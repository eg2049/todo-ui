import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authDispatch, authTokenHeadersGet, authTokenRemove } from "@handlers/authHandlers";
import TodoBackend from "@API/TodoBackend";
import { todoUIEndpoints } from "@config/config";

/**
 * Компонент-страница для логаута
 */
const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(
        () => {
            const headers = authTokenHeadersGet();

            // запрос к API
            TodoBackend.authTokenRemove(
                headers
            ).then(
                response => {
                    if (response.status === 200) {

                        // удаление токена аутентификации из localStorage
                        authTokenRemove();

                        // изменение состояния в reducer-ax redux
                        authDispatch(dispatch);

                        // редирект на страницу логина
                        navigate(todoUIEndpoints.login);
                    };
                }
            ).catch(
                error => {
                    console.error(error);

                    // редирект на главную в случае ошибки
                    navigate(todoUIEndpoints.main);
                }
            );
        }, []
    );
};

export default Logout;
