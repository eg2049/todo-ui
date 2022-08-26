import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authTokenName } from "../config";
import TodoBackend from "../API/TodoBackend";
import { todoUIEndpoints } from "../config";

const Login = () => {

    const defaultState = {
        username: "",
        password: ""
    };

    const [credentials, setCredetials] = useState(defaultState);

    const navigate = useNavigate();

    const authTokenGet = (event) => {
        event.preventDefault();

        TodoBackend.authToken(
            credentials
        ).then(
            response => {
                if (response.status === 200) {
                    const token = response.data.token;
                    localStorage.setItem(authTokenName, token);
                    navigate(todoUIEndpoints.main);
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

    return (
        <div>
            <form className="col-3 position-absolute top-50 start-50 translate-middle" onSubmit={authTokenGet}>
                <div className="mb-3">
                    <label className="form-label">
                        Login
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={credentials.login}
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

                <button type="submit" className="btn btn-success">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
