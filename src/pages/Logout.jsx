import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authDispatch, authTokenHeadersGet, authTokenRemove } from "../handlers/authHandlers";
import TodoBackend from "../API/TodoBackend";
import { todoUIEndpoints } from "../config";

const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(
        () => {
            const headers = authTokenHeadersGet();
            TodoBackend.authTokenRemove(
                headers
            ).then(
                response => {
                    if (response.status === 200) {
                        authTokenRemove();
                        authDispatch(dispatch);
                        navigate(todoUIEndpoints.login);
                    }
                    else {
                        console.log(response);
                        navigate(todoUIEndpoints.main);
                    };
                }
            ).catch(
                error => {
                    console.error(error);
                    navigate(todoUIEndpoints.main);
                }
            );
        }, []
    );
};

export default Logout;
